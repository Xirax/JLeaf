import Category from "./category";
import IExtractedTask from "./interfaces/extractedTaskInterface";
import UniqueIDGenerator from "./uniqueIDGenerator";

export default class Task{

    public readonly taskID: string;
    private taskName: string = "New Task";
    private description: string = "Task description";
    private personID: string = "-";
    private statusIndex: number = 0;
    private deadlineDate: Date;
    private categoryID: string = "-";

    constructor(){
        this.deadlineDate = new Date(Date.now());
        this.taskID = UniqueIDGenerator.generate('T', 10000);
    }

    editName(name: string){
        this.taskName = name;
    }

    editDescription(text: string){
        this.description = text;
    }

    setStatusIndex(index: number){
        this.statusIndex = index;
    }

    setPersonID(id: string){
        this.personID = id;
    }

    setDeadlineDate(date: Date){
        this.deadlineDate = date;
    }

    setCategoryID(id: string){
        this.categoryID = id;
    }

    extract(){
        let extractedTask: IExtractedTask = {
            taskID: this.taskID,
            taskName: this.taskName,
            description: this.description,
            personID: this.personID,
            statusIndex: this.statusIndex,
            deadlineDate: this.deadlineDate,
            categoryID: this.categoryID
        }

        return extractedTask;
    }
}