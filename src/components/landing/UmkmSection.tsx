"use client";

import { useState } from "react";
import { SectionTitle } from "./SectionTitle";
import { CategoryFilter } from "./CategoryFilter";
import { UmkmCard, UmkmCardSkeleton } from "./UmkmCard";
import { EmptyState } from "./EmptyState";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock data - will be replaced with real data from hooks
const mockCategories = [
  { id: "all", name: "Semua", slug: "all", icon: "🌟" },
  { id: "1", name: "Makanan", slug: "makanan", icon: "🍔" },
  { id: "2", name: "Minuman", slug: "minuman", icon: "🥤" },
  { id: "3", name: "Kerajinan", slug: "kerajinan", icon: "🎨" },
];

const mockProducts = [
  {
    id: "1",
    name: "Keripik Singkong Original",
    slug: "keripik-singkong-original",
    short_description: "Keripik singkong renyah dengan bumbu rahasia khas desa",
    thumbnail_url: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800",
    category: { name: "Makanan" },
    price: 15000,
    price_max: 25000,
    owner_name: "Ibu Siti",
    whatsapp_number: "6281234567890",
    view_count: 456,
  },
  {
    id: "2",
    name: "Jamu Tradisional",
    slug: "jamu-tradisional",
    short_description: "Jamu herbal alami untuk kesehatan dan stamina",
    thumbnail_url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800",
    category: { name: "Minuman" },
    price: 10000,
    owner_name: "Pak Budi",
    whatsapp_number: "6281234567891",
    view_count: 234,
  },
  {
    id: "3",
    name: "Tas Anyaman Bambu",
    slug: "tas-anyaman-bambu",
    short_description: "Tas anyaman bambu handmade dengan desain modern",
    thumbnail_url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
    category: { name: "Kerajinan" },
    price: 75000,
    price_max: 150000,
    owner_name: "Ibu Ani",
    whatsapp_number: "6281234567892",
    view_count: 789,
  },
];

export function UmkmSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Filter products based on active category
  const filteredProducts = mockProducts; // Will be filtered based on activeCategory

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <SectionTitle
          title="Produk UMKM"
          subtitle="Dukung produk lokal desa dengan kualitas terbaik"
          className="mb-12"
        />

        {/* Category Filter */}
        <CategoryFilter
          categories={mockCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          className="mb-12"
        />

        {/* UMKM Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <UmkmCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredProducts.map((product, index) => (
                <UmkmCard key={product.id} {...product} index={index} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Button asChild size="lg" variant="outline" className="group">
                <Link href="/umkm">
                  Lihat Semua Produk
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <EmptyState
            icon={ShoppingBag}
            title="Belum Ada Produk"
            description="Belum ada produk UMKM untuk kategori ini. Silakan pilih kategori lain."
          />
        )}
      </div>
    </section>
  );
}
