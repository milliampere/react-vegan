import React from "react";
import PropTypes from 'prop-types';

function ProductList(props) {
  const list = props.array.map((item, index) => 

  <div key={index} className="card">
    <div className="card-block">
      <h4 className="card-title">{item.Huvudgrupp}</h4>
      <p className="card-text">
        {item.Namn}
        {item.Klassificeringar.Klassificering[0].Varden.KlassificeringVarde.Namn}
      </p>
    </div>
  </div>)

  return <div className="card-group">
      {list}
    </div>;
}

ProductList.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object).isRequired, 
}

export default ProductList;