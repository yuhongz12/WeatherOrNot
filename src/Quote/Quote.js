// this quote module uses fahrenheit

const Quote = ({data, lang}) => {
    let quote;


    console.log(data);

    const temp = data.main.temp;
    console.log("quote: " + temp);

    function updatePhrase(temp) {
        if (!lang) {
            if (temp < 40.0) {
                quote = "It's brick outside"
            } else if (40.0 < temp && temp < 60.0) {
                quote = "It's a bit chilly outside"
            } else if (60.0 < temp  && temp < 75.0) {
                quote = "It's time to touch grass"
            } else if (75.0 < temp && temp < 90.0) {
                quote = "It's hot"
            } else {
                quote = "Get inside a freezer";
            }
        } else {
            if (temp < 40) {
                quote = "It's brick outside - science"
            } else if (40 < temp < 60) {
                quote = "It's a bit chilly outside - science"
            } else if (60 < temp < 75) {
                quote = "It's time to touch grass science"
            } else if (75 < temp < 90) {
                quote = "It's hot science"
            } else {
                quote = "Get inside a freezer science";
            }
        }
    }

     updatePhrase(temp);

    return(
        <div>

            <h3>{quote}</h3>
        </div>
    )
}

export default Quote;
