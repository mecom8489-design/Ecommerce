import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ isOpen, setIsOpen }) {
  const { cart, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + item.finalPrice * (item.qty || 1),
    0
  );

  const COD_THRESHOLD = 299;
  const FREE_SHIP_THRESHOLD = 495;

  const progress = Math.min((subtotal / FREE_SHIP_THRESHOLD) * 100, 100);
  const amountToCOD = Math.max(COD_THRESHOLD - subtotal, 0);
  const amountToFree = Math.max(FREE_SHIP_THRESHOLD - subtotal, 0);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b px-5 py-3">
              <h2 className="text-lg font-bold">Shopping Cart</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 cursor-pointer" />
              </button>
            </div>

            {/* Progress Section */}
            <div className="px-5 py-3 text-sm border-b mb-4">
              {amountToCOD > 0 ? (
                <p className="text-gray-700">
                  Spend <span className="font-semibold">₹{amountToCOD}</span>{" "}
                  more to get COD
                </p>
              ) : amountToFree > 0 ? (
                <p className="text-gray-700">
                  Spend <span className="font-semibold">₹{amountToFree}</span>{" "}
                  more to get Free Shipping
                </p>
              ) : (
                <p className="text-green-600 font-medium">
                  You unlocked Free Shipping 🎉
                </p>
              )}

              <div className="mt-2">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-yellow-400 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1 text-gray-500">
                  <span>₹{COD_THRESHOLD}</span>
                  <span>₹{FREE_SHIP_THRESHOLD}</span>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-5">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                  Your cart is empty
                </p>
              ) : (
                cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 border-b py-4 cursor-pointer"
                    onClick={() =>
                      navigate(`/ProductPage/products/${product.id}`, {
                        state: { product },
                      })
                    }
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://via.placeholder.com/80?text=No+Image")
                      }
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{product.name}</h3>

                      {/* Prices */}
                      <div className="flex items-center">
                        <p className="text-sm font-semibold text-red-600">
                          ₹{Math.floor(product.finalPrice)}
                        </p>
                        <p className="text-gray-500 text-sm line-through ml-2">
                          ₹{Math.floor(product.price)}
                        </p>
                      </div>

                      {/* Qty Buttons */}
                      <div className="flex items-center gap-2 mt-1 ">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                             updateQty(product.id, -1)
                          }}
                          className="px-2 py-1 border rounded cursor-pointer"
                          disabled={(product.qty || 1) <= 1} // Prevent qty < 1
                        >
                          -
                        </button>

                        <span>{product.qty || 1}</span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                             updateQty(product.id, 1)
                          }}
                          className="px-2 py-1 border rounded cursor-pointer"
                        >
                          +
                        </button>

                        <button
                        onClick={(e) => {
                            e.stopPropagation();
                             removeFromCart(product.id, 1)
                          }}
                          className="text-sm text-gray-500 ml-3 hover:text-red-600 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <h4 className="text-sm text-amber-700 font-bold">
                        Total
                      </h4>
                      <p className="font-semibold text-sm">
                        ₹{Math.floor(product.finalPrice * (product.qty || 1))}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t px-5 py-4">
              <p className="flex justify-between text-lg font-semibold">
                <span className="text-green-500">Grand total</span>
                <span>₹{Math.floor(subtotal)}</span>
              </p>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 border py-3 rounded-md">
                  View Cart
                </button>
                <button className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800">
                  Check Out
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
