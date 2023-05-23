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
          <p>
            <u>productDetails</u>
          </p>
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && (
          <div className="productDetails">
            <p>
              <u>Seller Information</u>
            </p>
            <p>{userDetails?.name}</p>
            <p>{userDetails?.email}</p>
            <p>{userDetails?.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
