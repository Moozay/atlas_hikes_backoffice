import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateTour } from "@/hooks/use-tours";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Loader2, X, Trash2, Upload, FileJson, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ImageUploader } from "@/components/ImageUploader";

// ─── Schema (mirrors editTourSchema in Tours.tsx) ────────────────────────────

const createTourSchema = z.object({
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

type CreateTourValues = z.infer<typeof createTourSchema>;

type ItineraryItem = {
  day: string;
  title: string;
  description: string;
  duration: string;
  elevation: string;
  accommodation: string;
  meals: string;
};

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTourDialog({ open, onOpenChange }: Props) {
  const createTour = useCreateTour();

  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [openDays, setOpenDays] = useState<string[]>([]);

  const form = useForm<CreateTourValues>({
    resolver: zodResolver(createTourSchema),
    defaultValues: {
      title: "",
      slug: "",
      region: "",
      category: "",
      description: "",
      price: 0,
      durationDays: 1,
      groupSize: null,
      difficulty: "moderate",
      status: "draft",
      featured: false,
      images: [],
      highlights: [],
      included: [],
      excluded: [],
      whatToBring: [],
      bestTime: "",
      physicalRequirements: "",
      culturalNotes: "",
      routeGeoJson: "",
    },
  });

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

  const removeDay = (idx: number) => setItinerary((prev) => prev.filter((_, i) => i !== idx));

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
    setItinerary([]);
    setOpenDays([]);
  };

  const onSubmit = (data: CreateTourValues) => {
    createTour.mutate(
      {
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
        images: data.images,
        highlights: data.highlights,
        itinerary,
        included: data.included,
        excluded: data.excluded,
        whatToBring: data.whatToBring,
        bestTime: data.bestTime || null,
        physicalRequirements: data.physicalRequirements || null,
        culturalNotes: data.culturalNotes || null,
        routeGeoJson: data.routeGeoJson || null,
      } as any,
      {
        onSuccess: () => {
          toast({ title: "Tour Created", description: "New tour added successfully." });
          handleClose();
        },
        onError: (err) => {
          toast({ title: "Error", description: err.message, variant: "destructive" });
        },
      }
    );
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full max-w-2xl sm:max-w-2xl p-0 flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <SheetTitle>Create New Tour</SheetTitle>
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

                  {/* ── Basic ── */}
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
                                {item.day || `Day ${idx + 1}`}{item.title ? `: ${item.title}` : ""}
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
                        <GeoJsonDropZone value={field.value ?? ""} onChange={field.onChange} />
                        <FormMessage />
                      </FormItem>
                    )} />
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>

            <div className="px-6 py-4 border-t shrink-0 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={createTour.isPending}>
                {createTour.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Create Tour
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

// ─── String List Editor ───────────────────────────────────────────────────────

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

  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx));

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

// ─── GeoJSON Drop Zone ────────────────────────────────────────────────────────

function GeoJsonDropZone({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsed = (() => {
    if (!value) return null;
    try {
      const json = JSON.parse(value);
      const featureCount =
        json.type === "FeatureCollection" ? json.features?.length ?? 0 :
        json.type === "Feature" ? 1 : null;
      return { type: json.type as string, featureCount };
    } catch { return null; }
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
      try { JSON.parse(text); onChange(text); setError(null); }
      catch { setError("Invalid JSON — could not parse the file."); }
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
      <label
        className={`flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/40"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        <input type="file" accept=".geojson,.json" className="sr-only" onChange={onFileChange} />
        <Upload className={`w-6 h-6 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Drop a .geojson file here</p>
          <p className="text-xs text-muted-foreground mt-0.5">or click to browse</p>
        </div>
      </label>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />{error}
        </div>
      )}

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
