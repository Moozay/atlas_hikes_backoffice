import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPortal } from "react-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { marked } from "marked";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

// Turndown instance (markdown serializer)
const _td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced" });
_td.use(gfm);
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/use-auth";
import { useBlogs, useCreateBlog, useUpdateBlog, useDeleteBlog, useBulkImportBlogs } from "@/hooks/use-blogs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Plus, Search, MoreVertical, Pencil, Trash2, FileSpreadsheet,
  BookOpen, Clock, Eye, Star, Loader2, X, Tag, ArrowLeft,
  Bold, Italic, List, ListOrdered, Quote, Code2, Table2, Minus,
} from "lucide-react";

// ── Schema ───────────────────────────────────────────────────────────────────

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  primaryKeyword: z.string().default(""),
  excerpt: z.string().min(1, "Excerpt is required"),
  contentMarkdown: z.string().min(1, "Content is required"),
  contentHtml: z.string().default(""),
  image: z.string().default(""),
  imageAlt: z.string().default(""),
  readTime: z.coerce.number().int().min(1).default(5),
  category: z.string().default("Guides"),
  tags: z.array(z.string()).default([]),
  author: z.string().default("Atlas Hikes"),
  authorRole: z.string().default("Mountain Guide"),
  authorAvatar: z.string().default("/svg/hiker.svg"),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  metaTitle: z.string().default(""),
  metaDescription: z.string().default(""),
  canonicalUrl: z.string().default(""),
});

type BlogFormValues = z.infer<typeof blogSchema>;

const CATEGORIES = ["Guides", "Gear", "Nutrition", "Safety", "Culture", "Photography", "Training"];

const DEFAULTS: BlogFormValues = {
  title: "", slug: "", primaryKeyword: "", excerpt: "",
  contentMarkdown: "", contentHtml: "", image: "", imageAlt: "",
  readTime: 5, category: "Guides", tags: [],
  author: "Atlas Hikes", authorRole: "Mountain Guide", authorAvatar: "/svg/hiker.svg",
  published: true, featured: false,
  metaTitle: "", metaDescription: "", canonicalUrl: "",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function wordCount(t: string) { return t.trim() ? t.trim().split(/\s+/).length : 0; }
function statusColor(published: boolean) {
  return published
    ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
    : "bg-amber-500/10 text-amber-600 border-amber-200";
}

// ── Tags Input ────────────────────────────────────────────────────────────────

function TagsInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("");
  function add() {
    const tag = input.trim().toLowerCase();
    if (tag && !value.includes(tag)) onChange([...value, tag]);
    setInput("");
  }
  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        <Input
          placeholder="Add tag, press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          className="h-8 text-sm"
        />
        <Button type="button" variant="outline" size="sm" className="h-8 px-2 shrink-0" onClick={add}>
          <Tag className="w-3.5 h-3.5" />
        </Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {value.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1 pr-1 text-xs">
              {tag}
              <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))}
                className="hover:text-destructive transition-colors">
                <X className="w-2.5 h-2.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

// ── WYSIWYG Rich Text Editor ──────────────────────────────────────────────────

