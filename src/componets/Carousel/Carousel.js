import React, { useState } from 'react'

import {
    MdChevronLeft,
    MdChevronRight,
} from "react-icons/md";

import { SliderData } from './ImageData';
import './Carousel.css';

const Carousel = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    return (
        <div className="slider">
            <MdChevronLeft className="left-arrow" onClick={prevSlide} />
            {SliderData.map((slide, index) => {
                return (
                    <div key={index} className={index === current ? 'slide active' : 'slide'}>
                        <img src={slide.image} className="image" alt="Imagem carrossel" />
                    </div>
                )
            })}
            <MdChevronRight className="right-arrow" onClick={nextSlide} />
        </div>
    )
}

export default Carousel;
