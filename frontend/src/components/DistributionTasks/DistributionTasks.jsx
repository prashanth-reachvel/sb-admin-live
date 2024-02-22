import React from 'react'
import "./DistributionTasks.css"

const DistributionTasks = () => {
  return (
    <div>
        <div className='distribution-tasks-inner-container'>
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
                <th>School Name</th>
                <th>Location</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Date</th>
                <th>Contact Person</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>ZPP Model School, HYD</td>
                <td>Panjagutta, Hyd</td>
                <td>Flavoured Milk</td>
                <td>200</td>
                <td>19/01/2024</td>
                <td>Raj</td>
                <td style={{color: "#046A38"}} className='status'>Delivered</td>
              </tr>
              <tr>
                <td>2</td>
                <td>ZPP Model School, HYD</td>
                <td>Panjagutta, Hyd</td>
                <td>Uniform</td>
                <td>200</td>
                <td>19/01/2024</td>
                <td>Raj</td>
                <td style={{color: "#FF8A00"}} className='status'>Open</td>
              </tr>
              <tr>
                <td>2</td>
                <td>ZPP Model School, HYD</td>
                <td>Panjagutta, Hyd</td>
                <td>Uniform</td>
                <td>200</td>
                <td>19/01/2024</td>
                <td>Raj</td>
                <td style={{color: "#FF0000"}} className='status'>Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default DistributionTasks