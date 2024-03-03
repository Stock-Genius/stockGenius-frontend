import React, { useState } from 'react';

function YourComponent({ items }) {
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter items based on input value
    const filtered = items.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredItems(filtered);
  };

  const handleSelectChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setFilteredItems([]); 
  };

  return (
    <div className="mb-6 relative">
      <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select an item <span className="text-red-500">*</span></label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Type to search..."
        className="mt-1 block bg-gray-200 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-third dark:border-none dark:text-gray-300"
      />
      {isFocused && (
        <div className="absolute top-full w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-b-md shadow-md z-10">
          {filteredItems.map((ele, i) => (
            <div
              key={i}
              onClick={() => setInputValue(ele.name)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {ele.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YourComponent;
