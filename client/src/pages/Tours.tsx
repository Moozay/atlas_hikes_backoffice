import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { useTours, useCreateTour, useDeleteTour, useUpdateTour } from "@/hooks/use-tours";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertTourSchema, type Tour, type CreateTourRequest } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Search, MoreHorizontal, Trash2, Edit, Loader2, X, SlidersHorizontal, Star, ChevronDown, Upload, FileJson, CheckCircle2, AlertCircle, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { ImageUploader } from "@/components/ImageUploader";
import { CreateTourDialog } from "@/components/CreateTourDialog";

// ─── Edit Tour Schema ────────────────────────────────────────────────────────

// Itinerary is managed with local useState (not react-hook-form) for reliability
type ItineraryItem = {
  day: string;
  title: string;
  description: string;
  duration: string;
  elevation: string;
  accommodation: string;
  meals: string;
};

const editTourSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  region: z.string().min(1, "Region is required"),
  category: z.string().optional().nullable(),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0),
  durationDays: z.coerce.number().int().min(1),
  groupSize: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? null : Number(v)),
    z.number().nullable().optional()
  ),
  difficulty: z.enum(["easy", "moderate", "difficult", "extreme"]),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean().default(false),
  images: z.array(z.string()).default([]),
  highlights: z.array(z.string()).default([]),
  included: z.array(z.string()).default([]),
  excluded: z.array(z.string()).default([]),
  whatToBring: z.array(z.string()).default([]),
  bestTime: z.string().optional().nullable(),
  physicalRequirements: z.string().optional().nullable(),
  culturalNotes: z.string().optional().nullable(),
  routeGeoJson: z.string().optional().nullable(),
});

type EditTourValues = z.infer<typeof editTourSchema>;

// ─── Tours Page ──────────────────────────────────────────────────────────────

type TourFilters = {
  search: string;
  status: string;
  difficulty: string;
  featured: boolean;
  duration: string;
};

const defaultFilters: TourFilters = { search: "", status: "", difficulty: "", featured: false, duration: "" };

