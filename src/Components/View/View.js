import React, { useState, useEffect, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState({});
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);

  const fetchUserDetails = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'users'), where('uid', '==', postDetails.userId))
      );

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Handle the error, show an error message, or perform other actions as needed
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (!postDetails) {
    return <div>Loading...</div>; // or show a loading spinner or any other loading indicator
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <h2>Product Details</h2>
          <p className="price">&#x20B9; {postDetails.price}</p>
          <h3 className="name">{postDetails.name}</h3>
          <p className="category">{postDetails.category}</p>
          <p className="createdAt">Created at: {postDetails.createdAt}</p>
        </div>
        {userDetails && (
          <div className="sellerDetails">
            <h2>Seller Information</h2>
            <p className="sellerName">{userDetails?.name}</p>
            <p className="sellerEmail">{userDetails?.email}</p>
            <p className="sellerPhone">{userDetails?.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
