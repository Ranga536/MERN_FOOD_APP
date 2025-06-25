import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";

import ProductFilter from "@/components/shopping-view/filter";
import FooterInfo from "@/components/shopping-view/footer";
import ShoppingProductTile from "@/components/shopping-view/product-tile";

import { filterOptions, sortOptions } from "@/config";
import { fetchAllFilteredRestaurants } from "@/store/restaurants/restaurant-slice";

// Distance calculation function (Haversine formula)
const getDistanceInMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // Earth's radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

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

  const lastLocationRef = useRef(null);

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (sectionId, option) => {
    let updatedFilters = { ...filters };
    const existingOptions = updatedFilters[sectionId] || [];

    if (existingOptions.includes(option)) {
      updatedFilters[sectionId] = existingOptions.filter((opt) => opt !== option);
    } else {
      updatedFilters[sectionId] = [...existingOptions, option];
    }

    setFilters(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
  };

  // Request location manually via button
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        lastLocationRef.current = { latitude, longitude };
        setLocationError(null);
      },
      (error) => {
        if (error.code === 1) {
          setLocationError(
            "Location permission denied. Please enable it in browser settings."
          );
        } else {
          setLocationError("Unable to fetch location. Try again.");
        }
        console.error("Error fetching location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Watch user location continuously (optimized)
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (lastLocationRef.current) {
          const prev = lastLocationRef.current;
          const distance = getDistanceInMeters(
            prev.latitude,
            prev.longitude,
            latitude,
            longitude
          );

          if (distance < 300) return; // Skip API call if not moved much
        }

        setUserLocation({ latitude, longitude });
        lastLocationRef.current = { latitude, longitude };
        setLocationError(null);
      },
      (error) => {
        console.error("Location error:", error);
        setLocationError(
          "Location access denied or unavailable. Please allow it for better results."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Set default sort and filters
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  // Update search params in URL
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const query = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(query));
    }
  }, [filters]);

  // Fetch restaurants on location or filter/sort change
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
      const filterParamsWithLocation = {
        ...filters,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      };

      dispatch(
        fetchAllFilteredRestaurants({
          filterParams: filterParamsWithLocation,
          sortParams: sort,
        })
      );
    }
  }, [dispatch, userLocation, filters, sort, locationError]);

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
                    {sortOptions.map((item) => (
                      <DropdownMenuRadioItem key={item.id} value={item.id}>
                        {item.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Show location error with button */}
          {locationError && (
            <div className="text-center font-semibold bg-white rounded-lg shadow-md m-5 p-6 text-red-600">
              📍 {locationError}
              <br />
              <Button
                onClick={handleGetLocation}
                className="mt-3 bg-blue-600 text-white hover:bg-blue-700"
              >
                📍 Enable Location Access
              </Button>
            </div>
          )}

          {/* Restaurant List */}
          {!locationError && (
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
              ) : restaurantList.length > 0 ? (
                restaurantList.map((item) => (
                  <ShoppingProductTile key={item._id} product={item} />
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





// import ProductFilter from "@/components/shopping-view/filter";
// import { filterOptions } from "@/config";
// import FooterInfo from "@/components/shopping-view/footer";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { sortOptions } from "@/config";
// import { fetchAllFilteredRestaurants } from "@/store/restaurants/restaurant-slice";
// import { ArrowUpDownIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

// function createSearchParamsHelper(filterParams) {
//   const queryParams = [];

//   for (const [key, value] of Object.entries(filterParams)) {
//     if (Array.isArray(value) && value.length > 0) {
//       const paramValue = value.join(",");
//       queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
//     }
//   }

//   return queryParams.join("&");
// }

// const ShoppingListing = () => {
//   const dispatch = useDispatch();
//   const { restaurantList, isLoading } = useSelector(
//     (state) => state.shopRestaurants
//   );

//   const [filters, setFilters] = useState({});
//   const [sort, setSort] = useState(null);
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [userLocation, setUserLocation] = useState(null);
//   const [locationError, setLocationError] = useState(null);

//   const handleSort = (value) => {
//     setSort(value);
//   };

//   const handleFilter = (getSectionId, getCurrentOption) => {
//     let cpyFilters = { ...filters };
//     const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

//     if (indexOfCurrentSection === -1) {
//       cpyFilters = {
//         ...cpyFilters,
//         [getSectionId]: [getCurrentOption],
//       };
//     } else {
//       const indexOfCurrentOption =
//         cpyFilters[getSectionId].indexOf(getCurrentOption);

//       if (indexOfCurrentOption === -1)
//         cpyFilters[getSectionId].push(getCurrentOption);
//       else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
//     }

//     setFilters(cpyFilters);
//     sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
//   };

//   // ✅ Stable location using watchPosition
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setLocationError("Geolocation is not supported by your browser.");
//       return;
//     }

//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         console.log("📍 Updated Location:", latitude, longitude);
//         setUserLocation({ latitude, longitude });
//         setLocationError(null);
//       },
//       (error) => {
//         console.error("❌ Location Error:", error);
//         if (error.code === 1) {
//           setLocationError("Location permission denied.");
//         } else {
//           setLocationError("Location unavailable or timeout.");
//         }
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );

//     return () => {
//       navigator.geolocation.clearWatch(watchId); // clean up
//     };
//   }, []);

//   // 🟦 Manual location re-trigger
//   const handleGetLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setUserLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//         setLocationError(null);
//       },
//       (error) => {
//         console.log("Manual Location Error:", error);
//         setLocationError("Please allow location access in browser settings.");
//       }
//     );
//   };

//   // default sort and filter load
//   useEffect(() => {
//     setSort("price-lowtohigh");
//     setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
//   }, []);

//   useEffect(() => {
//     if (filters && Object.keys(filters).length > 0) {
//       const query = createSearchParamsHelper(filters);
//       setSearchParams(new URLSearchParams(query));
//     }
//   }, [filters]);

//   // fetch nearby restaurants
//   useEffect(() => {
//     if (
//       !userLocation ||
//       typeof userLocation.latitude !== "number" ||
//       typeof userLocation.longitude !== "number"
//     ) {
//       return;
//     }

//     if (filters && sort) {
//       const filterWithLocation = {
//         ...filters,
//         latitude: userLocation.latitude,
//         longitude: userLocation.longitude,
//       };

//       dispatch(
//         fetchAllFilteredRestaurants({
//           filterParams: filterWithLocation,
//           sortParams: sort,
//         })
//       );
//     }
//   }, [userLocation, filters, sort]);

//   return (
//     <div className="bg-gradient-to-br from-[#ffe3e3] via-[#fff0f0] to-[#ffe3e3] min-h-screen font-poppins">
//       <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 p-4 md:p-6">
//         <ProductFilter
//           filters={filters}
//           handleFilter={handleFilter}
//           filterOptions={filterOptions}
//         />

//         <div className="bg-gradient-to-br from-[#ffe3e3] via-[#b7d8c6] to-[#ffe3e3] w-full rounded-xl shadow-lg overflow-hidden">
//           <div className="p-4 border-b flex items-center justify-between">
//             <h2 className="text-xl font-bold text-gray-800">All Restaurants</h2>
//             <div className="flex items-center gap-3">
//               <span className="text-sm text-gray-500">
//                 {restaurantList.length} Restaurants
//               </span>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button className="flex items-center gap-1" variant="outline" size="sm">
//                     <ArrowUpDownIcon className="h-4 w-4" />
//                     <span>Sort by</span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-[200px]">
//                   <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
//                     {sortOptions.map((sortItem) => (
//                       <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
//                         {sortItem.label}
//                       </DropdownMenuRadioItem>
//                     ))}
//                   </DropdownMenuRadioGroup>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>

//           {/* ✅ Show location info or error */}
//           {userLocation && (
//             <div className="text-center text-green-800 text-sm p-2">
//               {/* 📍 You're browsing from: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)} */}
//             </div>
//           )}

//           {locationError && (
//             <div className="text-center text-red-600 font-semibold p-4">
//               {locationError}
//               <br />
//               <Button className="mt-2" onClick={handleGetLocation}>
//                 📍 Try Again – Enable Location
//               </Button>
//             </div>
//           )}

//           {/* Restaurant Grid or Empty */}
//           {!locationError && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//               {isLoading ? (
//                 [...Array(8)].map((_, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-gray-200 h-48 rounded-lg animate-pulse p-4 flex flex-col gap-2"
//                   >
//                     <div className="h-28 bg-gray-300 rounded-md"></div>
//                     <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
//                     <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
//                   </div>
//                 ))
//               ) : restaurantList && restaurantList.length > 0 ? (
//                 restaurantList.map((restaurantItem) => (
//                   <ShoppingProductTile
//                     key={restaurantItem._id}
//                     product={restaurantItem}
//                   />
//                 ))
//               ) : (
//                 <h1 className="text-center font-semibold p-2 text-sm text-green-700 bg-green-100 rounded mx-4 mt-2 mb-10">
//                   Currently We Are Not Available in Your Location!
//                 </h1>
//               )}
//             </div>
//           )}

//           <FooterInfo />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShoppingListing;



// import ProductFilter from "@/components/shopping-view/filter";
// import { filterOptions } from "@/config";
// import FooterInfo from "@/components/shopping-view/footer";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { sortOptions } from "@/config";
// import { fetchAllFilteredRestaurants } from "@/store/restaurants/restaurant-slice";
// import { ArrowUpDownIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

// function createSearchParamsHelper(filterParams) {
//   const queryParams = [];

//   for (const [key, value] of Object.entries(filterParams)) {
//     if (Array.isArray(value) && value.length > 0) {
//       const paramValue = value.join(",");
//       queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
//     }
//   }

//   return queryParams.join("&");
// }

// const ShoppingListing = () => {
//   const dispatch = useDispatch();
//   const { restaurantList, isLoading } = useSelector(
//     (state) => state.shopRestaurants
//   );

//   const [filters, setFilters] = useState({});
//   const [sort, setSort] = useState(null);
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [userLocation, setUserLocation] = useState(null);
//   const [locationError, setLocationError] = useState(null);

//   const handleSort = (value) => {
//     setSort(value);
//   };

//   const handleFilter = (getSectionId, getCurrentOption) => {
//     let cpyFilters = { ...filters };
//     const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

//     if (indexOfCurrentSection === -1) {
//       cpyFilters = {
//         ...cpyFilters,
//         [getSectionId]: [getCurrentOption],
//       };
//     } else {
//       const indexOfCurrentOption =
//         cpyFilters[getSectionId].indexOf(getCurrentOption);

//       if (indexOfCurrentOption === -1)
//         cpyFilters[getSectionId].push(getCurrentOption);
//       else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
//     }

//     setFilters(cpyFilters);
//     sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
//   };

//   const fetchUserLocation = () => {
//     if (!navigator.geolocation) {
//       setLocationError("Geolocation is not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         console.log("✅ Location Success:", latitude, longitude);
//         setUserLocation({ latitude, longitude });
//         setLocationError(null);
//       },
//       (error) => {
//         console.error("❌ Location Error:", error);
//         if (error.code === 1) {
//           setLocationError("Location permission denied. Please allow it.");
//         } else {
//           setLocationError("Location unavailable. Please try again.");
//         }
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );
//   };

//   useEffect(() => {
//     fetchUserLocation();
//   }, []);

//   useEffect(() => {
//     setSort("price-lowtohigh");
//     setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
//   }, []);

//   useEffect(() => {
//     if (filters && Object.keys(filters).length > 0) {
//       const createQueryString = createSearchParamsHelper(filters);
//       setSearchParams(new URLSearchParams(createQueryString));
//     }
//   }, [filters]);

//   useEffect(() => {
//     if (
//       locationError ||
//       !userLocation ||
//       typeof userLocation.latitude !== "number" ||
//       typeof userLocation.longitude !== "number"
//     ) {
//       return;
//     }

//     if (filters !== null && sort !== null) {
//       const filterParamsWithLocation = {
//         ...filters,
//         latitude: userLocation?.latitude,
//         longitude: userLocation?.longitude,
//       };

//       dispatch(
//         fetchAllFilteredRestaurants({
//           filterParams: filterParamsWithLocation,
//           sortParams: sort,
//         })
//       );
//     }
//   }, [dispatch, userLocation, filters, sort, locationError]);

//   return (
//     <div className="bg-gradient-to-br from-[#ffe3e3] via-[#fff0f0] to-[#ffe3e3] min-h-screen font-poppins">
//       <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 p-4 md:p-6">
//         <ProductFilter
//           filters={filters}
//           handleFilter={handleFilter}
//           filterOptions={filterOptions}
//         />

//         <div className="bg-gradient-to-br from-[#ffe3e3] via-[#b7d8c6] to-[#ffe3e3] w-full rounded-xl shadow-lg overflow-hidden">
//           <div className="p-4 border-b flex items-center justify-between">
//             <h2 className="text-xl font-bold  text-gray-800">All Restaurants</h2>
//             <div className="flex items-center gap-3">
//               <span className="text-sm text-gray-500">
//                 {restaurantList.length} Restaurants
//               </span>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button className="flex items-center gap-1" variant="outline" size="sm">
//                     <ArrowUpDownIcon className="h-4 w-4" />
//                     <span>Sort by</span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-[200px]">
//                   <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
//                     {sortOptions.map((sortItem) => (
//                       <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
//                         {sortItem.label}
//                       </DropdownMenuRadioItem>
//                     ))}
//                   </DropdownMenuRadioGroup>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>

//           {/* Show fetched coordinates */}
//           {userLocation && (
//             <div className="p-2 text-sm text-green-700 bg-green-100 rounded mx-4 mt-2">
//               📍 Using Location: Lat {userLocation.latitude}, Lng {userLocation.longitude}
//             </div>
//           )}

//           {/* Show location error with retry button */}
//           {locationError && !userLocation && (
//             <div className="text-center font-semibold bg-white rounded-lg shadow-md m-5">
//               <p className="p-4 text-red-600">📍 {locationError}</p>
//               <Button
//                 className="mb-4 bg-blue-600 text-white hover:bg-blue-700"
//                 onClick={fetchUserLocation}
//               >
//                 🔁 Try Again – Allow Location Access
//               </Button>
//             </div>
//           )}

//           {/* List or Skeleton */}
//           {!locationError && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//               {isLoading ? (
//                 [...Array(8)].map((_, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-gray-200 h-48 rounded-lg animate-pulse p-4 flex flex-col gap-2"
//                   >
//                     <div className="h-28 bg-gray-300 rounded-md"></div>
//                     <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
//                     <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
//                   </div>
//                 ))
//               ) : restaurantList && restaurantList.length > 0 ? (
//                 restaurantList.map((restaurantItem) => (
//                   <ShoppingProductTile key={restaurantItem._id} product={restaurantItem} />
//                 ))
//               ) : (
//                 <h1 className="text-center font-semibold p-2 text-sm text-green-700 bg-green-100 rounded mx-4 mt-2 mb-10">
//                   Currently We Are Not Available in Your Location!
//                 </h1>
//               )}
//             </div>
//           )}

//           <FooterInfo />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShoppingListing;



// import ProductFilter from "@/components/shopping-view/filter";
// import { filterOptions } from "@/config";
// import FooterInfo from "@/components/shopping-view/footer";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { sortOptions } from "@/config";
// import { fetchAllFilteredRestaurants } from "@/store/restaurants/restaurant-slice";
// import { ArrowUpDownIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

// function createSearchParamsHelper(filterParams) {
//   const queryParams = [];

//   for (const [key, value] of Object.entries(filterParams)) {
//     if (Array.isArray(value) && value.length > 0) {
//       const paramValue = value.join(",");
//       queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
//     }
//   }

//   return queryParams.join("&");
// }

// const ShoppingListing = () => {
//   const dispatch = useDispatch();
//   const { restaurantList, isLoading } = useSelector(
//     (state) => state.shopRestaurants
//   );

//   const [filters, setFilters] = useState({});
//   const [sort, setSort] = useState(null);
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [userLocation, setUserLocation] = useState(null);
//   const [locationError, setLocationError] = useState(null);

//   const handleSort = (value) => {
//     setSort(value);
//   };

//   const handleFilter = (getSectionId, getCurrentOption) => {
//     let cpyFilters = { ...filters };
//     const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

//     if (indexOfCurrentSection === -1) {
//       cpyFilters = {
//         ...cpyFilters,
//         [getSectionId]: [getCurrentOption],
//       };
//     } else {
//       const indexOfCurrentOption =
//         cpyFilters[getSectionId].indexOf(getCurrentOption);

//       if (indexOfCurrentOption === -1)
//         cpyFilters[getSectionId].push(getCurrentOption);
//       else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
//     }

//     setFilters(cpyFilters);
//     sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
//   };

//   const handleGetLocation = () => {
//   if (!navigator.geolocation) {
//     alert("Geolocation is not supported by your browser.");
//     return;
//   }

//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       // ✅ Success — permission granted
//       console.log("User allowed location");
//       console.log("Latitude:", position.coords.latitude);
//       console.log("Longitude:", position.coords.longitude);
//       setUserLocation({
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//       });
//       setLocationError(null);
//     },
//     (error) => {
//       // ❌ Error or permission denied
//       if (error.code === 1) {
//         setLocationError(
//           "Location permission denied. Please allow it in browser settings."
//         );
//       } else {
//         setLocationError("Unable to fetch location. Try again.");
//       }
//       console.log("Error fetching location:", error);
//     }
//   );
// };


//   // Get accurate user location on mount
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setLocationError("Geolocation is not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         console.log("✅ Accurate Location from device:", latitude, longitude);

//         setUserLocation({ latitude, longitude });
//         setLocationError(null);
//       },
//       (error) => {
//         console.error("❌ Location Error:", error);
//         setLocationError(
//           "Location access denied or unavailable. Please enable it for better results."
//         );
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );
//   }, []);

//   // set default sort and filters on mount
//   useEffect(() => {
//     setSort("price-lowtohigh");
//     setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
//   }, []);

//   // update URL search params when filters change
//   useEffect(() => {
//     if (filters && Object.keys(filters).length > 0) {
//       const createQueryString = createSearchParamsHelper(filters);
//       setSearchParams(new URLSearchParams(createQueryString));
//     }
//   }, [filters]);

//   // fetch restaurants only if location available
//   useEffect(() => {
//     if (
//       locationError ||
//       !userLocation ||
//       typeof userLocation.latitude !== "number" ||
//       typeof userLocation.longitude !== "number"
//     ) {
//       return;
//     }

//     if (filters !== null && sort !== null) {
//       const filterParamsWithLocation = {
//         ...filters,
//         latitude: userLocation?.latitude,
//         longitude: userLocation?.longitude,
//       };

//       dispatch(
//         fetchAllFilteredRestaurants({
//           filterParams: filterParamsWithLocation,
//           sortParams: sort,
//         })
//       );
//     }
//   }, [dispatch, userLocation, filters, sort, locationError]);

//   return (
//     <div className="bg-gradient-to-br from-[#ffe3e3] via-[#fff0f0] to-[#ffe3e3] min-h-screen font-poppins">
//       <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 p-4 md:p-6">
//         <ProductFilter
//           filters={filters}
//           handleFilter={handleFilter}
//           filterOptions={filterOptions}
//         />

//         <div className="bg-gradient-to-br from-[#ffe3e3] via-[#b7d8c6] to-[#ffe3e3] w-full rounded-xl shadow-lg overflow-hidden">
//           <div className="p-4 border-b flex items-center justify-between">
//             <h2 className="text-xl font-bold  text-gray-800">All Restaurants</h2>
//             <div className="flex items-center gap-3">
//               <span className="text-sm text-gray-500">
//                 {restaurantList.length} Restaurants
//               </span>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button className="flex items-center gap-1" variant="outline" size="sm">
//                     <ArrowUpDownIcon className="h-4 w-4" />
//                     <span>Sort by</span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-[200px]">
//                   <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
//                     {sortOptions.map((sortItem) => (
//                       <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
//                         {sortItem.label}
//                       </DropdownMenuRadioItem>
//                     ))}
//                   </DropdownMenuRadioGroup>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>

//           {/* Debug: Show fetched coordinates */}
//           {userLocation && ( null
//             // <div className="p-2 text-sm text-green-700 bg-green-100 rounded mx-4 mt-2">
//             //   📍 Using Location: Lat {userLocation.latitude}, Lng {userLocation.longitude}
//             // </div>
//           )}

//           {/* Show location error if any */}
//           {locationError && (
//             <div className=" text-center font-semibold bg-white rounded-lg shadow-md m-5">
//               <p className="p-6 text-center text-red-600 font-semibold">📍{locationError} <br/> And <br/> To See Nearby Restaurants To You.</p>
//             </div>
//   //           <div className="p-4 text-red-600 text-center">
//   //   <p>{locationError}</p>
//   //   <button
//   //     onClick={handleGetLocation}
//   //     className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//   //   >
//   //     📍 Try Again – Allow Location Access
//   //   </button>
//   // </div>
//           )}

//           {/* List or Skeleton */}
//           {!locationError && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//               {isLoading ? (
//                 [...Array(8)].map((_, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-gray-200 h-48 rounded-lg animate-pulse p-4 flex flex-col gap-2"
//                   >
//                     <div className="h-28 bg-gray-300 rounded-md"></div>
//                     <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
//                     <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
//                   </div>
//                 ))
//               ) : restaurantList && restaurantList.length > 0 ? (
//                 restaurantList.map((restaurantItem) => (
//                   <ShoppingProductTile key={restaurantItem._id} product={restaurantItem} />
//                 ))
//               ) : (
//                 <h1 className="text-center font-semibold p-2 text-sm text-green-700 bg-green-100 rounded mx-4 mt-2 mb-10">Currently We Are Not Available in Location!</h1>
//               )}
//             </div>
//           )}

//           <FooterInfo />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShoppingListing;



//original code
// import ProductFilter from "@/components/shopping-view/filter";
// import { filterOptions } from "@/config";
// import FooterInfo from "@/components/shopping-view/footer";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { sortOptions } from "@/config";
// import { fetchAllFilteredRestaurants } from "@/store/restaurants/restaurant-slice";
// import { ArrowUpDownIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

// function createSearchParamsHelper(filterParams) {
//   const queryParams = [];

//   for (const [key, value] of Object.entries(filterParams)) {
//     if (Array.isArray(value) && value.length > 0) {
//       const paramValue = value.join(",");

//       queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
//     }
//   }

//   return queryParams.join("&");
// }

// const ShoppingListing = () => {
//   const dispatch = useDispatch();
//   const { restaurantList, isLoading } = useSelector(
//     (state) => state.shopRestaurants
//   );
//   const [filters, setFilters] = useState({});
//   const [sort, setSort] = useState(null);
//   const [searchParams, setSearchParams] = useSearchParams();

//   const handleSort = (value) => {
//     setSort(value);
//   };

//   const handleFilter = (getSectionId, getCurrentOption) => {
//     let cpyFilters = { ...filters };
//     const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

//     if (indexOfCurrentSection === -1) {
//       cpyFilters = {
//         ...cpyFilters,
//         [getSectionId]: [getCurrentOption],
//       };
//     } else {
//       const indexOfCurrentOption =
//         cpyFilters[getSectionId].indexOf(getCurrentOption);

//       if (indexOfCurrentOption === -1)
//         cpyFilters[getSectionId].push(getCurrentOption);
//       else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
//     }

//     setFilters(cpyFilters);
//     sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
//   };

//   //set default sort option
//   useEffect(() => {
//     setSort("price-lowtohigh");
//     setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
//   }, []);

//   useEffect(() => {
//     if (filters && Object.keys(filters).length > 0) {
//       const createQueryString = createSearchParamsHelper(filters);
//       setSearchParams(new URLSearchParams(createQueryString));
//     }
//   }, [filters]);

//   //fetch list of restaurants
//   useEffect(() => {
//     if (filters !== null && sort !== null)
//       dispatch(
//         fetchAllFilteredRestaurants({ filterParams: filters, sortParams: sort })
//       );
//   }, [dispatch, sort, filters]);

//   return (
//     <div className="bg-gradient-to-br from-[#ffe3e3] via-[#fff0f0] to-[#ffe3e3] min-h-screen font-poppins">
//       <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 p-4 md:p-6">
//         <ProductFilter
//           filters={filters}
//           handleFilter={handleFilter}
//           filterOptions={filterOptions}
//         />

//         <div className="bg-gradient-to-br from-[#ffe3e3] via-[#b7d8c6] to-[#ffe3e3] w-full rounded-xl shadow-lg overflow-hidden">
//           <div className="p-4 border-b flex items-center justify-between">
//             <h2 className="text-xl font-bold  text-gray-800">
//               All Restaurants
//             </h2>
//             <div className="flex items-center gap-3">
//               <span className="text-sm text-gray-500">
//                 {restaurantList.length} Restaurants
//               </span>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     className="flex items-center gap-1"
//                     variant="outline"
//                     size="sm"
//                   >
//                     <ArrowUpDownIcon className="h-4 w-4" />
//                     <span>Sort by</span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-[200px]">
//                   <DropdownMenuRadioGroup
//                     value={sort}
//                     onValueChange={handleSort}
//                   >
//                     {sortOptions.map((sortItem) => (
//                       <DropdownMenuRadioItem
//                         value={sortItem.id}
//                         key={sortItem.id}
//                       >
//                         {sortItem.label}
//                       </DropdownMenuRadioItem>
//                     ))}
//                   </DropdownMenuRadioGroup>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>

//           {/* List or Skeleton */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//             {isLoading ? (
//               [...Array(8)].map((_, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-gray-200 h-48 rounded-lg animate-pulse p-4 flex flex-col gap-2"
//                 >
//                   <div className="h-28 bg-gray-300 rounded-md"></div>
//                   <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
//                   <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
//                 </div>
//               ))
//             ) : restaurantList && restaurantList.length > 0 ? (
//               restaurantList.map((restaurantItem) => (
//                 <ShoppingProductTile
//                   key={restaurantItem._id}
//                   product={restaurantItem}
//                 />
//               ))
//             ) : (
//               <h1 className="text-center font-semibold">No Results Found!</h1>
//             )}
//           </div>

//           <FooterInfo />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShoppingListing;