const EDITOR_STYLES = `
  .ProseMirror { outline: none; min-height: 460px; padding: 0.25rem 0; }
  .ProseMirror > * + * { margin-top: 0.75em; }
  .ProseMirror p { line-height: 1.7; }
  .ProseMirror h1 { font-size: 1.75em; font-weight: 700; line-height: 1.2; margin: 1.2em 0 0.4em; border-bottom: 1px solid hsl(var(--border)); padding-bottom: 0.25em; }
  .ProseMirror h2 { font-size: 1.4em; font-weight: 600; line-height: 1.3; margin: 1.1em 0 0.4em; }
  .ProseMirror h3 { font-size: 1.15em; font-weight: 600; line-height: 1.4; margin: 1em 0 0.3em; }
  .ProseMirror h4 { font-size: 1em; font-weight: 600; margin: 0.9em 0 0.3em; }
  .ProseMirror strong { font-weight: 700; }
  .ProseMirror em { font-style: italic; }
  .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; }
  .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; }
  .ProseMirror li { margin: 0.25em 0; }
  .ProseMirror blockquote { border-left: 3px solid hsl(var(--primary)); padding-left: 1rem; color: hsl(var(--muted-foreground)); font-style: italic; margin: 1em 0; }
  .ProseMirror pre { background: hsl(var(--muted)); border-radius: 0.375rem; padding: 0.75rem 1rem; font-family: monospace; font-size: 0.85em; overflow-x: auto; }
  .ProseMirror code { background: hsl(var(--muted)); border-radius: 0.25rem; padding: 0.1em 0.35em; font-family: monospace; font-size: 0.85em; }
  .ProseMirror pre code { background: none; padding: 0; }
  .ProseMirror hr { border: none; border-top: 1px solid hsl(var(--border)); margin: 1.5em 0; }
  .ProseMirror table { border-collapse: collapse; width: 100%; margin: 1em 0; font-size: 0.9em; }
  .ProseMirror td, .ProseMirror th { border: 1px solid hsl(var(--border)); padding: 0.45em 0.75em; position: relative; vertical-align: top; }
  .ProseMirror th { background: hsl(var(--muted)); font-weight: 600; text-align: left; }
  .ProseMirror tr:nth-child(even) td { background: hsl(var(--muted) / 0.4); }
  .ProseMirror .selectedCell:after { content: ""; left: 0; right: 0; top: 0; bottom: 0; background: hsl(var(--primary) / 0.12); pointer-events: none; position: absolute; }
  .ProseMirror .column-resize-handle { position: absolute; right: -2px; top: 0; bottom: 0; width: 4px; background: hsl(var(--primary)); pointer-events: none; }
`;

