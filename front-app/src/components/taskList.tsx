import React from "react";

import AppButton from "./appButton";
import ITask from "../externalInterfaces/taskInterface";

import testIcon from '../imgs/icons/person.png';
import Task from "./task";
import ServerRequests from "../handlers/serverRequests";
import ICategory from "../externalInterfaces/task/categoryInterface";
import notNull from "../handlers/notNull";
import Styles from "../styles/ts/themes/styles";


interface TaskListProps{
    categories: ICategory[],
    selectedCategory: ICategory | undefined,
    tasks: ITask[],
    onTaskEdit: Function,
    onTaskDelete: Function
}

interface TaskListState{
    tasks: ITask[]
}

export default class TaskList extends React.Component<TaskListProps, TaskListState>{

    constructor(props: TaskListProps){
        super(props);

        this.state = {
            tasks: [],
        }

        this.filterTasks = this.filterTasks.bind(this);
    }

    filterTasks(category: ICategory | undefined){
        if(category != undefined)
            return this.props.tasks.filter(t => { return t.categoryID == category.ID });
        else
            return this.props.tasks;
    }

    render(){
        
        let tasks = this.filterTasks(this.props.selectedCategory);

        return(  
            <div style={Styles.style.task.taskList}>
                { tasks.map( (tsk, index) => {

                    return <Task name={notNull(tsk.name, "")} description={notNull(tsk.description, "")} ID={tsk.ID} key={tsk.ID}
                        personID={tsk.personID} statusIndex={notNull(tsk.statusIndex, 0)} date={notNull(tsk.deadlineDate, new Date(Date.now()))} 
                        categoryID={notNull(tsk.categoryID, "")} allCategories={this.props.categories} onDelete={this.props.onTaskDelete} onEdit={this.props.onTaskEdit} />
                }) }
            </div>
        )
    }
}