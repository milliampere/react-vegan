import React, { Component } from 'react';
import firebase from '../firebase';
import productsDataNutrition from '../20170920.json';
import ProductList from './ProductList';
import ProductTable from './ProductTable';
import ProductInputResult from './ProductInputResult';
import productsDataClassification from '../livsmedelsverket_170909.json';


class Products extends Component {

  state = {
    productsFromDatabaseNutrition: [],
    productsFromDatabaseClassification: [],
    productInput: '',
    productSearch: [], 
    products: []
    
  }

  componentDidMount(){
    this.getDataFromLocalFile(productsDataNutrition,productsDataClassification);
  }

   // Generic on change for input fields
   onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  // Fetch products from local file
  getDataFromLocalFile = (data,data2) => {
    this.setState({productsFromDatabaseNutrition : data});
    this.setState({productsFromDatabaseClassification : data2});
  }

 
 // Remove objects from array where there is property duplicates
 removeDuplicates = (originalArray, property) => {
  var trimmedArray = [];
  var values = [];
  var value;

  trimmedArray = originalArray.filter(item => {
    value = item[property];
    // If value doesn't exist in our temporary array, 
    // put it there and return the object to the trimmed array
    if(!values.includes(value)){
      values.push(value);
      return item;
    }
  });
  return trimmedArray;
}

  // Match product arrays
  getProductsWithNutritionInfoWithoutMeatAndDishes = () => {
    const classificationProductsWithoutMeatAndDishes = this.removeMeatAndDishProducts(this.state.productsFromDatabaseClassification);
    const allNutritionProducts = this.state.productsFromDatabaseNutrition;
    let trimmedArray = [];
    let values = [];
    for(let item of classificationProductsWithoutMeatAndDishes){
      values.push(item.Nummer);
    }
    let value;
  
    trimmedArray = allNutritionProducts.filter(item => {
      value = item.Nummer;
      // If value doesn't exist in our temporary array, 
      // put it there and return the object to the trimmed array
      if(!values.includes(value)){
        values.push(value);
        return item;
      }
    });
    this.setState({products: trimmedArray});
    console.log(trimmedArray);
  }

  // Remove objects from array
  removeMeatAndDishProducts = (originalArray) => {
   /* meatCodesA
        Mejeriprodukter (A0778)
        Kött (A0793)
        Kött (A0794)	
        Innanmat och inälvsmat (A0796)
        Fisk och skaldjur (A0801)
        Fisk- och skaldjursprodukt (A0803)
        Ägg (A0791)
        Fisk (A0802)
        Fågel (A0795)
        Kyckling (B1198)	
        Konserverat kött (A0797)	
        Mjölk (A0780)	
        Halvhård ost (A0312)	
        Extra hårdost (A0310)	
        Mjukost (A0314)	
        Hårdost (A0311)	
        Färskost (A0786)	
        Övriga ostprodukter (A0787)	
        Andra djurfetter (A0810)	
   */

   /*  meatCodesB
        Gris och nötkött (B1105)
   */

    /* dishCodesA
        Potatisrätter (A0830)
        Maträtter och efterrätter (A0861)
        Fisk- och skaldjursrätt (A0804)
        Äggrätter (A0792)	
        Kötträtt (A0799)
        Soppa (A0865)	
        Sås (A0862)	
        Baljväxträtter (A0832)	
        Grönsaksrätter (A0828)	
        Färdigsallad (A0866)	
        Cerealierätter t.ex. klimp, risotto, pizza, pannkakor,couscous, matpajer, sandwich, (A0822)	
        Bageriprodukter, söta och/eller feta (A0821)	
        Frukostflingor (A0816)
        Dressing, majonnäs (A0859)		
        */

    const meatCodesA = ["A0778", "A0793", "A0794", "A0796", "A0801", "A0803", "A0804", "A0791", "A0802", "A0795", "B1198", "A0797", "A0792", "A0799", "A0780", "A0312", "A0310", "A0314", "A0311", "A0786", "A0787", "A0810"];    
    const meatCodesB = ["B1105", "B1161", "B1136", "B1201", "B2101", "B2247", "B1328", "B1087", "B1198", "B1713", "B1669", "B2695", "B1583", "B1229"];
    const dishCodesA = ["A0830", "A0861", "A0804", "A0792", "A0799", "A0865", "A0862", "A0832", "A0828", "A0866", "A0822", "A0821", "A0816", "A0859"];
    let trimmedArray = [];
    let codeA, codeB;
  
    trimmedArray = originalArray.filter(item => {
      codeA = item.Klassificeringar.Klassificering[0].Varden.KlassificeringVarde.Kod;
      codeB = item.Klassificeringar.Klassificering[1].Varden.KlassificeringVarde.Kod;
      // If value doesn't exist in our arrays of the dead, return the object to the trimmed array
      if(!meatCodesA.includes(codeA) && !meatCodesB.includes(codeB) && !dishCodesA.includes(codeA)){
        return item;
      }
    });
    return trimmedArray;
  } 

  // Pick a Huvudgrupp
  filterProducts = (originalArray, group) => {
    const newArray = originalArray.filter(item => {
      if(item["Huvudgrupp"].includes(group)){
        return item;
      }
    });
    return newArray;
  }

  // Search
  searchByProductName = () => {
    const filteredArray = this.state.products.filter((item) => {
      return item.Namn.toLowerCase().indexOf(this.state.productInput.toLowerCase()) > -1;
    })
    this.setState({productSearch: filteredArray});
  }

  render() {
    //var allGroups = this.removeDuplicates(this.state.productsFromDatabaseClassification, "Huvudgrupp");
    this.getProductsWithNutritionInfoWithoutMeatAndDishes();
    //var products = '';

    return (
      <div className="Products">
        
        <div className="pt-control-group">
          <div className="pt-input-group pt-fill">
            <span className="pt-icon pt-icon-shopping-cart"></span>
            <input type="text" onKeyUp={this.searchByProductName} onChange={this.onChange} className="pt-input" name="productInput" placeholder="Hitta produkter..." />
          </div>
          <button className="pt-button pt-intent-primary">Add</button>
        </div>

        {/* <ProductList array={withoutMeat} /> */}
        {/* <ProductList array={withoutMeat} /> */}      
 
{/*         <ProductInputResult array={this.state.productSearch} />
 */}
        {/* <ProductTable array={allPotatos} />

         */}

      </div>
    );
  }
}

export default Products;









