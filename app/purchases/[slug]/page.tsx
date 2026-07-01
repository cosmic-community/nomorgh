// app/purchases/[slug]/page.tsx
import { getPurchase, formatCurrency, formatDate, getMetafieldValue } from '@/lib/cosmic'
import StatusBadge from '@/components/StatusBadge'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function PurchaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const purchase = await getPurchase(slug)

  if (!purchase) {
    notFound()
  }

  const supplier = purchase.metadata?.supplier
  const supplierName = supplier?.metadata?.name || supplier?.title || 'Unknown supplier'

  const rows = [
    { label: 'Reference Number', value: getMetafieldValue(purchase.metadata?.reference_number) || '—' },
    { label: 'Purchase Date', value: formatDate(purchase.metadata?.purchase_date) },
    { label: 'Supplier', value: supplierName },
    { label: 'Item', value: getMetafieldValue(purchase.metadata?.item_description) || '—' },
    { label: 'Quantity', value: String(purchase.metadata?.quantity ?? '—') },
    { label: 'Unit Cost', value: formatCurrency(purchase.metadata?.unit_cost) },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/purchases" className="text-sm font-medium text-brand-600 hover:text-brand-700">
        ← Back to Purchases
      </Link>

      <div className="card p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getMetafieldValue(purchase.metadata?.reference_number) || purchase.title}
            </h1>
            <p className="mt-1 text-gray-500">{supplierName}</p>
          </div>
          <StatusBadge status={purchase.metadata?.payment_status} />
        </div>

        <dl className="divide-y divide-gray-100">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between py-3">
              <dt className="text-sm text-gray-500">{row.label}</dt>
              <dd className="text-sm font-medium text-gray-900 text-right">{row.value}</dd>
            </div>
          ))}
          <div className="flex justify-between py-4">
            <dt className="text-base font-semibold text-gray-900">Total Amount</dt>
            <dd className="text-xl font-bold text-brand-600">
              {formatCurrency(purchase.metadata?.total_amount)}
            </dd>
          </div>
        </dl>

        {getMetafieldValue(purchase.metadata?.notes) && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
            <p className="text-sm text-gray-600">{getMetafieldValue(purchase.metadata?.notes)}</p>
          </div>
        )}
      </div>
    </div>
  )
}