import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
  return (
    <div className="center ma">
    <div className="absolute mt2">
      <img id="inputImage" alt="" src={imageUrl}  width="auto" height="660px"/>
      <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    </div>
    </div>
  );
};

export default FaceRecognition;


//https://scontent.fsjo3-1.fna.fbcdn.net/v/t1.0-0/p640x640/59785776_612651105902563_3435813913692733440_o.jpg?_nc_cat=100&_nc_sid=110474&_nc_ohc=PxhzIc0RmoYAX9Ijio1&_nc_ht=scontent.fsjo3-1.fna&_nc_tp=6&oh=fcf95a69e2177c6685c117515a871a14&oe=5ECDF87F