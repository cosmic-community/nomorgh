import { getMetafieldValue } from '@/lib/cosmic'

interface StatusBadgeProps {
  status: unknown
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const value = getMetafieldValue(status)

  const styles: Record<string, string> = {
    Paid: 'bg-green-50 text-green-700 ring-green-600/20',
    Pending: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    Overdue: 'bg-red-50 text-red-700 ring-red-600/20',
  }

  const style = styles[value] || 'bg-gray-50 text-gray-600 ring-gray-500/20'

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}
    >
      {value || 'Unknown'}
    </span>
  )
}