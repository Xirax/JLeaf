import TaskSchema from "../dbSchemas/TaskSchema";
import DBCommunicator from "./DB/DBCommunicator";
import ITaskDoc from "./interfaces/TaskDocInterface";
import Task from "./task";

export default class TaskStorage{

    private tasks: Task[] = [];

    constructor(){
        this.loadTasksFromDB();
    }

    private async loadTasksFromDB(){
        let dbTasks = await DBCommunicator.getAllDocsFromModel(TaskSchema);
        dbTasks.forEach(dbT => {
            let taskDoc: ITaskDoc = dbT as ITaskDoc;
            let task: Task = new Task(taskDoc);
            this.tasks.push(task);
        })
    }

    addTask(){
        let task = new Task();
        this.tasks.push(task);
        return task.extract();
    }

    editTask(taskData: ITaskDoc){
        let index = this.tasks.findIndex(t => { return t.ID == taskData.ID });

        if(index >= 0){
            if(taskData.name != undefined) 
                this.tasks[index].editName(taskData.name);
        
            if(taskData.description != undefined)
                this.tasks[index].editDescription(taskData.description);
            
            if(taskData.statusIndex != undefined)
                this.tasks[index].setStatusIndex(taskData.statusIndex);
            
            if(taskData.deadlineDate != undefined)
                this.tasks[index].setDeadlineDate(taskData.deadlineDate);

            if(taskData.personID != undefined)
                this.tasks[index].setPersonID(taskData.personID);

            if(taskData.categoryID != undefined)
                this.tasks[index].setCategoryID(taskData.categoryID);
            
            return this.tasks[index].extract();
        }else    
            throw new Error("Invalid Task Index");
    }

    getLastTaskID(){
        return this.tasks[this.tasks.length - 1].ID;
    }

    deleteTask(taskID: string){
        let index = this.getTaskIndex(taskID);
        this.tasks[index].taskDBCommunicator.deleteElementInDB();
        this.tasks.splice(index, 1);  
    }

    private getTaskIndex(id: string){
        for(let i = 0; i<this.tasks.length; i++){
            if(this.tasks[i].ID == id)
                return i;        
        }

        throw new Error("Invalid task ID");
    }

    extactTasks(){
        let extractedTasks: ITaskDoc[] = [];
        for(let i=0; i<this.tasks.length; i++)
            extractedTasks.push(this.tasks[i].extract());
        
        return extractedTasks;
    }
}