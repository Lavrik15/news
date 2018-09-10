import React from 'react';
import Button from '../Button/Button.js';
import './Table.css'

// const isSearched = searchValue => item =>
//     item.title.toLowerCase().includes(searchValue.toLowerCase());

const Table = ({list, pattern, onDismiss}) =>
    <div className="Table">
        {list.map(item => {
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

export default Table;