import React from "react";

const Modal = ({ text, onAccept, onReject }) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0, 0, 0, 0.5)] backdrop-blur-md flex justify-center items-center transition-opacity duration-300">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] transform scale-95 transition-transform duration-300 hover:scale-100">
        {/* Modal Text */}
        <p className="text-gray-900 text-lg text-center font-semibold">
          {text}
        </p>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onAccept}
            className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-all w-full mx-2 shadow-md"
          >
            ✅ Accept
          </button>
          <button
            onClick={onReject}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all w-full mx-2 shadow-md"
          >
            ❌ Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
