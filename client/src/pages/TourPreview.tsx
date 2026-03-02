import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Star, MapPin, Clock, Users, Mountain, Check, X, ChevronLeft, ChevronRight,
  Info, User, Utensils, Bed, Car, Footprints, Map, Shield, BookOpen, DollarSign,
  Landmark, Trees, Droplets, MapPinCheckInside, MessageCircleQuestion, MapPinned,
  Eye, AlertTriangle,
} from "lucide-react";
import { useParams, useLocation } from "wouter";
import { useTour } from "@/hooks/use-tours";
import { Layout } from "@/components/Layout";
import TourMap from "@/components/TourMap";
import type { Tour } from "@shared/schema";

// ─── Icon Helpers ─────────────────────────────────────────────────────────────

function getIconForItem(text: string, type: "highlight" | "included" | "excluded") {
  const lowerText = text.toLowerCase();
  if (type === "highlight") {
    if (lowerText.includes("shrine") || lowerText.includes("village")) return Landmark;
    if (lowerText.includes("pass") || lowerText.includes("ridge")) return Mountain;
    if (lowerText.includes("lake") || lowerText.includes("water")) return Droplets;
    if (lowerText.includes("valley") || lowerText.includes("grove")) return Trees;
    return MapPinCheckInside;
  } else if (type === "included") {
    if (lowerText.includes("guide") || lowerText.includes("porter")) return User;
    if (lowerText.includes("meal") || lowerText.includes("food") || lowerText.includes("dinner")) return Utensils;
    if (lowerText.includes("accommodation") || lowerText.includes("refuge") || lowerText.includes("gîte")) return Bed;
    if (lowerText.includes("transport") || lowerText.includes("transfer")) return Car;
    if (lowerText.includes("equipment") || lowerText.includes("kit")) return Shield;
    if (lowerText.includes("insurance") || lowerText.includes("first aid")) return Shield;
    return Check;
  } else {
    if (lowerText.includes("accommodation") || lowerText.includes("hotel")) return Bed;
    if (lowerText.includes("equipment") || lowerText.includes("gear")) return Footprints;
    if (lowerText.includes("insurance")) return Shield;
    if (lowerText.includes("tips") || lowerText.includes("expenses")) return DollarSign;
    return X;
  }
}

function getAverageRating(reviews: Tour["reviews"]): number {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.08 } },
};

// ─── Thumbnail Strip ──────────────────────────────────────────────────────────

const FULL_WIDTH_PX = 120;
const COLLAPSED_WIDTH_PX = 35;
const GAP_PX = 2;
const MARGIN_PX = 2;

