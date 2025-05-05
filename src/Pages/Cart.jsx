import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    c_name: "",
    c_phone: "",
    address: "",
    courier: "steadfast",
    delivery_charge: "70",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const codTotal = total + Number(form.delivery_charge);

  useEffect(() => {
    const charge = form.courier === "redex" ? "80" : "70";
    setForm((prev) => ({ ...prev, delivery_charge: charge }));
  }, [form.courier]);

  const handleOrder = async () => {
    const { c_name, c_phone, address } = form;
    if (!c_name || !c_phone || !address) {
      toast.error("Name, Phone, and Address are required.");
      return;
    }

    const payload = {
      product_ids: cart.map((i) => i.product.id).join(","),
      s_product_qty: cart.map((i) => i.quantity).join(","),
      ...form,
      cod_amount: codTotal.toString(),
      advance: null,
      discount_amount: null,
    };
    setLoading(true);
    try {
      await axios.post(
        "https://admin.refabry.com/api/public/order/create",
        payload
      );
      toast.success("Order placed successfully!");
      dispatch(clearCart());
    } catch (err) {
      console.error(err);
      toast.error("Order failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b py-2"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">
                  ৳ {product.price} x {quantity}
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) =>
                    dispatch(
                      updateQuantity({
                        id: product.id,
                        quantity: Number(e.target.value),
                      })
                    )
                  }
                  className="w-16 border px-2"
                />
                <button
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3 className="text-xl font-bold mt-6">Total: ৳{codTotal}</h3>

          <div className="mt-6 grid gap-3">
            <input
              type="text"
              placeholder="Customer Name"
              value={form.c_name}
              onChange={(e) => setForm({ ...form, c_name: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.c_phone}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) {
                  setForm({ ...form, c_phone: val });
                }
              }}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="border p-2 rounded"
            />

            <select
              value={form.courier}
              onChange={(e) => setForm({ ...form, courier: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="steadfast">Steadfast (70৳)</option>
              <option value="redex">Redex (80৳)</option>
            </select>

            <p className="text-sm text-gray-600">
              Delivery Charge: ৳{form.delivery_charge}
            </p>

            <button
              onClick={handleOrder}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 000 16v4l3.5-3.5L12 20v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
