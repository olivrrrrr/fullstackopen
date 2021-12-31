import React from 'react'

function StatisticLine(props) {
    return (
       
            <tr>
                <td>{props.text}</td>
                <td>{props.value.toPrecision(3)} {props.percent}</td>
            </tr>
       
    )
}

export default StatisticLine
