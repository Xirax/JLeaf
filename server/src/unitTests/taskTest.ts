import Task from "../modules/task";
import UniqueIDGenerator from "../modules/uniqueIDGenerator";
import Assert from "./assert";

export default function runAllTaskTests(){

    Assert.setAssertionClassName("TASK");

    shouldEditNameAndDescription();
    shouldAssignSpecifiedCategoryID();
    shouldAssignSpecifiedPersonID();
}


function shouldEditNameAndDescription(){
    let task = new Task();
    let expectedName = "changed";
    let expectedDesc = "new desc";
    task.editName(expectedName);
    task.editDescription(expectedDesc);
    let extracted = task.extract();

    Assert.setAssertionTestName("Should Edit Task Name and Description");
    Assert.multiEquals([extracted.taskName, extracted.description], [expectedName, expectedDesc]);
}

function shouldAssignSpecifiedCategoryID(){
    let task = new Task();
    let expectedID = UniqueIDGenerator.generate('C', 1000);
    task.setCategoryID(expectedID);
    let extracted = task.extract();

    Assert.setAssertionTestName("Should Assign Specified Category ID");
    Assert.equals(extracted.categoryID, expectedID);
}

function shouldAssignSpecifiedPersonID(){
    let task = new Task();
    let expectedID = UniqueIDGenerator.generate('P', 1000);
    task.setPersonID(expectedID);
    let extracted = task.extract();

    Assert.setAssertionTestName("Task Class Should Assign Specified Person ID");
    Assert.equals(extracted.personID, expectedID);
}
