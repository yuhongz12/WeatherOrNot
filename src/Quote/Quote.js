const Quote = ({temp}) => {
    let quote = "";
    if (temp < 40) {
        let quote = "It's brick outside"
    } else if (40 < temp < 60) {
        quote = "It's a bit chilly outside"
    } else if (60 < temp < 75) {
        quote = "It's time to touch grass"
    } else if (75 < temp < 90) {
        quote = "It's hot"
    } else {
        quote = "Get inside a freezer";
    }
    return(
        <div>
            <h3>{quote}</h3>
        </div>
    )
}



export default Quote;
