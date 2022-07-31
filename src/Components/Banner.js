import React from 'react'
import Header from "./Header";
import Carousel from "./Carousel";


const Banner = () => {
    return (
        <div>
            <Header />
            <div className='banner-background'></div>
            <div className='banner-container'>
                <h1 className="banner-text">Let Things Go Better With Cryptocurrency</h1>
            </div>
            <Carousel />

        </div>
    )
}

export default Banner