import React from 'react'

function Total(props) {
  

    console.log(props)

    return (
        <>
            <p>Number of exercises {props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises}</p>
        </>
    )
}

export default Total
