import React, { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required modules
import { Navigation } from "swiper/modules";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

function Slider({ slides }) {
    const [swiperRef, setSwiperRef] = useState(null);

    const handlePrev = () => {
        if (swiperRef) swiperRef.slidePrev(); // Slide to the previous slide
    };

    const handleNext = () => {
        if (swiperRef) swiperRef.slideNext(); // Slide to the next slide
    };

    return (
        <div>
            <div className="d-flex justify-content-end my-3">
                <button onClick={handlePrev} className="btn  border ">
                    <IoIosArrowBack />
                </button>
                <span className="ps-2"></span>
                <button onClick={handleNext} className="btn border ">
                    <IoIosArrowForward />
                </button>
            </div>

            <Swiper
                onSwiper={setSwiperRef}
                slidesPerView={4} // Default number of slides for larger screens
                centeredSlides={false}
                initialSlide={0}
                spaceBetween={30}
                // navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                    0: {
                        slidesPerView: 1, // Show 1 slide for mobile view
                        spaceBetween: 5,
                    },
                    768: {
                        slidesPerView: 3, // Show 2 slides for tablet view
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 3, // Show 4 slides for desktop view
                        spaceBetween: 20,
                    },
                }}
            >

                {
                    slides?.map((s) => {
                        return <SwiperSlide key={s.id} className="border overflow-hidden" style={{ borderRadius: "8px" }}>
                            <img src={s.documentImage} style={{
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                            }} alt="" />
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    );
}

export default Slider;