import React from 'react';
import styled from 'styled-components';
import NaveLinks from './navLink';

const NavWrapperDiv = styled.nav`
 width: 50vw;
 background-color: ${props => props.theme.primary};
 box-shadow: 0 10px 10px ${props => props.theme.accent};
 align-self: flex-end;
 color: #ffffff;
 display:none;
 z-index: 100;
 transition: transform 1s;
 transform : translateX(${props => props.displayMobileView ? ("0") : ("calc(100% + 15px)") });
 @media screen and (max-width: 720px){
     display: block;
 }
 .nav-list{
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;
    height: 60vh;
    list-style:none
 }
 .link{
     color: white;
     text-decoration:none;
     font-size:2.5vh;
 }
 `;
const MobileNavBar = (props) => {
    return (
        <NavWrapperDiv displayMobileView={props.displayMobileView}>
            <NaveLinks />
        </NavWrapperDiv>
    )
}

export default MobileNavBar