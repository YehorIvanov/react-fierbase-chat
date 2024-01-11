import React, { useEffect, useRef } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase';
const StoredImg = (props) => {
  const imgRef = useRef(null);

  useEffect(() => {
    const getImageURL = async () => {
      try {
        const url = await getDownloadURL(ref(storage, props.fileRef));
        imgRef.current.src = url;
      } catch (e) {
        console.log(e);
      }
    };

    getImageURL();
    console.log(imgRef.current.src);
  }, [props.fileRef]);

  return (
    <img className="message-image" ref={imgRef} style={props.style} alt="*" />
  );
};

export default StoredImg;
