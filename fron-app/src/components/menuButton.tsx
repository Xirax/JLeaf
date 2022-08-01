import React from "react";
import Styles from "../styles/ts/themes/styles";

interface MenuButtonProps{
    text?: string;
    icon: any;
    action: Function;
}

export default class MenuButton extends React.Component<MenuButtonProps>{
    
    render(){
        return(
            <div style={Styles.style.menu.menuButton}  onClick={() => { this.props.action() }}> 
                <img style={Styles.style.menu.menuIcon} src={this.props.icon} />
            </div>
        )
    } 
}