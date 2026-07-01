import Link from 'next/link'
import type { Purchase } from '@/types'
import { getMetafieldValue, formatCurrency, formatDate } from '@/lib/cosmic'
import StatusBadge from '@/components/StatusBadge'

interface PurchaseCardProps {
  purchase: Purchase
}

export default function PurchaseCard({ purchase }: PurchaseCardProps) {
  if (!purchase) return null

  const supplier = purchase.metadata?.supplier
  const supplierName = supplier?.metadata?.name || supplier?.title || 'Unknown supplier'

  return (
    <Link href={`/purchases/${purchase.slug}`} className="card p-5 block hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {getMetafieldValue(purchase.metadata?.reference_number) || purchase.title}
          </p>
          <p className="text-sm text-gray-500 mt-1 truncate">
            {getMetafieldValue(purchase.metadata?.item_description) || 'No description'}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {supplierName} · {formatDate(purchase.metadata?.purchase_date)}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(purchase.metadata?.total_amount)}
          </p>
          <div className="mt-2">
            <StatusBadge status={purchase.metadata?.payment_status} />
          </div>
        </div>
      </div>
    </Link>
  )
}