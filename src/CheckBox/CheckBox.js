const CheckBox = () => {

   function  unitToggleChange(e) {
       const btn = e.target.checked;
       console.log(btn);
   }

    return (
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="unit-toggle" onChange={unitToggleChange}></input>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Current Langauge: {}</label>
            </div>
    );
}

export default CheckBox;