import ProductFilter from "@/components/shopping-view/filter";
import FooterInfo from "@/components/shopping-view/footer";
import UserMenuItemTile from "@/components/shopping-view/menu-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { menuFilterOptions, sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/restaurants/cart-slice";
import { fetchAllFilteredMenuItems } from "@/store/restaurants/menu-items-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

const UserMenuItems = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userMenuItemsList, isLoading } = useSelector(
    (state) => state.shopMenuItems
  );
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (getSectionId, getCurrentOption) => {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("menuFilters", JSON.stringify(cpyFilters));
  };

  const handleAddToCart = (getCurrentMenuId) => {
    dispatch(
      addToCart({ userId: user?.id, menuItemId: getCurrentMenuId, quantity: 1 })
    )
      .unwrap()
      .then((data) => {
        toast.success(data.message);
        dispatch(fetchCartItems(user?.id));
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong");
      });
  };

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("menuFilters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (id) {
      if (filters !== null && sort !== null)
        dispatch(
          fetchAllFilteredMenuItems({
            id,
            filterParams: filters,
            sortParams: sort,
          })
        );
    }
  }, [dispatch, id, sort, filters]);

  return (
    <div className="bg-gradient-to-br from-[#ffe3e3] via-[#fff0f0] to-[#ffe3e3] min-h-screen font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter
          filters={filters}
          handleFilter={handleFilter}
          filterOptions={menuFilterOptions}
        />

        <div className="bg-gradient-to-br from-[#ffe3e3] via-[#b7d8c6] to-[#ffe3e3] w-full rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold  text-gray-800">All Menu Items</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {userMenuItemsList.length} Items
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="flex items-center gap-1"
                    variant="outline"
                    size="sm"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={handleSort}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* List or Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {isLoading ? (
              [...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-200 h-48 rounded-lg animate-pulse p-4 flex flex-col gap-2"
                >
                  <div className="h-28 bg-gray-300 rounded-md"></div>
                  <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                </div>
              ))
            ) : userMenuItemsList && userMenuItemsList.length > 0 ? (
              userMenuItemsList.map((userMenuItem) => (
                <UserMenuItemTile
                  key={userMenuItem._id}
                  product={userMenuItem}
                  handleAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <h1 className="text-center font-semibold">No Items Found!</h1>
            )}
          </div>

          <FooterInfo />
        </div>
      </div>
    </div>
  );
};

export default UserMenuItems;
