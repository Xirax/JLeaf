import CategoriesStorage from "./categoriesStorage";
import Category from "./category";
import IExtractedSolution from "./interfaces/extractedProjectInterface";
import TaskStorage from "./taskStorage";


export default class ProjectSolution{

    private title: string;
    private description: string;

    public readonly categoriesStorage: CategoriesStorage;
    public readonly taskStorage: TaskStorage;

    constructor(title: string, desc: string){
        this.title = title;
        this.description = desc;
        this.categoriesStorage = new CategoriesStorage();
        this.taskStorage = new TaskStorage();
    }

    editTitle(title: string){
        this.title = title;
    }

    editDescription(description: string){
        this.description = description;
    }

    extract(){
        let objectProjectSolution : IExtractedSolution = {
            title: this.title,
            description: this.description
        }

        return objectProjectSolution;
    }
}