import { getContacts } from '@/lib/cosmic'
import ContactCard from '@/components/ContactCard'

export const revalidate = 60

export default async function ContactsPage() {
  const contacts = await getContacts()

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
        <p className="mt-2 text-gray-500">Your customers and suppliers directory.</p>
      </section>

      {contacts.length === 0 ? (
        <div className="card p-12 text-center text-gray-400">No contacts added yet.</div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </section>
      )}
    </div>
  )
}