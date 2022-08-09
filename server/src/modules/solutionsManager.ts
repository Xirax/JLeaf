import ICategoryDoc from "./interfaces/CategoryDocInterface";
import IExtractedProject from "./interfaces/extractedProjectInterface";
import ITaskDoc from "./interfaces/TaskDocInterface";
import Solution from "./Solution";

export default class SolutionsManager{

    private projects: Solution[] = [];
    private activeProjectIndex: number = -1;

    createNewProject(){
        let newProjectSolution = new Solution("New Project", "Project description...");
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
        return this.projects[this.activeProjectIndex].categoriesStorage.editCategory(reqBody as ICategoryDoc);
    }

    deleteCategory(reqBody: any){
        this.projects[this.activeProjectIndex].categoriesStorage.deleteCategory(reqBody.ID);
    }

    getLastCreatedCategoryID(){
        return this.projects[this.activeProjectIndex].categoriesStorage.getLastCreatedID();
    }

    addTask(){
        return this.projects[this.activeProjectIndex].taskStorage.addTask();
    }

    editTask(reqBody: any){
        return this.projects[this.activeProjectIndex].taskStorage.editTask(reqBody as ITaskDoc);
    }

    deleteTask(reqBody: any){
        this.projects[this.activeProjectIndex].taskStorage.deleteTask(reqBody.ID);
    }

    getLastCreatedTaskID(){
        return this.projects[this.activeProjectIndex].taskStorage.getLastTaskID();
    }

    extractProjectCategories(){
        let extractedCategories: ICategoryDoc[] = this.projects[this.activeProjectIndex].categoriesStorage.extractCategories();
        return extractedCategories;
    }

    extractTasks(){
        let extractedTasks: ITaskDoc[] = this.projects[this.activeProjectIndex].taskStorage.extactTasks();
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