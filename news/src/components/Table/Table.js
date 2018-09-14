import React from 'react';
import Button from '../Button/Button.js';
import Sort from '../Sort/Sort.js'
import { sortBy } from 'lodash';
import './Table.css'

const SORTS = {
    NONE: list => list,
    POINTS: list => sortBy(list, "points"),
    NUM_COMMENTS: list => sortBy(list, "num_comments")
}

const Table = ({ list, onDismiss, onSort, sortKey, isSortReverse, onSortReverseClick }) => {
    const sortedList = (!isSortReverse) ?
    SORTS[sortKey](list):
    SORTS[sortKey](list).reverse();
    ;
    return (
        <div className="Table">
            <Sort
                onSort={onSort}
                sortKey={sortKey}
                isSortReverse={isSortReverse}
                onSortReverseClick={onSortReverseClick}
            />
            {sortedList.map(item => {
                return (
                    <div key={item.objectID} className="Table-row">

                        <span>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span>Author:{item.author}</span>
                        <span>Comments:{item.num_comments}</span>
                        <span>Likes:{item.points}</span>
                        <span>
                            <Button
                                className=""
                                onClick={() => onDismiss(item.objectID)}
                                type="button"
                            >
                                remove
                            </Button>
                        </span>
                    </div>
                );
            })}
        </div>
    );
}


export default Table;