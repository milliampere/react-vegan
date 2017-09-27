import React from 'react';
import Heading from './Heading';
import {Button} from '@blueprintjs/core';

const ImageUpload = props => {

  return (
    <div>
      <Heading title="Välj receptbild" />
      <div style={{display: 'flex'}}>
        <div>
          <label className="pt-file-upload pt-fill">
            <input type="file" onChange={props.onImageChange} />
            <span className="pt-file-upload-input">Välj fil...</span>
          </label>
          <Button text="Använd defaultbild" onClick={() => props.previewDefaultImage(props.type)} />
        </div>
        
        <div className="imgPreview">
          {props.imagePreviewUrl ? <img src={props.imagePreviewUrl} alt="Default" /> : <div className="previewText"></div> }
        </div>
      </div>
    </div>
  )
}

  
export default ImageUpload;


