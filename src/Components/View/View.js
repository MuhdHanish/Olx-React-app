import React, { useState, useEffect, useContext } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState({})
  const { postDetails } = useContext(PostContext)
  const { db } = useContext(FirebaseContext)

  const fetch = async () => {
  await  getDocs(query(
      collection(db, 'users'),
      where('uid', '==', postDetails.userId))).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data())
        })
      })
  }


  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <h3 >Seller Information</h3>
          <p>{userDetails?.name}</p>
          <p>{userDetails?.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;