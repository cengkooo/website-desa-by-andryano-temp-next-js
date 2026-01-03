"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: CategoryFilterProps) {
  return (
    <div className={cn("w-full overflow-x-auto pb-2", className)}>
      <div className="flex gap-2 min-w-max md:justify-center">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onCategoryChange(category.slug)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              "hover:scale-105 active:scale-95",
              activeCategory === category.slug
                ? "bg-gradient-misty-accent text-white shadow-md"
                : "bg-white text-[#2C4A5D] border border-[#ACC4D7] hover:border-[#7DA3B8]"
            )}
          >
            {category.icon && <span className="mr-1.5">{category.icon}</span>}
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
