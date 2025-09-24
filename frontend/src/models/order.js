/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} supplierId
 * @property {'PENDING' | 'SHIPPED' | 'RECEIVED'} status
 * @property {string} createdAt
 * @property {number} totalAmount
 */

export const exampleOrder = {
    id: "uuid",
    supplierId: "uuid",
    status: "PENDING",
    createdAt: "2025-09-20T10:00:00Z",
    totalAmount: 25000
  };
  