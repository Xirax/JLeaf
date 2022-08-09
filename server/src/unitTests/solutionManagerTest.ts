import SolutionsManager from "../modules/solutionsManager";
import Assert from "./assert";

export default function runAllSolutionManagerTests(){

    Assert.setAssertionClassName("SOLUTION MANAGER");
    
    shouldContainOnlyOneNewProject();
    shouldReturnSecondProjectFromAllCreated();
    shouldReturnNewlyCreatedproject();
    shouldReturnAllPackedSolutionsTEST();
    shouldReturnLastCreatedTaskIdTEST();
}

function shouldContainOnlyOneNewProject(){
    let solutionManager = new SolutionsManager();
    solutionManager.createNewProject();

    Assert.setAssertionTestName("Should Contain Only One New Solution");
    Assert.equals(solutionManager.projectCount(), 1);
}

function shouldReturnSecondProjectFromAllCreated(){
    let solutionManager = createNewSolutionsManagerWithProjects(3);
    let expectedTitle = "TEST 1";
    solutionManager.setProjectIndex(1);
    solutionManager.editProjectInfo({title: expectedTitle});
    let activeSolution = solutionManager.getProjectInfo();


    Assert.setAssertionTestName("Should Return Second Solution From All");
    Assert.equals(activeSolution.title, expectedTitle);
}

function shouldReturnNewlyCreatedproject(){
    let solutionManager = createNewSolutionsManagerWithProjects(2);
    let expectedTitle = "TEST 1";
    solutionManager.selectNewProjectAsActive();
    solutionManager.editProjectInfo({title: expectedTitle});
    let activeSolution = solutionManager.getProjectInfo();

    Assert.setAssertionTestName("Should Return Newly Created Project");
    Assert.equals(activeSolution.title, expectedTitle);
}

function shouldReturnAllPackedSolutionsTEST(){
    let solutionManager = createNewSolutionsManagerWithProjects(5);
    let allSolutions = solutionManager.extractAllProjects();

    Assert.setAssertionTestName("Manager Should Return All Packed Solutions");
    Assert.equals(allSolutions.length, 5);
}

function shouldReturnLastCreatedTaskIdTEST(){
    let solutionManager = createNewSolutionsManagerWithProjects(1);
    solutionManager.selectNewProjectAsActive()

    for(let i=0; i<8; i++)
        solutionManager.addTask();

    let lastID = solutionManager.getLastCreatedTaskID();
    let extractedTasks = solutionManager.extractTasks();
    let lastTask = extractedTasks[extractedTasks.length - 1];

    Assert.setAssertionTestName("Manager Should Return Last Created Task Id");
    Assert.equals(lastID, lastTask.ID);
}

function createNewSolutionsManagerWithProjects(solutionsCount: number){
    let newSolutionManager = new SolutionsManager();

    for(let i=0; i<solutionsCount; i++)
        newSolutionManager.createNewProject();
    
    return newSolutionManager;
}