export default function Tours() {
  const [, navigate] = useLocation();
  const [filters, setFilters] = useState<TourFilters>(defaultFilters);
  const { data: tours, isLoading } = useTours({
    search: filters.search || undefined,
    status: filters.status || undefined,
    difficulty: filters.difficulty || undefined,
    featured: filters.featured || undefined,
  });
  const deleteTour = useDeleteTour();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [tourToDelete, setTourToDelete] = useState<Tour | null>(null);

  const filteredTours = filters.duration
    ? tours?.filter((t) => {
        const d = t.durationDays;
        if (filters.duration === "1")    return d === 1;
        if (filters.duration === "2-3")  return d >= 2 && d <= 3;
        if (filters.duration === "4-5")  return d >= 4 && d <= 5;
        if (filters.duration === "6-7")  return d >= 6 && d <= 7;
        if (filters.duration === "8+")   return d >= 8;
        return true;
      })
    : tours;

  const activeFilterCount = [filters.status, filters.difficulty, filters.featured, filters.duration].filter(Boolean).length;

  const setFilter = <K extends keyof TourFilters>(key: K, value: TourFilters[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const clearFilters = () => setFilters(defaultFilters);

  const confirmDelete = async () => {
    if (!tourToDelete) return;
    await deleteTour.mutateAsync(tourToDelete.id);
    toast({ title: "Tour deleted", description: "The tour has been permanently removed." });
    setTourToDelete(null);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Tours</h1>
          <p className="text-muted-foreground mt-1">Manage your tour catalog and availability.</p>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" /> Create Tour
        </Button>
        <CreateTourDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-card rounded-xl border border-border/50">
        <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0" />

        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tours..."
            className="pl-9 bg-background"
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
          />
        </div>

        {/* Status */}
        <Select value={filters.status || "all"} onValueChange={(v) => setFilter("status", v === "all" ? "" : v)}>
          <SelectTrigger className="w-36 bg-background">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        {/* Difficulty */}
        <Select value={filters.difficulty || "all"} onValueChange={(v) => setFilter("difficulty", v === "all" ? "" : v)}>
          <SelectTrigger className="w-36 bg-background">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="difficult">Difficult</SelectItem>
            <SelectItem value="extreme">Extreme</SelectItem>
          </SelectContent>
        </Select>

        {/* Duration */}
        <Select value={filters.duration || "all"} onValueChange={(v) => setFilter("duration", v === "all" ? "" : v)}>
          <SelectTrigger className="w-36 bg-background">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All durations</SelectItem>
            <SelectItem value="1">Day trip</SelectItem>
            <SelectItem value="2-3">2–3 days</SelectItem>
            <SelectItem value="4-5">4–5 days</SelectItem>
            <SelectItem value="6-7">6–7 days</SelectItem>
            <SelectItem value="8+">8+ days</SelectItem>
          </SelectContent>
        </Select>

        {/* Featured toggle */}
        <button
          type="button"
          onClick={() => setFilter("featured", !filters.featured)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
            filters.featured
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${filters.featured ? "fill-current" : ""}`} />
          Featured
        </button>

        {/* Active count + clear */}
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
          >
            <X className="w-3.5 h-3.5" />
            Clear ({activeFilterCount})
          </button>
        )}

        {/* Result count */}
        {!isLoading && (
          <span className="text-sm text-muted-foreground ml-auto">
            {filteredTours?.length ?? 0} tour{filteredTours?.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours?.map((tour) => (
            <div key={tour.id} className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="h-48 bg-muted relative overflow-hidden">
                <img
                  src={tour.images?.[0] || "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=60"}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={tour.status === "published" ? "default" : "secondary"} className="shadow-sm">
                    {tour.status}
                  </Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display font-bold text-lg leading-tight">{tour.title}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="-mr-2 -mt-2 h-8 w-8 text-muted-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/tours/${tour.id}/preview`)}>
                        <Eye className="w-4 h-4 mr-2" /> Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditingTour(tour)}>
                        <Edit className="w-4 h-4 mr-2" /> Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => setTourToDelete(tour)}>
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">{tour.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-medium uppercase">Price</span>
                    <span className="font-bold text-primary">€{tour.price.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground font-medium uppercase">Duration</span>
                    <span className="font-medium text-foreground">{tour.durationDays} Days</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground font-medium uppercase">Difficulty</span>
                    <Badge variant="outline" className={
                      tour.difficulty === "easy" ? "border-green-500 text-green-600" :
                      tour.difficulty === "moderate" ? "border-yellow-500 text-yellow-600" :
                      tour.difficulty === "difficult" ? "border-orange-500 text-orange-600" :
                      "border-red-500 text-red-600"
                    }>
                      {tour.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <EditTourSheet
        key={editingTour?.id ?? 0}
        tour={editingTour}
        open={!!editingTour}
        onOpenChange={(open) => { if (!open) setEditingTour(null); }}
      />

      <Sheet open={!!tourToDelete} onOpenChange={(open) => { if (!open) setTourToDelete(null); }}>
        <SheetContent side="right" className="flex flex-col gap-6">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" /> Delete Tour
            </SheetTitle>
            <SheetDescription>
              This action is permanent and cannot be undone. Any bookings linked to this tour will lose their tour reference.
            </SheetDescription>
          </SheetHeader>
          {tourToDelete && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-3 text-sm">
              <div className="font-semibold text-base text-foreground">{tourToDelete.title}</div>
              <div className="flex flex-col gap-1 text-muted-foreground">
                <span>Price: <span className="text-foreground font-medium">€{tourToDelete.price.toLocaleString()}</span></span>
                <span>Duration: <span className="text-foreground font-medium">{tourToDelete.durationDays} days</span></span>
                <span>Status: <span className="text-foreground font-medium capitalize">{tourToDelete.status}</span></span>
              </div>
            </div>
          )}
          <SheetFooter className="flex-col gap-2 sm:flex-col">
            <Button variant="destructive" onClick={confirmDelete} disabled={deleteTour.isPending}>
              {deleteTour.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Delete Tour
            </Button>
            <Button variant="outline" onClick={() => setTourToDelete(null)}>Cancel</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Layout>
  );
}

// ─── String List Editor ──────────────────────────────────────────────────────

function StringListEditor({
  value,
  onChange,
  placeholder = "Add item...",
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [inputVal, setInputVal] = useState("");

  const add = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setInputVal("");
  };

  const remove = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-2 mt-1">
      {value.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 group">
          <span className="flex-1 text-sm bg-muted rounded px-3 py-1.5">{item}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => remove(idx)}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      ))}
      <div className="flex gap-2">
        <Input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
        />
        <Button type="button" variant="outline" size="icon" onClick={add}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Edit Tour Sheet ─────────────────────────────────────────────────────────

