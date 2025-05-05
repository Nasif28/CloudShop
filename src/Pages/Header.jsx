import { Link } from "react-router";
import { useSelector } from "react-redux";

const Header = () => {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="myContainer">
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-700">
          Cloud Core Shop
        </Link>

        <Link to="/cart" className="relative text-blue-600 font-medium">
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
