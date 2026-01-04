'use client'

import { useEffect, useState } from 'react'
import { TourismDestination } from '@/types/admin'
import { supabase } from '@/lib/supabase'
import SearchBar from '@/components/admin/SearchBar'
import FilterDropdown from '@/components/admin/FilterDropdown'
import Link from 'next/link'
import { PlusIcon, EditIcon, TrashIcon, FilterIcon } from 'lucide-react'

export default function TourismListPage() {
  const [destinations, setDestinations] = useState<TourismDestination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<TourismDestination[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    fetchDestinations()
  }, [])

  useEffect(() => {
    filterDestinations()
  }, [searchQuery, statusFilter, categoryFilter, destinations])

  async function fetchDestinations() {
    try {
      const { data, error } = await supabase
        .from('tourism_destinations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setDestinations(data || [])
    } catch (error) {
      console.error('Error fetching destinations:', error)
    } finally {
      setLoading(false)
    }
  }

  function filterDestinations() {
    let filtered = [...destinations]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(dest =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(dest => dest.status === statusFilter)
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(dest => dest.category_id === categoryFilter)
    }

    setFilteredDestinations(filtered)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this tourism destination?')) return

    try {
      const { error } = await supabase
        .from('tourism_destinations')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setDestinations(destinations.filter(dest => dest.id !== id))
    } catch (error) {
      console.error('Error deleting destination:', error)
      alert('Failed to delete destination')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tourism destinations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tourism Sites</h1>
          <p className="text-gray-600">Manage all tourism listings</p>
        </div>
        <Link
          href="/admin/tourism/add"
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <PlusIcon className="w-5 h-5" />
          Add Tourism
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search tourism sites..."
              onSearch={setSearchQuery}
            />
          </div>
          <div className="flex gap-3">
            <FilterDropdown
              label="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: 'All Status', value: 'all' },
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
              ]}
            />
            <FilterDropdown
              label="Category"
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={[
                { label: 'All Categories', value: 'all' },
                { label: 'Nature', value: 'nature' },
                { label: 'Religious', value: 'religious' },
                { label: 'Culture', value: 'culture' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Sites</p>
          <p className="text-2xl font-bold text-gray-900">{destinations.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {destinations.filter(d => d.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Views</p>
          <p className="text-2xl font-bold text-blue-600">
            {destinations.reduce((sum, d) => sum + (d.view_count || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Visitors
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDestinations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <FilterIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-lg font-medium">No destinations found</p>
                      <p className="text-sm">Try adjusting your filters or search query</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDestinations.map((destination) => (
                  <tr key={destination.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {destination.thumbnail_url && (
                          <img
                            src={destination.thumbnail_url}
                            alt={destination.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{destination.name}</p>
                          {destination.is_featured && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {destination.location || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          destination.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {destination.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {destination.view_count?.toLocaleString() || 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(destination.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/tourism/edit/${destination.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <EditIcon className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(destination.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
