/**
 * Shared types for transversal project apps.
 * Extend with domain types (e.g. Location, Sale, Customer) as needed.
 */

// Example placeholder — replace with your domain types
export type Id = string;

export interface BaseEntity {
  id: Id;
  createdAt?: string;
  updatedAt?: string;
}
