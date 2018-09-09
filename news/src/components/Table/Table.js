import React from 'react';
import Button from '../Button/Button.js';
import './Table.css'

const isSearched = searchValue => item =>
    item.title.toLowerCase().includes(searchValue.toLowerCase());

const Table = ({list, pattern, onDismiss}) =>
    <div className="Table">
        {list.filter(isSearched(pattern)).map(item => {
            return (
                <div key={item.objectID} className="Table-row">
                    <span>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span>{item.author}</span>
                    <span>{item.num_comments}</span>
                    <span>{item.points}</span>
                    <span>
                        <Button
                            className=""
                            onClick={() => onDismiss(item.objectID)}
                            type="button"
                        >
                            удалить
                        </Button>
                    </span>
                </div>
            );
        })}
    </div>

export default Table;