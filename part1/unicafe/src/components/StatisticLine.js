import React from 'react'

function StatisticLine(props) {
    return (
        <table>
            <tbody>
                <tr>
                    <td>{props.text}</td>
                    <td>{props.value.toPrecision(3)} {props.percent}</td>
                </tr>
            </tbody>
         </table>
    )
}

export default StatisticLine
