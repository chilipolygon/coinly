import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CoinList } from '../Config/Api'
import TextField from '@mui/material/TextField';

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCoins = async () => {
        setLoading(true);

        const { data } = await axios.get(CoinList("USD"));

        setCoins(data);
        setLoading(false);
        console.log(loading)
    }

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(coins);

    return (
        <div className='coinstable-container'>
            <div className='coinsable-header'>
                <h3 className='coinsable-header text-1'>
                    Cryptocurrency Prices
                    <span className='coinsable-header text-2'>by Market Cap</span>
                </h3>
                <TextField
                    color="secondary"
                    id="outlined-basic"
                    label="Search For a Crypto Current.."
                    variant="outlined" />

            </div>

        </div>
    )
}

export default CoinsTable