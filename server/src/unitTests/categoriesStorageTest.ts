import CategoriesStorage from "../modules/categoriesStorage";
import IExtractedCategory from "../modules/interfaces/extractedCategoryInterface";
import Assert from "./assert";

export default function runAllCategoriesStorageTests(){

    Assert.setAssertionClassName("CATEGORIES STORAGE");
        
    shouldAddNewCategory();
    shouldEditCategoryName()
    shouldDeleteSpecifiedCategory()
}



function shouldAddNewCategory(){
    let categoriesStorage = new CategoriesStorage();
    categoriesStorage.addCategory();

    Assert.setAssertionTestName("Should Add New Category");
    Assert.equals(categoriesStorage.categoriesCount(), 1);
}


function shouldEditCategoryName(){
    let expectedName = "changed";
    let expectedColor = "#FF00FF";
    let categoriesStorage = new CategoriesStorage();
    categoriesStorage.addCategory();
    let catID = categoriesStorage.getLastCreatedID();
    categoriesStorage.editCategory({
        catID: catID,
        name: expectedName,
        color: expectedColor
    })


    let category = categoriesStorage.extractCategories()[0];

    Assert.setAssertionTestName("Should Edit Category Name And Color");
    Assert.multiEquals([category.name, category.color], [expectedName, expectedColor]);
}

function shouldDeleteSpecifiedCategory(){
    let categoriesStorage = new CategoriesStorage();
    let catID1 = "";
    let catID2 = ""

    let expectedName = 'TEST';

    for(let i=0; i<3; i++){
        categoriesStorage.addCategory();

        if(i == 2)
            catID1 = categoriesStorage.getLastCreatedID();
        else if(i == 0)
            catID2 = categoriesStorage.getLastCreatedID();
    }
   

    categoriesStorage.editCategory({catID: catID1, name: expectedName});
    categoriesStorage.deleteCategory(catID2);
    let cats = categoriesStorage.extractCategories();

    let assertions = [categoriesStorage.categoriesCount(), cats[1].name];

    Assert.setAssertionTestName("Should Delete Category At Specific Index");
    Assert.multiEquals(assertions, [2, expectedName]);
}