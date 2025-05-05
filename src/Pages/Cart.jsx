import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import { useState } from "react";
import axios from "axios";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    c_name: "",
    c_phone: "",
    address: "",
    courier: "steadfast",
    cod_amount: "",
    delivery_charge: "80",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const codTotal = total + Number(form.delivery_charge);

  const handleOrder = async () => {
    const payload = {
      product_ids: cart.map((i) => i.product.id).join(","),
      s_product_qty: cart.map((i) => i.quantity).join(","),
      c_name: form.c_name,
      c_phone: form.c_phone,
      courier: form.courier,
      address: form.address,
      cod_amount: codTotal.toString(),
      advance: null,
      discount_amount: null,
      delivery_charge: form.delivery_charge,
    };
    console.log(payload);
    try {
      await axios.post(
        "https://admin.refabry.com/api/public/order/create",
        payload
      );
      alert("Order placed successfully!");
      dispatch(clearCart());
    } catch (err) {
      console.error(err);
      alert("Order failed.");
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
              type="number"
              placeholder="Phone Number"
              value={form.c_phone}
              onChange={(e) => setForm({ ...form, c_phone: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="border p-2 rounded"
            />

            <button
              onClick={handleOrder}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
