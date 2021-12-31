
import {useState} from 'react'
import Title from './components/Title'
import Button from './components/Button';
import Statistics from './components/Statistics';
import StatisticTitle from './components/StatisticTitle';



function App() {

  const [good, setGood] = useState(0); 
  const [neutral, setNeutral] = useState(0); 
  const [bad, setBad] = useState(0); 
  
  const handleGoodClick = () =>{
    setGood(good + 1);
  }

  const handleNeutralClick = () =>{
    setNeutral(neutral + 1);
  }

  const handleBadClick = () =>{
    setBad(bad + 1);
  }

  return (
    <div className="App">
        <Title/>
        <Button handleClick={()=> handleGoodClick()} text='good'/>
        <Button handleClick={()=> handleNeutralClick()} text='neutral'/>
        <Button handleClick={()=> handleBadClick()} text='bad'/>
        <StatisticTitle />
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;