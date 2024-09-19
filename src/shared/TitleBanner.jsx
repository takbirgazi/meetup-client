import React from 'react';

const TitleBanner = ({title, route}) => {
    return (
        <div className='h-80 bg-[#ebebe0] flex flex-col items-center justify-center space-y-3'>
            <h2 className='text-4xl font-semibold'>{title}</h2>
            <h5 className='font-open'>{route}</h5>
        </div>
    );
};

export default TitleBanner;