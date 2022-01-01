import React, { useState } from 'react'


const Filter = ({filter, handleFilterInput}) => {
return (<div>
  filter shown with <input value={filter} onChange={handleFilterInput}/>
</div>)

}

const PersonForm = ({addPerson, newName, handleInput, number, handleNumberInput}) =>{
  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleInput}/>
      </div>
      <div>
        number: <input value={number} onChange={handleNumberInput}/>
      </div>
      <div>
        <button>add</button>
      </div>
  </form>
  )
}

const Persons = ({persons, filter}) =>{
  return(persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person=>
    <p key={person.id}>{person.name} {person.number}</p>
  ))
}


const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'0208', id: 1}, 
    { name: 'Oliver', number:'0208', id: 2}
  ]) 

  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('')

  const addPerson = (e) => { 
    e.preventDefault();
    if(persons.map(person => person.name).includes(newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: number}));
      setNewName('')
    }    
  }

  const handleInput = (e) => {
    setNewName(e.target.value); 
  }

  const handleNumberInput = (e) =>{
      setNumber(e.target.value);
  }

  const handleFilterInput = (e) =>{ 
    setFilter(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterInput={handleFilterInput} filter={filter} />
      <h3>Add a new</h3>
      <PersonForm
       addPerson={addPerson} 
       newName={newName}
       handleInput={handleInput}
       number={number}
       handleNumberInput={handleNumberInput}
       />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
