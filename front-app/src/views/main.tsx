import React from "react";

import Menu from "../components/menu";
import Styles from "../styles/ts/themes/styles";


//import '../styles/main.css';


export default class MainView extends React.Component{

    render(){
        return (
            <div id="App" style={Styles.style.main.app}>
                <div style={Styles.style.main.fullScreenInfo}>
                    No project has been selected
                </div>
            </div>
        )
    }
}