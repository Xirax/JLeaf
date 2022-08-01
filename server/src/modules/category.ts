
import IExtractedCategory from "./interfaces/extractedCategoryInterface";
import UniqueIDGenerator from "./uniqueIDGenerator";

export default class Category{

    private name: string;
    private color: string;
    public readonly catID: string;

    constructor(){
        this.name = "category";
        this.color = "#dc143c";
        this.catID = UniqueIDGenerator.generate('C', 10000);
    }

    static throwNotAssignedLabel(){
        let emptyLabel = new Category();
        emptyLabel.editName('Not Assigned');
        emptyLabel.editColor('#919191');

        return emptyLabel.extract();
    }   

    editName(newName: string){
        this.name = newName;
    }

    editColor(hexString: string){
        this.color = hexString;
    }

    extract(){
        let objectCategory: IExtractedCategory = {
            name: this.name,
            color: this.color,
            catID: this.catID
        }

        return objectCategory;
    }

}