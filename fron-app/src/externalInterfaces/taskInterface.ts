import IPerson from "./task/personInterface";

export default interface ITask{
    taskID: string,
    taskName?: string,
    description?: string,
    personID?: string,
    statusIndex?: number,
    deadlineDate?: Date,
    categoryID?: string
}