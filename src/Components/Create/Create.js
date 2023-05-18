import React, { Fragment ,useContext,useState} from 'react';
import './Create.css';
import Header from '../Header/Header';
import {HandelState} from '../../useForm'
import {AuthContext,FirebaseContext} from '../../store/Context'
import { useNavigate } from 'react-router-dom';
import {ref,getStorage,uploadBytes,getDownloadURL} from 'firebase/storage'
import {collection, addDoc} from 'firebase/firestore'
const Create = () => {

  const {db} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  
  const [state,setState] = HandelState({
    name:'',
    category:'',
    price:''
  })

  const navigate = useNavigate()

  const storage = getStorage()

  const[image,setImage] = useState(null)
  
  const newDate = new Date()

  const HandleSubmit = ()=>{
    if(image){
      const storageRef = ref(storage,`/image/${image.name}`)
      uploadBytes(storageRef,image).then((result)=>{
        getDownloadURL(result.ref).then((url)=>{
          addDoc(collection(db,'products'),{
            name:state.name,
            category:state.category,
            price:state.price,
            url:url,
            userId:user.uid,
            createdAt : newDate.toDateString()
          }).then(()=>{
            navigate('/')
          }).catch((err)=>{
            console.log(err)
          })
        })
      })
    }

  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
 
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

          <br />
          <img  alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
  
            <br />
            <input onChange={(event)=>{
             setImage(event.target.files[0])
            }} type="file" />
            <br />
            <button onClick={HandleSubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
