import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";

// Swiper options
const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 4,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    loop: true,
};

const MovingSwiper = () => {

    return (
        <Swiper {...swiperOptions} className="flex items-center justify-center">
            {[...Array(10)].map((_, index) => (
                <SwiperSlide key={index} className="slide-item">
                    <ul className="logo-list p-5">
                        <li>
                            <img
                                src={`https://api.geosmartplanning.com.bd/api3/assets/image/slider-${(index % 6) + 1}.png`}
                                alt={`Icon ${index + 1}`}
                            />
                        </li>
                    </ul>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MovingSwiper;