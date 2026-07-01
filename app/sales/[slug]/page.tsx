// app/sales/[slug]/page.tsx
import { getSale, formatCurrency, formatDate, getMetafieldValue } from '@/lib/cosmic'
import StatusBadge from '@/components/StatusBadge'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function SaleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const sale = await getSale(slug)

  if (!sale) {
    notFound()
  }

  const customer = sale.metadata?.customer
  const customerName = customer?.metadata?.name || customer?.title || 'Walk-in customer'

  const rows = [
    { label: 'Invoice Number', value: getMetafieldValue(sale.metadata?.invoice_number) || '—' },
    { label: 'Sale Date', value: formatDate(sale.metadata?.sale_date) },
    { label: 'Customer', value: customerName },
    { label: 'Item', value: getMetafieldValue(sale.metadata?.item_description) || '—' },
    { label: 'Quantity', value: String(sale.metadata?.quantity ?? '—') },
    { label: 'Unit Price', value: formatCurrency(sale.metadata?.unit_price) },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/sales" className="text-sm font-medium text-brand-600 hover:text-brand-700">
        ← Back to Sales
      </Link>

      <div className="card p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getMetafieldValue(sale.metadata?.invoice_number) || sale.title}
            </h1>
            <p className="mt-1 text-gray-500">{customerName}</p>
          </div>
          <StatusBadge status={sale.metadata?.payment_status} />
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
              {formatCurrency(sale.metadata?.total_amount)}
            </dd>
          </div>
        </dl>

        {getMetafieldValue(sale.metadata?.notes) && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
            <p className="text-sm text-gray-600">{getMetafieldValue(sale.metadata?.notes)}</p>
          </div>
        )}
      </div>
    </div>
  )
}