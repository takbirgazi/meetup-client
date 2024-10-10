import React from 'react';

const Banner = () => {
    return (
        <div className='pt-20 w-[85%] mx-auto'>
            <div class="mt-16 flex flex-col items-center py-6 lg:h-[36rem] lg:flex-row">
                <div class="lg:w-1/2 space-y-4">
                    <p class="text-3xl w-[50%] font-semibold text-gray-100 lg:text-5xl leading-loose">SuperCharge your Meeting and Make it Effective</p>

                    <p class="mt-4 text-gray-100">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, eum modi incidunt adipisci quod porro et non exercitationem quasi, maxime culpa ut nemo ab delectus saepe iste nostrum explicabo a?</p>
                    <a href='#' class="btn btn-outline-primary font-semibold">Join Us</a>
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