interface StatCardProps {
  label: string
  value: string
  sublabel?: string
  accent?: 'brand' | 'green' | 'red' | 'gray'
  icon: React.ReactNode
}

export default function StatCard({ label, value, sublabel, accent = 'brand', icon }: StatCardProps) {
  const accentStyles: Record<string, string> = {
    brand: 'bg-brand-50 text-brand-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    gray: 'bg-gray-100 text-gray-600',
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {sublabel && <p className="mt-1 text-sm text-gray-400">{sublabel}</p>}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${accentStyles[accent]}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}