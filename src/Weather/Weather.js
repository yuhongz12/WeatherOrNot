import Quote from "../Quote/Quote";
import {useEffect, useState} from "react";

const Weather = ({weatherData, lang}) => {

    function convertCtoF (t) {
        return (t *  (9/5)) + 32
    }
    const unit = "imperial"

    const temp = weatherData.main.temp;

    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return(
        <div className={"container mt-4"}>

            <div className={"w-title mt-5 mb-5 d-flex justify-content-between"}>
                <h1>{weatherData.name}</h1>

            </div>
            <div>
                <h4>{new Date(time).toString()}</h4>
                <h1>{Math.round(temp)} {unit === "imperial"? "Fahrenheit" : "Celsius" }</h1>
            </div>
        </div>
    );
}

export default Weather;