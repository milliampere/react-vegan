import React, { Component } from 'react';
import firebase from '../firebase';
import productsData from '../livsmedelsverket_170909.json';
import ProductList from './ProductList';

class Products extends Component {

  state = {
    products: []    
  }

  componentDidMount(){
    this.getDataFromLocalFile(productsData);
  }
  // Fetch food from local file
  getDataFromLocalFile = (data) => {
    this.setState({products : data});
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

  // Remove objects from array
  removeMeatProducts = (originalArray, property) => {
    const meatCodes = ["A0799"];
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

  render() {
    const productsArray = this.state.products.map((item, index) => item);
    var allGroups = this.removeDuplicates(this.state.products, "Huvudgrupp");
    
    return (
      <div className="Products">
        <ProductList array={allGroups} />

      </div>
    );
  }
}

export default Products;
