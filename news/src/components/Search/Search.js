import React from 'react';
import './Search.css';
import Button from '../Button/Button';

const Search = ({ onSearchChange, value, onSubmit, children}) =>
    <form onSubmit={onSubmit}>
        <label htmlFor="search-input">Search
            <input
                id="search-input"
                type="text"
                onChange={onSearchChange}
                value={value}
                className="input"
            />
        </label>
        <Button 
            type="submit"
        >
            {children}
        </Button>
    </form>

export default Search;