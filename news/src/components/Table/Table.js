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

const Table = ({ list, onDismiss, onSort, sortKey }) => {
    const sortedList = SORTS[]
    return (
        <div className="Table">
            {list.map(item => {
                return (
                    <div>
                        <span>sort by:</span>
                        <Sort onSort={onSort}
                            sortKey="comments"
                        >
                            comments
                        </Sort>
                        <Sort onSort={onSort}
                            sortKey="points"
                        >
                            points
                        </Sort>
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
                    </div>
                );
            })}
        </div>
    );
}


export default Table;