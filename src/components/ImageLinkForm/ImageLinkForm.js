import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
  return (
    <div>
      <p className="white f3">
        {'Face Dectector,insert the link of a picture and Try it'}
      </p>

      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
        <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} />
        <button className="w-30 grow f4 ph3 pv2 dib black bg-grey"
        onClick={onPictureSubmit }>
          Detect
        </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
