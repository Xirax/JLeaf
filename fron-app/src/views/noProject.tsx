import React from "react";

import Menu from "../components/menu";
import IMenu from "../externalInterfaces/menuInterface";

import Styles from "../styles/ts/themes/styles";
import MenuTemplates from "../templates/menuTemplates";

export default class NoProjectView extends React.Component{

    render(){

        let menu: IMenu[] = MenuTemplates.NO_PROJECT_MENU;

        return(
            <div id="App" style={Styles.style.main.app}>
                <Menu elements={menu}/>
                <div style={Styles.style.main.fullScreenInfo}>
                    No project was selected, create new project or open existing
                </div>
            </div>
        )
    }
}