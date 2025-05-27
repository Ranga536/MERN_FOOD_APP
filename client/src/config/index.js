export const registerFormControls = [
  {
    name: "userName",
    label: "username",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Enter your Number",
    componentType: "input",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Name",
    name: "name",
    componentType: "input",
    type: "text",
    placeholder: "Enter Restaurant name",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter Restaurant description",
  },
  {
    label: "Email",
    name: "email",
    componentType: "input",
    placeholder: "Enter Restaurant email",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    placeholder: "Enter Restaurant number",
  },
  {
    label: "Address",
    name: "address",
    componentType: "textarea",
    placeholder: "Enter Restaurant Address",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "veg", label: "Veg" },
      { id: "non-veg", label: "Non-Veg" },
      { id: "both", label: "Both" },
    ],
  },
  {
    label: "Opening Time",
    name: "openingTime",
    componentType: "input",
    placeholder: "Enter Restaurant Opening Time",
  },
  {
    label: "Closing Time",
    name: "closingTime",
    componentType: "input",
    placeholder: "Enter Restaurant Closing Time",
  },
  {
    label: "Price Range",
    name: "priceRange",
    componentType: "input",
    placeholder: "Enter Restaurant Price Range",
  },
  {
    label: "Discount",
    name: "discount",
    componentType: "input",
    type: "number",
    placeholder: "Enter Restaurant Provided Discount ",
  },
  {
    label: "Delivery Time",
    name: "deliveryTime",
    componentType: "input",
    placeholder: "Enter Restaurant Delivery Time",
  },
    {
    label: "Rating",
    name: "rating",
    componentType: "input",
    type: "text",
    placeholder: "Enter Restaurant Rating"
  },
];

export const addMenuItemElements = [
  {
    label: "Name",
    name: "name",
    componentType: "input",
    type: "text",
    placeholder: "Enter Item Name",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter Item Description",
  },
  {
    label: "Original Price",
    name: "originalPrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter Item Original Price",
  },
  {
    label: "Offer Price",
    name: "offerPrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter Item Offer Price",
  },
  {
    label: "IS Veg",
    name: "isVeg",
    componentType: "select",
    options: [
      { id: "true", label: "Yes" },
      { id: "false", label: "No" },
    ],
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "tiffin", label: "Tiffins" },
      { id: "meal", label: "Meals" },
      { id: "drink", label: "Cool Drinks" },
      { id: "fastFood", label: "Fast Foods" },
      { id: "bakeryItem", label: "Bakery Item" },
    ],
  },
  {
    label: "Ingredients",
    name: "ingredients",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter used Ingredients",
  },
  {
    label: "Preparation Time",
    name: "preparationTime",
    componentType: "input",
    type: "text",
    placeholder: "Enter Preparation Time",
  },
  {
    label: "Rating",
    name: "rating",
    componentType: "input",
    type: "text",
    placeholder: "Enter Item Description",
  },
  {
    label: "IS Available",
    name: "isAvailable",
    componentType: "select",
    options: [
      { id: "true", label: "Yes" },
      { id: "false", label: "No" },
    ],
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    path: "/shop/listing",
  },
  // {
  //   id: "contact",
  //   label: "Contact",
  //   path: "/shop/listing",
  // },
];


export const filterOptions = {
  category: [
    { id: "veg", label: "Veg" },
    { id: "non-veg", label: "Non-Veg" },
    { id: "both", label: "Both" },
  ],
  // type: [
  //   { id: "cafe", label: "Cafe" },
  //   { id: "hotel", label: "Hotel" },
  //   { id: "bakery", label: "Bakery" },
  // ],
};

export const menuFilterOptions = {
  isVeg: [
    { id: "true", label: "Veg" },
    { id: "false", label: "Non-Veg" },
  ],
  category: [
    { id: "tiffin", label: "Tiffins" },
    { id: "meal", label: "Meals" },
    { id: "drink", label: "Cool Drinks" },
    { id: "fastFood", label: "Fast Foods" },
    { id: "bakeryItem", label: "Bakery Item" }
  ],
};
export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Any Preparation Tips",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
