import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { SingleCoin } from '../Config/Api';
import CoinInfo from '../Components/CoinInfo';
import { numberWithCommas } from '../Components/Carousel';
import { LinearProgress } from '@mui/material';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const CoinPage = () => {
    const { id } = useParams();

    const [coin, setCoin] = useState();
    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id))
        setCoin(data);
    };

    useEffect(() => {
        fetchCoin();
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <Header />
            {
                !coin ? (
                    <LinearProgress
                        style={{ color: "#fff" }}
                        size={250}
                        thickness={1}
                    />
                ) : (
                    <>
                        <div className='coinpage-container'>
                            <div className='coinpage-sidebar'>
                                <div className='coinpage-header'>
                                    <img className='coinpage-coin-img'
                                        src={coin?.image.large}
                                        alt={coin?.name}
                                    >
                                    </img>
                                    <h3
                                        className='coinpage-coin-name'>
                                        {coin?.name}
                                    </h3>
                                </div>

                                <div className='coinpage-marketData'>
                                    <p
                                        className='coinpage-coin-desc'
                                        dangerouslySetInnerHTML={{ __html: coin?.description.en.split(". ")[0] }}>
                                        {/* get first sentence then parse it */}

                                    </p>
                                    <div className='coinpage-market rank'>
                                        <span>
                                            <span className='coinpage-market bold-text'>
                                                Rank:
                                            </span>
                                            &nbsp;
                                            {coin?.market_cap_rank}
                                        </span>
                                    </div>

                                    <div className='coinpage-market price'>
                                        <span>
                                            <span className='coinpage-market bold-text'>
                                                Current Price:
                                            </span>
                                            &nbsp;$
                                            {numberWithCommas(coin
                                                ?.market_data
                                                .current_price['usd']
                                                .toFixed(2)
                                            )}
                                        </span>
                                    </div>

                                    <div className='coinpage-market cap'>
                                        <span>
                                            <span className='coinpage-market bold-text'>
                                                Market Cap:
                                            </span>
                                            &nbsp;$
                                            {numberWithCommas(coin
                                                ?.market_data.market_cap['usd']
                                                .toString()
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <CoinInfo coin={coin}>
                                {/* chart */}
                            </CoinInfo>
                        </div>
                    </>
                )}
            {/* <div className='coinpage-footer'>
                <Footer />
            </div> */}
        </>
    )
}

export default CoinPage;