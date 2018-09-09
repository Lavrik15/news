import React from 'react';

const Search = ({ onSearchChange, searchValue, children }) =>
    <form>
        {children}
        <input
            type="text"
            onChange={onSearchChange}
            value={searchValue}
        />
    </form>

export default Search;