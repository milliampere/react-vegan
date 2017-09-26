import React, {Component} from 'react';
import firebase from '../../../firebase';
import { ProgressBar } from "@blueprintjs/core";

class ImageUpload extends Component {

    state = { 
      file: '',
      imagePreviewUrl: '', 
      progress: 0
    };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('handle uploading-', this.state.file);

    // Filename
    const filename = "recipe-image-" + ((Math.floor((Math.random() * 1000000))));

    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg', 
      name: "Bild"
    };

    // Upload file and metadata to the object 'recipe-images/"filename".jpg'
    const uploadTask = firebase.storage().ref().child('recipe-images/' + filename).put(this.state.file, metadata);

    // Listen for state changes, errors, and completion of the upload
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded. Value is a number from 0 to 1.
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes);
        console.log('Uppladdning är ' + (progress*100) + '% klar');
        this.setState({progress: progress});
      }, 
      (err) => {
        console.log(err);
      }
    );
  }

  handleImageChange = (event) => {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {

    return (
      <div className="previewComponent">

        {/* <img src="https://firebasestorage.googleapis.com/v0/b/vegan-313e0.appspot.com/o/MEDD014A63E80B1412DAEE58BC11E2A9AB4.jpg?alt=media&token=416000d3-230e-4910-9b32-c8355699b194" />
        */}

        <ProgressBar value={this.state.progress} className="pt-intent-primary pt-no-stripes" />

        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input className="pt-input fileInput" 
            type="file" onChange={(e) => this.handleImageChange(e)}  />
          <button className="pt-button submitButton" 
            type="submit" 
            onClick={(e)=>this.handleSubmit(e)}>Ladda upp bild</button>
        </form>
        <div className="imgPreview">
          {this.state.imagePreviewUrl ? <img src={this.state.imagePreviewUrl} alt="Preview" /> : <div className="previewText">Välj en bild</div> }
        </div>
      </div>
    )
  }
}
  
export default ImageUpload;


