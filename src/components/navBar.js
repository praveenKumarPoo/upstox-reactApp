import React, { Component } from 'react'
import styled from 'styled-components';
import DesktopNavBar from './desktopNavBar';
import MobileNavBar from './mobileNavbar';

const NavWrapperDiv = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    overflow-x: hidden;
 `



class NavBar extends Component {
    state = {
        displayMobileView : false
    }
    handler = () =>{
        this.setState((prevState)=>{
            return {displayMobileView: !prevState.displayMobileView}
        });
    }
    render () {
        return (
            <NavWrapperDiv>
                <DesktopNavBar displayMobileView={this.state.displayMobileView} handler={this.handler} />
                <MobileNavBar displayMobileView={this.state.displayMobileView}/>
            </NavWrapperDiv>
        )
    }
}

export default NavBar