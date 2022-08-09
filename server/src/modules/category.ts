
import CategorySchema from "../dbSchemas/CategorySchema";
import DBCommunicator from "./DB/DBCommunicator";
import ICategoryDoc from "./interfaces/CategoryDocInterface";
import UniqueIDGenerator from "./uniqueIDGenerator";

export default class Category{

    private categoryDoc: ICategoryDoc;
    public readonly categoryDBCommunicator: DBCommunicator;

    constructor(catDoc: ICategoryDoc | undefined = undefined){

        if(catDoc != undefined){
            this.categoryDoc = catDoc
        }else{
            this.categoryDoc = {
                ID: UniqueIDGenerator.generate('C', 10000),
                name: "category",
                color: "#dc143c",
            }
        }

        this.categoryDBCommunicator = new DBCommunicator(CategorySchema, {ID: this.categoryDoc.ID });
        if(catDoc == undefined) this.categoryDBCommunicator.createElementInDB(this.categoryDoc);
    }

    get ID(){
        return this.categoryDoc.ID;
    }

    static throwNotAssignedLabel(){
        let emptyLabel = new Category();
        emptyLabel.editName('Not Assigned');
        emptyLabel.editColor('#919191');

        return emptyLabel.extract();
    }   

    editName(newName: string){
        this.categoryDoc.name = newName;
        this.categoryDBCommunicator.updateElementInDB({name: newName});
    }

    editColor(hexString: string){
        this.categoryDoc.color = hexString;
        this.categoryDBCommunicator.updateElementInDB({color: hexString});
    }

    extract(){
        return this.categoryDoc;
    }

}