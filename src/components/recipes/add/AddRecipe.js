import React, { Component } from 'react';
import Type from './Type';
import NameAndDescription from './NameAndDescription';
import ImageUpload from './ImageUpload';
import Facts from './Facts';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import firebase from '../../../firebase';


class AddRecipe extends Component {

  state = {
    // Inputs
    type: '',
    name: '',
    description: '',
    prepareTime: '',
    cookingTime: '',
    portions: '',
    ingredients: [{amount: 1, unit: '', comment: ''},{amount: 1, unit: '', comment: ''},{amount: 1, unit: '', comment: ''}],
    instructions: [{description: ''},{description: ''},{description: ''}],
    //Image upload
    file: '',
    imagePreviewUrl: ''
  }

  // Get type for this.state.type from Type-component
  onClickType = (type) => {
      this.setState({type: type});
  }

  onClickAddIngredient = () => {
    let ingredients = [...this.state.ingredients];
    ingredients.push({amount: 1, unit: 'tsk', comment: ''});
    this.setState({ingredients:ingredients});
  }

  onClickRemoveIngredient = (event) => {
    let ingredients = [...this.state.ingredients];
    let id = parseInt(event.target.id, 10);
    ingredients = ingredients.filter((item,index) => { 
      // If index is not id for item to be removed
      return !(index === id)
    });
    this.setState({ingredients:ingredients});
  }

  // Update state on change 
  onChangeIngredient = (event) => {
    let ingredients = [...this.state.ingredients];
    let id = event.target.id;
    if(event.target.name === 'amount'){
      ingredients[id].amount = event.target.value;
    } else if(event.target.name === 'unit'){
      ingredients[id].unit = event.target.value;
    } else if(event.target.name === 'comment'){
      ingredients[id].comment = event.target.value;
    }
    this.setState({ingredients: ingredients})
  }


  onClickAddInstruction = () => {
    let instructions = [...this.state.instructions];
    instructions.push({description: ''});
    this.setState({instructions:instructions});
  }

  onClickRemoveInstruction = (event) => {
    let instructions = [...this.state.instructions];
    let id = parseInt(event.target.id, 10);
    instructions = instructions.filter((item,index) => { 
      // If index is not id for item to be removed
      return !(index === id)
    });
    this.setState({instructions:instructions});
  }

  // Update state on change 
  onChangeInstruction = (event) => {
    let instructions = [...this.state.instructions];
    let id = event.target.id;
    if(event.target.name === 'description'){
      instructions[id].description = event.target.value;
    }
    this.setState({instructions: instructions})
  }

  onImageChange = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];

    console.log(file);

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  uploadImage = () => {
    console.log('handle uploading-', this.state.file);

    // Filename
    const filename = "recipe-image-" + ((Math.floor((Math.random() * 1000000))));

    // Create the file metadata
    const metadata = {
      contentType: 'image/jpeg', 
      name: "Bild"
    };

    // Upload file and metadata to the object 'recipe-images/"filename".jpg'
    const uploadTask = firebase.storage().ref().child('recipe-images/' + filename).put(this.state.file, metadata);
  }

  onClickDefaultImage = () => {

    const defaultImageRef = firebase.storage().ref().child('default-images/food.jpg');

    const defaultImageUrl = defaultImageRef.getDownloadURL().
    then(url => {
      return url
    }).catch(function(error) {console.log(error);});

this.setState({imagePreviewUrl: defaultImageUrl});
  }

  // Generic on change for input fields
   onChange = (event) => {this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div className="AddRecipe">
        <Type onClick={this.onClickType} type={this.state.type} />
        <NameAndDescription onChange={this.onChange} name={this.state.name} description={this.state.description} />
        <ImageUpload file={this.state.file} progress={this.state.progress} imagePreviewUrl={this.state.imagePreviewUrl} onImageChange={this.onImageChange} onClickDefaultImage={this.onClickDefaultImage}/>
        <Facts onChange={this.onChange} prepareTime={this.state.prepareTime} cookingTime={this.state.cookingTime} portions={this.state.portions} />
        <Ingredients ingredients={this.state.ingredients} onChangeIngredient={this.onChangeIngredient} onClickAddIngredient={this.onClickAddIngredient} onClickRemoveIngredient={this.onClickRemoveIngredient} />
        <Instructions instructions={this.state.instructions} onChangeInstruction={this.onChangeInstruction} onClickAddInstruction={this.onClickAddInstruction} onClickRemoveInstruction={this.onClickRemoveInstruction} />
      
        <button className="pt-button submitButton" type="button" onClick={() => this.uploadImage()}>Ladda upp bild</button>
      </div>
    );
  }
}

export default AddRecipe;