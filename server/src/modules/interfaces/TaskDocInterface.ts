import IPerson from "./personInterface";
import Category from "../category";
import IComment from "./commentInterface";
import IExtractedCategory from "./CategoryDocInterface";

export default interface ITaskDoc{
    ID: string;
    name?: string;
    description?: string;
    personID?: string;
    statusIndex?: number;
    deadlineDate?: Date;
    categoryID?: string;
}