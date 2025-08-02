import ProductFilter from "@/components/shopping-view/filter";
import { filterOptions } from "@/config";
import FooterInfo from "@/components/shopping-view/footer";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredRestaurants } from "@/store/restaurants/restaurant-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

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

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { restaurantList, isLoading } = useSelector(
    (state) => state.shopRestaurants
  );

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (getSectionId, getCurrentOption) => {
    let cpyFilters = { ...filters };
    const index = Object.keys(cpyFilters).indexOf(getSectionId);

    if (index === -1) {
      cpyFilters[getSectionId] = [getCurrentOption];
    } else {
      const optionIndex = cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (optionIndex === -1) {
        cpyFilters[getSectionId].push(getCurrentOption);
      } else {
        cpyFilters[getSectionId].splice(optionIndex, 1);
      }
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };

  const handleGetLocation = () => {
    setIsLocationLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setIsLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationObj = { latitude, longitude };
        setUserLocation(locationObj);
        sessionStorage.setItem("userLocation", JSON.stringify(locationObj));
        setIsLocationLoading(false);
      },
      (error) => {
        console.error("Location error:", error);
        if (error.code === 1) {
          setLocationError("Location permission denied. Enable in browser settings.");
        } else if (error.code === 2) {
          setLocationError("Location unavailable. Try again.");
        } else if (error.code === 3) {
          setLocationError("Timed out. Trying again...");
          // Retry with less accuracy
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const locationObj = { latitude, longitude };
              setUserLocation(locationObj);
              sessionStorage.setItem("userLocation", JSON.stringify(locationObj));
              setIsLocationLoading(false);
            },
            () => {
              setLocationError("Still unable to fetch location. Try again.");
              setIsLocationLoading(false);
            },
            {
              enableHighAccuracy: false,
              timeout: 15000,
              maximumAge: 0,
            }
          );
        } else {
          setLocationError("Unknown error occurred. Try again.");
          setIsLocationLoading(false);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  };

  // Get location from sessionStorage or fetch fresh
  useEffect(() => {
    const stored = sessionStorage.getItem("userLocation");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.latitude && parsed.longitude) {
        setUserLocation(parsed);
        setIsLocationLoading(false);
        return;
      }
    }
    handleGetLocation();
  }, []);

  // Load filters & sort
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  // Update URL
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const query = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(query));
    }
  }, [filters]);

  // Fetch restaurants after location is ready
  useEffect(() => {
    if (
      locationError ||
      !userLocation ||
      typeof userLocation.latitude !== "number" ||
      typeof userLocation.longitude !== "number"
    ) {
      return;
    }

    if (filters && sort) {
      const payload = {
        ...filters,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      };
      dispatch(
        fetchAllFilteredRestaurants({
          filterParams: payload,
          sortParams: sort,
        })
      );
    }
  }, [userLocation, filters, sort, dispatch, locationError]);

  return (
    <div className="bg-gradient-to-br from-[#ffe3e3] via-[#fff0f0] to-[#ffe3e3] min-h-screen font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter
          filters={filters}
          handleFilter={handleFilter}
          filterOptions={filterOptions}
        />

        <div className="bg-gradient-to-br from-[#ffe3e3] via-[#b7d8c6] to-[#ffe3e3] w-full rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">All Restaurants</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {restaurantList.length} Restaurants
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-1" variant="outline" size="sm">
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Location Status */}
          {isLocationLoading ? (
            <div className="p-6 text-center text-sm font-semibold text-blue-600">
              📍 Detecting your location... <span className="animate-pulse">⏳</span>
            </div>
          ) : locationError ? (
            <div className="text-center font-semibold bg-white rounded-lg shadow-md m-5 p-6 text-red-600">
              📍 {locationError}
              <br />
              <Button
                onClick={handleGetLocation}
                className="mt-3 bg-blue-600 text-white hover:bg-blue-700"
              >
                📍 Try Again 
              </Button>
            </div>
          ) : userLocation && (
            <div className="p-2 text-sm text-green-700 bg-green-100 rounded mx-4 mt-2">
              📍 Using Location: Lat {userLocation.latitude}, Lng {userLocation.longitude}
            </div>
          )}

          {/* Restaurant List or Loading/Empty State */}
          {!locationError && !isLocationLoading && (
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
              ) : restaurantList && restaurantList.length > 0 ? (
                restaurantList.map((restaurantItem) => (
                  <ShoppingProductTile
                    key={restaurantItem._id}
                    product={restaurantItem}
                  />
                ))
              ) : (
                <h1 className="text-center font-semibold p-2 text-sm text-green-700 bg-green-100 rounded mx-4 mt-2 mb-10">
                  Currently We Are Not Available in Your Location!
                </h1>
              )}
            </div>
          )}

          <FooterInfo />
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;