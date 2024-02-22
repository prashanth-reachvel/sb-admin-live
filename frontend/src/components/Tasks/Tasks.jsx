import React, { useState } from 'react'
import "./Tasks.css"
import Sidebar from '../Sidebar'
import DistributionTasks from '../DistributionTasks/DistributionTasks'
import ProductionTasks from '../ProductionTasks/ProductionTasks'

const Tasks = () => {
    const [selectTab, setSelectTab] = useState('Distributed')

    const className1 = selectTab === "Distributed" ? "individual-tab selected-tab" : "individual-tab";
    const className2 = selectTab === "Produced" ? "individual-tab selected-tab" : "individual-tab";

    const handleTaskTab = (tab) => {
        setSelectTab(tab)
    }

    return (
        <div className='tasks-container'>
            <Sidebar />
            <div className='tasks-inner-container'>
                <h2 className='tasks-title'>Tasks</h2>
                <div className='tabs-button-container'>
                    <button className={`${className1}`} onClick={() => handleTaskTab('Distributed')}>Distributed</button>
                    <button className={`${className2}`} onClick={() => handleTaskTab('Produced')}>Production</button>
                </div>
                {selectTab === "Distributed" ? (<DistributionTasks />) : (<ProductionTasks />)}
            </div>
        </div>
    )
}

export default Tasks