function RichTextEditor({ value, onChange }: {
  value: string;
  onChange: (md: string) => void;
}) {
  const initialHtml = marked.parse(value || "") as string;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialHtml,
    editorProps: {
      attributes: { class: "focus:outline-none" },
    },
    onUpdate: ({ editor }) => {
      onChange(_td.turndown(editor.getHTML()));
    },
  });

  if (!editor) return <div className="h-48 rounded-md border border-input bg-muted/30 animate-pulse" />;

  function TB({ onClick, active, title, children }: {
    onClick: () => void; active?: boolean; title: string; children: React.ReactNode;
  }) {
    return (
      <button
        type="button"
        title={title}
        onClick={onClick}
        className={`inline-flex items-center justify-center gap-1 h-7 px-2 rounded text-xs font-medium transition-colors select-none ${
          active
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        }`}
      >
        {children}
      </button>
    );
  }

  return (
    <div className="rounded-md border border-input bg-background overflow-hidden">
      <style>{EDITOR_STYLES}</style>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-border bg-muted/30 sticky top-0 z-10">
        {/* Headings */}
        <TB title="Heading 1" active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</TB>
        <TB title="Heading 2" active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</TB>
        <TB title="Heading 3" active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</TB>

        <div className="w-px h-4 bg-border mx-0.5" />

        {/* Inline */}
        <TB title="Bold (Ctrl+B)" active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-3.5 h-3.5" />
        </TB>
        <TB title="Italic (Ctrl+I)" active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="w-3.5 h-3.5" />
        </TB>

        <div className="w-px h-4 bg-border mx-0.5" />

        {/* Blocks */}
        <TB title="Bullet list" active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="w-3.5 h-3.5" />
        </TB>
        <TB title="Numbered list" active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="w-3.5 h-3.5" />
        </TB>
        <TB title="Blockquote" active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="w-3.5 h-3.5" />
        </TB>
        <TB title="Code block" active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <Code2 className="w-3.5 h-3.5" />
        </TB>
        <TB title="Horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="w-3.5 h-3.5" />
        </TB>

        <div className="w-px h-4 bg-border mx-0.5" />

        {/* Table */}
        <TB title="Insert table"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          <Table2 className="w-3.5 h-3.5" /><span>Table</span>
        </TB>
        {editor.isActive("table") && (
          <>
            <TB title="Add column after" onClick={() => editor.chain().focus().addColumnAfter().run()}>+Col</TB>
            <TB title="Delete column" onClick={() => editor.chain().focus().deleteColumn().run()}>-Col</TB>
            <TB title="Add row after" onClick={() => editor.chain().focus().addRowAfter().run()}>+Row</TB>
            <TB title="Delete row" onClick={() => editor.chain().focus().deleteRow().run()}>-Row</TB>
            <TB title="Delete table" onClick={() => editor.chain().focus().deleteTable().run()}>
              <Trash2 className="w-3 h-3" />
            </TB>
          </>
        )}
      </div>

      {/* Editor area */}
      <div className="px-5 py-4 min-h-[460px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

// ── Blog Editor ───────────────────────────────────────────────────────────────

function BlogEditor({ open, onClose, initial, title: editorTitle, onSubmit, loading }: {
  open: boolean;
  onClose: () => void;
  initial?: Partial<BlogFormValues>;
  title: string;
  onSubmit: (v: BlogFormValues) => void;
  loading: boolean;
}) {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: { ...DEFAULTS, ...initial },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const watchTitle = form.watch("title");
  const isCreate = !initial?.slug;
  useEffect(() => {
    if (isCreate && watchTitle) {
      form.setValue("slug", slugify(watchTitle), { shouldValidate: false });
    }
  }, [watchTitle, isCreate]);

  const markdown = form.watch("contentMarkdown") ?? "";
  const words = wordCount(markdown);

  // Key forces editor to remount when switching between posts
  const editorKey = initial?.slug ?? "__new__";

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex flex-col bg-background">

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={onClose}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <p className="font-semibold text-sm truncate">
            {form.watch("title") || editorTitle}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground hidden sm:block">
            {words.toLocaleString()} words · ~{Math.max(1, Math.round(words / 200))} min read
          </span>
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" disabled={loading} onClick={form.handleSubmit(onSubmit)}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {initial?.slug ? "Save Changes" : "Publish Post"}
          </Button>
        </div>
      </div>

      {/* Body: left editor + right sidebar */}
      <Form {...form}>
        <form className="flex-1 min-h-0 flex overflow-hidden">

          {/* ── LEFT: editor ── */}
          <div className="flex-1 min-w-0 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-6 py-6 space-y-4">

              {/* Title */}
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      className="w-full text-2xl font-bold bg-transparent outline-none placeholder:text-muted-foreground/40"
                      placeholder="Post title..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Slug */}
              <FormField control={form.control} name="slug" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground border-b border-border pb-2">
                      <span className="shrink-0">/blogs/</span>
                      <input
                        className="flex-1 bg-transparent outline-none text-foreground min-w-0"
                        placeholder="url-slug"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Excerpt */}
              <FormField control={form.control} name="excerpt" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Excerpt</FormLabel>
                  <FormControl>
                    <Textarea rows={2} placeholder="Short summary shown on blog cards..." className="resize-none text-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* WYSIWYG Content Editor */}
              <FormField control={form.control} name="contentMarkdown" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      key={editorKey}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

            </div>
          </div>

          {/* ── RIGHT: settings sidebar ── */}
          <aside className="w-64 shrink-0 border-l border-border bg-card overflow-y-auto">
            <div className="p-4 space-y-4">

              {/* Visibility */}
              <section>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Visibility</p>
                <FormField control={form.control} name="published" render={({ field }) => (
                  <FormItem className="flex items-center justify-between py-1.5">
                    <FormLabel className="text-sm font-normal cursor-pointer">Published</FormLabel>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="featured" render={({ field }) => (
                  <FormItem className="flex items-center justify-between py-1.5">
                    <FormLabel className="text-sm font-normal cursor-pointer">Featured</FormLabel>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )} />
              </section>

              <Separator />

              {/* Details */}
              <section className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Details</p>
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">Category</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl><SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormItem>
                )} />
                <FormField control={form.control} name="readTime" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">Read Time (min)</FormLabel>
                    <FormControl><Input type="number" min={1} className="h-8 text-sm" {...field} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="primaryKeyword" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">Primary Keyword</FormLabel>
                    <FormControl><Input placeholder="e.g. atlas hiking" className="h-8 text-sm" {...field} /></FormControl>
                  </FormItem>
                )} />
              </section>

              <Separator />

              {/* Tags */}
              <section>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Tags</p>
                <FormField control={form.control} name="tags" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TagsInput value={field.value ?? []} onChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )} />
              </section>

              <Separator />

              {/* Cover Image */}
              <section className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Cover Image</p>
                <FormField control={form.control} name="image" render={({ field }) => (
                  <FormItem>
                    <FormControl><Input placeholder="Image URL" className="h-8 text-sm" {...field} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="imageAlt" render={({ field }) => (
                  <FormItem>
                    <FormControl><Input placeholder="Alt text" className="h-8 text-sm" {...field} /></FormControl>
                  </FormItem>
                )} />
                {form.watch("image") && (
                  <div className="rounded-md overflow-hidden border border-border aspect-video bg-muted">
                    <img src={form.watch("image")} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
              </section>

              <Separator />

              {/* Author */}
              <section className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Author</p>
                <FormField control={form.control} name="author" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">Name</FormLabel>
                    <FormControl><Input className="h-8 text-sm" {...field} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="authorRole" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">Role</FormLabel>
                    <FormControl><Input className="h-8 text-sm" {...field} /></FormControl>
                  </FormItem>
                )} />
              </section>

              <Separator />

              {/* SEO */}
              <section className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">SEO & Meta</p>
                <FormField control={form.control} name="metaTitle" render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-xs text-muted-foreground">Meta Title</FormLabel>
                      <span className={`text-[10px] ${(field.value?.length ?? 0) > 60 ? "text-destructive" : "text-muted-foreground"}`}>
                        {field.value?.length ?? 0}/60
                      </span>
                    </div>
                    <FormControl><Input placeholder="SEO title" className="h-8 text-sm" {...field} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="metaDescription" render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-xs text-muted-foreground">Meta Description</FormLabel>
                      <span className={`text-[10px] ${(field.value?.length ?? 0) > 155 ? "text-destructive" : "text-muted-foreground"}`}>
                        {field.value?.length ?? 0}/155
                      </span>
                    </div>
                    <FormControl><Textarea rows={3} placeholder="SEO description" className="text-sm resize-none" {...field} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="canonicalUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">Canonical URL</FormLabel>
                    <FormControl><Input placeholder="https://..." className="h-8 text-sm" {...field} /></FormControl>
                  </FormItem>
                )} />

                {/* Google preview */}
                {(form.watch("metaTitle") || form.watch("title")) && (
                  <div className="rounded-md border border-border p-3 bg-background mt-1 space-y-0.5">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Google Preview</p>
                    <p className="text-[#1a0dab] text-xs font-medium line-clamp-1 dark:text-blue-400">
                      {form.watch("metaTitle") || form.watch("title")}
                    </p>
                    <p className="text-[#006621] text-[10px] line-clamp-1 dark:text-green-500">
                      {form.watch("canonicalUrl") || `atlashikes.com/blogs/${form.watch("slug")}`}
                    </p>
                    <p className="text-[#545454] text-[10px] line-clamp-2 dark:text-muted-foreground">
                      {form.watch("metaDescription") || form.watch("excerpt")}
                    </p>
                  </div>
                )}
              </section>

            </div>
          </aside>

        </form>
      </Form>
    </div>,
    document.body
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Blogs() {
  const { hasPermission } = useAuth();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [publishedFilter, setPublishedFilter] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [editPost, setEditPost] = useState<any | null>(null);
  const [deletePost, setDeletePost] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useBlogs({
    search: search || undefined,
    category: categoryFilter !== "all" ? categoryFilter : undefined,
    published: publishedFilter === "all" ? undefined : publishedFilter === "published",
  });

  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();
  const deleteBlog = useDeleteBlog();
  const bulkImport = useBulkImportBlogs();

  const posts = data?.posts ?? [];
  const total = data?.total ?? 0;

  async function handleCreate(values: BlogFormValues) {
    try {
      await createBlog.mutateAsync(values);
      toast({ title: "Blog post created" });
      setCreateOpen(false);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  }

  async function handleEdit(values: BlogFormValues) {
    if (!editPost) return;
    try {
      await updateBlog.mutateAsync({ id: editPost.id, ...values });
      toast({ title: "Blog post updated" });
      setEditPost(null);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  }

  async function handleDelete() {
    if (!deletePost) return;
    try {
      await deleteBlog.mutateAsync(deletePost.id);
      toast({ title: "Blog post deleted" });
      setDeletePost(null);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  }

  async function handleFileImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await bulkImport.mutateAsync(file);
      toast({
        title: "Import complete",
        description: `Imported: ${result.imported} | Skipped: ${result.skipped}${result.failed ? ` | Failed: ${result.failed}` : ""}`,
      });
    } catch (err: any) {
      toast({ title: "Import failed", description: err.message, variant: "destructive" });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
            <p className="text-muted-foreground text-sm mt-0.5">{total} post{total !== 1 ? "s" : ""} total</p>
          </div>
          <div className="flex items-center gap-2">
            {hasPermission("blogs:create") && (
              <>
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={bulkImport.isPending}>
                  {bulkImport.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileSpreadsheet className="w-4 h-4 mr-2" />}
                  Import Excel
                </Button>
                <input ref={fileInputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleFileImport} />
                <Button size="sm" onClick={() => setCreateOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" /> New Post
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search posts..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={publishedFilter} onValueChange={setPublishedFilter}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-2">
            <BookOpen className="w-8 h-8 opacity-40" />
            <p className="text-sm">No blog posts found</p>
            {hasPermission("blogs:create") && (
              <Button variant="outline" size="sm" onClick={() => setCreateOpen(true)}>
                <Plus className="w-4 h-4 mr-1" /> Create your first post
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <div key={post.id} className="group relative rounded-xl border border-border/50 bg-card overflow-hidden hover:shadow-md transition-shadow">
                {post.image ? (
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <img src={post.image} alt={post.imageAlt || post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-muted flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                )}

                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="outline" className={statusColor(post.published)}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                      {post.featured && (
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-200">
                          <Star className="w-3 h-3 mr-1" /> Featured
                        </Badge>
                      )}
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-7 h-7 shrink-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {hasPermission("blogs:edit") && (
                          <DropdownMenuItem onClick={() => setEditPost(post)}>
                            <Pencil className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                        )}
                        {hasPermission("blogs:delete") && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setDeletePost(post)} className="text-destructive focus:text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm leading-snug line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
                  </div>

                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{tag}</span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">+{post.tags.length - 3}</span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1 border-t border-border/40">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} min</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.views.toLocaleString()}</span>
                    <span className="ml-auto truncate max-w-[100px]">{post.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editors */}
      <BlogEditor
        key={createOpen ? "create-open" : "create-closed"}
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="New Blog Post"
        onSubmit={handleCreate}
        loading={createBlog.isPending}
      />
      <BlogEditor
        key={editPost?.id ?? "edit"}
        open={!!editPost}
        onClose={() => setEditPost(null)}
        title="Edit Blog Post"
        initial={editPost ? {
          ...editPost,
          tags: editPost.tags ?? [],
          metaTitle: editPost.metaTitle ?? "",
          metaDescription: editPost.metaDescription ?? "",
          canonicalUrl: editPost.canonicalUrl ?? "",
        } : undefined}
        onSubmit={handleEdit}
        loading={updateBlog.isPending}
      />

      {/* Delete confirmation */}
      <Dialog open={!!deletePost} onOpenChange={(v) => !v && setDeletePost(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete blog post?</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">"{deletePost?.title}"</span> will be permanently deleted.
          </p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeletePost(null)}>Cancel</Button>
            <Button variant="destructive" disabled={deleteBlog.isPending} onClick={handleDelete}>
              {deleteBlog.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
