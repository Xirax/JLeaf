import mongoose from 'mongoose';
import IExtractedTask from '../interfaces/TaskDocInterface';
import TaskSchema from '../../dbSchemas/TaskSchema';
import { ObjectId } from 'mongodb';

export default class DBCommunicator{

    protected model: mongoose.Model<any>;
    protected connectionKey: Object;

    constructor(model: mongoose.Model<any>, connectionKey: Object){
        this.model = model;
        this.connectionKey = connectionKey;
    }

    static async connectToDB(){
        let user: string = "jfleafcon";
        let password: string = "cPtO0xVbntR2k9Jg1HasA";
        let mongoURI: string = "mongodb+srv://" + user + ":" + password + "@cluster0.qyda93q.mongodb.net/jleaf?retryWrites=true&w=majority";
        mongoose.connect(mongoURI);
    }

    static async getAllDocsFromModel(model: mongoose.Model<any>){
        let docs = await model.find();
        return docs;
    }

    async createElementInDB(element: any){
        let modelElement = new this.model({ ...element });
        await modelElement.save();
    }

    async updateElementInDB(dataToUpdate: any){
        await this.model.findOneAndUpdate(this.connectionKey, dataToUpdate);
    }

    async deleteElementInDB(){
        await this.model.findOneAndDelete(this.connectionKey);
    }
}