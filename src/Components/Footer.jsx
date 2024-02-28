import React from 'react';

function Footer() {
  return (
    <footer className="text-zinc-500 m-2 sm:text-sm py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} StockGenius</p>
      </div>
    </footer>
  );
}

export default Footer;