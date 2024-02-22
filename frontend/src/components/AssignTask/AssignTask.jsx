import React, { useState } from 'react'
import "./AssignTask.css"
import Sidebar from '../Sidebar'
import DistributionForm from '../DistributionForm/DistributionForm'
import ProductionForm from '../ProductionForm/ProductionForm'

const AssignTask = () => {
  const [activeTab, setActiveTab] = useState('Distribution')

  const tabClassName1 = activeTab === "Distribution" ? `individual-tab selected-tab` : `individual-tab`;
  const tabClassName2 = activeTab === "Production" ? `individual-tab selected-tab` : `individual-tab`;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }

  return (
    <div className='assign-task-production-container'>
        <Sidebar />
        <div className='assign-task-production-inner-container'>
          <h2 className='assign-task-title'>Assign Task</h2>
          <div className='tabs-button-container'>
            <button className={`${tabClassName1}`} onClick={() => handleTabClick('Distribution')}>Distribution</button>
            <button className={`${tabClassName2}`} onClick={() => handleTabClick('Production')}>Production</button>
          </div>
          {activeTab === "Distribution" ? (<DistributionForm />): (<ProductionForm />)}
        </div>
    </div>
  )
}

export default AssignTask