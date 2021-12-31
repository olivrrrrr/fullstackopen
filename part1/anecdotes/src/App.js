import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4 : 0, 5: 0, 6: 0}); 

  const handleClick = () => {
      setSelected(Math.floor(Math.random() * 7));
  }

  const highestScoreQuote = () => {
    for (const [key, value] of Object.entries(points)){
      if(value == Object.values(points).sort((a,b)=> b - a)[0]){
        return <p> {anecdotes[key]} <br/> has {value} votes </p>;
      }
    }
  }

  const handleVote = () => {

    switch(selected){
      case 0: 
        setPoints({
          ...points,
          0: points[selected] + 1
        })
        break;
      case 1: 
        setPoints({
          ...points,
          1: points[selected] + 1
        })
        break;
      case 2: 
        setPoints({
          ...points,
          2: points[selected] + 1
        })  
        break; 
      case 3: 
        setPoints({
          ...points,
          3: points[selected] + 1
        }) 
        break; 
      case 4: 
        setPoints({
          ...points,
          4: points[selected] + 1
        }) 
        break; 
      case 5: 
        setPoints({
          ...points,
          5: points[selected] + 1
        }) 
        break;
      case 6:
        setPoints({
          ...points,
          6: points[selected] + 1
        }) 
        break; 
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p> has {points[selected]} votes </p>
      <div>
         <button onClick={()=>handleVote()}>vote</button>
         <button onClick={() => handleClick()}>next anecdote</button>
      </div>
      <div>
        <h2>Anecdote with the most votes</h2>
        <p>{highestScoreQuote()}</p>
      </div>
    </div>
  )
}

export default App