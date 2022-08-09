import IPerson from "./task/personInterface";

export default interface ITask{
    ID: string,
    name?: string,
    description?: string,
    personID?: string,
    statusIndex?: number,
    deadlineDate?: Date,
    categoryID?: string
}