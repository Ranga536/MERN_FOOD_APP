import UserMenuItemTile from "@/components/shopping-view/menu-tile";
import { Input } from "@/components/ui/input";
import { addToCart, fetchCartItems } from "@/store/restaurants/cart-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/restaurants/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const SearchFoodItems = () => {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordFromURL = searchParams.get("keyword") || "";

  const dispatch = useDispatch();
  const { searchResults, isLoading } = useSelector((state) => state.shopSearch);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);


    const handleGetLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      // ✅ Success — permission granted
      console.log("User allowed location");
      console.log("Latitude:", position.coords.latitude);
      console.log("Longitude:", position.coords.longitude);
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLocationError(null);
    },
    (error) => {
      // ❌ Error or permission denied
      if (error.code === 1) {
        setLocationError(
          "Location permission denied. Please allow it in browser settings."
        );
      } else {
        setLocationError("Unable to fetch location. Try again.");
      }
      console.log("Error fetching location:", error);
    }
  );
};

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationError(null);
      },
      (error) => {
        setLocationError("Location permission denied.");
      }
    );
  }, []);

  // Handle keyword + location changes
  useEffect(() => {
    if (
      keywordFromURL &&
      keywordFromURL.trim().length > 3 &&
      userLocation &&
      typeof userLocation.latitude === "number" &&
      typeof userLocation.longitude === "number"
    ) {
      dispatch(
        getSearchResults({
          keyword: keywordFromURL,
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        })
      );
      setKeyword(keywordFromURL);
    } else {
      dispatch(resetSearchResults());
    }
  }, [keywordFromURL, userLocation]);

  const handleAddToCart = (menuId) => {
    dispatch(addToCart({ userId: user?.id, menuItemId: menuId, quantity: 1 }))
      .unwrap()
      .then((data) => {
        toast.success(data.message);
        dispatch(fetchCartItems(user?.id));
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong");
      });
  };

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => {
              const newKeyword = event.target.value;
              setKeyword(newKeyword);
              setSearchParams(new URLSearchParams({ keyword: newKeyword }));
            }}
            className="py-6"
            placeholder="Search Food Items..."
          />
        </div>
      </div>

      {locationError && (
        <div className="text-center text-red-600 font-semibold mb-4">
          <p>{locationError}</p>
          <button
      onClick={handleGetLocation}
      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      📍 Please Allow Location Access
    </button>
        </div>
      )}

      <div className="mt-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : keyword.trim().length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Search your favorite food!
          </p>
        ) : searchResults.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No Items Found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {searchResults.map((item) => (
              <UserMenuItemTile
                key={item._id}
                product={item}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFoodItems;




// import UserMenuItemTile from "@/components/shopping-view/menu-tile";
// import { Input } from "@/components/ui/input";
// import { addToCart, fetchCartItems } from "@/store/restaurants/cart-slice";
// import {
//   getSearchResults,
//   resetSearchResults,
// } from "@/store/restaurants/search-slice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { toast } from "sonner";

// const SearchFoodItems = () => {
//   const [keyword, setKeyword] = useState("");
//   const [searchParams, setSearchParams] = useSearchParams();
//   const keywordFromURL = searchParams.get("keyword") || ""; //new line
//   const dispatch = useDispatch();
//   const { searchResults, isLoading } = useSelector((state) => state.shopSearch);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);

//   //new code
//   useEffect(() => {
//     if (keywordFromURL && keywordFromURL.trim().length > 3) {
//       dispatch(getSearchResults(keywordFromURL));
//       setKeyword(keywordFromURL); // sync input with URL keyword
//     } else {
//       dispatch(resetSearchResults());
//     }
//   }, [keywordFromURL]);

//   const handleAddToCart = (getCurrentMenuId) => {
//     dispatch(
//       addToCart({ userId: user?.id, menuItemId: getCurrentMenuId, quantity: 1 })
//     )
//       .unwrap()
//       .then((data) => {
//         toast.success(data.message);
//         dispatch(fetchCartItems(user?.id));
//       })
//       .catch((error) => {
//         toast.error(error?.message || "Something went wrong");
//       });
//   };

//   return (
//     <div className="container mx-auto md:px-6 px-4 py-8">
//       <div className="flex justify-center mb-8">
//         <div className="w-full flex items-center">
//           <Input
//             value={keyword}
//             name="keyword"
//             // onChange={(event) => setKeyword(event.target.value)}
//             onChange={(event) => {
//               const newKeyword = event.target.value;
//               setKeyword(newKeyword);
//               setSearchParams(new URLSearchParams({ keyword: newKeyword }));
//             }}
//             className="py-6"
//             placeholder="Search Food Items..."
//           />
//         </div>
//       </div>

//       <div className="mt-4">
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : keyword.trim().length === 0 ? (
//           <p className="text-center text-gray-500 text-lg">
//             Search your favorite food!
//           </p>
//         ) : searchResults.length === 0 ? (
//           <p className="text-center text-gray-500 text-lg">No results found.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {searchResults.map((item) => (
//               <UserMenuItemTile
//                 key={item._id}
//                 product={item}
//                 handleAddToCart={handleAddToCart}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchFoodItems;
