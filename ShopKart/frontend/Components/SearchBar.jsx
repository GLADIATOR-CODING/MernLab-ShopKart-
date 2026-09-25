import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    // Trigger search automatically when inputs change, or require a button press.
    // The requirement mentions "When the user searches or changes the category, fetch the filtered products".
    // Using a useEffect to trigger search on every change feels right for a modern UI.
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm, category);
        }, 300); // Debounce
        
        return () => clearTimeout(timer);
    }, [searchTerm, category, onSearch]);

    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="category-select"
            >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Books">Books</option>
                <option value="Home">Home</option>
            </select>
        </div>
    );
};

export default SearchBar;
