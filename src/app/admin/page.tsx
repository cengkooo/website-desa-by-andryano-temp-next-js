'use client'

import { useEffect, useState } from 'react'
import StatCard from '@/components/admin/StatCard'
import QuickActionCard from '@/components/admin/QuickActionCard'
import { DashboardStats } from '@/types/admin'
import { 
  MapPinIcon, 
  StoreIcon, 
  NewspaperIcon, 
  UsersIcon,
  PlusIcon,
  FileEditIcon,
  ImageIcon,
  CheckCircleIcon
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Mock visitor data for the chart
const visitorData = [
  { month: 'Jan', visitors: 2400 },
  { month: 'Feb', visitors: 3200 },
  { month: 'Mar', visitors: 2800 },
  { month: 'Apr', visitors: 3900 },
  { month: 'May', visitors: 4200 },
  { month: 'Jun', visitors: 5100 },
  { month: 'Jul', visitors: 6200 },
  { month: 'Aug', visitors: 5800 },
  { month: 'Sep', visitors: 6500 },
  { month: 'Oct', visitors: 7200 },
  { month: 'Nov', visitors: 6800 },
  { month: 'Dec', visitors: 7500 },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalTourism: 0,
    activeUmkm: 0,
    publishedArticles: 0,
    totalVisitors: 0,
    tourismTrend: 0,
    umkmTrend: 0,
    articlesTrend: 0,
    visitorsTrend: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch tourism count
        const { count: tourismCount } = await supabase
          .from('tourism_destinations')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active')

        // Fetch UMKM count
        const { count: umkmCount } = await supabase
          .from('umkm_products')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'verified')

        // Fetch articles count
        const { count: articlesCount } = await supabase
          .from('articles')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published')

        // Calculate total visitors (sum of view_count from tourism and umkm)
        const { data: tourismData } = await supabase
          .from('tourism_destinations')
          .select('view_count')

        const { data: umkmData } = await supabase
          .from('umkm_products')
          .select('view_count')

        const totalVisitors = 
          (tourismData?.reduce((sum, item) => sum + (item.view_count || 0), 0) || 0) +
          (umkmData?.reduce((sum, item) => sum + (item.view_count || 0), 0) || 0)

        setStats({
          totalTourism: tourismCount || 0,
          activeUmkm: umkmCount || 0,
          publishedArticles: articlesCount || 0,
          totalVisitors: totalVisitors,
          tourismTrend: 12, // Mock trend data
          umkmTrend: 8,
          articlesTrend: 5,
          visitorsTrend: 18,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin!</h1>
        <p className="text-gray-600">Here's what's happening with your village website today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tourism Sites"
          value={stats.totalTourism}
          icon={<MapPinIcon className="w-6 h-6" />}
          trend={{ value: stats.tourismTrend, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Active UMKM"
          value={stats.activeUmkm}
          icon={<StoreIcon className="w-6 h-6" />}
          trend={{ value: stats.umkmTrend, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Published News"
          value={stats.publishedArticles}
          icon={<NewspaperIcon className="w-6 h-6" />}
          trend={{ value: stats.articlesTrend, isPositive: true }}
          color="orange"
        />
        <StatCard
          title="Total Visitors"
          value={`${(stats.totalVisitors / 1000).toFixed(1)}K`}
          icon={<UsersIcon className="w-6 h-6" />}
          trend={{ value: stats.visitorsTrend, isPositive: true }}
          color="blue"
        />
      </div>

      {/* Visitors Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Website Visitors</h2>
          <p className="text-sm text-gray-600">Monthly visitor statistics for the past year</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="visitors" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <p className="text-sm text-gray-600 mb-6">Shortcuts to common tasks</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickActionCard
            title="Add Tourism"
            description="Create new tourism listing"
            icon={<PlusIcon className="w-5 h-5" />}
            href="/admin/tourism/add"
            color="blue"
          />
          <QuickActionCard
            title="Add UMKM"
            description="Register new business"
            icon={<StoreIcon className="w-5 h-5" />}
            href="/admin/umkm/add"
            color="green"
          />
          <QuickActionCard
            title="Write Article"
            description="Create news article"
            icon={<FileEditIcon className="w-5 h-5" />}
            href="/admin/articles/add"
            color="orange"
          />
          <QuickActionCard
            title="Upload Media"
            description="Add images to gallery"
            icon={<ImageIcon className="w-5 h-5" />}
            href="/admin/gallery"
            color="blue"
          />
        </div>
      </div>
    </div>
  )
}
