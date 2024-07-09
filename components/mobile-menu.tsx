"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";

import { Billboard, Routes } from "@/types";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SearchBar } from "./ui/search-bar";

interface MobileFilterProps {
  data: Billboard[];
}

const MobileMenu: React.FC<MobileFilterProps> = ({
  data,
}) => {
  const pathname = usePathname();

  const routes: Routes[] = data.map((route) => ({
    href: `/billboard/${route.id}`,
    label: route.label,
    active: pathname === `/billboard/${route.id}`
  }))

  const [open, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={onOpen} className="flex md:hidden lg:hidden items-center rounded-full bg-black px-4 py-2">
        <Menu 
          size={20}
          color="white"
        />
      </Button>

      <Dialog open={open} as="div" className="relative z-40 lg:hidden" onClose={onClose}>
        {/* Background */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            
            {/* Close button */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose}/>
            </div>

            <div className="p-4">
              <SearchBar />
            </div>

            {/* Billboards */}
            <div className="p-4 flex flex-col">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex-1 text-lg font-medium transition-colors hover:text-black",
                    route.active ? "text-black font-bold" : "text-neutral-500"
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
};

export default MobileMenu;