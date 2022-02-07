import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const Reviews = () => {
    return (
        <section className="review" id="review">
            <h1 className="heading">
                Client's <span>Reviews</span>
            </h1>
            <Swiper centeredSlides loop spaceBetween={50} className="review-slider">
                <SwiperSlide className="slide">
                    <h3>Mr. Travellor</h3>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur sunt
                        eligendi est, dicta maiores amet nihil perferendis, incidunt maxime
                        aspernatur exercitationem laboriosam odio dolores magnam ratione atque,
                        quasi odit. Hic!
                    </p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                    <h3>Mr. Travellor</h3>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur sunt
                        eligendi est, dicta maiores amet nihil perferendis, incidunt maxime
                        aspernatur exercitationem laboriosam odio dolores magnam ratione atque,
                        quasi odit. Hic!
                    </p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                    <h3>Mr. Travellor</h3>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur sunt
                        eligendi est, dicta maiores amet nihil perferendis, incidunt maxime
                        aspernatur exercitationem laboriosam odio dolores magnam ratione atque,
                        quasi odit. Hic!
                    </p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Reviews;