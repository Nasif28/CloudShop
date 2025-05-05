import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const imageUrl = `https://admin.refabry.com/storage/product/${product.product_images[0]?.name}`;

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-lg shadow hover:shadow-lg transform hover:scale-[1.01] transition p-4 flex flex-col"
    >
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <div className="flex flex-col gap-1 flex-1">
        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-600">
          {product.short_desc?.slice(0, 80)}...
        </p>
        <div className="mt-auto">
          <p className="text-primary font-semibold text-lg mt-2">
            ৳ {product.price}
          </p>
          {product.discount_amount && (
            <p className="text-sm text-red-500 line-through">
              ৳ {Number(product.price) + Number(product.discount_amount)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
