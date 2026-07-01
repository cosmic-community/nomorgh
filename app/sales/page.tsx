import { getSales, formatCurrency, getMetafieldValue } from '@/lib/cosmic'
import SaleCard from '@/components/SaleCard'

export const revalidate = 60

export default async function SalesPage() {
  const sales = await getSales()

  const total = sales.reduce((sum, s) => sum + (s.metadata?.total_amount || 0), 0)
  const paidCount = sales.filter((s) => getMetafieldValue(s.metadata?.payment_status) === 'Paid').length

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-gray-900">Sales</h1>
        <p className="mt-2 text-gray-500">All sales records, newest first.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="card p-5">
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{formatCurrency(total)}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-gray-500">Total Records</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{sales.length}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-gray-500">Paid</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{paidCount}</p>
        </div>
      </section>

      {sales.length === 0 ? (
        <div className="card p-12 text-center text-gray-400">No sales recorded yet.</div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sales.map((sale) => (
            <SaleCard key={sale.id} sale={sale} />
          ))}
        </section>
      )}
    </div>
  )
}