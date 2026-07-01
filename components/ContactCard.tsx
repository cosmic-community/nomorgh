import Link from 'next/link'
import type { Contact } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface ContactCardProps {
  contact: Contact
}

export default function ContactCard({ contact }: ContactCardProps) {
  if (!contact) return null

  const name = getMetafieldValue(contact.metadata?.name) || contact.title
  const contactType = getMetafieldValue(contact.metadata?.contact_type)
  const company = getMetafieldValue(contact.metadata?.company)
  const email = getMetafieldValue(contact.metadata?.email)
  const initial = name.charAt(0).toUpperCase()

  return (
    <Link href={`/contacts/${contact.slug}`} className="card p-5 block hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-lg shrink-0">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
          {company && <p className="text-sm text-gray-500 truncate">{company}</p>}
          {email && <p className="text-xs text-gray-400 truncate mt-1">{email}</p>}
        </div>
        {contactType && (
          <span className="ml-auto inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/20 shrink-0">
            {contactType}
          </span>
        )}
      </div>
    </Link>
  )
}