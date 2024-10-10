import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='w-[95%] mx-auto'>
            <div class="mt-16 flex flex-col items-center py-6 lg:h-[36rem] lg:flex-row gap-10">
                <div class="lg:w-1/2 p-4 space-y-4 text-center md:text-start">
                    <p class="text-3xl md:w-[50%] font-semibold text-gray-100 lg:text-5xl">SuperCharge your Meeting and Make it Effective</p>

                    <p class="mt-4 text-gray-100">Experience seamless, high-quality video streaming and real-time meetings with our app, designed for effortless collaboration and connection from anywhere. With powerful features stay productive and engaged with a click</p>
                    <Link to={'/room'} class="btn btn-outline-primary font-semibold">Explore a meeting</Link>
                </div>

                <div class="flex lg:w-1/2 lg:justify-end">
                    <div class="w-full max-w-xl bg-white rounded-lg dark:bg-gray-800">
                        <div class="px-6 py-8 text-center">
                            <img className='rounded-lg object-cover' src="https://img.freepik.com/free-vector/group-video-concept-illustration_114360-4942.jpg?ga=GA1.1.2086345452.1705939436&semt=ais_hybrid" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;