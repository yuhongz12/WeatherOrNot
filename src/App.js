import {useState, useEffect} from "react";
import Weather from "./Weather/Weather";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const unit = "imperial";
  const [checked, setChecked] = useState(false);
  const updateLang = () => {
      setChecked(!checked);
      console.log(checked)
  }


    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });


            await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=${unit}&APPID=${process.env.REACT_APP_API_KEY}`)
                .then(res => res.json())
                .then(result => {
                    setData(result)
                    console.log(result);
                });
        }
        fetchData();
    }, [lat,long])


    const fetchD = async (location) => {
      console.log(`${process.env.REACT_APP_API_URL}/weather/?q=${location}&units=${unit}&APPID=${process.env.REACT_APP_API_KEY}`)
      await fetch(`${process.env.REACT_APP_API_URL}/weather/?q=${location}&units=${unit}&APPID=${process.env.REACT_APP_API_KEY}`)
          .then(res => res.json())
          .then(result => {
              setData(result)
              console.log(result);
          });
    }

    // var input = document.getElementById("userCity");
    //
    // input.addEventListener("keypress", function(event) {
    //     // If the user presses the "Enter" key on the keyboard
    //     if (event.key === "Enter") {
    //         // Cancel the default action, if needed
    //         event.preventDefault();
    //         // Trigger the button element with a click
    //         fetchD(input.value);
    //     }
    // });


  return (
    <div className={"container"}>
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="unit-toggle" onChange={updateLang}></input>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Current Langauge: {checked? "Scientific" : "Slang"}</label>
        </div>

        <div className="input-group mb-3">
            <input type="text" id="userCity"className="form-control" placeholder="Find your city"
                   aria-label="Find your city" aria-describedby="button-addon2" onKeyUp={(event) => {
                       if (event.key === "Enter") {
                           fetchD(document.getElementById("userCity").value)
                           console.log(document.getElementById("userCity").value)
                       }
                }}/>
            <button className="btn btn-outline-secondary" type="button" id="userCity-submit" onClick={() => {
                fetchD(document.getElementById("userCity").value)}}>Search</button>
        </div>


        {(typeof data.main != 'undefined') ? (
            <Weather weatherData={data} lang ={checked}/>
        ): (
            <div></div>
        )}
    </div>
  );
}

export default App;
