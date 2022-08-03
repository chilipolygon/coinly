import React from 'react';

const SelectButtons = ({ children, onClick }) => {
    return (
        <span
            className='coin-info-buttons'
            onClick={onClick}
        >
            {children}
        </span>
    )
}

export default SelectButtons