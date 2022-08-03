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
import externalTooltipHandler from "./ExternalTooltipHandler"
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
                                        label: `Price ( Past ${days} Days ) in USD`,
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 0,
                                        hoverRadius: 20,
                                        borderColor: "#fff",
                                        borderWidth: 2,
                                    },
                                    line: {
                                        borderWidth: 2,
                                        borderColor: "#fff",
                                    }
                                },
                                interaction: {
                                    mode: 'index',
                                    intersect: false,
                                },

                                // There is a bug here that cause the days buttons dissapear
                                //
                                // plugins: {
                                //     tooltip: {
                                //         enabled: false,
                                //         position: 'average',
                                //         external: externalTooltipHandler
                                //     }
                                // }
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