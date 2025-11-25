'use client';
import { useState } from "react";
import { useSalary } from '@/app/products/context/page';
type Product = {
  productId: number;
  productName: string;
  quantity: string;
  price: string;
  discount: string;
  productImage: string | null;
};
const Products = () => {
  const { salarySum, setSalarySum } = useSalary();
  const [showProduct, setShowProduct] = useState(false);
  const [myProductDetails,setProductDetails] = useState(false);
  const [editBool,setEditBool] = useState(false);
  // Controlled inputs
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [product, setProduct] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return [];
    
    try {
      const savedProducts = localStorage.getItem('products');
      return savedProducts ? JSON.parse(savedProducts) : [];
    } catch (error) {
      console.error('Error loading products from localStorage:', error);
      return [];
    }
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customerQuantity,setCustomerQuantity] = useState<number>(0);
  console.log(product);

  const saveToLocalStorage = (products: Product[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('products', JSON.stringify(products));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }; 
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };
  console.log(customerQuantity);

  // Open/close popup
  const handleProduct = () => {
    setShowProduct(!showProduct);
    if (showProduct) {
      // Reset inputs when closing
      setProductName("");
      setQuantity("");
      setPrice("");
      setDiscount("");
      setProductImage(null);
    }
  };
  const productDetails = (prod:Product) => {
    setProductDetails(!myProductDetails);
    setSelectedProduct(prod);
  }
const handleEditProduct = (prod: Product) => {
  setSelectedProduct(prod);
  setEditBool(true);
};

