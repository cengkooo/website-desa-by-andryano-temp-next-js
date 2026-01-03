"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { Target, Eye, Heart } from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: Target,
      title: "Visi",
      description:
        "Menjadi desa wisata terdepan yang melestarikan budaya dan alam sambil meningkatkan kesejahteraan masyarakat.",
    },
    {
      icon: Eye,
      title: "Misi",
      description:
        "Mengembangkan potensi wisata dan UMKM lokal melalui inovasi dan pemberdayaan masyarakat.",
    },
    {
      icon: Heart,
      title: "Nilai",
      description:
        "Kearifan lokal, keberlanjutan, dan keramahan sebagai fondasi dalam setiap kegiatan desa.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#B7E0E8]/10 to-white">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Tentang Desa Kami"
          subtitle="Mengenal lebih dekat visi, misi, dan nilai-nilai desa wisata"
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-misty-accent opacity-20" />
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200"
              alt="Desa Wisata"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Desa Wisata adalah destinasi yang memadukan keindahan alam, kekayaan budaya, 
              dan produk UMKM lokal. Kami berkomitmen untuk memberikan pengalaman wisata 
              yang autentik dan berkesan bagi setiap pengunjung.
            </motion.p>

            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-misty-accent flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-[#2C4A5D]">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
