import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { useEffect, useState } from "react";

const MovingSwiper = () => {
    const [sildeItem, setSlideItem] = useState(9);
    useEffect(() => {
        if (window.innerWidth <= 500) {
            setSlideItem(3)
        } else {
            setSlideItem(9)
        }
    }, []);
    // Swiper options
    const swiperOptions = {
        modules: [Autoplay, Pagination, Navigation],
        slidesPerView: sildeItem,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        loop: true,
    };
    return (
        <Swiper {...swiperOptions} className="flex items-center justify-center">
            {[...Array(10)].map((_, index) => (
                <SwiperSlide key={index} className="slide-item">
                    <ul className="logo-list p-5">
                        <li>
                            <img
                                className="h-4"
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