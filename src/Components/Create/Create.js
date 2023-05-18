import React, { Fragment ,useState} from 'react';
import './Create.css';
import Header from '../Header/Header';
import {HandelState} from '../../useForm'

const Create = () => {

  const [state,setState] = HandelState({
    name:'',
    category:'',
    price:''
  })

  const[image,setImage] = useState(null)
  console.log(state)
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="name"
              value={state.name}
              onChange={setState}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={state.category}
              onChange={setState}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={state.price}
              onChange={setState} id="fname" name="price" />
            <br />
          </form>
          <br />
          <img  alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
          <form>
            <br />
            <input onChange={(event)=>{
             setImage(event.target.files[0])
            }} type="file" />
            <br />
            <button className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
