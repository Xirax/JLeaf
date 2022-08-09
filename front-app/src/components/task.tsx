import React from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import IContextMenuElement from "../externalInterfaces/ContextMenuElementInterface";
import ContextMenu from "./ContextMenu";

import Styles from "../styles/ts/themes/styles";

import descIcon from '../imgs/icons/docIcon.png';
import expandIcon from '../imgs/icons/expand.png';
import hideIcon from '../imgs/icons/hide.png';
import TaskDescriptionPanel from "./taskDescriptionPanel";
import binIcon from '../imgs/icons/bin.png';

import ICategory from "../externalInterfaces/task/categoryInterface";
import ITask from "../externalInterfaces/taskInterface";
import statusesList from '../templates/statusesTemplate';
import Themes from "../styles/ts/themes/themes";


interface TaskProps{
    ID: string,
    name: string,
    description: string,
    personID?: string,
    statusIndex: number,
    date: Date,
    categoryID: string,
    allCategories: ICategory[],
    onEdit: Function,
    onDelete: Function
}

interface TaskState{
    statusMenuOn: boolean,
    categoryMenuOn: boolean,
    descriptionPanelOn: boolean,
    panelShouldHide: boolean,
    mouseX: number,
    mouseY: number,
}


export default class Task extends React.Component<TaskProps, TaskState>{

    constructor(props: TaskProps){
        super(props);

        this.state = {
            statusMenuOn: false,
            categoryMenuOn: false,
            descriptionPanelOn: false,
            panelShouldHide: false,
            mouseX: 0,
            mouseY: 0
        }

        this.openStatusMenu = this.openStatusMenu.bind(this);
        this.closeStatusMenu = this.closeStatusMenu.bind(this);
        this.toggleDescriptionPanel = this.toggleDescriptionPanel.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.closeCategoryMenu = this.closeCategoryMenu.bind(this);
        this.setDate = this.setDate.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    openStatusMenu(ev: React.MouseEvent<HTMLDivElement, MouseEvent>){
        this.setState({ statusMenuOn: true, mouseX: ev.screenX - 10, mouseY: ev.screenY - 95 });
    }


    closeStatusMenu(){
        this.setState({ statusMenuOn: false });
    }

    openCategoryMenu(ev: React.MouseEvent<HTMLDivElement, MouseEvent>){
        this.setState({ categoryMenuOn: true, mouseX: ev.screenX - 10, mouseY: ev.screenY - 95 });
    }

    closeCategoryMenu(){
        this.setState({ categoryMenuOn: false })
    }

    toggleDescriptionPanel(){
        if(this.state.descriptionPanelOn){
            this.setState({ panelShouldHide: true });
            setTimeout(() => { this.setState({ descriptionPanelOn: false }); }, 35)
        }
        else
            this.setState({ descriptionPanelOn: true, panelShouldHide: false });
    }

    setTitle(newName: string){
        let editedTask: ITask = {ID: this.props.ID, name: newName};
        this.props.onEdit(editedTask);
    }

    setDescription(newDescription: string){
        let editedTask: ITask = {ID: this.props.ID, description: newDescription};
        this.props.onEdit(editedTask);
    }

    selectStatus(index: number){ 
        this.closeStatusMenu();
        let editedTask: ITask = {ID: this.props.ID, statusIndex: index};
        this.props.onEdit(editedTask);
    }

    setDate(newDate: Date){
        let editedTask: ITask = {ID: this.props.ID, deadlineDate: newDate}
        this.props.onEdit(editedTask)
    }

    selectCategory(ID: string){
        this.closeCategoryMenu();
        let editedTask: ITask = { ID: this.props.ID, categoryID: ID };
        this.props.onEdit(editedTask);
    }

    deleteTask(){
        this.props.onDelete(this.props.ID);
    }


    render(){

        let statusMenuElements: IContextMenuElement[] = statusesList.map((stat, index) => {
            return {
                background: stat.color, 
                text: stat.text, 
                action: () => { this.selectStatus(index) } 
            }
        })

        let categoryMenuElements: IContextMenuElement[] = this.props.allCategories.map(cat => {
            return {
                text: cat.name,
                background: cat.color,
                action: () => { this.selectCategory(cat.ID) }
            }
        } )

        let statusMenu = this.state.statusMenuOn ? 
            <ContextMenu elements={statusMenuElements} closeCallback={this.closeStatusMenu} positionX={this.state.mouseX} positionY={this.state.mouseY} /> 
            : 
            <div></div> ;
        
        let categoryMenu = this.state.categoryMenuOn ? 
            <ContextMenu elements={categoryMenuElements} closeCallback={this.closeCategoryMenu} positionX={this.state.mouseX} positionY={this.state.mouseY} />
            :
            <div></div>

        let status = this.props.statusIndex >= 0 && this.props.statusIndex < statusesList.length ? statusesList[this.props.statusIndex] : statusesList[0];
        let category = this.props.allCategories.find(cat => { return cat.ID == this.props.categoryID; });

        if(category == undefined)
            category = { ID: "", name: "NOT SELECTED", color: "#669999" }
        
        let daysToDeadline = Math.round(new Date(this.props.date).getTime() - new Date(Date.now()).getTime()) / (1000 * 3600 * 24);
        let percantage = 1 / (daysToDeadline * 0.22) * 98;
        if(percantage > 100) percantage = 93 + (percantage / 100);
        else if(percantage < 0) percantage = 100;
        let dateGradient = 'linear-gradient(90deg, ' +  Themes.lightSecondary() + ' ' + percantage + '% ,' + Themes.lightPrimary() + ' 16%)';

        let descriptionPanel = this.state.descriptionPanelOn ? 
            <TaskDescriptionPanel title={this.props.name} description={this.props.description} onTitleChange={this.setTitle} onDescriptionChange={this.setDescription} hide={this.state.panelShouldHide} />
            :
            <div></div>
  
        return(
            <div>
                <div style={Styles.style.task.taskBar}>
                    <div style={{...Styles.style.task.taskFrame, justifyContent: 'space-between'}}> 
                        <p> {this.props.name} </p>
                        <img style={Styles.style.main.smallIcon} src={this.state.descriptionPanelOn ? hideIcon : expandIcon} onClick={this.toggleDescriptionPanel} />
                    </div>
                    <div style={Styles.style.task.taskFrame}> 
                        {/* <img className="task-icon" src={tsk.person.icon} /> <p> {tsk.person.name} </p> */}
                        {this.props.personID}
                    </div>
                    <div style={{...Styles.style.task.taskFrame, backgroundColor: status.color}} onClick={(ev) => { this.openStatusMenu(ev) }}> {status.text} </div>
                    
                    <div style={{...Styles.style.task.taskFrame, background: dateGradient}}> 
                        <DatePicker selected={new Date(this.props.date)} onChange={this.setDate} dateFormat="dd / MM / yyyy"/> 
                    </div>
                    <div style={{...Styles.style.task.taskFrame, backgroundColor: category.color}} onClick={(ev) => { this.openCategoryMenu(ev) }} > {category.name} </div>
                    <div style={Styles.style.task.deleteButton}> <img style={Styles.style.main.smallIcon} src={binIcon} onClick={this.deleteTask} /> </div>
                    {statusMenu}
                    {categoryMenu}
                    
                </div>
                {descriptionPanel}    
            </div>  
        )
    }
}