function Thumbnails({
  images,
  title,
  index,
  setIndex,
}: {
  images: string[];
  title: string;
  index: number;
  setIndex: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let scroll = 0;
    for (let i = 0; i < index; i++) scroll += COLLAPSED_WIDTH_PX + GAP_PX;
    scroll += MARGIN_PX;
    const center = ref.current.offsetWidth / 2 - FULL_WIDTH_PX / 2;
    scroll -= center;
    ref.current.scrollTo({ left: scroll, behavior: "smooth" });
  }, [index]);

  return (
    <div
      ref={ref}
      className="overflow-x-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="flex gap-0.5 h-20 pb-2" style={{ width: "fit-content" }}>
        {images.map((src, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? "active" : "inactive"}
            variants={{
              active: { width: FULL_WIDTH_PX, marginLeft: MARGIN_PX, marginRight: MARGIN_PX },
              inactive: { width: COLLAPSED_WIDTH_PX, marginLeft: 0, marginRight: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative shrink-0 h-full overflow-hidden rounded"
          >
            <img
              src={src}
              alt={`${title} thumbnail ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
              draggable={false}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── Image Carousel ───────────────────────────────────────────────────────────

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (isDragging || isHovered) return;
    const id = setInterval(
      () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1)),
      4000
    );
    return () => clearInterval(id);
  }, [isDragging, isHovered, images.length]);

  useEffect(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    if (w) animate(x, -index * w, { type: "spring", stiffness: 300, damping: 30 });
  }, [index, x]);

  useEffect(() => {
    const onResize = () => {
      if (!containerRef.current) return;
      x.set(-index * containerRef.current.offsetWidth);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, x]);

  if (!images.length) {
    return (
      <div className="w-full h-[220px] sm:h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <Mountain className="h-16 w-16 text-gray-300" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <div
        className="relative overflow-hidden rounded-lg bg-gray-100"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex"
          drag="x"
          dragElastic={0.2}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);
            const w = containerRef.current?.offsetWidth || 1;
            let next = index;
            if (Math.abs(info.velocity.x) > 500) {
              next = info.velocity.x > 0 ? index - 1 : index + 1;
            } else if (Math.abs(info.offset.x) > w * 0.3) {
              next = info.offset.x > 0 ? index - 1 : index + 1;
            }
            if (next < 0) next = images.length - 1;
            else if (next >= images.length) next = 0;
            setIndex(next);
          }}
          style={{ x, touchAction: "pan-y" }}
        >
          {images.map((src, i) => (
            <div key={i} className="shrink-0 w-full h-[220px] sm:h-[380px] md:h-[460px] relative">
              <img
                src={src}
                alt={`${title} - Image ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>

        {/* Prev */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => setIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg opacity-70 hover:opacity-100 z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        {/* Next */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => setIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg opacity-70 hover:opacity-100 z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {index + 1} / {images.length}
        </div>
      </div>

      <Thumbnails images={images} title={title} index={index} setIndex={setIndex} />
    </div>
  );
}

// ─── Section Tab Nav ──────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "overview", label: "Overview", icon: Info },
  { id: "itinerary", label: "Itinerary", icon: Map },
  { id: "included", label: "Included / Excl.", icon: Check },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "faqs", label: "FAQs", icon: MessageCircleQuestion },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

// ─── Main Preview Page ────────────────────────────────────────────────────────

export default function TourPreview() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const tourId = Number(params.id);

  const { data: tour, isLoading, isError } = useTour(tourId);

  const [activeSection, setActiveSection] = useState<SectionId>("overview");

  const overviewRef = useRef<HTMLDivElement>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const includedRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<SectionId, React.RefObject<HTMLDivElement>> = {
    overview: overviewRef,
    itinerary: itineraryRef,
    included: includedRef,
    reviews: reviewsRef,
    faqs: faqsRef,
  };

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY + 180;
      for (const { id } of [...SECTIONS].reverse()) {
        const el = sectionRefs[id].current;
        if (el && offset >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: SectionId) => {
    const el = sectionRefs[id].current;
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 140, behavior: "smooth" });
  }, []);

  // ── Loading state ──
  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-[460px] w-full rounded-lg" />
          <Skeleton className="h-6 w-72" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Layout>
    );
  }

  // ── Error / not found ──
  if (isError || !tour) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <Mountain className="h-20 w-20 text-muted-foreground" />
          <h1 className="text-3xl font-bold">Tour Not Found</h1>
          <p className="text-muted-foreground max-w-sm">
            This tour doesn't exist or has been removed from the database.
          </p>
          <Button onClick={() => navigate("/tours")} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Tours
          </Button>
        </div>
      </Layout>
    );
  }

  const images = tour.images ?? [];
  const highlights = tour.highlights ?? [];
  const itinerary = tour.itinerary ?? [];
  const included = tour.included ?? [];
  const excluded = tour.excluded ?? [];
  const whatToBring = tour.whatToBring ?? [];
  const reviews = tour.reviews ?? [];
  const rating = getAverageRating(reviews);
  const priceEur = (tour.price / 100).toFixed(0);

  return (
    <Layout>
      {/* ── Preview Banner ── */}
      <div className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 mb-4">
        <Eye className="h-4 w-4 flex-shrink-0" />
        <span className="font-semibold text-sm">Preview Mode</span>
        <span className="text-xs text-amber-700 hidden sm:inline">— This is how the tour looks on the storefront.</span>
        <div className="ml-auto flex items-center gap-2">
          {tour.status !== "published" && (
            <Badge variant="outline" className="border-amber-400 text-amber-700 text-xs gap-1">
              <AlertTriangle className="h-3 w-3" />
              {tour.status}
            </Badge>
          )}
          <Button size="sm" variant="outline" className="h-8 text-xs border-amber-300 text-amber-800 hover:bg-amber-100" onClick={() => navigate("/tours")}>
            <ChevronLeft className="mr-1 h-3 w-3" />
            <span className="hidden sm:inline">Back to Tours</span>
          </Button>
        </div>
      </div>

      {/* ── Content — matches storefront layout ── */}
      <motion.div className="space-y-8 lg:space-y-12" initial="initial" animate="animate" variants={fadeInUp}>

        {/* Image Carousel */}
        <motion.section variants={fadeInUp} transition={{ delay: 0.05 }}>
          <ImageCarousel images={images} title={tour.title} />
        </motion.section>

        {/* Title & Meta */}
        <motion.section className="space-y-6" variants={fadeInUp} transition={{ delay: 0.1 }}>
          <div className="flex flex-wrap items-center gap-4">
            <Badge className={`px-4 h-10 rounded-full text-sm font-semibold capitalize text-white shadow-md ${
              tour.difficulty === "easy"      ? "bg-gradient-to-r from-green-400 to-green-600" :
              tour.difficulty === "moderate"  ? "bg-gradient-to-r from-yellow-400 to-amber-500" :
              tour.difficulty === "difficult" ? "bg-gradient-to-r from-orange-400 to-orange-600" :
                                               "bg-gradient-to-r from-red-500 to-red-700"
            }`}>
              {tour.difficulty} Adventure
            </Badge>
            {rating > 0 && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 h-10 rounded-full shadow-lg">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold text-sm">{rating}</span>
                <span className="text-xs opacity-80">({reviews.length})</span>
              </div>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
            {tour.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 md:gap-8 text-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl"><MapPin className="h-4 w-4 text-primary" /></div>
              <span className="font-semibold text-sm">{tour.region}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl"><Clock className="h-4 w-4 text-blue-600" /></div>
              <span className="font-semibold text-sm">{tour.durationDays} {tour.durationDays === 1 ? "Day" : "Days"}</span>
            </div>
            {tour.groupSize && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-xl"><Users className="h-4 w-4 text-purple-600" /></div>
                <span className="font-semibold text-sm">Max {tour.groupSize} Guests</span>
              </div>
            )}
          </div>
        </motion.section>

        {/* Section Tab Nav — sticky below mobile header */}
        <motion.div
          className="sticky top-14 lg:top-0 z-20 w-full bg-background/95 backdrop-blur-md border-b border-border py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          variants={fadeInUp}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center gap-2 max-w-7xl mx-auto">
            <div className="flex gap-1 overflow-x-auto no-scrollbar flex-1 min-w-0">
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                    activeSection === id
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="hidden xs:inline sm:inline">{label}</span>
                </button>
              ))}
            </div>
            <div className="w-px h-5 bg-border shrink-0" />
            <Button size="sm" variant="outline" className="h-8 text-xs shrink-0 px-2 sm:px-3" onClick={() => navigate("/tours")}>
              <ChevronLeft className="h-3 w-3 sm:mr-1" />
              <span className="hidden sm:inline">Back to Tours</span>
            </Button>
          </div>
        </motion.div>

        {/* ── Sections ── */}
        <motion.div className="space-y-12 lg:space-y-16" variants={staggerChildren}>

          {/* Overview */}
          <motion.section ref={overviewRef} id="overview" className="space-y-12" variants={fadeInUp}>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Discover {tour.title}</h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">{tour.description}</p>
              {tour.groupSize && (
                <p className="text-gray-500 text-sm mt-2 italic">
                  Join fellow adventurers on this {tour.difficulty} journey — limited to {tour.groupSize} guests for an intimate experience.
                </p>
              )}
            </div>

            {highlights.length > 0 && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <MapPinned className="h-8 w-8 text-primary" />Tour Highlights
                </h3>
                <motion.div className="grid grid-cols-2 lg:grid-cols-3 gap-4" variants={staggerChildren}>
                  {highlights.map((highlight, i) => {
                    const Icon = getIconForItem(highlight, "highlight");
                    return (
                      <motion.div key={i} variants={fadeInUp}
                        className="group flex items-center gap-3 p-3 bg-gradient-to-br from-primary/5 to-primary/5 rounded-2xl border border-primary/10 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                      >
                        <div className="p-2.5 bg-primary rounded-xl flex-shrink-0 group-hover:bg-primary transition-colors">
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-800 font-semibold text-xs md:text-sm leading-tight group-hover:text-primary">{highlight}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            )}

            {whatToBring.length > 0 && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Footprints className="h-8 w-8 text-blue-600" />What to Pack
                </h3>
                <motion.ul className="space-y-2 max-w-2xl" variants={staggerChildren}>
                  {whatToBring.map((item, i) => (
                    <motion.li key={i} variants={fadeInUp} className="flex items-start gap-3 text-gray-700 text-sm">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2.5 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            )}

            {tour.physicalRequirements && (
              <div><h3 className="text-lg font-bold text-gray-900 mb-2">Physical Requirements</h3>
              <p className="text-gray-700 text-sm">{tour.physicalRequirements}</p></div>
            )}
            {tour.culturalNotes && (
              <div><h3 className="text-lg font-bold text-gray-900 mb-2">Cultural Notes</h3>
              <p className="text-gray-700 text-sm">{tour.culturalNotes}</p></div>
            )}
            {tour.bestTime && (
              <div><h3 className="text-lg font-bold text-gray-900 mb-2">Best Time to Go</h3>
              <p className="text-gray-700 text-sm">{tour.bestTime}</p></div>
            )}
          </motion.section>

          {/* Itinerary */}
          {itinerary.length > 0 && (
            <motion.section ref={itineraryRef} id="itinerary" className="space-y-4" variants={fadeInUp}>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-purple-600" />Detailed Itinerary
              </h2>
              <Accordion type="multiple" className="space-y-3">
                {itinerary.map((day, i) => (
                  <AccordionItem key={i} value={`day-${i}`} className="border border-border rounded-xl px-4 overflow-hidden">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-sm">
                            {tour.durationDays === 1 ? (day.duration?.split(" ")[0] ?? i + 1) : (typeof day.day === "string" ? day.day.replace("Day ", "") : day.day ?? i + 1)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900">{day.title || `Day ${i + 1}`}</div>
                          {day.duration && <div className="text-xs text-muted-foreground mt-0.5">{day.duration}</div>}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="space-y-3 ml-4 sm:ml-14">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {day.description || "Explore stunning landscapes on this leg of the journey."}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                          {day.duration && <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-blue-500" />{day.duration}</span>}
                          {day.elevation && <span className="flex items-center gap-1.5"><Mountain className="h-3.5 w-3.5 text-orange-500" />{day.elevation}</span>}
                          {day.accommodation && <span className="flex items-center gap-1.5"><Bed className="h-3.5 w-3.5 text-purple-500" />{day.accommodation}</span>}
                          {day.meals && <span className="flex items-center gap-1.5"><Utensils className="h-3.5 w-3.5 text-green-500" />{day.meals}</span>}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {tour.routeGeoJson && (() => {
                let parsedGeoJson: any = null;
                try { parsedGeoJson = JSON.parse(tour.routeGeoJson); } catch { /* skip */ }
                if (!parsedGeoJson) return null;
                return (
                  <div className="space-y-4 pt-2">
                    <div className="text-center">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">Visualize Your Journey</h4>
                      <p className="text-gray-500 text-sm mb-4">Explore the route on an interactive 3D map</p>
                    </div>
                    <div className="h-[260px] sm:h-[400px] md:h-[500px]">
                      <TourMap geojson={parsedGeoJson} height="100%" className="rounded-2xl overflow-hidden shadow-lg border border-gray-200" />
                    </div>
                    <p className="text-xs text-gray-400 text-center italic">🗺️ Interactive 3D terrain map • Drag to rotate • Scroll to zoom</p>
                  </div>
                );
              })()}
            </motion.section>
          )}

          {/* Included / Excluded */}
          {(included.length > 0 || excluded.length > 0) && (
            <motion.section ref={includedRef} id="included" className="space-y-8" variants={fadeInUp}>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Check className="h-8 w-8 text-primary" />What's Included &amp; What's Not
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {included.length > 0 && (
                  <Card className="border-0 bg-gradient-to-br from-primary/5 to-green-50 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold flex items-center gap-3">
                        <Check className="h-6 w-6 text-green-600" />What's Included
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                      {included.map((item, i) => {
                        const Icon = getIconForItem(item, "included");
                        return (
                          <div key={i} className="flex items-center gap-3 text-gray-800 text-sm">
                            <Icon className="h-5 w-5 text-green-600 flex-shrink-0" />{item}
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                )}
                {excluded.length > 0 && (
                  <Card className="border-0 bg-gradient-to-br from-red-50 to-rose-50 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold flex items-center gap-3">
                        <X className="h-6 w-6 text-red-500" />What's Excluded
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                      {excluded.map((item, i) => {
                        const Icon = getIconForItem(item, "excluded");
                        return (
                          <div key={i} className="flex items-center gap-3 text-gray-800 text-sm">
                            <Icon className="h-5 w-5 text-red-500 flex-shrink-0" />{item}
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                )}
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                <p className="text-blue-800 font-semibold mb-2">Transparent Pricing</p>
                <p className="text-blue-700 text-sm">We focus on essentials so guests can immerse in the experience. Custom add-ons available upon request.</p>
              </div>
            </motion.section>
          )}

          {/* Reviews */}
          {reviews.length > 0 && (
            <motion.section ref={reviewsRef} id="reviews" className="space-y-5" variants={fadeInUp}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Star className="h-7 w-7 text-yellow-500" />What Adventurers Say
                </h2>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{rating}</div>
                  <div className="flex items-center gap-0.5 justify-center mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                {reviews.slice(0, 6).map((review) => (
                  <Card key={review.id} className="rounded-xl shadow-sm border border-border py-3">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10 flex-shrink-0">
                          <AvatarImage src={review.avatar} alt={review.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                            {review.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">"{review.comment}"</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}

          {/* FAQs */}
          <motion.section ref={faqsRef} id="faqs" className="space-y-6 bg-gray-50 rounded-xl p-4 sm:p-8" variants={fadeInUp}>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center flex items-center justify-center gap-3">
              <MessageCircleQuestion className="h-7 w-7 text-gray-600" />Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { q: "Is travel insurance required?", a: "Yes, comprehensive insurance covering trekking and evacuation is mandatory for safety." },
                { q: "What fitness level is needed?", a: `${tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1)} level – moderate fitness with some prior hiking experience recommended.` },
                { q: "Can I customize the itinerary?", a: `Absolutely! Contact us for private or tailored treks starting from €${Math.max(0, Number(priceEur) - 50)}.` },
                { q: "How do I prepare for altitude?", a: "We provide acclimatization tips. Stay hydrated and consult your doctor if needed." },
              ].map((faq, i) => (
                <div key={i} className="space-y-1.5">
                  <h4 className="font-semibold text-gray-900 text-sm">{faq.q}</h4>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.section>

        </motion.div>
      </motion.div>
    </Layout>
  );
}
