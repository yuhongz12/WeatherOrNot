// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";

function Recommendation(d) {
	// usestate for setting a javascript
	// object for storing and using data
    // const dataN = d.d
	// const [data, setdata] = useState([]); 
	// // Using useEffect for single rendering
	// useEffect(() => {
	// 	// Using fetch to fetch the api from
	// 	// flask server it will be redirected to proxy
	// 	fetch("/data").then((res) =>
	// 		res.json().then((data) => {
	// 			// Setting a data from api
	// 			setdata({
	// 				country_name: data.country_name,
    //                 details_link : data.details_link,
	// 				flag_img: data.flag_img,
	// 				message: data.message,
	// 			});
	// 		})
	// 	);
	// }, []);

    const  data = d.d
	return (
       
            <div className="card m-2" style={{width:'18rem'}}>
            
            <img src={data.flag_img} className="card-img-top"/>
            <div className="card-body">
                <h5 className="card-title">{data.country_name}</h5>
                <p className="card-text">{data.message}</p>
                <a href={data.details_link} target="_blank" rel="noreferrer">Learn More</a>
            </div>
        </div>
    
	);
}

export default Recommendation;
