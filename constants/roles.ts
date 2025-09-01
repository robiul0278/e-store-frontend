
export const ROLES = {
  admin: 'admin',
  user: 'user',
  superAdmin: 'superAdmin',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];