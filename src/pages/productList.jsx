import { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // customize your page size

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(["all", ...data]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url =
          selectedCategory === "all"
            ? "https://fakestoreapi.com/products"
            : `https://fakestoreapi.com/products/category/${selectedCategory}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🛍️ Fake Store Products
      </h1>

      {/* Category Filter */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center text-gray-500">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Grid Layout */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-contain p-4"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-2">{product.title}</h2>
                <p className="text-gray-600 text-sm mt-1 capitalize">{product.category}</p>
                <p className="text-blue-600 font-bold mt-2">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Buttons */}
      {!loading && !error && products.length > itemsPerPage && (
        <div className="flex justify-center space-x-3 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-gray-200 px-4 py-2 rounded-md disabled:opacity-50"
          >
            Prev
          </button>
          <span className="self-center text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
