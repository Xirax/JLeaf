import IExtractedTask from "./interfaces/extractedTaskInterface";
import Task from "./task";

export default class TaskStorage{

    private tasks: Task[] = [];

    addTask(){
        let task = new Task();
        this.tasks.push(task);
        return task;
    }

    editTask(taskData: IExtractedTask){
        let index = this.tasks.findIndex(t => { return t.taskID == taskData.taskID });

        if(index >= 0){
            if(taskData.taskName != undefined) 
            this.tasks[index].editName(taskData.taskName);
        
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
        return this.tasks[this.tasks.length - 1].taskID;
    }

    deleteTask(taskID: string){
        let index = this.getTaskIndex(taskID);
        this.tasks.splice(index, 1);  
    }

    private getTaskIndex(id: string){
        for(let i = 0; i<this.tasks.length; i++){
            if(this.tasks[i].taskID == id)
                return i;        
        }

        throw new Error("Invalid task ID");
    }

    extactTasks(){
        let extractedTasks: IExtractedTask[] = [];
        for(let i=0; i<this.tasks.length; i++)
            extractedTasks.push(this.tasks[i].extract());
        
        return extractedTasks;
    }
}