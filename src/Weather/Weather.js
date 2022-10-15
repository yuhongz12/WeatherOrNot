
const Weather = ({weatherData}) => {
    const unit = "Celsius";
    return(


        // <div className="card">
        //
        //     <div className="card-body">
        //         <h5 className="card-title">City: { weatherData != null && weatherData.cod === 200? weatherData.name : ""}</h5>
        //         <h6 className="card-subtitle mb-2 text-muted">Temperature: {weatherData.main.temp}</h6>
        //         <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
        //             card's content.</p>
        //     </div>
        // </div>

        <div className={"container"}>
            <div className={"w-title mt-5 mb-5"}>
                <h1>{weatherData.name}</h1>
            </div>
            <div>
                <h1>{Math.round(weatherData.main.temp)} {unit}</h1>
            </div>
            <div>

            </div>
        </div>
    );
}

export default Weather;