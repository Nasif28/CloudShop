import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../Components/ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  console.log(products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="myContainer">
      <h1 className="text-4xl font-bold">Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
