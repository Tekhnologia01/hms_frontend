import React, { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required modules
import { Navigation } from "swiper/modules";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function GraphSlider({ slides, heading }) {
    const [swiperRef, setSwiperRef] = useState(null);

    const handlePrev = () => {
        if (swiperRef) swiperRef.slidePrev();
    };

    const handleNext = () => {
        if (swiperRef) swiperRef.slideNext();
    };

    return (
        <div>
            <div className="d-flex justify-content-between my-3">
                <div
                    className="d-flex align-items-center fw-semibold"
                    style={{ fontSize: "24px" }}
                >
                    {heading}
                </div>
                <div>
                    <button onClick={handlePrev} className="btn border">
                        <IoIosArrowBack />
                    </button>
                    <span className="ps-2"></span>
                    <button onClick={handleNext} className="btn border">
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>

            <Swiper
                onSwiper={setSwiperRef}
                slidesPerView={4}
                centeredSlides={false}
                initialSlide={0}
                spaceBetween={30}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                    0: { slidesPerView: 1, spaceBetween: 5 },
                    768: { slidesPerView: 1, spaceBetween: 10 },
                    1024: { slidesPerView: 2, spaceBetween: 20 },
                }}
            >
                {slides.map((s) => (
                    <SwiperSlide
                        key={s.id}
                        className="border overflow-hidden"
                        style={{
                            width: "500px", // Explicitly set width
                            height: "300px",
                            borderRadius: "8px",
                            boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
                        }}
                    >
                        <div className="p-3">{s.component}</div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default GraphSlider;
