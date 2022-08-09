import React from "react";
import CategoriesList from "../components/categoriesList";
import Header from "../components/header";
import Menu from "../components/menu";
import TaskList from "../components/taskList";
import IMenu from "../externalInterfaces/menuInterface";
import ICategory from "../externalInterfaces/task/categoryInterface";
import ITask from "../externalInterfaces/taskInterface";
import ServerRequests from "../handlers/serverRequests";

import Styles from "../styles/ts/themes/styles";
import MenuTemplates from "../templates/menuTemplates";


interface ProjectViewState{
    tasks: ITask[],
    categories: ICategory[],
    selectedCategory: ICategory | undefined,
}


export default class ProjectView extends React.Component<{}, ProjectViewState>{

    constructor(props: {}){
        super(props);

        this.state = {
            tasks: [],
            categories: [],
            selectedCategory: undefined
        }

        this.loadTasks = this.loadTasks.bind(this);
        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);

        this.addCategoryLabel = this.addCategoryLabel.bind(this);
        this.editCategoryLabel = this.editCategoryLabel.bind(this);
        this.deleteCategoryLabel = this.deleteCategoryLabel.bind(this);

        this.selectCategoryAsFilter = this.selectCategoryAsFilter.bind(this);
        
        this.loadTasks();
        this.loadCategories();
    }

    async loadTasks(){
        let taskRes = await ServerRequests.askForTasks();
        let asignedTasks: ITask[] = taskRes.tasks as ITask[];
        this.setState({ tasks: asignedTasks })
    }

    async addTask(){
        let tasks = this.state.tasks;
        let res = await ServerRequests.askForNewTask();
        tasks.push(res.newTask as ITask);
        this.setState({tasks: tasks});
        if(this.state.selectedCategory != undefined)
            this.editTask({ ID: res.newTask.ID, categoryID: this.state.selectedCategory.ID });
    }

    async editTask(taskData: ITask){
        let res = await ServerRequests.editTask(taskData);
        if(!res.err){
            let tasks = this.state.tasks;
            let index = tasks.findIndex(t => { return t.ID == taskData.ID });
            tasks[index] = res.editedTask;
            this.setState({ tasks: tasks });
        }
    }

    deleteTask(taskID: string){
        let tasks = this.state.tasks.filter(t => { return t.ID != taskID; });
        this.setState({ tasks: tasks });
        ServerRequests.deleteTask({ ID: taskID });  
    }

    async loadCategories(){
        let res = await ServerRequests.askForCategories();
        this.setState({ categories: res.categories })
    }

    async addCategoryLabel(){
        let cats = this.state.categories;
        let res = await ServerRequests.askForNewCategory();
        let newCat: ICategory = res.newCat as ICategory;
        cats.push(newCat);
        this.setState({ categories: cats })
        this.unselectCategoryFilter();
    }

    async editCategoryLabel(cat: ICategory){
        let res = await ServerRequests.editCategory(cat);
        if(!res.err){
            let cats = this.state.categories;
            let index = cats.findIndex(c => { return res.editedCat.ID == c.ID; });
            cats[index] = res.editedCat as ICategory;
            this.setState({categories: cats});
        } 
    }

    deleteCategoryLabel(catID: string){
        let cats = this.state.categories.filter(c => { return c.ID != catID });
        this.setState({ categories: cats });
        console.log(cats);
        ServerRequests.deleteCategory({ID: catID});
    }

    selectCategoryAsFilter(selectedCatID: string){
        this.unselectCategoryFilter();

        let selectedCategory = this.state.categories.find(c => { return c.ID == selectedCatID; });
        if(selectedCategory?.ID == this.state.selectedCategory?.ID)
            selectedCategory = undefined;
        
        if(selectedCategory)
            document.getElementById(selectedCatID)?.classList.add('selected-category');

        this.setState({ selectedCategory: selectedCategory });
    }

    unselectCategoryFilter(){
        let selected = document.getElementsByClassName('selected-category');
        if(selected.length > 0)
            selected[0].classList.remove('selected-category');

        this.setState({ selectedCategory: undefined });
    }

    render(){
        let menu: IMenu[] = MenuTemplates.createProjectMenu(this.addTask, this.addCategoryLabel);

        return (
            <div style={Styles.style.main.app}>
                <Menu elements={menu} />
                <div className="content">
                    <Header />

                    <CategoriesList categories={this.state.categories} 
                        onCategoryEdit={this.editCategoryLabel} onCategoryDelete={this.deleteCategoryLabel} onCategorySelect={this.selectCategoryAsFilter} />

                    <TaskList categories={this.state.categories} selectedCategory={this.state.selectedCategory} 
                        tasks={this.state.tasks} 
                        onTaskEdit={this.editTask} onTaskDelete={this.deleteTask} />
                </div>
            </div>
        )
    }
}