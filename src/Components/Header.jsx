import React from "react";
import './Header.css';

const Header = (props) =>{

    return(
        <div>
            <div className="header">
                <p className="title">SocialHub.</p>
                <div className="filter">Filter-by-Flag</div>
                <div className="img-and-username">
                    <p className="user-image">user-image</p>
                    <p className="user-name">{props.userName}</p>
                </div>
            </div>
        </div>
    )
}

export default Header;