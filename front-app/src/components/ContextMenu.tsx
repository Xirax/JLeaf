import React from "react";

import Styles from "../styles/ts/themes/styles";

import IContextMenuElement from "../externalInterfaces/ContextMenuElementInterface";
import Themes from "../styles/ts/themes/themes";


interface MenuProps{
    elements: IContextMenuElement[],
    positionX?: number,
    positionY?: number,
    closeCallback: Function
}

export default class ContextMenu extends React.Component<MenuProps>{

    constructor(props: MenuProps){
        super(props);

        this.autoCloseMenu = this.autoCloseMenu.bind(this);
    }


    autoCloseMenu(){
        this.props.closeCallback();
    }

    performAction(index: number){
        this.props.elements[index].action();
    }

    render(){

        let topPos = this.props.positionY ? this.props.positionY + "px" : "0px";
        let leftPos = this.props.positionX ? this.props.positionX + "px" : "0px";

        return(
            <div style={{...Styles.style.contextMenu.verticalMenu, top: topPos, left: leftPos}} onMouseLeave={this.autoCloseMenu}>
                {this.props.elements.map((el, index) => {

                    let txt = el.text ? el.text : "";
                    let icon = el.icon ? <img style={Styles.style.main.smallIcon} src={el.icon} /> : <div></div>;
                    let bcgColor = el.background ? el.background : Themes.lightPrimary();

                    return <div style={{...Styles.style.contextMenu.menuElement, backgroundColor: bcgColor}} key={index} onClick={ () => this.performAction(index) }> 
                        {icon}
                        <p> {txt} </p>
                    </div>
                })}
            </div>
        )
    }
}