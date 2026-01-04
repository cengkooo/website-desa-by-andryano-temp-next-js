'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboardIcon, 
  MapPinIcon, 
  StoreIcon, 
  NewspaperIcon,
  ImageIcon,
  FileTextIcon,
  ChevronRightIcon,
  MenuIcon,
  XIcon,
  LogOutIcon
} from 'lucide-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboardIcon className="w-5 h-5" />,
  },

  {
    label: 'Tourism',
    href: '/admin/tourism',
    icon: <MapPinIcon className="w-5 h-5" />,
    children: [
      { label: 'Tourism List', href: '/admin/tourism', icon: null },
      { label: 'Add New Tourism', href: '/admin/tourism/add', icon: null },
      { label: 'Tourism Categories', href: '/admin/tourism/categories', icon: null },
    ],
  },
  {
    label: 'UMKM',
    href: '/admin/umkm',
    icon: <StoreIcon className="w-5 h-5" />,
    children: [
      { label: 'UMKM List', href: '/admin/umkm', icon: null },
      { label: 'Add New UMKM', href: '/admin/umkm/add', icon: null },
      { label: 'UMKM Categories', href: '/admin/umkm/categories', icon: null },
      { label: 'UMKM Verification', href: '/admin/umkm/verification', icon: null },
    ],
  },
  {
    label: 'News & Activities',
    href: '/admin/articles',
    icon: <NewspaperIcon className="w-5 h-5" />,
    children: [
      { label: 'All News', href: '/admin/articles', icon: null },
      { label: 'Write New Article', href: '/admin/articles/add', icon: null },
      { label: 'News Categories', href: '/admin/articles/categories', icon: null },
    ],
  },
  {
    label: 'Media Gallery',
    href: '/admin/gallery',
    icon: <ImageIcon className="w-5 h-5" />,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev =>
      prev.includes(href)
        ? prev.filter(item => item !== href)
        : [...prev, href]
    )
  }

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const NavItemComponent = ({ item }: { item: NavItem }) => {
    const active = isActive(item.href)
    const expanded = expandedItems.includes(item.href)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div>
        <Link
          href={hasChildren ? '#' : item.href}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault()
              toggleExpanded(item.href)
            } else {
              setIsMobileOpen(false)
            }
          }}
          className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${
            active && !hasChildren
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </div>
          {hasChildren && (
            <ChevronRightIcon
              className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`}
            />
          )}
        </Link>

        {hasChildren && expanded && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setIsMobileOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm transition-all ${
                  isActive(child.href)
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isMobileOpen ? (
          <XIcon className="w-6 h-6" />
        ) : (
          <MenuIcon className="w-6 h-6" />
        )}
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 flex flex-col z-40 transition-transform lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900">Village CMS</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
          >
            <LogOutIcon className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
