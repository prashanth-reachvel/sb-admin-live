import React from 'react'
import "./ProductionTasks.css"

const ProductionTasks = () => {
  return (
    <div>
      <div className='production-tasks-inner-container'>
            <button className='button-btn'>Export</button>
            <button className='button-btn'>Filter</button>
            <input type='date' className='button-btn'/>
            <input type='text' className='button-btn search-input'/>
            <button className='button-btn search-btn'>Search</button>
        </div>
        <div className='schoollist-table-container'>
          <table>
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Date</th>
                <th>Confirmed By</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Flavoured Milk Badam</td>
                <td>200</td>
                <td>19/01/2024</td>
                <td>Raj</td>
                <td className='status'>Produced</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Flavoured Milk Badam</td>
                <td>200</td>
                <td>19/01/2024</td>
                <td>Raj</td>
                <td className='status'>Produced</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Flavoured Milk Badam</td>
                <td>200</td>
                <td>19/01/2024</td>
                <td>Raj</td>
                <td className='status'>Produced</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default ProductionTasks