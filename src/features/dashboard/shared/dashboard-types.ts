import type { LucideIcon } from "lucide-react";

export type ImagePair = { default: string; active: string };

export type NavDivider = { type: "divider" };

export type NavLink = {
  href: string;
  label: string;
  image?: ImagePair;
  icon?: LucideIcon;
  action?: "logout";
  count?: number;
};

export type NavDropdown = {
  label: string;
  icon?: LucideIcon;
  children: (NavLink | NavDivider)[];
};

export type NavItem = NavLink | NavDropdown | NavDivider;
