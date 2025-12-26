import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

// Inline product list (2 products per category: badminton, tennis, shoes, squash, pickleball, padel)
const inlineProducts = [
  {
    id: 1001,
    name: "Yonex PowerDrive 100",
    price: 6200,
    originalPrice: 7750,
    discount: 20,
    category: "badminton",
    image: "/yonex1.jpg",
    brand: "Yonex",
  },
  {
    id: 1002,
    name: "Apacs Nova Strike",
    price: 5600,
    originalPrice: 7000,
    discount: 20,
    category: "badminton",
    image: "/bad2.jpg",
    brand: "Apacs",
  },
  {
    id: 1003,
    name: "Wilson Ultra Lite 270",
    price: 9200,
    originalPrice: 11500,
    discount: 20,
    category: "tennis",
    image: "/ten1.jpg",
    brand: "Wilson",
  },
  {
    id: 1004,
    name: "Head Pro Tour 270",
    price: 8500,
    originalPrice: 10625,
    discount: 20,
    category: "tennis",
    image: "/ten2.jpg",
    brand: "Head",
  },
  {
    id: 1005,
    name: "Asics Court Speed",
    price: 7200,
    originalPrice: 9000,
    discount: 20,
    category: "shoes",
    image: "/shoe1.jpg",
    brand: "Asics",
  },
  {
    id: 1006,
    name: "Adidas Rally Pro",
    price: 8000,
    originalPrice: 10000,
    discount: 20,
    category: "shoes",
    image: "/shoe2.jpg",
    brand: "Adidas",
  },
  {
    id: 1007,
    name: "Dunlop Aero 500",
    price: 4800,
    originalPrice: 6000,
    discount: 20,
    category: "squash",
    image: "/sq1.jpg",
    brand: "Dunlop",
  },
  {
    id: 1008,
    name: "Karakal Strike 300",
    price: 5200,
    originalPrice: 6500,
    discount: 20,
    category: "squash",
    image: "/sq2.jpg",
    brand: "Karakal",
  },
  {
    id: 1009,
    name: "Onix Compound Pickle",
    price: 3500,
    originalPrice: 4375,
    discount: 20,
    category: "pickleball",
    image: "/pc1.jpg",
    brand: "Onix",
  },
  {
    id: 1010,
    name: "Head Torque Pickle",
    price: 3800,
    originalPrice: 4750,
    discount: 20,
    category: "pickleball",
    image: "/pc2.jpg",
    brand: "Head",
  },
  {
    id: 1011,
    name: "NOX Atom Pro",
    price: 7600,
    originalPrice: 9500,
    discount: 20,
    category: "padel",
    image: "/p1.jpg",
    brand: "Nox",
  },
  {
    id: 1012,
    name: "Adidas Padel Elite",
    price: 8400,
    originalPrice: 10500,
    discount: 20,
    category: "padel",
    image: "/p2.jpg",
    brand: "Adidas",
  },
];
import QuickView from "../components/QuickView";
import FilterDrawer from "../components/FilterDrawer";

const Shop = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    priceRange: { min: "", max: "" },
    inStock: false,
  });

  /* FETCH PRODUCTS */
  useEffect(() => {
    // Use inline products instead of calling backend or importing external file
    console.debug && console.debug('Shop.jsx: inlineProducts count', inlineProducts.length, 'category', category);
    if (category && category !== "all") {
      const filtered = inlineProducts.filter((p) => p.category === category);
      console.debug && console.debug('Shop.jsx: filtered count', filtered.length);
      setProducts(filtered);
      setFilteredProducts(filtered);
    } else {
      setProducts(inlineProducts);
      setFilteredProducts(inlineProducts);
    }
  }, [category]);

  /* FILTER + SORT */
  useEffect(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price min
    if (filters.priceRange.min !== "") {
      result = result.filter(
        (p) => Number(p.price) >= Number(filters.priceRange.min)
      );
    }

    // Price max
    if (filters.priceRange.max !== "") {
      result = result.filter(
        (p) => Number(p.price) <= Number(filters.priceRange.max)
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } 
    else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, searchQuery, sortBy, filters]);

  return (
    <div className="min-h-screen bg-white pt-8 pb-16">
      <div className="container mx-auto px-4">

        <h1 className="text-3xl font-bold mb-8">
          {category && category !== "all"
            ? category.toUpperCase()
            : "ALL PRODUCTS"}
        </h1>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white px-6 py-2 font-bold text-black hover:bg-gray-100"
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  {product.name}
                </h3>

                <p className="text-red-600 font-bold">
                  Rs. {product.price}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found</p>
        )}
      </div>

      <QuickView
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={(newFilters) => setFilters(newFilters)}
        currentFilters={filters}
        availableBrands={Array.from(new Set(products.map((p) => p.brand))).filter(Boolean)}
        availableCategories={Array.from(new Set(products.map((p) => p.category))).filter(Boolean)}
      />
    </div>
  );
};

export default Shop;
