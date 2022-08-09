import React from "react";
import Header from "../components/header";
import Menu from "../components/menu";
import ProjectPreview from "../components/projectPreview";
import IMenu from "../externalInterfaces/menuInterface";
import IExtractedProject from "../externalInterfaces/projectInterface";
import ServerRequests from "../handlers/serverRequests";

interface OpenProjectState{
    projects: IExtractedProject[]
}

export default class OpenProjectView extends React.Component<{}, OpenProjectState>{


    constructor(props: {}){
        super(props);

        this.state = {
            projects: []
        }

        this.deleteProject = this.deleteProject.bind(this);
        this.loadProjects = this.loadProjects.bind(this);
        this.loadProjects();
    }

    async loadProjects(){
        let projRes = await ServerRequests.askForProjects();
        let projects = projRes.projects as IExtractedProject[];

        this.setState({ projects: projects });
    }

    deleteProject(index: number){
        let projects = this.state.projects;
        projects.splice(index, 1);
        this.setState({ projects: projects });
    }

   
    render(){

        let menu: IMenu[] = [];

        return(
            <div id="App">
            <Menu elements={menu}/>
            <div className="content">
                <Header overrideTitle="Select Project" />
                {this.state.projects.map((pr, index) => {
                    return <ProjectPreview title={pr.title} description={pr.description} index={index} deleteCallBack={this.deleteProject} key={index} />
                })}
            </div>
        </div>
        )
    }

}