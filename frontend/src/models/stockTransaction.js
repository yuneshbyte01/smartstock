/**
 * @typedef {Object} StockTransaction
 * @property {string} id
 * @property {string} productId
 * @property {string} userId
 * @property {'IN' | 'OUT' | 'ADJUSTMENT'} type
 * @property {number} quantity
 * @property {string} reason
 * @property {string} timestamp
 */

export const exampleStockTxn = {
    id: "uuid",
    productId: "uuid",
    userId: "uuid",
    type: "IN",
    quantity: 50,
    reason: "Restock",
    timestamp: "2025-09-23T14:00:00Z"
  };
  