import React from 'react'
import { useState } from 'react';
import { AiFillSafetyCertificate } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { LuEyeClosed } from "react-icons/lu";
import "./TrueDashboard.css";

const TrueDashboard = ({ storeLink, storeId }) => {
    if (!storeLink && storeId) return null;
   const [showLink, setShowLink] = useState(true);
   const navigate = useNavigate();

 const toggleView = () => {
    setShowLink(!showLink)
 }

    
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
                         <LuEyeClosed onClick={toggleView} className='open-icon'  />
                       </div>    
                    </div>
                    <Link  className="view-status" to='/Status'>Add status</Link>
                </div>
                   
    
                <div className="creating-store">
                 {/* <Link className="store-full-link">{storeLink} </Link> */}
                  <input
                    type={showLink ? "text" : "password"}
                    value={showLink ? storeLink : "**** >"}
                    readOnly
                    className="store-full-link"
                  />
                 <button onClick={copyLink} className="create-btn-true">Copy Link</button>
                </div>
            </div>
  )
}

export default TrueDashboard
