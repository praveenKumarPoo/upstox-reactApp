import React from 'react'
import styled from 'styled-components';
import NaveLinks from './navLink';
import mobileNavBarIcon from "../svg/leftarrow.svg";

const NavWrapperDiv = styled.nav`
 display: flex;
 flex-flow: row nowrap;
 justify-content: space-evenly;
 align-items: center;
 background-color: ${props => props.theme.primary};
 box-shadow: 0 10px 10px ${props => props.theme.accent};
 color: #ffffff;
 .logo{
     font-size:5vh;
     text-shadow: 3px 3px 3px black;
 }
 .nav-list{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    width: 35vw;
    list-style:none;
    @media screen and (max-width: 768px){
     display: none;
 }
 }
 .link{
     color: white;
     text-decoration:none;
     font-size:2.5vh;
     &:focus{
        background-color: gray;
     }
 }
 `;
 const MobileNavBtn = styled.button`
    height: 6vh;
    width: 6vh;
    background: transparent;
    border: none;
    display: none;
    transition: transform 1s;
    transform : rotate(${props => props.displayMobileView ? ("0deg") : ("180deg") });
    &:focus{
        outline: none;
        background-color: rgba(0,0,0,0.1;)
     }
    @media screen and (max-width: 768px){
     display: block;
    }
    `

function Navbar(props) {
    return (
        <NavWrapperDiv>
            <div className="logo">UpStoX</div>
            <NaveLinks />
            <MobileNavBtn onClick={props.handler} displayMobileView={props.displayMobileView}>
                <img src={mobileNavBarIcon} alt="open button" />
            </MobileNavBtn>
        </NavWrapperDiv>
    );
}

export default Navbar;