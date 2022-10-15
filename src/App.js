import {useState, useEffect} from "react";
import Weather from "./Weather/Weather";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const unit = "imperial";
    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });


            try {
            await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=${unit}&APPID=${process.env.REACT_APP_API_KEY}`)
                .then(res => res.json())
                .then(result => {
                    setData(result)
                    console.log(result);
                });
        } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [lat,long])


  return (
    <div className={"container"}>
        {(typeof data.main != 'undefined') ? (
            <Weather weatherData={data}/>
        ): (
            <div></div>
        )}
    </div>
  );
}

export default App;
