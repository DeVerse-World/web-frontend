import React from 'react'
import './Styles.css';

const EnjCompare = ({products}) =>
<div className="container">
  <h1 className="heading">Altura vs. Enjin</h1>
  <div className="row compare">
    <div className="col-12 mt-5 text-center">
      <table className="table">
        <thead className="thead-default">
          <tr>
            <th />
            <th >
              Altura
            </th>
            <th >
              Enjin
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="price">
            <th scope="row">Transaction fees</th>
            <td className="text-center bg-green"> {"<$1"} </td>
            <td className="text-center bg-red">$10 - $30</td>
          </tr>
          <tr className="price">
            <th scope="row">Ease of use </th>
            <td className="text-center bg-green">Easy</td>
            <td className="text-center bg-red">Difficult</td>
          </tr>
          <tr className="colors">
            <th scope="row">NFT type</th>
              <td className="text-center bg-green">Dynamic & static</td>
              <td className="text-center bg-red">Only static</td>
          </tr>
          <tr className="colors">
            <th scope="row">Lootbox functionality</th>
            <td className="text-center bg-green">Yes</td>
            <td className="text-center bg-red">No</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>


export default EnjCompare
