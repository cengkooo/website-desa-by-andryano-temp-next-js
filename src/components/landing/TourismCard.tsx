"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TourismCardProps {
  id: string;
  name: string;
  slug: string;
  short_description?: string;
  thumbnail_url: string;
  category?: {
    name: string;
  };
  location?: string;
  view_count?: number;
  index?: number;
  className?: string;
}

export function TourismCard({
  id,
  name,
  slug,
  short_description,
  thumbnail_url,
  category,
  location,
  view_count = 0,
  index = 0,
  className,
}: TourismCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/wisata/${slug}`}>
        <Card className={cn("overflow-hidden hover-lift cursor-pointer group", className)}>
          {/* Image */}
          <div className="relative h-48 md:h-56 overflow-hidden bg-[#B7E0E8]/20">
            <Image
              src={thumbnail_url || "/placeholder-tourism.jpg"}
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
          <CardContent className="p-4 space-y-2">
            <h3 className="font-semibold text-lg text-[#2C4A5D] line-clamp-1 group-hover:text-[#7DA3B8] transition-colors">
              {name}
            </h3>
            {short_description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {short_description}
              </p>
            )}
            {location && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="line-clamp-1">{location}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

// Skeleton variant
export function TourismCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 md:h-56 bg-[#B7E0E8]/20 animate-pulse" />
      <CardContent className="p-4 space-y-2">
        <div className="h-6 bg-[#B7E0E8]/20 rounded animate-pulse" />
        <div className="h-4 bg-[#B7E0E8]/20 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-[#B7E0E8]/20 rounded w-1/2 animate-pulse" />
      </CardContent>
    </Card>
  );
}
