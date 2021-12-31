import React from 'react'
import StatisticLine from './StatisticLine'

function Statistics(props) {

    if(props.good === 0 && props.neutral === 0 && props.bad === 0){
        return(
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <>
            <StatisticLine text='good' value={props.good}/>
            <StatisticLine text='neutral' value={props.neutral}/>
            <StatisticLine text='bad' value={props.bad} />
            <StatisticLine text='all' value={props.good + props.neutral + props.bad} />
            <StatisticLine text='average' value={props.good*1 + props.neutral*0 + props.bad*-1/3}/>
            <StatisticLine text='positive' value={props.good/(props.neutral + props.bad)*100} percent='%'/>
        </>
    )
}

export default Statistics

