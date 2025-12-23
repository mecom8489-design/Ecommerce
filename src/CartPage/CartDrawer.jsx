import { useEffect, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/LoginAuth.jsx";
import { getCartFromDB, deleteCart } from "../apiroutes/userApi";



export default function CartDrawer({ isOpen, setIsOpen }) {
  const { cart, updateQty, removeFromCart, setCart } = useCart();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  useEffect(() => {
    const loadCart = async () => {
      try {
        if (user?.id) {
          const res = await getCartFromDB(user.id);
          setCart(res?.data?.data || []);
        }
      } catch (error) {
        console.error("Error fetching Cart:", error);
        setCart([]);
      }
    };

    loadCart();

    const refreshCart = () => loadCart();
    window.addEventListener("cartUpdated", refreshCart);

    return () =>
      window.removeEventListener("cartUpdated", refreshCart);
  }, [user]);


  const handleRemove = async (productId) => {
    removeFromCart(productId);
    if (!user?.id) return;
    try {
      await deleteCart(user.id, productId);
    } catch (err) {
      console.error("Failed to remove Cart item:", err);
    }
  };

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

  // Prevent background scroll when drawer open
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
            className="fixed top-0 right-0 h-full bg-white shadow-2xl z-50 flex flex-col w-full sm:w-[384px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b px-[20px] py-[16px]">
              <h2 className="text-[18px] font-bold">Shopping Cart</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-[24px] h-[24px] cursor-pointer" />
              </button>
            </div>

            {/* Progress Section */}
            <div className="px-[20px] py-[16px] text-[14px] border-b mb-[16px]">
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

              <div className="mt-[8px]">
                <div className="w-full h-[8px] bg-gray-200 rounded-full">
                  <div
                    className="h-[8px] bg-yellow-400 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[12px] mt-[4px] text-gray-500">
                  <span>₹{COD_THRESHOLD}</span>
                  <span>₹{FREE_SHIP_THRESHOLD}</span>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-[20px]">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-[40px]">
                  Your cart is empty
                </p>
              ) : (
                cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-[16px] border-b py-[16px] cursor-pointer"
                    onClick={() =>
                      navigate(`/ProductPage/products/${product.id}`, {
                        state: { product },
                      })
                    }
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[64px] h-[64px] object-cover rounded"
                      onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/80?text=No+Image")
                      }
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-[14px]">
                        {product.name}
                      </h3>

                      {/* Prices */}
                      <div className="flex items-center">
                        <p className="text-[14px] font-semibold text-red-600">
                          ₹{Math.floor(product.finalPrice)}
                        </p>
                        <p className="text-gray-500 text-[12px] line-through ml-[8px]">
                          ₹{Math.floor(product.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-[8px] mt-[4px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQty(product.id, -1);
                          }}
                          className="px-[8px] py-[4px] border rounded cursor-pointer"
                          disabled={(product.qty || 1) <= 1}
                        >
                          -
                        </button>

                        <span className="text-[14px]">{product.qty || 1}</span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQty(product.id, 1);
                          }}
                          className="px-[8px] py-[4px] border rounded cursor-pointer"
                        >
                          +
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(product.id);
                          }}
                          className="text-[12px] text-gray-500 ml-[12px] hover:text-red-600 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <h4 className="text-[12px] text-amber-700 font-bold">
                        Total
                      </h4>
                      <p className="font-semibold text-[14px]">
                        ₹{Math.floor(product.finalPrice * (product.qty || 1))}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-[20px] border-t bg-white">
              <div className="flex justify-between items-center mb-[16px]">
                <span className="font-semibold text-gray-700">Subtotal</span>
                <span className="font-bold text-[18px]">
                  ₹{Math.floor(subtotal)}
                </span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/ProductPage/products/Checkout/cart", {
                    state: { products: cart, isCartCheckout: true },
                  });
                }}
                className="w-full bg-orange-500 text-white py-[12px] rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={cart.length === 0}
              >
                Place Order
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
