import CategoriesStorage from "./categoriesStorage";
import IExtractedCategory from "./interfaces/extractedCategoryInterface";
import IExtractedProject from "./interfaces/extractedProjectInterface";
import IExtractedTask from "./interfaces/extractedTaskInterface";
import ProjectSolution from "./projectSolution";
import Task from "./task";

export default class SolutionsManager{

    private projects: ProjectSolution[] = [];
    private activeProjectIndex: number = -1;

    createNewProject(){
        let newProjectSolution = new ProjectSolution("New Project", "Project description...");
        this.projects.push(newProjectSolution);
    }

    deleteProject(index: number){
        this.projects.splice(index, 1);
    }

    selectNewProjectAsActive(){
        this.setProjectIndex(this.lastSolutionIndex());
    }

    setProjectIndex(index: number){
        this.activeProjectIndex = index;
    }

    lastSolutionIndex() : number{
        return this.projectCount() - 1;
    }

    getProjectInfo(){
        return this.projects[this.activeProjectIndex].extract();
    }

    editProjectInfo(reqBody: any){
        if(reqBody.title)
            this.projects[this.activeProjectIndex].editTitle(reqBody.title);
        
        if(reqBody.description)
            this.projects[this.activeProjectIndex].editDescription(reqBody.description);
    }

    addCategory(){
        return this.projects[this.activeProjectIndex].categoriesStorage.addCategory();
    }

    editCategory(reqBody: any){
        return this.projects[this.activeProjectIndex].categoriesStorage.editCategory(reqBody as IExtractedCategory);
    }

    deleteCategory(reqBody: any){
        this.projects[this.activeProjectIndex].categoriesStorage.deleteCategory(reqBody.catID);
    }

    getLastCreatedCategoryID(){
        return this.projects[this.activeProjectIndex].categoriesStorage.getLastCreatedID();
    }

    addTask(){
        return this.projects[this.activeProjectIndex].taskStorage.addTask();
    }

    editTask(reqBody: any){
        return this.projects[this.activeProjectIndex].taskStorage.editTask(reqBody as IExtractedTask);
    }

    deleteTask(reqBody: any){
        this.projects[this.activeProjectIndex].taskStorage.deleteTask(reqBody.taskID);
    }

    getLastCreatedTaskID(){
        return this.projects[this.activeProjectIndex].taskStorage.getLastTaskID();
    }

    extractProjectCategories(){
        let extractedCategories: IExtractedCategory[] = this.projects[this.activeProjectIndex].categoriesStorage.extractCategories();
        return extractedCategories;
    }

    extractTasks(){
        let extractedTasks: IExtractedTask[] = this.projects[this.activeProjectIndex].taskStorage.extactTasks();
        return extractedTasks;
    }

    extractAllProjects() : IExtractedProject[]{
        let allSolutionPacked : IExtractedProject[] = [];

        for(let i=0; i<this.projectCount(); i++)
            allSolutionPacked.push(this.projects[i].extract());
        
        return allSolutionPacked;
    }

    anySolutionIsSelected(){
        return this.activeProjectIndex != -1 && this.activeProjectIndex < this.projectCount();
    }

    projectCount() : number{
        return this.projects.length;
    }
}