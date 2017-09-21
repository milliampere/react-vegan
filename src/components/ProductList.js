import React from "react";
import PropTypes from 'prop-types';

function ProductList(props) {

  const tr = props.array.map((item, index) => 
    <tr key={index}>
      <td>{item.Namn}</td>
      <td>{item.ViktGram}</td>
      <td>{item.Huvudgrupp}</td>
      <td>{item.Klassificeringar.Klassificering[0].Varden.KlassificeringVarde.Namn} ({item.Klassificeringar.Klassificering[0].Varden.KlassificeringVarde.Kod})</td>
      <td>{item.Klassificeringar.Klassificering[1].Varden.KlassificeringVarde.Namn} ({item.Klassificeringar.Klassificering[1].Varden.KlassificeringVarde.Kod})</td>
      <td>{item.Klassificeringar.Klassificering[2].Varden.KlassificeringVarde.Namn} ({item.Klassificeringar.Klassificering[2].Varden.KlassificeringVarde.Kod})</td>
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
            <th>Klassificering A Gruppindelning EuroFIR</th>
            <th>Klassificering B Artklassificering</th>
            <th>Klassificering C Del av växt/djur</th>
          </tr>
        </thead>
        <tbody>
          {tr}
        </tbody>
      </table>
    </div>
  
  )
}

ProductList.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object).isRequired, 
}

export default ProductList;