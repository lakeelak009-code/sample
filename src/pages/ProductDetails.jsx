import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import ImageZoom from "../components/ImageZoom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, buyNow } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    api
      .get(`products/${id}/`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.image);
      })
      .catch(() => setProduct(null));
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    buyNow(product, quantity);
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        {/* LEFT: IMAGE */}
        <div className="bg-gray-100 p-6">
          <ImageZoom src={selectedImage} alt={product.name} />
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-4">Rs. {product.price}</p>

          {/* DESCRIPTION */}
          {product.description && (
            <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
              {product.description}
            </p>
          )}

          {/* QUANTITY */}
          <div className="flex items-center mb-6">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus />
            </button>
            <span className="mx-4 font-bold">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>
              <Plus />
            </button>
          </div>

          {/* BUTTONS */}
          <button
            onClick={handleAddToCart}
            className="w-full border py-3 font-bold mb-3"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="w-full bg-black text-white py-3 font-bold"
          >
            Buy Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
