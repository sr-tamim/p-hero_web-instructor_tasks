import React from 'react';

const LoadingIndicator = () => {
    return (
        <div className='d-flex justify-content-center align-items-center position-absolute left-0 top-0 w-100 h-100'
            style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
            <div class="spinner-grow text-primary" role="status"
                style={{ width: '3rem', height: '3rem' }}></div>
        </div>
    );
};

export default LoadingIndicator;