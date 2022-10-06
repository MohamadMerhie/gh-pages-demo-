// import LocalStorageData from "./LocalStorageData";

const DataObject = ({temp, feelsLike, city, country, weather}) => {

            return( 
                <div className="card">
                 <p>
                   It is currently {temp} °C (felt {feelsLike} °C) in {city}, {country}.
                 </p>
                 <p>The weather is: {weather} </p>
                </div>
              )
        }
     
  
 

export default DataObject
