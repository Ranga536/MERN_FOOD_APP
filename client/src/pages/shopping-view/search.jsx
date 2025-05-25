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
  const keywordFromURL = searchParams.get("keyword") || ""; //new line
  const dispatch = useDispatch();
  const { searchResults, isLoading } = useSelector((state) => state.shopSearch);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  //new code
  useEffect(() => {
    if (keywordFromURL && keywordFromURL.trim().length > 3) {
      dispatch(getSearchResults(keywordFromURL));
      setKeyword(keywordFromURL); // sync input with URL keyword
    } else {
      dispatch(resetSearchResults());
    }
  }, [keywordFromURL]);

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

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            // onChange={(event) => setKeyword(event.target.value)}
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

      <div className="mt-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : keyword.trim().length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Search your favorite food!
          </p>
        ) : searchResults.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No results found.</p>
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
