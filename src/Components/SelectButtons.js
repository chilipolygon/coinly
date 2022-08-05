import React from 'react';

const SelectButtons = ({ children, selected, onClick }) => {
    return (
        <span style={{
            backgroundColor: selected ? "#fff" : "",
            color: selected ? "#000" : "",
        }
        }
            className='coin-info-buttons'
            onClick={onClick}
        >
            {children}
        </span>
    )
}

export default SelectButtons