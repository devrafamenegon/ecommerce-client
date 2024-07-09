"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { SearchBar } from "./ui/search-bar";
import { Billboard } from "@/types";
import MobileMenu from "./mobile-menu";

interface NavbarActionsProps {
  data: Billboard[]
};

const NavbarActions: React.FC<NavbarActionsProps> = ({
  data
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <div className="hidden md:flex lg:flex">
        <SearchBar />
      </div>
      
      <Button onClick={() => router.push("/cart")} className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag
          size={20}
          color="white"
        />
        <span className="ml-2 text-sm font-medium text-white">{cart.items.length}</span>
      </Button>
      <MobileMenu data={data}/>
    </div>
  )
}

export default NavbarActions;