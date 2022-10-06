import { useEffect, useState } from "react";
import "./App.css";
import DataObject from "./DataObject";

const MY_KEY = "a20273c702268088244bd5c1b90c5640";


function App() {

  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  useEffect(()=> {
  const savedData = localStorage.getItem("savedData");
      if (savedData !== null) {
        const array = JSON.parse(savedData)
        setWeatherData(array)
      }

},[])
  const showWeather = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${MY_KEY}&units=metric&lang=en`
      );
      const data = await response.json();
      const temp = data.main.temp;
      const feelsLike = data.main.feels_like;
      const city = data.name;
      const country = data.sys.country;
      const weather = data.weather[0].description;
      
      const newP = [
        { temp, feelsLike, city, country, weather }, ...weatherData ,
      ]
      if (weatherData.length < 5) {
        setWeatherData(newP);

        localStorage.setItem(
          "savedData",
          JSON.stringify(newP)
        );
      } else if (weatherData.length === 5) {
        // weatherData.splice(0,-1);
        setWeatherData(newP.slice(0,-1));
        localStorage.setItem(
          "savedData",
          JSON.stringify(newP.slice(0,-1))
        );
      }
  
    } catch (error) {
      console.log(error);
    }
    setInput("");
  };

  const reset =()=>{
    localStorage.clear();
    setWeatherData([])
  }

  return (
    <div className="App">
      <form onSubmit={showWeather} >
        <input
          type="text"
          name="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button
          onMouseOver={(event) => (event.target.className = "btn")}
          onMouseOut={(event) => (event.target.className = "")}
        >
        
          Show Weather
        </button>
        <button onClick={reset}
        onMouseOver={(event) => (event.target.className = "btn")}
        onMouseOut={(event) => (event.target.className = "")}>RESET</button>
      </form>
      <div className="cards">
      
      
      {weatherData.map((wD) => (
        <DataObject
          key={wD.city}
          temp={wD.temp}
          feelsLike={wD.feelsLike}
          city={wD.city}
          country={wD.country}
          weather={wD.weather}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
