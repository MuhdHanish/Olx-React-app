import React, { useEffect, useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs} from 'firebase/firestore';
import { PostContext } from '../../store/PostContext';


function Posts() {

  const navigate = useNavigate();

  const { db } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const [newAdd, setNewAdd] = useState([]); // Corrected line
  const collectionRef = collection(db, 'products');

  const { setPostDetails } = useContext(PostContext);

  const getProducts = async () => {
    const data = await getDocs(collectionRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getNewAdded = async () => {
    const data = await getDocs(collectionRef);
    const sortedData = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .sort((a, b) => b.dateAdded - a.dateAdded);

    setNewAdd(sortedData);
  };

  useEffect(() => {
    getProducts();
    getNewAdded();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((data)=>{
            return(<div
              onClick={() => {
                setPostDetails(data);
                navigate('/view');
              }}
                className="card"
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={data.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {data.price}</p>
                <span className="kilometer">{data.category}</span>
                <p className="name"> {data.name}</p>
              </div>
              <div className="date">
                <span>{data.createdAt}</span>
              </div>
            </div>)
          })
            
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {newAdd.map((data)=>{
            return(<div
              onClick={() => {
                setPostDetails(data);
                navigate('/view');
              }}
                className="card"
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={data.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {data.price}</p>
                <span className="kilometer">{data.category}</span>
                <p className="name"> {data.name}</p>
              </div>
              <div className="date">
                <span>{data.createdAt}</span>
              </div>
            </div>)
          })
          }
        </div>
      </div>
    </div>
  );
}

export default Posts;
