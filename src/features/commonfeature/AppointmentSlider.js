import React, { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required modules
import { Navigation } from "swiper/modules";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineAccessTime } from "react-icons/md";
import CommanButton from "../../components/common/form/commonButtton";
import { useNavigate } from "react-router-dom";

function AppointmentSlider({ slides, heading }) {
    const [swiperRef, setSwiperRef] = useState(null);
    const navigate = useNavigate();

    const handlePrev = () => {
        if (swiperRef) swiperRef.slidePrev();
    };

    const handleNext = () => {
        if (swiperRef) swiperRef.slideNext();
    };

    const today = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div>
            <div className="d-flex justify-content-between my-3">
                <div className="d-flex align-items-center fw-semibold" style={{ fontSize: "17px" }}>
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
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 5,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
            >
                {slides.map((s) => (
                    <SwiperSlide
                        key={s.id}
                        className="border overflow-hidden"
                        style={{
                            borderRadius: "8px",
                            boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
                        }}
                    >
                        <div className="p-3">
                            <div className="d-flex align-items-center">
                                <div style={{ width: "50px" }}>
                                    <img
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                        src={`${process.env.REACT_APP_API_URL}/${s?.Doctor_photo}`}
                                        alt={s.name}
                                    />
                                </div>
                                <div className="ms-1">
                                    <p className="m-0 fw-semibold">{s.Doctor_Name}</p>
                                    <p className="m-0" style={{ color: "#344054" }}>
                                        Specialist in {s.specialization}
                                    </p>
                                </div>
                            </div>

                            <div
                                className="mt-2 d-flex py-1 px-2"
                                style={{
                                    border: "1px solid #1E959B4D",
                                    borderRadius: "10px",
                                }}
                            >
                                <div
                                    className="w-50 ms-2"
                                    style={{ borderRight: "1px solid #1E959B4D", display: "flex", alignItems: "center" }}
                                >
                                    <CiCalendarDate />{" "}
                                    <span
                                        style={{ color: "#075C55", fontWeight: "500", marginLeft: "5px" }}
                                    >
                                        {today}
                                    </span>
                                </div>
                                <div className="w-50 ms-2" style={{ display: "flex", alignItems: "center" }}>
                                    <MdOutlineAccessTime />
                                    <span style={{ color: "#075C55", fontWeight: "500", marginLeft: "5px" }}>
                                        {s.Doctor_Time}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-2 d-flex gap-2">
                                <CommanButton
                                    label="Appointments"
                                    className="p-1 px-4 fw-semibold w-50"
                                    onClick={() =>
                                        navigate(`/reception/doctors_appointments/${s.Doctor_Id}`)
                                    }
                                    style={{
                                        borderRadius: "8px",
                                        height: "40px",
                                        fontSize: "14px",
                                        backgroundColor: "#1E959B",
                                        color: "#E0E0E0",
                                        border: "1px solid #1E959B",
                                    }}
                                />
                                <CommanButton
                                    label={"Doctor"}
                                    className="p-1 px-4 fw-semibold w-50"
                                    onClick={() =>
                                        navigate(`/reception/doctors_appointments/doctor/${s.Doctor_Id}`)
                                    }
                                    style={{
                                        borderRadius: "8px",
                                        height: "40px",
                                        fontSize: "14px",
                                        backgroundColor: "#1E959B",
                                        color: "#fff",
                                        border: "1px solid #1E959B",
                                    }}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default AppointmentSlider;
