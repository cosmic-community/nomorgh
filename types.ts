// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Payment status type literals - match content model exactly
export type PaymentStatus = 'Paid' | 'Pending' | 'Overdue';

// Contact type
export interface Contact extends CosmicObject {
  type: 'contacts';
  metadata: {
    name?: string;
    contact_type?: string | { key?: string; value?: string };
    company?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
}

// Sale type
export interface Sale extends CosmicObject {
  type: 'sales';
  metadata: {
    invoice_number?: string;
    sale_date?: string;
    customer?: Contact | null;
    item_description?: string;
    quantity?: number;
    unit_price?: number;
    total_amount?: number;
    payment_status?: string | { key?: string; value?: string };
    notes?: string;
  };
}

// Purchase type
export interface Purchase extends CosmicObject {
  type: 'purchases';
  metadata: {
    reference_number?: string;
    purchase_date?: string;
    supplier?: Contact | null;
    item_description?: string;
    quantity?: number;
    unit_cost?: number;
    total_amount?: number;
    payment_status?: string | { key?: string; value?: string };
    notes?: string;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isSale(obj: CosmicObject): obj is Sale {
  return obj.type === 'sales';
}

export function isPurchase(obj: CosmicObject): obj is Purchase {
  return obj.type === 'purchases';
}

export function isContact(obj: CosmicObject): obj is Contact {
  return obj.type === 'contacts';
}