const updateProductField = (field: string, value: string) => {
  if (!selectedProduct) return;
  
  const updatedProducts = product.map(p => 
    p.productId === selectedProduct.productId 
      ? { ...p, [field]: value }
      : p
  );
  setProduct(updatedProducts);
  saveToLocalStorage(updatedProducts);
};
  const deleteProduct = (prodId: number) => {
    const updatedProducts = product.filter(p => p.productId !== prodId);
    setProduct(updatedProducts);
    saveToLocalStorage(updatedProducts);
  }
  const addProduct = async () => {
  if (productName && quantity && price) {
    try {
      let productImageBase64 = null;
      if (productImage) {
        productImageBase64 = await fileToBase64(productImage);
      }
      
      const newProduct = {
        productId: Date.now(),
        productName,
        quantity,
        price,
        discount: discount || "0",
        productImage: productImageBase64,
      };
      
      const updatedProducts = [...product, newProduct];
      setProduct(updatedProducts);
      saveToLocalStorage(updatedProducts);
      
      setShowProduct(false);
      setProductName("");
      setQuantity("");
      setPrice("");
      setDiscount("");
      setProductImage(null);
      
    } catch (error) {
      console.error('Error adding product:', error);
      alert("Error adding product. Please try again.");
    }
  } else {
    alert("Please fill Product Name, Quantity, and Price");
  }
};
const calculateTotal = () => {
    setProductDetails(false)
    setSalarySum(prev => [...prev, Number(customerQuantity) * Number(selectedProduct?.price || 0)]);
    if (selectedProduct && customerQuantity > 0) {
    const newQuantity = Number(selectedProduct.quantity) - Number(customerQuantity);
    const updatedProducts = product.map(p => 
      p.productId === selectedProduct.productId 
        ? { ...p, quantity: newQuantity.toString()}
        : p
    );
    setProduct(updatedProducts);
    saveToLocalStorage(updatedProducts);
  }
}
console.log(salarySum);
  return (
    <> 
    {/* Main Section */}
    {product.length === 0 ? (
  <div
    className="flex items-center justify-center min-h-screen bg-gray-100"
    onClick={handleProduct}
  >
    <div className="flex flex-col items-center justify-center w-60 h-60 border-4 border-dashed border-gray-400 rounded-2xl cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-105 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg group">
      <span className="text-6xl text-gray-400 mb-3 transition-all duration-300 ease-in-out group-hover:text-blue-500 group-hover:scale-110">+</span>
      <span className="text-gray-600 text-lg font-medium transition-all duration-300 ease-in-out group-hover:text-blue-600">Add your product</span>
    </div>
  </div>
) : (
  <div className="fixed top-20 right-6 z-30">
  <button
    onClick={handleProduct}
    className="cursor-pointer flex items-center gap-3 bg-white border-2 border-dashed border-blue-400 text-blue-600 px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-50 hover:border-blue-500 active:scale-95 group"
  >
    <span className="text-2xl font-semibold group-hover:rotate-90 transition-transform duration-300">+</span>
    <span className="font-medium">Add Product</span>
  </button>
</div>
)}
      {/* Popup */}
      {showProduct && (
  <>
    {/* Overlay with smooth backdrop */}
    <div
      className="fixed inset-0 bg-black opacity-70 flex justify-center items-center z-40 backdrop-blur-sm transition-all duration-300 ease-out"
      onClick={handleProduct}
    ></div>

    {/* Popup with smooth entrance animation */}
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-2xl w-96 max-w-95vw z-50 transition-all duration-300 ease-out scale-95 animate-in fade-in-90 zoom-in-95">

      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        
        {/* Product Image Upload */}
        <div className="flex flex-col items-center">
          <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 ease-in-out cursor-pointer w-40 h-40 group">
            <label
              htmlFor="productImage"
              className="flex flex-col items-center justify-center w-full h-full text-gray-500 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 mb-2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-200 text-center">
                Upload product image
              </span>
              <span className="text-xs text-gray-400 mt-1 text-center">
                PNG, JPG, JPEG
              </span>
            </label>
            <input
              id="productImage"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-lg p-3 transition-all duration-200 ease-in-out"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          {/* Quantity & Price Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-lg p-3 transition-all duration-200 ease-in-out"
                value={quantity}
                onChange={(e) => {
                            setQuantity(e.target.value);
                          }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-lg p-3 transition-all duration-200 ease-in-out"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              min="0"
              max="100"
              placeholder="0%"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-lg p-3 transition-all duration-200 ease-in-out"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            className="flex-1 bg-gray-500 text-white cursor-pointer py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 font-medium shadow-md hover:shadow-lg"
            onClick={handleProduct}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 bg-blue-600 cursor-pointer text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 font-medium shadow-md hover:shadow-lg"
            onClick={addProduct}
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  </>
)}
      {/* Product List */}
{showProduct === false && (
  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 px-4 max-w-4xl mx-auto cursor-pointer">
    {product.map((product, index) => (
      <div
        key={index}
        className="border border-gray-200 rounded-2xl shadow-sm p-6 bg-white hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 group overflow-hidden relative"
        onClick={() => productDetails(product)}
      >
        
        {/* Product Image */}
        {product.productImage && (
          <div className="relative overflow-hidden rounded-xl bg-gray-50 mb-4">
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-40 object-contain transition-all duration-500 ease-in-out group-hover:scale-105"
            />
            {/* Overlay effect */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 ease-in-out"></div>
          </div>
        )}

        {/* Product Name */}
        <h3 className="font-bold text-lg mb-3 text-gray-800 text-center group-hover:text-blue-600 transition-colors duration-300 ease-in-out line-clamp-2">
          {product.productName}
        </h3>

        {/* Product Details */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Quantity:</span>
            <span className="text-sm font-semibold text-gray-800 bg-blue-50 px-2 py-1 rounded-full">
              {product.quantity}
            </span>
          </div>
      {Number(product.discount) > 0 ? (
              <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Price:</span>
            <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              {(Number(product.price) * (1- Number(product.discount) / 100)).toFixed(2)}
            </span>
          </div>
          ) 
          :
          (
            <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Price:</span>
            <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              {product.price} 
            </span>
          </div>
          )
}
          {product.discount && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Discount:</span>
              <span className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                {product.discount}%
              </span>
            </div>
          )}
        </div>

        {/* Action Dropdown - positioned above the hover indicator */}
        <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-in-out mb-2">
          <div className="flex justify-center gap-6">
            {/* Edit Icon */}
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors duration-300 ease-in-out text-sm text-gray-700 border border-gray-200 cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              handleEditProduct(product)
            }}
            >
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            
            {/* Delete Icon */}
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg transition-colors duration-300 ease-in-out text-sm text-gray-700 border border-gray-200 cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              deleteProduct(product.productId);
            }}
            >
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>

        {/* Hover Indicator - stays at the very bottom */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500 ease-out"></div>
      </div>
    ))}
  </div>
)}
{myProductDetails && selectedProduct && (
  <div className="fixed inset-0 bg-black opacity-80 flex justify-center items-center z-50 transition-all duration-300 ease-in-out backdrop-blur-sm">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 ease-out scale-95 ">
      
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Product Details
      </h2> 
      {/* Product Info */}
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-green-800 font-medium text-center">
            Available quantity: <span className="font-bold">{selectedProduct.quantity}</span>
          </p>
        </div>

        {/* Quantity Input */}
        
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
          <label className="text-gray-700 font-medium whitespace-nowrap">Purchase Quantity:</label>
          <input
            type="number"
            max={selectedProduct.quantity}
            onChange={(e) => {
  const value = e.target.value;
  
  // إذا الحقل فاضي
  if (value === '') {
    setCustomerQuantity(0);
    return;
  }
  const numValue = Number(value);
  if (numValue >= 1 && numValue <= Number(selectedProduct.quantity)) {
    setCustomerQuantity(numValue);
  } else if (numValue > Number(selectedProduct.quantity)) {
    setCustomerQuantity(0);
  } else if (numValue < 1) {
    setCustomerQuantity(0);
  }
}}
            className="border border-gray-300 rounded-lg p-2 w-20 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>


        {/* Price */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-xl font-bold text-blue-800">
            {Number(customerQuantity) * Number(selectedProduct.price)}
          </p>
          <p className="text-sm text-blue-600 mt-1">Total Price</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button 
          className="flex-1 bg-gray-500 cursor-pointer text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
          onClick={() => setProductDetails(false)}
        >
          Cancel
        </button>
        <button 
          className="flex-1 bg-blue-600 cursor-pointer text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          onClick={calculateTotal}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}
    {editBool && (
  <>
    {/* Overlay with 70% opacity */}
    <div
      className="fixed inset-0 bg-black opacity-80 flex justify-center items-center z-50 transition-all duration-300 ease-out"
      onClick={() => setEditBool(false)}
    ></div>

    {/* Edit Product Popup */}
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-2xl w-96 max-w-95vw z-50 transition-all duration-300 ease-out scale-95 animate-in fade-in-90 zoom-in-95">

      {/* Popup Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Product</h2>

      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        
        {/* Product Image */}
        <div className="flex flex-col items-center">
          <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 ease-in-out cursor-pointer w-40 h-40 mx-auto group">
            {/* You'll need to track which product is being edited */}
            {product[0]?.productImage && (
  <img
    src={product[0].productImage}
    alt={product[0]?.productName || 'Product image'}
    className="w-full h-full object-contain rounded-lg"
  />
)}
            <input
  type="file"
  className="hidden"
  accept="image/*"
  id="editImageInput"
  onChange={async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const productImageBase64 = await fileToBase64(file);
        
        const updatedProduct = [...product];
        updatedProduct[0] = {
          ...updatedProduct[0],
          productImage: productImageBase64, // حفظ كـBase64
        };
        setProduct(updatedProduct);
        saveToLocalStorage(updatedProduct);
      } catch (error) {
        console.error('Error converting image:', error);
      }
    }
  }}
/>
            <label 
              htmlFor="editImageInput"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-xl cursor-pointer"
            >
              <span className="text-white text-sm font-medium opacity-0 hover:opacity-100 transition-opacity duration-300">Change Image</span>
            </label>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-lg p-3 transition-all duration-200 ease-in-out"
            
              onChange={(e) => updateProductField('productName', e.target.value)}
            />
          </div>

          {/* Quantity & Price Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-lg p-3 transition-all duration-200 ease-in-out"
                 onChange={(e) => updateProductField('quantity', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-lg p-3 transition-all duration-200 ease-in-out"
                 onChange={(e) => updateProductField('price', e.target.value)}
              />
            </div>
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
            <input
              type="number"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-lg p-3 transition-all duration-200 ease-in-out"
              value={product[0]?.discount || ''}
               onChange={(e) => updateProductField('discount', e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            className="flex-1 cursor-pointer bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 font-medium shadow-md"
            onClick={() => setEditBool(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 cursor-pointer bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 font-medium shadow-md"
            onClick={() => {
              setEditBool(false);
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </>
)}
    </>
  );
};

export default Products;
