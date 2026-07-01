import { createBucketClient } from '@cosmicjs/sdk'
import type { Sale, Purchase, Contact } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render metafield values that may be objects
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Format currency
export function formatCurrency(amount: number | undefined): string {
  const value = typeof amount === 'number' ? amount : 0
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

// Format date
export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

// Fetch all sales
export async function getSales(): Promise<Sale[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'sales' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const sales = response.objects as Sale[]
    return sales.sort((a, b) => {
      const dateA = new Date(a.metadata?.sale_date || '').getTime()
      const dateB = new Date(b.metadata?.sale_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch sales')
  }
}

// Fetch single sale
export async function getSale(slug: string): Promise<Sale | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'sales', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as Sale
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch sale')
  }
}

// Fetch all purchases
export async function getPurchases(): Promise<Purchase[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'purchases' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const purchases = response.objects as Purchase[]
    return purchases.sort((a, b) => {
      const dateA = new Date(a.metadata?.purchase_date || '').getTime()
      const dateB = new Date(b.metadata?.purchase_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch purchases')
  }
}

// Fetch single purchase
export async function getPurchase(slug: string): Promise<Purchase | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'purchases', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as Purchase
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch purchase')
  }
}

// Fetch all contacts
export async function getContacts(): Promise<Contact[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'contacts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Contact[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch contacts')
  }
}

// Fetch single contact
export async function getContact(slug: string): Promise<Contact | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'contacts', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as Contact
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch contact')
  }
}