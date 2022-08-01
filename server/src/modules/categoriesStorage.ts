import Category from "./category";
import IExtractedCategory from "./interfaces/extractedCategoryInterface";

export default class CategoriesStorage{

    private categories: Category[] = [];

    addCategory(){
        let newCat = new Category();
        this.categories.push(newCat);
        return newCat;
    }

    editCategory(catData: IExtractedCategory){
        const index = this.categories.findIndex(cat => { return cat.catID == catData.catID; }, 1);


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
        return this.categories[this.categoriesCount() - 1].catID;
    }

    deleteCategory(catID: string){
        let index = this.categories.findIndex(cat => { return cat.catID == catID }, 1);
        if(index >= 0) this.categories.splice(index, 1);
    }

    indexIsInRange(index: number){
        return index >= 0 && index < this.categoriesCount();
    }

    categoriesCount(){
        return this.categories.length;
    }

    extractCategories(){
        let extractedCategories: IExtractedCategory[] = [];
        for(let i=0; i<this.categories.length; i++)
            extractedCategories.push(this.categories[i].extract());
        
        return extractedCategories;
    }

}