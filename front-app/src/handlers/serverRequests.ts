import ICategory from "../externalInterfaces/task/categoryInterface";
import ITask from "../externalInterfaces/taskInterface";
import { IProjectInfo } from "./responseInterfaces";

export default class ServerRequests{

    private static serverURL: string = "http://localhost:8080";
    private static headers = {'Content-Type': 'application/json'};

    static async selectProject(index: number){
        return this.askAndReturn(this.serverURL + '/solution/selectProject/' + index);
    }

    static deleteProject(index: number){
        return this.askAndReturn(this.serverURL + '/solution/deleteProject/' + index);
    }

    static async askForProjectInfo(){
        return this.askAndReturn(this.serverURL + '/solution/projectInfo');
    }

    static async updateProjectInfo(projectData: IProjectInfo){
        return this.askAndReturn(this.serverURL + '/solution/changeProjectInfo', projectData);
    }

    static async askForProjects(){
        return this.askAndReturn(this.serverURL + '/solution/getProjects');
    }

    static async askForNewSolution(){
        return this.askAndReturn(this.serverURL + '/solution/createNewSolution');
    }

    static async askForNewTask(){
        return this.askAndReturn(this.serverURL + '/solution/addTask');
    }

    static async askForTasks(){
        return this.askAndReturn(this.serverURL + '/solution/getTasks');
    }

    static async editTask(taskData: ITask){
        return this.askAndReturn(this.serverURL + '/solution/editTask', taskData);
    }

    static async deleteTask(taskData: ITask){
        this.askAndReturn(this.serverURL + '/solution/deleteTask', taskData);
    }

    static async askForNewCategory(){
        return this.askAndReturn(this.serverURL + '/solution/addCategory');
    }

    static async askForCategories(){
        return this.askAndReturn(this.serverURL + '/solution/getCategories');
    }

    static async editCategory(catData: ICategory){
        return this.askAndReturn(this.serverURL + '/solution/editCategory', catData);
    }

    static async deleteCategory(catData: ICategory){
        fetch(this.serverURL + '/solution/deleteCategory', {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(catData)
        })
    }

    private static async askAndReturn(url: string, data: any = undefined){

        let res = data == undefined ? await fetch(url, { headers: this.headers, method: 'GET'}) : await fetch(url, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(data)
        });

        try{
            res = await res.json();
            return res as any;
        }catch{
            return;
        }
    }
}