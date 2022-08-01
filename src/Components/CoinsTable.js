import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CoinList } from '../Config/Api'
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Pagination,
    ThemeProvider,
    createTheme,
    Container,
    Paper,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from './Carousel';


const CoinsTable = () => {
    // eslint-disable-next-line
    const [coins, setCoins] = useState([]);
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);


    const useStyles = makeStyles({
        row: {
            backgroundColor: "#0d0d0d",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#1a1a1a",
            },
            fontFamily: "Montserrat",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "#fff;"
            },
        },
    });

    const classes = useStyles();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    const fetchCoins = async () => {
        setLoading(true);

        const { data } = await axios.get(CoinList("USD"));

        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // get user input
    const [search, setSearch] = useState('');
    console.log(search);


    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };

    return (
        <div className='coinstable-wrapper'>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet"></link>
            <div className='coinstable-container'>
                <div className='coinstable-header'>
                    <h3 className='coinsable-header text-1'>
                        Cryptocurrency Prices
                        <span className='coinsable-header text-2'>by Market Cap</span>
                    </h3>

                    <div className='input_container'>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                        <input
                            className="question"
                            id="nme"
                            name="message"
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            required autoComplete="off"
                        />
                        <label htmlFor="nme" className='question_label'>
                            <span className='question_default'><i className="fa-solid fa-magnifying-glass"></i>Search</span>
                        </label>
                    </div>
                </div>
            </div >
            <div className='whole-coinstable-container'>
                <ThemeProvider theme={darkTheme}>
                    <Container style={{ textAlign: "center" }}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead style={{ backgroundColor: "#fff" }}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell className="tablecell-top-display"
                                                style={{
                                                    color: "#000",
                                                    fontWeight: "800",
                                                    fontFamily: "Montserrat",

                                                }}
                                                key={head}
                                                align={head === "Coin" ? "" : "right"}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {handleSearch()
                                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                        .map((row) => {
                                            const profit = row.price_change_percentage_24h > 0;
                                            return (
                                                <TableRow
                                                    onClick={() => navigate(`/coins/${row.id}`)}
                                                    className={classes.row}
                                                    key={row.name}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        style={{
                                                            display: "flex",
                                                            gap: 15,
                                                            fontFamily: "Montserrat",
                                                        }}
                                                    >
                                                        <img
                                                            src={row?.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ marginBottom: 10 }}
                                                        />
                                                        <div
                                                            style={{ display: "flex", flexDirection: "column" }}
                                                        >
                                                            <span
                                                                style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 22,
                                                                }}
                                                            >
                                                                {row.symbol}
                                                            </span>
                                                            <span style={{ color: "darkgrey" }}>
                                                                {row.name}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="right"
                                                        style={{
                                                            color: "#fff",
                                                            fontFamily: "Montserrat",
                                                        }}>
                                                        {"$"}{" "}
                                                        {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            color: profit > 0 ? "#76ff63" : "#ff2b2b",
                                                            fontFamily: "Montserrat",
                                                        }}
                                                    >
                                                        {profit && "+"}
                                                        {row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell align="right"
                                                        style={{
                                                            color: "#fff",
                                                            fontFamily: "Montserrat",
                                                        }}>
                                                        {"$"}{" "}
                                                        {numberWithCommas(
                                                            row.market_cap.toString().slice(0, -6)
                                                        )}
                                                        M
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Pagination
                            count={(handleSearch()?.length / 10).toFixed(0)}
                            style={{
                                padding: 20,
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                            classes={{ ul: classes.pagination }}
                            onChange={(_, value) => {
                                setPage(value);
                            }}
                        />
                    </Container>
                </ThemeProvider>
            </div>
        </div>

    )
}

export default CoinsTable;