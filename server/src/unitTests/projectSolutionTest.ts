import ProjectSolution from "../modules/projectSolution";
import Assert from "./assert";

export default function runAllProjectSolutionTests(){

    Assert.setAssertionClassName("PROJECT SOLUTION");

    shouldReturnPackedObjectWithTitleAndDescription();
}


function shouldReturnPackedObjectWithTitleAndDescription(){
    let expectedTitle = 'Title';
    let expectedDesc = 'Desc';
    let projectSolution = new ProjectSolution(expectedTitle, expectedDesc);
    let packedObject = projectSolution.extract();    
    let testsArray = [packedObject.title, packedObject.description];

    Assert.setAssertionTestName("Project Solution Should Return Packed Object With Title And Description");
    Assert.multiEquals(testsArray, [expectedTitle, expectedDesc]);
}