"use client";

import { useState } from "react";
import { SectionTitle } from "./SectionTitle";
import { CategoryFilter } from "./CategoryFilter";
import { TourismCard, TourismCardSkeleton } from "./TourismCard";
import { EmptyState } from "./EmptyState";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock data - will be replaced with real data from hooks
const mockCategories = [
  { id: "all", name: "Semua", slug: "all", icon: "🌟" },
  { id: "1", name: "Wisata Alam", slug: "wisata-alam", icon: "🏞️" },
  { id: "2", name: "Wisata Budaya", slug: "wisata-budaya", icon: "🏛️" },
  { id: "3", name: "Wisata Kuliner", slug: "wisata-kuliner", icon: "🍜" },
];

const mockDestinations = [
  {
    id: "1",
    name: "Air Terjun Indah",
    slug: "air-terjun-indah",
    short_description: "Air terjun yang indah dengan pemandangan alam yang menakjubkan",
    thumbnail_url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
    category: { name: "Wisata Alam" },
    location: "Desa Wisata, Kec. Indah",
    view_count: 1234,
  },
  {
    id: "2",
    name: "Candi Bersejarah",
    slug: "candi-bersejarah",
    short_description: "Candi peninggalan sejarah dengan arsitektur yang memukau",
    thumbnail_url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
    category: { name: "Wisata Budaya" },
    location: "Desa Wisata, Kec. Budaya",
    view_count: 856,
  },
  {
    id: "3",
    name: "Warung Tradisional",
    slug: "warung-tradisional",
    short_description: "Nikmati kuliner khas desa dengan cita rasa autentik",
    thumbnail_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    category: { name: "Wisata Kuliner" },
    location: "Desa Wisata, Kec. Kuliner",
    view_count: 2341,
  },
];

export function TourismSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Filter destinations based on active category
  const filteredDestinations = mockDestinations; // Will be filtered based on activeCategory

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#B7E0E8]/10">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <SectionTitle
          title="Destinasi Wisata"
          subtitle="Jelajahi keindahan alam dan budaya desa kami"
          className="mb-12"
        />

        {/* Category Filter */}
        <CategoryFilter
          categories={mockCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          className="mb-12"
        />

        {/* Tourism Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <TourismCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredDestinations.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredDestinations.map((destination, index) => (
                <TourismCard key={destination.id} {...destination} index={index} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Button asChild size="lg" variant="outline" className="group">
                <Link href="/wisata">
                  Lihat Semua Wisata
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <EmptyState
            icon={MapPin}
            title="Belum Ada Destinasi"
            description="Belum ada destinasi wisata untuk kategori ini. Silakan pilih kategori lain."
          />
        )}
      </div>
    </section>
  );
}
