import Link from 'next/link'
import React from 'react'
import Button from './Button';

const Header = () => {
    const handleClick = () => {
        alert("😂 Hahaha!");
      };
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="navbar-start flex items-center">

          <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-500 transition-colors duration-300 lg:ml-4">
            Meme Generator
          </Link>
        </div>

        <div className="navbar-end flex lg:flex">
          <Button />
        </div>
      </nav>
    </header>
  );
};

export default Header;
