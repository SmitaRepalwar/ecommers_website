import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from '../store/slices/cartSlice';
import Header from '../components/Header';
import CheckoutModel from '../components/CheckoutModel';

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  console.log('cart', cart)
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Static promo codes with discount percentage
  const promoCodes = {
    DISCOUNT10: 10,
    SAVE20: 20,
    FESTIVE5: 5,
  };

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (promoCodes[code]) {
      setPromoDiscountPercent(promoCodes[code]);
      setDiscountApplied(true);
    } else {
      alert('Invalid Promo Code');
      setDiscountApplied(false);
      setPromoDiscountPercent(0);
    }
  };

  const getPriceDetails = () => {
    const mrp = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const price = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discount = mrp - price;
    const tax = price * 0.1;
    const promoDiscount = discountApplied ? price * (promoDiscountPercent / 100) : 0;
    const total = price + tax - promoDiscount;

    return { mrp, discount, tax, promoDiscount, total };
  };

  const { mrp, discount, tax, promoDiscount, total } = getPriceDetails();

  return (
    <>
      <Header />
      <div className="p-4 max-w-4xl mx-auto pb-20">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="text-sm text-gray-600">
                    Price: ${item.product.price} / MRP: ${item.product.mrp}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  className="border p-1 rounded"
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(updateQuantity({ id: item.product.id, quantity: Number(e.target.value) }))
                  }
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <>
            <div className="mt-6">
              <h2 className="font-semibold mb-2">Apply Promo Code</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={handleApplyPromo}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Apply
                </button>
              </div>
              {discountApplied && (
                <p className="text-green-600 text-sm mt-1">
                  Promo applied ({promoDiscountPercent}% off)
                </p>
              )}
            </div>

            <div className="mt-6 border-t pt-4">
              <h2 className="font-semibold mb-2">Price Details</h2>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span>${mrp.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between">
                    <span>Promo Discount</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow p-4 flex justify-between items-center md:hidden">
            <span className="font-bold">${total.toFixed(2)}</span>
            <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setIsModalOpen(true)}
                >
              Checkout
            </button>
          </div>
        )}
        {isModalOpen && <CheckoutModel setIsModalOpen={setIsModalOpen}/>}
      </div>
    </>
  );
};

export default CartPage;
