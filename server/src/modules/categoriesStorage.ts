import CategorySchema from "../dbSchemas/CategorySchema";
import Category from "./category";
import DBCommunicator from "./DB/DBCommunicator";
import ICategoryDoc from "./interfaces/CategoryDocInterface";

export default class CategoriesStorage{

    private categories: Category[] = [];

    constructor(){
        this.loadCategoriesFromDB();
    }

    private async loadCategoriesFromDB(){
        let dbCats = await DBCommunicator.getAllDocsFromModel(CategorySchema);
        dbCats.forEach(dbC => {
            let catDoc: ICategoryDoc = dbC as ICategoryDoc;
            let category: Category = new Category(catDoc);
            this.categories.push(category);
        })
    }

    addCategory(){
        let newCat = new Category();
        this.categories.push(newCat);
        return newCat.extract();
    }

    editCategory(catData: ICategoryDoc){
        const index = this.categories.findIndex(cat => { return cat.ID == catData.ID; }, 1);

        if(catData.name)
            this.categories[index].editName(catData.name);
        
        if(catData.color)
            this.categories[index].editColor(catData.color);
        
        return this.categories[index].extract();
    }

    getCategory(index: number){
        return this.categories[index];
    }

    getLastCreatedID(){
        return this.categories[this.categoriesCount() - 1].ID;
    }

    deleteCategory(catID: string){
        let index = this.categories.findIndex(cat => { return cat.ID == catID }, 1);
        this.categories[index].categoryDBCommunicator.deleteElementInDB();
        this.categories.splice(index, 1);
    }

    categoriesCount(){
        return this.categories.length;
    }

    extractCategories(){
        let extractedCategories: ICategoryDoc[] = [];
        for(let i=0; i<this.categories.length; i++)
            extractedCategories.push(this.categories[i].extract());
        
        return extractedCategories;
    }

}