import React, { useState, useEffect } from 'react'
import axios from "axios"
import personService from './services/personService'


const Filter = ({filter, handleFilterInput}) => {
return (<div>
  filter shown with <input value={filter} onChange={handleFilterInput}/>
</div>)

}

const PersonForm = ({addPerson, newName, handleInput, number, handleNumberInput, persons}) =>{
  
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

const Person = ({ handleDeletePerson, person}) =>{
  
  return(<p>{person.name} {person.number}<button onClick={handleDeletePerson}>delete</button></p>)

}


const App = () => {
  

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'0208', id: 1}, 
    { name: 'Oliver', number:'0208', id: 2}
  ]) 

  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('')

  useEffect(()=>{
      personService
        .getAll()
        .then(resp=>setPersons(resp))
  }, [])

  const addPerson = (e) => { 
    e.preventDefault();
    if(persons.map(person => person.name).includes(newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)){
        
        const personID = Object.values(persons.filter(person=> person.name == newName))[0].id
        const person = persons.find(person => person.id === personID)
        const changedPerson = {...person, number: number}
    
          personService
            .update(personID, changedPerson)
            .then(resp=>{
              setPersons(persons.map(person => person.id !== personID ? person : resp))
              setNewName('')
              setNumber('')
            })
        
       }
    } else {

      const contactObject = {
        name: newName,
        number: number
      }

        personService
          .create(contactObject)
          .then(resp=>{
            setPersons(persons.concat(resp));
            setNewName('')
            setNumber('')
          })

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

  const handleDelete = (name, id) =>{
    if(window.confirm(`Are you sure you want to delete ${name}?`)){
            personService
              .deletePerson(id)
              .then(resp=>setPersons(persons.filter(person => person.id != id)))
          }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterInput={handleFilterInput} filter={filter} />
      <h3>Add a new</h3>
      <PersonForm
       persons={persons}
       addPerson={addPerson} 
       newName={newName}
       handleInput={handleInput}
       number={number}
       handleNumberInput={handleNumberInput}
       />
      <h2>Numbers</h2>
        {
          persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person=>{
           return( 
            <Person
            key={person.id}
            person={person}
            filter={filter} 
            handleDeletePerson={()=>handleDelete(person.name, person.id)} />
           )
          })
      }
     
    
    </div>
  )
}

export default App
