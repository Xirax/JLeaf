import React from "react";
import MenuButton from './menuButton';

import Styles from "../styles/ts/themes/styles";


interface MenuProps{
    elements: {text?: string, icon: string, action: Function}[]
}

export default class Menu extends React.Component<MenuProps>{

    render(){
        return(
            <div style={Styles.style.menu.menuBar}>

                {this.props.elements.map((el, index) => {
                    return <MenuButton text={el.text} icon={el.icon} action={el.action} key={index} />
                })}
            </div>
        )
    }
}