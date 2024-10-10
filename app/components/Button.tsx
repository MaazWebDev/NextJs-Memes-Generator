'use client';

import React from 'react';

const Button = () => {
  const handleClick = () => {
    alert('😂 Hahaha!');
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-primary mt-4 flex justify-center bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 px-4 rounded-lg hover:from-blue-400 hover:to-green-300 transition-all duration-300"
    >
      Hey!
    </button>
  );
};

export default Button;
