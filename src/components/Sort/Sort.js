import React from 'react';
import Button from '../Button/Button.js';

import "./Sort.css";


const Sort = ({ onSort, onSortReverseClick, isSortReverse }) =>
    <div className="Sort">
        <span>sort by:</span>
        <Button
            onClick={() => onSort("NUM_COMMENTS")}
            className="btn-sort btn--gray"
        >
            comments
        </Button>
        <Button
            onClick={() => onSort("POINTS")}
            className="btn-sort btn--gray"
        >
            points
        </Button>
        <Button
            onClick={() => onSortReverseClick(!isSortReverse)}
            className="btn-sort btn--gray"
        >
            &#8645;
        </Button>
    </div>

export default Sort;