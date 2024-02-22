import React from 'react'
import "./DistributionForm.css"

const DistributionForm = () => {
  return (
    <form className='distribution-form-container'>
        <div className='label-input-container'>
            <label className='distribution-label'>Vendor: </label>
            <input type='text' className='distribution-input' placeholder='Narmul Dairy'/>
        </div>
        <div className='label-input-container'>
            <label className='distribution-label'>Product Title: </label>
            <select className='distribution-input select'>
                <option>Falvoured Milk - Badam</option>
                <option>Falvoured Milk - Pista</option>
            </select>
        </div>
        <div className='label-input-container'>
            <div>
                <label className='distribution-label'>Date: </label>
                <input type='date' className='distribution-input short-input email-input'/>
            </div>
            <div>
                <label className='distribution-label'>Quantity: </label>
                <input type='number' className='distribution-input short-input'/>
            </div>
        </div>
        <div className='label-input-container'>
            <label className='distribution-label'>School: </label>
            <select className='distribution-input select'>
                <option>ABC School</option>
                <option>XYZ School</option>
            </select>
        </div>
        <div className='label-input-container'>
            <label className='distribution-label'>Confirmed by: </label>
            <input type='text' className='distribution-input'/>
        </div>
        <button className='submit-btn'>SUBMIT</button>
    </form>
  )
}

export default DistributionForm