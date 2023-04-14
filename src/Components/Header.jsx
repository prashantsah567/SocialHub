import React from "react";
import './Header.css';

const Header = () =>{

    return(
        <div>
            <div className="header">
                <p className="title">SocialHub</p>
                <div className="filter">Filter-by-Flag</div>
                <p className="user-image">user-image</p>
                <div className="user-name">user-name</div>
            </div>
        </div>
    )
}

export default Header;