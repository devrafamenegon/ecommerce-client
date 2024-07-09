"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Billboard, Routes } from "@/types";

interface MainNavProps {
  data: Billboard[]
};

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  const pathname = usePathname();

  const routes: Routes[] = data.map((route) => ({
    href: `/billboard/${route.id}`,
    label: route.label,
    active: pathname === `/billboard/${route.id}`
  }))

  return (
    <nav
      className="hidden md:flex mx-6 items-center space-x-4 lg:space-x-6"
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active ? "text-black font-bold" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

export default MainNav;