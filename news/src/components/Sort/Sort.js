import React from 'react';

const Sort = ({children, onSortClick, sortKey}) => 
    <button
        onClick={() => onSortClick(sortKey)}
        className="btn-sort"
    >
        {children}
    </button>

export default Sort;