import React, { useState } from "react";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutModel from "./CheckoutModel";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const cartItemCount = cart.length;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div onClick={() => navigate("/")} className="text-2xl font-bold text-indigo-600 cursor-pointer">
          ShopEase
        </div>

        <div className="flex items-center space-x-4 text-gray-700">
          <nav className="hidden md:flex space-x-4 text-gray-700 font-medium">
            <a href="/" className="hover:text-indigo-600 transition">Home</a>
            <a href="/products" className="hover:text-indigo-600 transition">Shop</a>
          </nav>

          <div onClick={() => navigate("/cart")} className="relative cursor-pointer hover:text-indigo-600 transition">
            <FiShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                {cartItemCount}
              </span>
            )}
          </div>

          <div  onClick={() => setIsModalOpen(true)} className="cursor-pointer hover:text-indigo-600 transition">
            <FiUser size={28} />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-2 p-4 text-gray-700 font-medium">
            <li>
              <a href="/" className="block px-2 py-2 rounded hover:bg-indigo-50 hover:text-indigo-600 transition" onClick={() => setMobileMenuOpen(false)}>Home</a>
            </li>
            <li>
              <a href="/products" className="block px-2 py-2 rounded hover:bg-indigo-50 hover:text-indigo-600 transition" onClick={() => setMobileMenuOpen(false)}>Shop</a>
            </li>
          </ul>
        </nav>
      )}
      {isModalOpen && <CheckoutModel setIsModalOpen={setIsModalOpen} login/>}
    </header>
  );
};

export default Header;
