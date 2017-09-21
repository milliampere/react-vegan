import React from "react";
import PropTypes from 'prop-types';

function ProductTable(props) {

  const tr = props.array.map((item, index) => 
    <tr key={index}>
      <td>{item.Namn}</td>
      <td>{item.Huvudgrupp}</td>
    </tr>
  );

  return(
    <div>
      <table className="pt-table pt-condensed">
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