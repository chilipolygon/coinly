import React, {
    useEffect,
    useState
} from 'react';
import { HistoricalChart } from '../Config/Api';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { CircularProgress } from '@mui/material';
// eslint-disable-next-line
import Chart from 'chart.js/auto';
import { chartDays } from '../Config/Data';
import SelectButtons from './SelectButtons';

const CoinInfo = ({ coin }) => {
    console.clear();
    const [historicData, setHistoricData] = useState();
    const { id } = useParams();
    const [days, setDays] = useState(1);

    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(id, days, "usd"));
        setHistoricData(data.prices);
    };

    useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days]);

    return (
        <div className='coin-info-container'>
            {
                !historicData ? (
                    <CircularProgress
                        style={{ color: "#fff" }}
                        size={100}
                        thickness={1}
                    />
                ) : (
                    <>
                        <Line
                            data={{
                                labels: historicData.map((id) => {
                                    let date = new Date(id[0]);
                                    let time =
                                        date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                    return days === 1 ? time : date.toLocaleDateString();
                                }),
                                datasets: [
                                    {
                                        data: historicData.map((id) => id[1]),
                                        // label: `Price ( Past ${days} Days ) In USD`,
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 0,
                                        hoverRadius: 5,
                                        borderColor: "#fff",
                                        borderWidth: 2,
                                        hoverBackgroundColor: "#fff",
                                    },
                                    line: {
                                        borderWidth: 2,

                                        borderColor: (historicData[historicData.length - 1][1] - historicData[0][1]) > 0 ? "#76ff63" : "#ff2b2b",
                                    }
                                },
                                interaction: {
                                    mode: 'index',
                                    intersect: false,
                                },
                                scales: {
                                    y: {
                                        grid: {
                                            display: false
                                        }
                                    },
                                    x: {
                                        grid: {
                                            display: false
                                        }
                                    }
                                },

                                responsive: true,

                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                    tooltip: {
                                        intersect: false,
                                        displayColors: false,
                                        backgroundColor: "rgba(0, 0, 0, .7)",
                                        bodyColor: "#fff",
                                        borderWidth: 1,
                                        titleColor: "#fff",
                                        titleAlign: "center",
                                        titleFont: {
                                            weight: "bold",
                                            size: 15
                                        },
                                        yAlign: "top",
                                        xAlign: "center",
                                        padding: 10,
                                        bodyFont: {
                                            size: 20,
                                        }
                                    }
                                }
                            }}
                        />
                        <div className='coin-info-buttons-container'>
                            {chartDays.map((day) => (
                                <SelectButtons
                                    key={day.value}
                                    onClick={() => setDays(day.value)}
                                    selected={day.value === days}
                                >
                                    {day.label}
                                </SelectButtons>

                            ))}
                        </div>
                    </>
                )}


        </div>
    )
}

export default CoinInfo;