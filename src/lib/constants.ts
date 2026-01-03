// Site Configuration
export const SITE_CONFIG = {
  name: "Desa Wisata",
  description: "Portal Wisata dan UMKM Desa",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
} as const;

// Pagination
export const ITEMS_PER_PAGE = 12;
export const ITEMS_PER_PAGE_ADMIN = 10;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGES = 5;

// Navigation Links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/wisata", label: "Wisata" },
  { href: "/umkm", label: "UMKM" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kontak", label: "Kontak" },
] as const;

// Social Media (placeholder)
export const SOCIAL_MEDIA = {
  instagram: "",
  facebook: "",
  youtube: "",
  whatsapp: "",
} as const;
