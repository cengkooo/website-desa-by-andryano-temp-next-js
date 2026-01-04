import Link from 'next/link'
import { QuickActionProps } from '@/types/admin'
import { ArrowRightIcon } from 'lucide-react'

export default function QuickActionCard({ title, description, icon, href, color = 'blue' }: QuickActionProps) {
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    yellow: 'bg-yellow-600 hover:bg-yellow-700',
    orange: 'bg-orange-600 hover:bg-orange-700',
  }

  return (
    <Link href={href}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all group cursor-pointer">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${colorClasses[color]} text-white`}>
            {icon}
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {title}
            </h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  )
}
