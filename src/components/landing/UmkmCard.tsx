"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UmkmCardProps {
  id: string;
  name: string;
  slug: string;
  short_description?: string;
  thumbnail_url: string;
  category?: {
    name: string;
  };
  price: number;
  price_max?: number;
  owner_name?: string;
  whatsapp_number?: string;
  view_count?: number;
  index?: number;
  className?: string;
}

export function UmkmCard({
  id,
  name,
  slug,
  short_description,
  thumbnail_url,
  category,
  price,
  price_max,
  owner_name,
  whatsapp_number,
  view_count = 0,
  index = 0,
  className,
}: UmkmCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (whatsapp_number) {
      const message = `Halo, saya tertarik dengan produk ${name}`;
      const url = `https://wa.me/${whatsapp_number}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/umkm/${slug}`}>
        <Card className={cn("overflow-hidden hover-lift cursor-pointer group", className)}>
          {/* Image */}
          <div className="relative h-48 md:h-56 overflow-hidden bg-[#B7E0E8]/20">
            <Image
              src={thumbnail_url || "/placeholder-umkm.jpg"}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Category Badge */}
            {category && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-white/90 text-[#2C4A5D] hover:bg-white">
                  {category.name}
                </Badge>
              </div>
            )}
            {/* View Count */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
              <Eye className="h-3 w-3 text-white" />
              <span className="text-xs text-white font-medium">{view_count}</span>
            </div>
          </div>

          {/* Content */}
          <CardContent className="p-4 space-y-3">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-[#2C4A5D] line-clamp-1 group-hover:text-[#7DA3B8] transition-colors">
                {name}
              </h3>
              {short_description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {short_description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#4BB79D]">
                {formatPrice(price)}
              </span>
              {price_max && (
                <span className="text-sm text-muted-foreground">
                  - {formatPrice(price_max)}
                </span>
              )}
            </div>

            {/* Owner & WhatsApp */}
            <div className="flex items-center justify-between pt-2 border-t border-[#ACC4D7]/30">
              {owner_name && (
                <span className="text-xs text-muted-foreground">
                  oleh {owner_name}
                </span>
              )}
              {whatsapp_number && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs">WhatsApp</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

// Skeleton variant
export function UmkmCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 md:h-56 bg-[#B7E0E8]/20 animate-pulse" />
      <CardContent className="p-4 space-y-3">
        <div className="h-6 bg-[#B7E0E8]/20 rounded animate-pulse" />
        <div className="h-4 bg-[#B7E0E8]/20 rounded w-3/4 animate-pulse" />
        <div className="h-6 bg-[#B7E0E8]/20 rounded w-1/2 animate-pulse" />
        <div className="h-8 bg-[#B7E0E8]/20 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}
