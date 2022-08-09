import Category from "./category";
import DBCommunicator from "./DB/DBCommunicator";
import IExtractedTask from "./interfaces/TaskDocInterface";
import UniqueIDGenerator from "./uniqueIDGenerator";
import { ObjectId } from 'mongodb';
import TaskSchema from "../dbSchemas/TaskSchema";

export default class Task{

    public readonly taskDBCommunicator: DBCommunicator;
    private taskDoc: IExtractedTask;

    constructor(task: IExtractedTask | undefined = undefined){

        if(task != undefined)
            this.taskDoc = task;
        else{
            this.taskDoc = {
                ID: UniqueIDGenerator.generate('T', 10000),
                name: "New Task",
                description: "Task description",
                statusIndex: 0,
                personID: "-",
                deadlineDate: new Date(Date.now()),
                categoryID: "-"
            }
        }

        this.taskDBCommunicator = new DBCommunicator(TaskSchema, { ID: this.taskDoc.ID });
        if(task == undefined) this.taskDBCommunicator.createElementInDB(this.extract());
    }

    get ID(){
        return this.taskDoc.ID;
    }

    editName(name: string){
        this.taskDoc.name = name;
        this.taskDBCommunicator.updateElementInDB({name: name});
    }

    editDescription(text: string){
        this.taskDoc.description = text;
        this.taskDBCommunicator.updateElementInDB({description: text});
    }

    setStatusIndex(index: number){
        this.taskDoc.statusIndex = index;
        this.taskDBCommunicator.updateElementInDB({statusIndex: index});
    }

    setPersonID(id: string){
        this.taskDoc.personID = id;
        this.taskDBCommunicator.updateElementInDB({personID: id});
    }

    setDeadlineDate(date: Date){
        this.taskDoc.deadlineDate = date;
        this.taskDBCommunicator.updateElementInDB({deadlineDate: date});
    }

    setCategoryID(id: string){
        this.taskDoc.categoryID = id;
        this.taskDBCommunicator.updateElementInDB({categoryID: id});
    }

    extract(){
        return this.taskDoc;
    }
}