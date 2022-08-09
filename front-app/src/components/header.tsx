import React from "react";

//import '../styles/header.css';
import '../styles/main.css';

import Styles from "../styles/ts/themes/styles";

import editIcon from '../imgs/icons/edit.png';
import EditableField from "./edidableField";
import ServerRequests from "../handlers/serverRequests";
import { IProjectInfo } from "../handlers/responseInterfaces";


interface HeaderProps{
    overrideTitle?: string,
}

interface HeaderState{
    title: string,
    description: string
}

export default class Header extends React.Component<HeaderProps, HeaderState>{

    constructor(props: {}){
        super(props);

        this.state = {
            title: '...',
            description: '...'
        }

        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.loadProjectInfo = this.loadProjectInfo.bind(this);

        if(this.props.overrideTitle == undefined){

            this.state = {
                title: '...',
                description: '...'
            }

            this.loadProjectInfo();
        }else{
            this.state = {
                title: this.props.overrideTitle,
                description: ''
            }
        }
    
    }

    async loadProjectInfo(){
        let infoRes = await ServerRequests.askForProjectInfo();   

        if(infoRes.err)
            window.location.href = '/noProject';
        else{
            this.setState({
                title: infoRes.title,
                description: infoRes.description
            })
        }
    }

    async updateTitle(newTitle: string){
        this.setState({ title: newTitle })
        await ServerRequests.updateProjectInfo({ title: newTitle });
    }

    async updateDescription(newDesc: string){
        this.setState({ description: newDesc });
        await ServerRequests.updateProjectInfo({ description: newDesc });
    }

    render(){
        return(
            <div style={Styles.style.header.headerBar}>
                <div id="project-info">
                    <EditableField defaultValue={this.state.title} styleClass="title" onEditionEnd={this.updateTitle} syncWithDefaultValue={true} />
                    {/* <p className="title"> {this.props.title} </p>  */}
                    <EditableField defaultValue={this.state.description} styleClass="description" onEditionEnd={this.updateDescription} syncWithDefaultValue={true} />
                    {/* <p className="description"> {this.props.description} </p>  */}
                </div>
                <div id="widgets">
                    ...
                </div>
            </div>
        )
    }
}