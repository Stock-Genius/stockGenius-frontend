import React from 'react';

function Footer() {
  return (
    <footer className="text-zinc-500 text-xs sm:text-sm tracking-wider">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} StockGenius</p>
      </div>
    </footer>
  );
}

export default Footer;