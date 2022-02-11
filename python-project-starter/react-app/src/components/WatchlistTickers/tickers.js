import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadWatchlistTickers, delWatchlistTicker } from '../../store/watchlistTickers';



const Tickers = ({ticker, list, handleDeleteTicker}) => {
    const dispatch = useDispatch();
    const [showTicker, setShowTicker] = useState(true)

    // const handleDeleteTicker = (e, id) => {
    //     e.preventDefault()
    //     console.log("NEW TICKER IN COMPONENT", id)
    //     let tickerId = id
    //     dispatch(delWatchlistTicker(tickerId))
    //     // dispatch(loadWatchlistTickers(list.id))
    // }
    // useEffect(() => {
    //     async function getTickers() {
    //         await dispatch(loadWatchlistTickers(list.id))
    //     }
    //     getTickers()

    // }, [])


    let tickerArr = Object.values(list)
    console.log("TICKER ARR", tickerArr)
    return (
        <>
                {showTicker && (

                    <tr key={ticker.id}>
                            <td>{ticker.ticker}</td>
                            <td> {ticker.price} </td>
                           <td><button onClick={(e) => [handleDeleteTicker(e, ticker.id), setShowTicker(!showTicker)]}>X</button></td>
                        </tr>
                        )}
        </>
    )
}

export default Tickers
