import React from 'react';
import './Search.css';

const Search = ({ onSearchChange, searchValue}) =>
    <form>
        <label htmlFor="search-input">Поиск
            <input
                id="search-input"
                type="text"
                onChange={onSearchChange}
                value={searchValue}
                className="input"
            />
        </label>
    </form>

export default Search;