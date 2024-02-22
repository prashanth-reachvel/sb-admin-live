import React from 'react'
import "./ProductionForm.css"

const ProductionForm = () => {
  return (
    <form className='production-form-container'>
        <div className='label-input-container'>
            <label className='production-label'>Vendor: </label>
            <input type='text' className='production-input' placeholder='Narmul Dairy'/>
        </div>
        <div className='label-input-container'>
            <label className='production-label'>Product Title: </label>
            <select className='production-input select'>
                <option>Falvoured Milk - Badam</option>
                <option>Falvoured Milk - Pista</option>
            </select>
        </div>
        <div className='label-input-container'>
            <div>
                <label className='production-label'>Date: </label>
                <input type='date' className='production-input short-input email-input'/>
            </div>
            <div>
                <label className='production-label'>Quantity: </label>
                <input type='number' className='production-input short-input'/>
            </div>
        </div>
        <div className='label-input-container'>
            <label className='production-label'>Confirmed by: </label>
            <input type='text' className='production-input'/>
        </div>
        <button className='submit-btn'>SUBMIT</button>
    </form>
  )
}

export default ProductionForm