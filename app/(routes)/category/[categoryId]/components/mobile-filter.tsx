"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";

import { Color, Size } from "@/types";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import Filter from "./filter";

interface MobileFilterProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  sizes,
  colors
}) => {
  const [open, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Filters
        <Plus size={20} />
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

            {/* Render filters */}
            <div className="p-4">
              <Filter 
                valueKey="sizeId"
                name="Sizes"
                data={sizes}
              />

              <Filter 
                valueKey="colorId"
                name="Colors"
                data={colors}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
};

export default MobileFilter;