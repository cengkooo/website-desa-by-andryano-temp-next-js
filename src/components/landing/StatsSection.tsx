"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, ShoppingBag, Users } from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
  index: number;
}

function StatCard({ icon: Icon, value, label, suffix = "", index }: StatCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 text-center space-y-4">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-misty-accent flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="h-8 w-8 text-white" />
        </div>

        {/* Value */}
        <div className="space-y-1">
          <div className="text-4xl md:text-5xl font-bold text-gradient-misty">
            {count.toLocaleString("id-ID")}
            {suffix}
          </div>
          <div className="text-sm md:text-base text-muted-foreground font-medium">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  // Mock data - will be replaced with real data from hooks
  const stats = [
    {
      icon: MapPin,
      value: 25,
      label: "Destinasi Wisata",
      suffix: "+",
    },
    {
      icon: ShoppingBag,
      value: 150,
      label: "Produk UMKM",
      suffix: "+",
    },
    {
      icon: Users,
      value: 10000,
      label: "Pengunjung",
      suffix: "+",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#7DA3B8] to-[#2C4A5D] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4BB79D]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Desa dalam Angka
          </h2>
          <p className="text-white/80 text-lg">
            Pencapaian dan kontribusi desa untuk masyarakat
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
