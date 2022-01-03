import axios from "axios";
import {useEffect, useState} from "react";
import uuid from "react-uuid";


const Weather = ({capital}) => {

  const [weather, setWeather] = useState([]); 
  const [temp, setTemp] = useState([]); 
  const [wind, setWind] = useState([]); 
  const [icon, setIcon] = useState([])
  
  useEffect(()=>{
    axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_MY_API_KEY}`)
    .then(resp=>{
      setWeather(resp.data)
      setTemp(resp.data.main.temp)
      setWind(resp.data.wind)
      setIcon(resp.data.weather)
    })
  },[])
  
  let iconNumber = Object.values(icon).map(val=>val.icon)[0]

  return (
    <>
      <h2>Weather in {capital}</h2>
      <p><b>temparature:</b> {(temp - 273).toPrecision(4)} Celcius</p> 
      <img src={`http://openweathermap.org/img/wn/${iconNumber}@2x.png`}/>
      <p><b>wind:</b>{(wind.speed*2.23694).toPrecision(4)} mph</p> 
    </>
  )
}

function App() {

  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]); 

  useEffect(()=> {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(resp=>{
        setCountries(resp.data)
      })
    }, [])

  const handleInputChange = (e) =>{
      setSearch(e.target.value)
  }

  const handleShow = (e) => {
     setSearch(e.target.value)
  }

  return (

    search !== "" && countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase().trim())).length > 10 
    
    ?

    <div>
      find countries: <input value={search} onChange={handleInputChange} />
      <p>Too many matches, specify another filter </p>
    </div>

    : 

    countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase().trim())).length === 1 
    
    ?

  <div>
    find countries: <input value={search} onChange={handleInputChange} />
    {countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase().trim()))
    .map(country=>{
    return(
    <div key={uuid()}>
      <h2 key={country.ccn3}>{country.name.common}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>

      <h2>languages</h2>
      <ul>
        {Object.values(country.languages)
        .map((val)=>(
        <li key={uuid()}>
            {val}
        </li>))}
  
      </ul>
      <img src={country.flags.png}/>
      <Weather capital={country.capital}/>
    </div>
    )
    })}
  </div>

    :

    <div className="App">
      <div>
         find countries: <input value={search} onChange={handleInputChange} />
         {countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase().trim()))
         .map(country=><div key={uuid()}>{country.name.common}<button value={country.name.common} onClick={handleShow}>show</button></div>)}
      </div>
  </div>
  );
}

export default App;
