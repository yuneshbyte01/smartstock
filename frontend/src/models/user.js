/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {'ADMIN' | 'MANAGER' | 'STAFF'} role
 * @property {string} createdAt
 */

export const exampleUser = {
    id: "uuid",
    username: "manager1",
    email: "manager@example.com",
    password: "****",
    role: "MANAGER",
    createdAt: "2025-09-24T12:00:00Z"
  };
  