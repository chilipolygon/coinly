import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { TrendingCoins } from '../Config/Api'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

export function numberWithCommas(x) {
    let string = "" + x
    return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    // eslint-disable-next-line
    const [trending, setTrending] = useState([]);

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins('USD'));
        setTrending(data);
    };

    useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link
                className='CarouselItem'
                to={`/coins/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="40"
                    style={{ marginBottom: 10 }}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "#76ff63" : "#ff2b2b"
                        }}
                    >
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>

                <span>
                    ${numberWithCommas(coin?.current_price.toFixed(2))}
                </span>

            </Link>
        )
    })

    const responsive = {
        0: { items: 2 },
        568: { items: 3 },
        1024: { items: 5 },
    };

    return (
        <div className='carousel-container'>
            <AliceCarousel
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                controlsStrategy="alternate"
                autoPlay
                items={items}


            />
        </div>
    )
}

export default Carousel