import React from "react";
import ServerRequests from "../handlers/serverRequests";

import binIcon from '../imgs/icons/bin.png';

import '../styles/projectPreview.css';


interface PreviewProps{
    title: string,
    description: string,
    index: number,
    deleteCallBack: Function
}

export default class ProjectPreview extends React.Component<PreviewProps>{

    constructor(props: PreviewProps){
        super(props);

        this.openProject = this.openProject.bind(this);
    }

    async openProject(){
        await ServerRequests.selectProject(this.props.index);
        window.location.href = '/';
    }

    deleteProject(ev: React.MouseEvent<HTMLImageElement, MouseEvent>){
        ev.stopPropagation();
        ServerRequests.deleteProject(this.props.index);
        this.props.deleteCallBack(this.props.index);
    }

    render(){
        return(
            <div className="project-preview" onClick={this.openProject}>
                <div className="preview-title"> {this.props.title} </div>
                <div className="preview-desc"> {this.props.description} </div>
                <div className="previw-date"> 12 / 08 / 2022 </div>
                <div className="preview-img-box"> <img className="preview-img" src={binIcon} onClick={(ev) => this.deleteProject(ev)} /> </div>      
            </div>
        )
    }
}