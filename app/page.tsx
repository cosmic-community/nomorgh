import { getSales, getPurchases, getContacts, formatCurrency, getMetafieldValue } from '@/lib/cosmic'
import StatCard from '@/components/StatCard'
import SaleCard from '@/components/SaleCard'
import PurchaseCard from '@/components/PurchaseCard'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const [sales, purchases, contacts] = await Promise.all([
    getSales(),
    getPurchases(),
    getContacts(),
  ])

  const totalSales = sales.reduce((sum, s) => sum + (s.metadata?.total_amount || 0), 0)
  const totalPurchases = purchases.reduce((sum, p) => sum + (p.metadata?.total_amount || 0), 0)
  const netRevenue = totalSales - totalPurchases

  const pendingSales = sales.filter(
    (s) => getMetafieldValue(s.metadata?.payment_status) !== 'Paid'
  ).length

  const recentSales = sales.slice(0, 4)
  const recentPurchases = purchases.slice(0, 4)

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-500">
          Overview of your daily sales and purchases activity.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Total Sales"
          value={formatCurrency(totalSales)}
          sublabel={`${sales.length} records`}
          accent="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18M7 14l4-4 3 3 5-5" />
            </svg>
          }
        />
        <StatCard
          label="Total Purchases"
          value={formatCurrency(totalPurchases)}
          sublabel={`${purchases.length} records`}
          accent="red"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293A1 1 0 005.414 17H17M17 17a2 2 0 11-4 0 2 2 0 014 0zm-8 0a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <StatCard
          label="Net Revenue"
          value={formatCurrency(netRevenue)}
          sublabel="Sales − Purchases"
          accent={netRevenue >= 0 ? 'brand' : 'red'}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          }
        />
        <StatCard
          label="Pending Payments"
          value={String(pendingSales)}
          sublabel="Sales awaiting payment"
          accent="gray"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </section>

      {/* Recent Sales */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Sales</h2>
          <Link href="/sales" className="text-sm font-medium text-brand-600 hover:text-brand-700">
            View all →
          </Link>
        </div>
        {recentSales.length === 0 ? (
          <div className="card p-8 text-center text-gray-400">No sales recorded yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentSales.map((sale) => (
              <SaleCard key={sale.id} sale={sale} />
            ))}
          </div>
        )}
      </section>

      {/* Recent Purchases */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Purchases</h2>
          <Link href="/purchases" className="text-sm font-medium text-brand-600 hover:text-brand-700">
            View all →
          </Link>
        </div>
        {recentPurchases.length === 0 ? (
          <div className="card p-8 text-center text-gray-400">No purchases recorded yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentPurchases.map((purchase) => (
              <PurchaseCard key={purchase.id} purchase={purchase} />
            ))}
          </div>
        )}
      </section>

      {/* Contacts summary */}
      <section className="card p-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Contacts</h2>
          <p className="text-sm text-gray-500 mt-1">{contacts.length} customers & suppliers</p>
        </div>
        <Link
          href="/contacts"
          className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          Manage Contacts
        </Link>
      </section>
    </div>
  )
}