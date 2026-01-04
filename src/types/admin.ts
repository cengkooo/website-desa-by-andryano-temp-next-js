// Shared Admin Component Types
export interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'blue' | 'green' | 'yellow' | 'orange'
}

export interface QuickActionProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color?: 'blue' | 'green' | 'yellow' | 'orange'
}

export interface DataTableColumn<T> {
  key: keyof T | string
  label: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
}

export interface FilterOption {
  label: string
  value: string
}

// Database Types
export interface TourismDestination {
  id: string
  name: string
  slug: string
  description: string
  short_description?: string
  category_id: string
  images: string[]
  thumbnail_url: string
  location?: string
  maps_url?: string
  maps_embed?: string
  is_featured: boolean
  view_count: number
  status: string
  created_at: string
  updated_at: string
}

export interface UmkmProduct {
  id: string
  name: string
  slug: string
  description: string
  short_description?: string
  category_id: string
  images: string[]
  thumbnail_url: string
  price: number
  price_max?: number
  owner_name: string
  whatsapp_number: string
  is_featured: boolean
  view_count: number
  status: string
  created_at: string
  updated_at: string
}

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  category?: string
  status: string
  published_at?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface Gallery {
  id: string
  title: string
  image_url: string
  description?: string
  category?: string
  created_at: string
}

export interface VillageProfile {
  id: string
  section_name: string
  content: string
  updated_at: string
}

export interface DashboardStats {
  totalTourism: number
  activeUmkm: number
  publishedArticles: number
  totalVisitors: number
  tourismTrend: number
  umkmTrend: number
  articlesTrend: number
  visitorsTrend: number
}
