import IPerson from "./personInterface";
import Category from "../category";
import IComment from "./commentInterface";
import IExtractedCategory from "./extractedCategoryInterface";

export default interface IExtractedTask{
    taskID: string;
    taskName?: string;
    description?: string;
    personID?: string;
    statusIndex?: number;
    deadlineDate?: Date;
    categoryID?: string;
}