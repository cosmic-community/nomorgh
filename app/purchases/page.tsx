import { getPurchases, formatCurrency, getMetafieldValue } from '@/lib/cosmic'
import PurchaseCard from '@/components/PurchaseCard'

export const revalidate = 60

export default async function PurchasesPage() {
  const purchases = await getPurchases()

  const total = purchases.reduce((sum, p) => sum + (p.metadata?.total_amount || 0), 0)
  const paidCount = purchases.filter(
    (p) => getMetafieldValue(p.metadata?.payment_status) === 'Paid'
  ).length

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-gray-900">Purchases</h1>
        <p className="mt-2 text-gray-500">All purchase records, newest first.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="card p-5">
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{formatCurrency(total)}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-gray-500">Total Records</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{purchases.length}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-gray-500">Paid</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{paidCount}</p>
        </div>
      </section>

      {purchases.length === 0 ? (
        <div className="card p-12 text-center text-gray-400">No purchases recorded yet.</div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {purchases.map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} />
          ))}
        </section>
      )}
    </div>
  )
}