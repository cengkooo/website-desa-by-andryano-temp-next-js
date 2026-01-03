"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { CategoryFilter } from "./CategoryFilter";
import { EmptyState } from "./EmptyState";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock data
const mockCategories = [
  { id: "all", name: "Semua", slug: "all", icon: "🌟" },
  { id: "1", name: "Wisata", slug: "wisata", icon: "🏞️" },
  { id: "2", name: "UMKM", slug: "umkm", icon: "🛍️" },
  { id: "3", name: "Kegiatan", slug: "kegiatan", icon: "🎉" },
];

const mockGallery = [
  {
    id: "1",
    title: "Air Terjun Indah",
    image_url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
    category: { name: "Wisata" },
  },
  {
    id: "2",
    title: "Produk Kerajinan",
    image_url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
    category: { name: "UMKM" },
  },
  {
    id: "3",
    title: "Festival Desa",
    image_url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    category: { name: "Kegiatan" },
  },
  {
    id: "4",
    title: "Sawah Terasering",
    image_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    category: { name: "Wisata" },
  },
  {
    id: "5",
    title: "Kuliner Tradisional",
    image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    category: { name: "UMKM" },
  },
  {
    id: "6",
    title: "Upacara Adat",
    image_url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
    category: { name: "Kegiatan" },
  },
];

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredGallery = mockGallery;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  };
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length
      );
    }
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#B7E0E8]/10">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Galeri Foto"
            subtitle="Dokumentasi keindahan dan kegiatan desa"
            className="mb-12"
          />

          <CategoryFilter
            categories={mockCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            className="mb-12"
          />

          {filteredGallery.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredGallery.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => openLightbox(index)}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                  >
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-medium text-sm line-clamp-2">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline" className="group">
                  <Link href="/galeri">
                    Lihat Semua Foto
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <EmptyState
              icon={ImageIcon}
              title="Belum Ada Foto"
              description="Belum ada foto untuk kategori ini. Silakan pilih kategori lain."
            />
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredGallery[lightboxIndex].image_url}
                alt={filteredGallery[lightboxIndex].title}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-lg font-medium text-center">
                  {filteredGallery[lightboxIndex].title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
