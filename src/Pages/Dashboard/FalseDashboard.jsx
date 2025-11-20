import React from 'react'
import { AiFillSafetyCertificate } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import './FalseDashboard.css'

const FalseDashboard = () => {
    const navigate = useNavigate();

    const navigateToCreatePage = () => {
        navigate("/CreateStore");
    };
  return (
    <div className="create-store-card">
                <div className="your-store-link-sec">
                    <div className="link-txt">
                        <div className="safety-icon-container">
                            <AiFillSafetyCertificate className="safety-icon"/>
                        </div>
                       
                       <Link className="store-link">Your Store Link</Link>
                    </div>
                    <Link className="view-store">View Store</Link>
                </div>
                   
    
                <div className="creating-store">
                 {/* <h3 className="create-store-text">Create Your Store </h3> */}
                 <button onClick={navigateToCreatePage} className="create-btn">Create Store</button>
                </div>
    </div>
  )
}

export default FalseDashboard