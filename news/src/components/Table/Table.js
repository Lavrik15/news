import React from 'react';
import Button from './Button.js';

const isSearched = searchValue => item =>
    item.title.toLowerCase().includes(searchValue.toLowerCase());

const Table = ({list, pattern, onDismiss}) =>
    <div>
        {list.filter(isSearched(pattern)).map(item => {
            return (
                <div key={item.objectID}>
                    <span>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span>{item.author}</span>
                    <span>{item.num_comments}</span>
                    <span>{item.points}</span>
                    <span>
                        <Button
                            onClick={() => onDismiss(item.objectID)}
                            type="button"
                        />
                            удалить
                        <Button />
                    </span>
                </div>
            );
        })}
    </div>

export default Table;