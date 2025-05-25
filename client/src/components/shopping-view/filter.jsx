import { Fragment } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "@radix-ui/react-select";
import { Leaf, Drumstick, Building2, Layers } from "lucide-react";

// Mapping for filters
const categoryIcons = {
  category: <Layers size={16} className="text-green-600" />, // Veg/non-veg
  type: <Building2 size={16} className="text-purple-600" />, // Cafe/hotel/bakery
  isVeg: <Leaf size={16} className="text-green-600" />, // Veg/non-veg
};

const ProductFilter = ({ filters, handleFilter, filterOptions }) => {
  return (
    <div className="bg-background rounded-xl shadow-md font-[Poppins] w-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-extrabold text-[#E23744]">Filters</h2>
      </div>

      {/* Large Screens - Accordion Closed */}
      <div className="hidden lg:block p-4 space-y-6">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-semibold flex items-center gap-2 text-[#333] mb-2">
                {categoryIcons[keyItem] || null}
                {keyItem}
              </h3>
              <div className="flex flex-wrap gap-3">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full cursor-pointer font-medium text-gray-800 bg-gray-100 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 hover:text-white transition-all duration-200"
                  >
                    <Checkbox
                      checked={filters?.[keyItem]?.includes(option.id) || false}
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      className="border-gray-400 data-[state=checked]:bg-pink-500"
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>

      {/* Small Devices - Accordion UI */}
      <div className="block lg:hidden p-4">
        <Accordion type="multiple" className="space-y-2">
          {Object.keys(filterOptions).map((keyItem) => (
            <AccordionItem value={keyItem} key={keyItem}>
              <AccordionTrigger className="text-base font-semibold flex gap-2">
                {categoryIcons[keyItem] || null}
                {keyItem}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {filterOptions[keyItem].map((option) => (
                    <Label
                      key={option.id}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full cursor-pointer font-medium text-gray-800 bg-gray-100 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400 hover:text-white transition-all duration-200"
                    >
                      <Checkbox
                        checked={
                          filters?.[keyItem]?.includes(option.id) || false
                        }
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                        className="border-gray-400 data-[state=checked]:bg-pink-500"
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ProductFilter;