function EditTourSheet({
  tour,
  open,
  onOpenChange,
}: {
  tour: Tour | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const updateTour = useUpdateTour();

  // Itinerary managed outside react-hook-form to avoid useFieldArray init issues
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(
    ((tour?.itinerary as any[]) ?? []).map((item: any) => ({
      day: item?.day ?? "",
      title: item?.title ?? "",
      description: item?.description ?? "",
      duration: item?.duration ?? "",
      elevation: item?.elevation ?? "",
      accommodation: item?.accommodation ?? "",
      meals: item?.meals ?? "",
    }))
  );
  const [openDays, setOpenDays] = useState<string[]>([]);

  const updateDay = (idx: number, field: keyof ItineraryItem, value: string) =>
    setItinerary((prev) => prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));

  const addDay = () => {
    const newItem: ItineraryItem = {
      day: `Day ${itinerary.length + 1}`,
      title: "",
      description: "",
      duration: "",
      elevation: "",
      accommodation: "",
      meals: "",
    };
    setItinerary((prev) => [...prev, newItem]);
    setOpenDays((prev) => [...prev, `day-${itinerary.length}`]);
  };

  const removeDay = (idx: number) =>
    setItinerary((prev) => prev.filter((_, i) => i !== idx));

  const form = useForm<EditTourValues>({
    resolver: zodResolver(editTourSchema),
    defaultValues: tour
      ? {
          title: tour.title,
          slug: tour.slug,
          region: tour.region,
          category: tour.category ?? "",
          description: tour.description,
          price: tour.price,
          durationDays: tour.durationDays,
          groupSize: tour.groupSize ?? null,
          difficulty: tour.difficulty,
          status: tour.status,
          featured: tour.featured ?? false,
          images: (tour.images ?? []) as string[],
          highlights: (tour.highlights ?? []) as string[],
          included: (tour.included ?? []) as string[],
          excluded: (tour.excluded ?? []) as string[],
          whatToBring: (tour.whatToBring ?? []) as string[],
          bestTime: tour.bestTime ?? "",
          physicalRequirements: tour.physicalRequirements ?? "",
          culturalNotes: tour.culturalNotes ?? "",
          routeGeoJson: tour.routeGeoJson ?? "",
        }
      : {},
  });

  const onSubmit = (data: EditTourValues) => {
    if (!tour) return;
    const images = data.images;

    updateTour.mutate(
      {
        id: tour.id,
        title: data.title,
        slug: data.slug,
        region: data.region,
        category: data.category || null,
        description: data.description,
        price: data.price,
        durationDays: data.durationDays,
        groupSize: data.groupSize ?? null,
        difficulty: data.difficulty,
        status: data.status,
        featured: data.featured,
        images,
        highlights: data.highlights,
        itinerary,
        included: data.included,
        excluded: data.excluded,
        whatToBring: data.whatToBring,
        bestTime: data.bestTime || null,
        physicalRequirements: data.physicalRequirements || null,
        culturalNotes: data.culturalNotes || null,
        routeGeoJson: data.routeGeoJson || null,
      },
      {
        onSuccess: () => {
          toast({ title: "Tour updated", description: "Changes saved successfully." });
          onOpenChange(false);
        },
        onError: (err) => {
          toast({ title: "Error", description: err.message, variant: "destructive" });
        },
      }
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-2xl sm:max-w-2xl p-0 flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <SheetTitle>Edit Tour: {tour?.title}</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
            <ScrollArea className="flex-1">
              <div className="px-6 py-6">
                <Tabs defaultValue="basic">
                  <TabsList className="w-full mb-6 grid grid-cols-4">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                    <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>

                  {/* ── Basic Info ── */}
                  <TabsContent value="basic" className="space-y-4 mt-0">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="slug" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="region" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Region</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="category" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl><Input {...field} value={field.value ?? ""} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="description" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl><Textarea rows={4} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <div className="grid grid-cols-3 gap-4">
                      <FormField control={form.control} name="price" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (MAD)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="durationDays" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (days)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="groupSize" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Group Size</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="difficulty" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="moderate">Moderate</SelectItem>
                              <SelectItem value="difficult">Difficult</SelectItem>
                              <SelectItem value="extreme">Extreme</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="status" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="featured" render={({ field }) => (
                      <FormItem className="flex items-center gap-3 rounded-lg border p-3">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="!mt-0 cursor-pointer">Featured Tour</FormLabel>
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="images" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Images</FormLabel>
                        <FormControl>
                          <ImageUploader images={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="highlights" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Highlights</FormLabel>
                        <StringListEditor value={field.value} onChange={field.onChange} placeholder="Add highlight..." />
                        <FormMessage />
                      </FormItem>
                    )} />
                  </TabsContent>

                  {/* ── Itinerary ── */}
                  <TabsContent value="itinerary" className="space-y-4 mt-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{itinerary.length} day(s)</p>
                      <Button type="button" variant="outline" size="sm" onClick={addDay}>
                        <Plus className="w-4 h-4 mr-1" /> Add Day
                      </Button>
                    </div>

                    {itinerary.length === 0 ? (
                      <p className="text-center text-muted-foreground py-12">
                        No itinerary days yet. Click "Add Day" to start building the itinerary.
                      </p>
                    ) : (
                      <Accordion type="multiple" value={openDays} onValueChange={setOpenDays} className="space-y-2">
                        {itinerary.map((item, idx) => (
                          <AccordionItem key={idx} value={`day-${idx}`} className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline py-3">
                              <span className="font-medium text-left">
                                {item.day || `Day ${idx + 1}`}
                                {item.title ? `: ${item.title}` : ""}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-3 pb-4">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-sm font-medium">Day Label</label>
                                  <Input value={item.day} onChange={(e) => updateDay(idx, "day", e.target.value)} placeholder="Day 1" />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-sm font-medium">Title</label>
                                  <Input value={item.title} onChange={(e) => updateDay(idx, "title", e.target.value)} placeholder="Stage title" />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <label className="text-sm font-medium">Description</label>
                                <Textarea rows={2} value={item.description} onChange={(e) => updateDay(idx, "description", e.target.value)} />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-sm font-medium">Duration</label>
                                  <Input value={item.duration} onChange={(e) => updateDay(idx, "duration", e.target.value)} placeholder="6-7 hours" />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-sm font-medium">Elevation</label>
                                  <Input value={item.elevation} onChange={(e) => updateDay(idx, "elevation", e.target.value)} placeholder="+800m / 2,400m" />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-sm font-medium">Accommodation</label>
                                  <Input value={item.accommodation} onChange={(e) => updateDay(idx, "accommodation", e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-sm font-medium">Meals</label>
                                  <Input value={item.meals} onChange={(e) => updateDay(idx, "meals", e.target.value)} placeholder="Breakfast, Dinner" />
                                </div>
                              </div>
                              <Button type="button" variant="destructive" size="sm" onClick={() => removeDay(idx)}>
                                <Trash2 className="w-4 h-4 mr-1" /> Remove Day
                              </Button>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </TabsContent>

                  {/* ── Inclusions ── */}
                  <TabsContent value="inclusions" className="space-y-6 mt-0">
                    <FormField control={form.control} name="included" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Included</FormLabel>
                        <StringListEditor value={field.value} onChange={field.onChange} placeholder="Add included item..." />
                      </FormItem>
                    )} />

                    <Separator />

                    <FormField control={form.control} name="excluded" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Excluded</FormLabel>
                        <StringListEditor value={field.value} onChange={field.onChange} placeholder="Add excluded item..." />
                      </FormItem>
                    )} />

                    <Separator />

                    <FormField control={form.control} name="whatToBring" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">What to Bring</FormLabel>
                        <StringListEditor value={field.value} onChange={field.onChange} placeholder="Add item to bring..." />
                      </FormItem>
                    )} />
                  </TabsContent>

                  {/* ── Details ── */}
                  <TabsContent value="details" className="space-y-4 mt-0">
                    <FormField control={form.control} name="bestTime" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Best Time to Visit</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} placeholder="e.g. March–May, September–November" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="physicalRequirements" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Physical Requirements</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} value={field.value ?? ""} placeholder="Fitness level, experience needed..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="culturalNotes" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cultural Notes</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} value={field.value ?? ""} placeholder="Cultural tips and etiquette..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="routeGeoJson" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Route GeoJSON</FormLabel>
                        <GeoJsonDropZone
                          value={field.value ?? ""}
                          onChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )} />
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>

            <div className="px-6 py-4 border-t shrink-0 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateTour.isPending}>
                {updateTour.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

// ─── GeoJSON Drop Zone ───────────────────────────────────────────────────────

function GeoJsonDropZone({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsed = (() => {
    if (!value) return null;
    try {
      const json = JSON.parse(value);
      const featureCount =
        json.type === "FeatureCollection"
          ? json.features?.length ?? 0
          : json.type === "Feature"
          ? 1
          : null;
      return { type: json.type as string, featureCount };
    } catch {
      return null;
    }
  })();

  const processFile = (file: File) => {
    setError(null);
    if (!file.name.endsWith(".geojson") && !file.name.endsWith(".json")) {
      setError("Only .geojson or .json files are accepted.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      try {
        JSON.parse(text); // validate it's valid JSON
        onChange(text);
        setError(null);
      } catch {
        setError("Invalid JSON — could not parse the file.");
      }
    };
    reader.readAsText(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-2 mt-1">
      {/* Drop zone */}
      <label
        className={`flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/40"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        <input
          type="file"
          accept=".geojson,.json"
          className="sr-only"
          onChange={onFileChange}
        />
        <Upload className={`w-6 h-6 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Drop a .geojson file here
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">or click to browse</p>
        </div>
      </label>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Current file status */}
      {!error && parsed && (
        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm">
          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
          <FileJson className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="font-medium">{parsed.type}</span>
          {parsed.featureCount !== null && (
            <span className="text-muted-foreground">· {parsed.featureCount} feature{parsed.featureCount !== 1 ? "s" : ""}</span>
          )}
          <button
            type="button"
            className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
            onClick={() => { onChange(""); setError(null); }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {!error && !parsed && !value && (
        <p className="text-xs text-muted-foreground px-1">No route file loaded.</p>
      )}

      {!error && !parsed && value && (
        <div className="flex items-center gap-2 text-amber-600 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Existing value is not valid JSON — drop a new file to replace it.
        </div>
      )}
    </div>
  );
}

