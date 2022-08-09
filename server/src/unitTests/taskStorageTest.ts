import TaskStorage from "../modules/taskStorage";
import Assert from "./assert";


export default function runAllTaskStorageTests(){

    Assert.setAssertionClassName("TASK STORAGE");

    shouldAddNewTask();
    shouldReturnLastTaskID();
    ShouldEditSpecifiedTaskName();
    shouldDeleteSpecifiedTask();
}


function shouldAddNewTask(){
    let taskStorage = new TaskStorage();
    taskStorage.addTask();
    let extracted = taskStorage.extactTasks();

    Assert.setAssertionTestName("Should Add New Task To Storage");
    Assert.equals(extracted.length, 1);
}

function shouldReturnLastTaskID(){
    let taskStorage = new TaskStorage();
    let n = 15;
    for(let i=0; i<n; i++)
        taskStorage.addTask();

    let lastID = taskStorage.getLastTaskID();
    let extracted = taskStorage.extactTasks();

    Assert.setAssertionTestName("Should Return Last Task ID");
    Assert.equals(lastID, extracted[n - 1].ID);
}

function ShouldEditSpecifiedTaskName(){
    let taskStorage = new TaskStorage();
    let n = 10;
    let randomIndex = Math.round(Math.random() * (n - 1));
    let taskID = "";
    let expectedName = "Changed For Test";
    for(let i=0; i<n; i++){
        taskStorage.addTask();
        if(randomIndex == i)
            taskID = taskStorage.getLastTaskID();
    }

    taskStorage.editTask({ ID: taskID, name: expectedName });
    let extracted = taskStorage.extactTasks();

    Assert.setAssertionTestName("Should Edit Specified Task Name");
    Assert.equals(extracted[randomIndex].name, expectedName)    
}


function shouldDeleteSpecifiedTask(){
    let taskStorage = new TaskStorage();
    let n = 10;
    let randomIndex = Math.round(Math.random() * (n - 1));
    let taskID = "";
    let changedName = "This is deleted";
    for(let i=0; i<n; i++){
        taskStorage.addTask();
        if(randomIndex == i)
            taskID = taskStorage.getLastTaskID();
    }

    taskStorage.deleteTask(taskID);

    let names = taskStorage.extactTasks().map(task => { return task.name; });
    
    Assert.setAssertionTestName("Should Delete Specified Task");
    Assert.allNotEquals(names, changedName);
}

