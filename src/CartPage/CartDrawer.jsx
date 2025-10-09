import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function CartDrawer({ isOpen, setIsOpen, cart }) {
 const [cartItems, setCartItems] = useState(
  (cart || []).map((item) => ({ ...item, qty: item.qty || 1 }))
);

useEffect(() => {
  setCartItems((cart || []).map((item) => ({ ...item, qty: item.qty || 1 })));
}, [cart]);

  console.log("CartDrawer items:", cartItems);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  const codThreshold = 299;
  const freeShippingThreshold = 495;

  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountToCOD = Math.max(codThreshold - subtotal, 0);
  const amountToFree = Math.max(freeShippingThreshold - subtotal, 0);

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) }
          : item
      )
    );
  };


  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // const getImageUrl = (url) =>
  //   url && url.trim() !== ""
  //     ? url
  //     : "https://via.placeholder.com/80?text=No+Image";

  // ✅ Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
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
                <h2 className="text-lg font-bold">Shopping cart</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-6 h-6 cursor-pointer" />
                </button>
              </div>

              {/* Progress Section */}
              <div className="px-5 py-3 text-sm border-b mb-4">
                {amountToCOD > 0 ? (
                  <p className="text-gray-700">
                    Spend <span className="font-semibold">₹{amountToCOD}</span>{" "}
                    more to get Cash on Delivery (COD)
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

                {/* Progress Bar */}
                <div className="mt-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full relative">
                    <div
                      className="h-2 bg-yellow-400 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-gray-500">
                    <span>₹{codThreshold}</span>
                    <span>₹{freeShippingThreshold}</span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b py-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/80?text=No+Image")
                      }
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      {item.oldPrice && (
                        <p className="text-xs line-through text-gray-400">
                          ₹{item.oldPrice}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-red-600">
                        ₹{item.price}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="px-2 py-1 border rounded"
                        >
                          -
                        </button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="px-2 py-1 border rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-gray-500 ml-3 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t px-5 py-4">
                <p className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Tax included and shipping calculated at checkout
                </p>
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 border py-3 rounded-md">
                    View cart
                  </button>
                  <button className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800">
                    Check out
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
