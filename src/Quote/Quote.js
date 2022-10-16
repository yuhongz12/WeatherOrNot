// this quote module uses fahrenheit


const Quote = ({data, lang}) => {
    let quote;
    let cloth;

    const coldSlang = ['Its mad brick outside', 
    'It be hella cold bro',
    'No cap but you might freeze to death',
    'Someone took the word chill way too literally',
    'I would move to a warmer country if I were you']

   const  HotSlang = ['Beware the butt stains',
        'Lowkey melting rn',
       'I would move to a colder country if I were you']

   const  warmSlang = ['Great day to finally touch some grass',
   'Get some pics for the gram',
   'The vibes today are immaculate']

   const warmCloth = ['Your fit better slay like the weather today',
    'Today is the perfect day to put at least some effort into your appearance']

    const coldScientific= [
       "It is positively glacial today",
       "The current molecular arrangement of the atmospheric particulate are not conducive to expeditious motion; thus, I would discourage the adoption of meager apparel"
    ]

    const hotScientific = [
        'It is dreadfully scalding at the moment',
   'You may begin to feel a nontrivial amount of perspiration accumulating upon your epidermis',
'Be heedful of the overexcretion of dihydrogen monoxide',
'Today seems to be an exquisite occasion to come over with hyperhidrosis',
'Today is simply an exquisite occasion to come over with hyperhidrosis'
    ]

    const warmScientific = [
        "Respectfully, this exquisite weather is wasted on such a lowly peasant as yourself",
"Today's fine weather may offer great enjoyment out of doors for those replete with relationships",
"This is simply my humble opinion, but your lack of acquaintances renders today's fine weather quite worthless"
    ]
    


    
    
    console.log(data);

    const temp = data.main.temp;
    console.log("quote: " + temp);

    function updatePhrase(temp) {
        if (!lang) {
            if (temp < 40.0) {
                quote = coldSlang[Math.floor(Math.random()*coldSlang.length)]
                cloth = 'Your clothes should be thiccc today!'
            } else if (40.0 < temp && temp < 60.0) {
                quote = "It's a bit chilly outside"
                cloth = 'Don\'t forget your hoodie'
            } else if (60.0 < temp  && temp < 75.0) {
                quote = warmSlang[Math.floor(Math.random()*warmSlang.length)]
                cloth = warmCloth[Math.floor(Math.random()*warmCloth.length)]
            } else if (75.0 < temp && temp < 90.0) {
                quote = HotSlang[Math.floor(Math.random()*HotSlang.length)]
                cloth = 'You should skimp on your clothes just like how you skimp on your sleep.'
            } else {
                quote = "Get inside a freezer";
                cloth = "What is clothes?"
            }
        } else {
            if (temp < 40) {
                quote = coldScientific[Math.floor(Math.random()*coldScientific.length)]
                cloth = "Nothing but the finest baby cashmere down lambswool jacket lined with silk will suffice today"
            } else if (40 < temp < 60) {
                quote = warmScientific[Math.floor(Math.random()*warmScientific.length)]
                cloth = "I shall bequeath upon you the obligation to wear your Sunday best"
            } else if (60 < temp < 75) {
                quote = warmScientific[Math.floor(Math.random()*warmScientific.length)]
                cloth = "I shall bequeath upon you the obligation to wear your Sunday best"
            } else if (75 < temp < 90) {
                quote = hotScientific[Math.floor(Math.random()*hotScientific.length)]
                cloth = "Only but the finest linen français will be tolerable in this putrid heat!"
            } else {
                quote = "My the enzyme is about to denature";
                cloth = "Free your body!"
            }
        }
    }

     updatePhrase(temp);

    return(
        <div>

            <h1>{quote}</h1>
            <h1>{cloth}</h1>
        </div>
    )
}

export default Quote;
