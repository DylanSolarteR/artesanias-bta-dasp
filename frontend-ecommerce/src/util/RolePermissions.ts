export type Role = "Administrator" | "Manager" | "Cashier";
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
  Administrator: [
    "view:employees",
    "create:employees",
    "update:employees",
    "delete:employees",
    "view:products",
    "create:products",
    "update:products",
    "delete:products",
    "view:physical-stores",
    "create:physical-stores",
    "update:physical-stores",
    "delete:physical-stores",
    "view:ownReports",
    "view:inventory",
    "raise:inventory",
    "lower:inventory",
    "view:POS"
  ],
    Manager: [
        "view:employees",
        "create:employees",
        "update:employees",
        "delete:employees",
        "view:reports",
        "view:inventory",
        "raise:inventory",
        "lower:inventory",
        "view:POS"
    ],
    Cashier: [
        "view:POS"
    ]
} as const;

export function hasPermission(role: Role, permission: Permission): boolean {
  return (ROLES[role] as readonly Permission[]).includes(permission);
}

