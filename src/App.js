import {useState, useEffect} from "react";
import Weather from "./Weather/Weather";
import 'bootstrap/dist/css/bootstrap.min.css';
import quote from "./Quote/Quote";
import Quote from "./Quote/Quote";
import Recommendation from "./Recommendation";


const recommendationDatas = [{
    "country_name": "Cambodia",
    "details_link": "https://en.wikipedia.org/wiki/Cambodia",
    "flag_img": "https://countryflagsapi.com/png/Cambodia",
    "message": "If the word perfect was a place it would be Cambodia"
    },
    {
    "country_name": "Belize",
    "details_link": "https://en.wikipedia.org/wiki/Belize",
    "flag_img": "https://countryflagsapi.com/png/Belize",
    "message": "It is so much warmer in Belize, why don't you Go there?"
    },
    {
    "country_name": "Iraq",
    "details_link": "https://en.wikipedia.org/wiki/Iraq",
    "flag_img": "https://countryflagsapi.com/png/Iraq",
    "message": "It is so much warmer in Iraq, why don't you Go there?"
    },
    {
    "country_name": "Singapore",
    "details_link": "https://en.wikipedia.org/wiki/Singapore",
    "flag_img": "https://countryflagsapi.com/png/Singapore",
    "message": "If the word perfect was a place it would be Singapore"
    },
    {
    "country_name": "Martinique",
    "details_link": "https://en.wikipedia.org/wiki/Martinique",
    "flag_img": "https://countryflagsapi.com/png/Martinique",
    "message": "It is so much warmer in Martinique, why don't you Go there?"
    }
];


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

  const [rec, setRec] = useState([]);

//   const express = require("express");

// const app = express();
// const port = process.env.SERVER_PORT || 8000;

// // Add Access Control Allow Origin headers
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://hackharvardweather.herokuapp.com/");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.get("/api", (req, res) => {
//   res.json("Hello");
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));


  const fetchRec = async (location) => {
    console.log(`https://hackharvardweather.herokuapp.com/locate?states=${location}`)
    await fetch(`https://hackharvardweather.herokuapp.com/locate?states=${location}`
            )
        .then(res => res.json())
        .then(result => {
            setData(result)
            console.log(result);
        });
//   }
//   fetch(url, {
//         method : "GET",
//         mode: 'cors',
//         headers: headers
//     })
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error(response.error)
//         }
//         return response.json();
//     })
//     .then(data => {
//         document.getElementById('messages').value = data.messages;
//     })
//     .catch(function(error) {
//         document.getElementById('messages').value = error;
//     });

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
                fetchD(document.getElementById("userCity").value)

            }}>Search</button>
        </div>


        {(typeof data.main != 'undefined') ?

            <div>
                <Weather weatherData={data} lang ={checked}/>
                <Quote lang={checked} data={data}/>
                <div className="d-flex">
                    {recommendationDatas.map((user) => <Recommendation d={user}/>)}
                </div>
            </div>
            : <div></div>}
        
            
        </div>

  );
}

export default App;
