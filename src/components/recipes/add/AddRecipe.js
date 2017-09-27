import React, { Component } from 'react';
import Type from './Type';
import NameAndDescription from './NameAndDescription';
import ImageUpload from './ImageUpload';
import Facts from './Facts';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import firebase from '../../../firebase';
import Button from './Button';


class AddRecipe extends Component {

  state = {
    // Inputs
    type: 'food',
    name: '',
    description: '',
    prepareTime: '',
    cookingTime: '',
    portions: '',
    ingredients: [{amount: 1, unit: '', comment: ''},{amount: 1, unit: '', comment: ''},{amount: 1, unit: '', comment: ''}],
    instructions: [{description: ''},{description: ''},{description: ''}],
    
    //Image upload
    file: '',
    imagePreviewUrl: '',

    // Recipe db
    recipeKey: ''
  }

  componentDidMount() {

/*    setTimeout(() => {
      this.loadRecipe();
    }, 3000); */
    
    this.previewDefaultImage(this.state.type);
  }

  // Get type for this.state.type from Type-component
  onClickType = (type) => {
      this.setState({type: type});

      if(this.state.file.length < 1){
        this.previewDefaultImage(type);
      }
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
    //const uploadTask = 
    firebase.storage().ref().child('recipe-images/' + filename).put(this.state.file, metadata);
  }

  previewDefaultImage = (type) => {
    let defaultImageRef;
    if(type === 'pastry'){
      defaultImageRef = firebase.storage().ref().child('default-images/pastry.jpg');
    }else{
      defaultImageRef = firebase.storage().ref().child('default-images/food.jpg');
    }
    
    defaultImageRef.getDownloadURL()
    .then(url => {
      this.setState({imagePreviewUrl: url});
    }).catch(function(error) {console.log(error);});
  }

  // Generic on change for input fields
   onChange = (event) => {this.setState({[event.target.name]: event.target.value});
  }

  loadRecipe = () => {
    console.log("Load recipe"); 
    let latestRecipeKey, recipe;
    const uid = this.props.user.uid;

    firebase.database().ref('/users/' + uid).once('value').then((snapshot) => {
      latestRecipeKey = (snapshot.val() && snapshot.val().latestRecipe.id) || null;
      console.log("Latest recipe key:" + latestRecipeKey);
    }).then(() => {
      firebase.database().ref('/recipes/' + latestRecipeKey).once('value').then((snapshot) => {
        recipe = (snapshot.val() || {name: "Hej"});
        console.log("Latest recipe: " + recipe);
        this.setState({name: recipe.name});
      });
    });

    

    
          
/*          this.setState({name: recipe.name});
          this.setState({description: recipe.description});

          this.setState({prepareTime: recipe.prepareTime});
          this.setState({cookingTime: recipe.cookingTime});
          this.setState({portions: recipe.portions});
          this.setState({ingredients: recipe.ingredients});
          this.setState({instructions: recipe.instructions});
          this.setState({imagePreviewUrl: recipe.imagePreviewUrl});*/

  }
  

  saveRecipe = () => {

    console.log("Save recipe"); 
    let recipeKey;
    const uid = this.props.user.uid;

      firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
        console.log(snapshot.val().latestRecipe);
        //var latest = (snapshot.val() && snapshot.val().latestRecipe.id) || 'Anonymous';
        // ...
      });

    if(!(this.state.recipeKey.length > 1)){
      console.log("Recipe create");
      recipeKey = firebase.database().ref().child('recipes').push().key;
      this.setState({recipeKey : recipeKey});
    }
    else{
      console.log("Recipe update");
      recipeKey = this.state.recipeKey;
    }

    const recipe = {
      author: uid,
      type: this.state.type,
      name: this.state.name,
      description: this.state.description,
      prepareTime: this.state.prepareTime,
      cookingTime: this.state.cookingTime,
      portions: this.state.portions,
      ingredients: this.state.ingredients,
      instructions: this.state.instructions,
      imagePreviewUrl: this.state.imagePreviewUrl
    };

    const latestRecipe = {
      id: recipeKey
    }

    // Write the recipe data simultaneously in the recipe list and the user's recipe list.
    const updates = {};
      updates['/recipes/' + recipeKey] = recipe;
      updates['/users/' + uid + '/recipes'] = recipeKey;
      updates['/users/' + uid + '/latestRecipe'] = latestRecipe;

    return firebase.database().ref().update(updates);


  }

  render() {
    return (
      <div className="AddRecipe">
        <Type onClick={this.onClickType} type={this.state.type} />
        <NameAndDescription onChange={this.onChange} name={this.state.name} description={this.state.description} />
        <ImageUpload file={this.state.file} progress={this.state.progress} imagePreviewUrl={this.state.imagePreviewUrl} onImageChange={this.onImageChange} previewDefaultImage={this.previewDefaultImage} type={this.state.type} />
        <Facts onChange={this.onChange} prepareTime={this.state.prepareTime} cookingTime={this.state.cookingTime} portions={this.state.portions} />
        <Ingredients ingredients={this.state.ingredients} onChangeIngredient={this.onChangeIngredient} onClickAddIngredient={this.onClickAddIngredient} onClickRemoveIngredient={this.onClickRemoveIngredient} />
        <Instructions instructions={this.state.instructions} onChangeInstruction={this.onChangeInstruction} onClickAddInstruction={this.onClickAddInstruction} onClickRemoveInstruction={this.onClickRemoveInstruction} />
      
        <button className="pt-button submitButton" type="button" onClick={() => this.uploadImage()}>Ladda upp bild</button>

        <Button onClick={this.saveRecipe} text="Spara recept" />
      </div>
    );
  }
}

export default AddRecipe;