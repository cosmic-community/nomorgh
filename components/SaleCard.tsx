import Link from 'next/link'
import type { Sale } from '@/types'
import { getMetafieldValue, formatCurrency, formatDate } from '@/lib/cosmic'
import StatusBadge from '@/components/StatusBadge'

interface SaleCardProps {
  sale: Sale
}

export default function SaleCard({ sale }: SaleCardProps) {
  if (!sale) return null

  const customer = sale.metadata?.customer
  const customerName = customer?.metadata?.name || customer?.title || 'Walk-in'

  return (
    <Link href={`/sales/${sale.slug}`} className="card p-5 block hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {getMetafieldValue(sale.metadata?.invoice_number) || sale.title}
          </p>
          <p className="text-sm text-gray-500 mt-1 truncate">
            {getMetafieldValue(sale.metadata?.item_description) || 'No description'}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {customerName} · {formatDate(sale.metadata?.sale_date)}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(sale.metadata?.total_amount)}
          </p>
          <div className="mt-2">
            <StatusBadge status={sale.metadata?.payment_status} />
          </div>
        </div>
      </div>
    </Link>
  )
}