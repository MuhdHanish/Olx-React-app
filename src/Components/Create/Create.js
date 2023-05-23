import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { HandelState } from '../../useForm';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const Create = () => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const [errors, setErrors] = useState({});
  const validation = {
    name: /^[A-Za-z\s]+$/,
    category: /^[A-Za-z\s]+$/,
    price: /^\d+(\.\d{1,2})?$/,
  };

  const [state, setState] = HandelState({
    name: '',
    category: '',
    price: '',
  });

  const navigate = useNavigate();

  const storage = getStorage();

  const [image, setImage] = useState(null);

  const newDate = new Date();

  const handleSubmit = () => {
    const trimmedName = state.name.trim();
    if (!validation.name.test(trimmedName)) {
      setErrors({ name: 'Invalid name' });
      return;
    }
    const trimmedCategory = state.category.trim();
    if (!validation.category.test(trimmedCategory)) {
      setErrors({ category: 'Invalid category' });
      return;
    }
    const trimmedPrice = state.price.trim();
    if (!validation.price.test(trimmedPrice)) {
      setErrors({ price: 'Invalid price' });
      return;
    }
    if (image) {
      const storageRef = ref(storage, `/image/${image.name}`);
      uploadBytes(storageRef, image).then((result) => {
        getDownloadURL(result.ref)
          .then((url) => {
            addDoc(collection(db, 'products'), {
              name: state.name,
              category: state.category,
              price: state.price,
              url: url,
              userId: user.uid,
              createdAt: newDate.toDateString(),
            })
              .then(() => {
                navigate('/');
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={state.name}
            onChange={setState}
            defaultValue="John"
          />
          <br />
          {errors.name && <div style={{ color: 'red', marginTop: '5px', marginBottom: '5px' }}>{errors.name}</div>}
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            value={state.category}
            onChange={setState}
            name="category"
            defaultValue="John"
          />
          <br />
          {errors.category && (
            <div style={{ color: 'red', marginTop: '5px', marginBottom: '5px' }}>{errors.category}</div>
          )}
          <label htmlFor="price">Price</label>
          <br />
          <input className="input" type="number" value={state.price} onChange={setState} id="price" name="price" />
          <br />
          {errors.price && (
            <div style={{ color: 'red', marginTop: '5px', marginBottom: '5px' }}>{errors.price}</div>
          )}
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} />
          <br />
          <input onChange={(event) => setImage(event.target.files[0])} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
