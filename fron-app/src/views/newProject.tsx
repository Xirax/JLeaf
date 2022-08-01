import React from "react";
import Menu from "../components/menu";
import ServerRequests from "../handlers/serverRequests";

export default class NewProjectView extends React.Component{

    async loadNewSolution(){
        await ServerRequests.askForNewSolution();

        setTimeout(() => {
            window.location.href = '/';
        }, 800)
    }

    render(){

        this.loadNewSolution();

        return (
            <div id="App">
                <div className="content">
                   CREATING PROJECT...
                </div>
            </div>
        )
    }
}