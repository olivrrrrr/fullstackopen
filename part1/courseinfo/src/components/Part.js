import React from 'react'

function Part(props) {
    
    console.log(props)
  
    return (
        <>
            <p>
                {props.part.name} {props.exercises.exercises}
            </p>
        </>
    )
}

export default Part
