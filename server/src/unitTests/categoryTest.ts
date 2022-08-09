import { CANCELLED } from "dns";
import Category from "../modules/category";
import IExtractedCategory from "../modules/interfaces/CategoryDocInterface";
import Assert from "./assert";

export default function runAllCategoryTests(){

    Assert.setAssertionClassName("CATEGORY");

    shouldEditCategoryName();
    ShouldEditCategoryColor();
    shouldReturnsNotAssignedLabel();
}


function ShouldEditCategoryColor(){
    let category = new Category();
    let expectedColor = "#ffffff";
    category.editColor(expectedColor);

    let extracted = category.extract();

    Assert.setAssertionTestName("Category Class Should Edit Category Color");
    Assert.equals(extracted.color, expectedColor);
}


function shouldEditCategoryName(){
    let category = new Category();
    let expectedName = "changed";
    category.editName(expectedName);

    let extracted = category.extract();

    Assert.setAssertionTestName("Category Class Should Edit Category Name");
    Assert.equals(extracted.name, expectedName);
}

function shouldReturnsNotAssignedLabel(){
    let emptyLabel: IExtractedCategory = Category.throwNotAssignedLabel();

    Assert.setAssertionTestName("Category Class Should Return Not Assigned Label");
    Assert.equals(emptyLabel.name, 'Not Assigned');
}


