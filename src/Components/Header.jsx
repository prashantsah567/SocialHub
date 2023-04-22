import React from "react";
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Header = (props) =>{

    return(
        <div>
            <div className="header">
                <p className="title">SocialHub.</p>
                <div className="filter">Filter-by-Flag</div>
                <div className="img-and-username">
                    <p className="user-icon"></p>
                    <p className="user-name">{props.userName}</p>
                </div>
            </div>
        </div>
    )
}

export default Header;