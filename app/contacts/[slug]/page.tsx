// app/contacts/[slug]/page.tsx
import { getContact, getMetafieldValue } from '@/lib/cosmic'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const contact = await getContact(slug)

  if (!contact) {
    notFound()
  }

  const name = getMetafieldValue(contact.metadata?.name) || contact.title
  const initial = name.charAt(0).toUpperCase()

  const rows = [
    { label: 'Type', value: getMetafieldValue(contact.metadata?.contact_type) || '—' },
    { label: 'Company', value: getMetafieldValue(contact.metadata?.company) || '—' },
    { label: 'Email', value: getMetafieldValue(contact.metadata?.email) || '—' },
    { label: 'Phone', value: getMetafieldValue(contact.metadata?.phone) || '—' },
    { label: 'Address', value: getMetafieldValue(contact.metadata?.address) || '—' },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/contacts" className="text-sm font-medium text-brand-600 hover:text-brand-700">
        ← Back to Contacts
      </Link>

      <div className="card p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-2xl shrink-0">
            {initial}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
            {getMetafieldValue(contact.metadata?.company) && (
              <p className="text-gray-500">{getMetafieldValue(contact.metadata?.company)}</p>
            )}
          </div>
        </div>

        <dl className="divide-y divide-gray-100">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between py-3">
              <dt className="text-sm text-gray-500">{row.label}</dt>
              <dd className="text-sm font-medium text-gray-900 text-right">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}