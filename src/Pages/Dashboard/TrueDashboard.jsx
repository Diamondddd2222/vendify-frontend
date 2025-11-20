import React from 'react'
import {useEffect, useState}  from 'react';
import { AiFillSafetyCertificate } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { LuEyeClosed } from "react-icons/lu";
import "./TrueDashboard.css";

const TrueDashboard = ({ storeLink,storeId }) => {
    // const [storeLink, setStoreLink] = useState("");
   
    // const brandName = JSON.parse(localStorage.getItem("user"))?.brandName;
    // console.log("Brand name:", brandName);
    // const fullStoreLink = `${window.location.origin}/stores/${brandName}`;
    // console.log("Full store link:", fullStoreLink);
     if (!storeLink && storeId) return null; // safe check
//    useEffect(() => {
//      const storeLink= localStorage.getItem("Storelink");
//      const user = JSON.parse(localStorage.getItem("user"));
//      setUser(user);
//      setStoreLink(storeLink)
//       console.log(storeLink);
//       console.log(user);
//     }, [ user?.email]); 

   const navigate = useNavigate();

  const directToStatusPage = () => {
    navigate('/Status')
  }

    // Function to copy link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(storeLink);
    alert("Store link copied to clipboard!");
  };



  return (
    <div className="create-store-card">
                <div className="your-store-link-sec">
                    <div className="link-txt">
                        <div className="safety-icon-container">
                            <AiFillSafetyCertificate className="safety-icon"/>
                        </div>

                       <div className="view-close">
                         <Link className="store-link-true">Available Link</Link>
                         <LuEyeClosed width={10} />
                       </div>    
                    </div>
                    <Link  className="view-status" to='/Status'>Add status</Link>
                </div>
                   
    
                <div className="creating-store">
                <Link className="store-full-link">{storeLink} </Link>
                 <button onClick={copyLink} className="create-btn-true">Copy Link</button>
                </div>
            </div>
  )
}

export default TrueDashboard