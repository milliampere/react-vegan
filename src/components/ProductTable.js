import React from "react";
import PropTypes from 'prop-types';

function ProductTable(props) {

  const tr = props.array.map((item, index) => 
    <tr key={index}>
      <td>{item.Namn}</td>
      <td>{item.ViktGram}</td>
      <td>{item.Huvudgrupp}</td>
      <td>{item.Naringsvarden.Naringsvarde[0].Namn} </td>
    </tr>
  );

  return(
    <div>
      <table className="pt-table pt-striped">
        <thead>
          <tr>
            <th>Produkt</th>
            <th>Vikt (g)</th>
            <th>Huvudgrupp</th>
            <th>Näringsvärde</th>
          </tr>
        </thead>
        <tbody>
          {tr}
        </tbody>
      </table>
    </div>
  
  )
}

ProductTable.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object).isRequired, 
}

export default ProductTable;