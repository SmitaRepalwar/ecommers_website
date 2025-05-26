import React, { useEffect, useState } from 'react';

const CheckoutModel = ({ setIsModalOpen, login }) => {
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Load saved data if exists
    const savedData = localStorage.getItem('checkoutDetails');
    if (savedData && login) {
      setFormData(JSON.parse(savedData));
    }
  }, [login]);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('checkoutDetails', JSON.stringify(formData));
    setFormSubmitted(true);
  };

  return (
    <div className="fixed inset-0 p-6 bg-black bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        {!formSubmitted ? (
          <>
            <p className="text-xl font-bold mb-4">{login ? 'Welcome back!' : 'Enter your details before checkout'}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border p-2 rounded w-full"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border p-2 rounded w-full"
                required
              />
              <textarea
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="border p-2 rounded w-full"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-green-600 text-xl font-bold mb-4">Success!</h2>
            <p className="text-gray-700 mb-4">Your order has been placed.</p>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setFormSubmitted(false);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModel;
