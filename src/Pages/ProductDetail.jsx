import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const ProductDetail = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.product.products.find((p) => p.id.toString() === id)
  );
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  if (!product) return <p className="p-4">Product not found.</p>;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    toast.success("Product added to cart");
  };

  const imageUrl = `https://admin.refabry.com/storage/product/${product.product_images[0]?.name}`;

  return (
    <div className="max-w-5xl mx-auto px-4 my-10 py-8 grid md:grid-cols-2 gap-6 bg-white rounded shadow-md">
      <div>
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-auto object-cover rounded"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.short_desc}</p>

        <div>
          <p className="text-xl font-semibold text-green-700">
            ৳ {product.price}
          </p>
          {product.discount_amount && (
            <p className="text-sm text-red-500 line-through">
              ৳ {Number(product.price) + Number(product.discount_amount)}
            </p>
          )}
        </div>

        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            <strong>Product Code:</strong> {product.code}
          </li>
          <li>
            <strong>Stock:</strong>{" "}
            {product.stock > 0 ? `${product.stock} available` : "Out of Stock"}
          </li>
          <li>
            <strong>Category ID:</strong> {product.category_id}
          </li>
          <li>
            <strong>Published:</strong> {product.is_published ? "Yes" : "No"}
          </li>
        </ul>

        <div className="flex gap-2 items-center">
          <label className="text-sm font-semibold">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1"
          />
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
