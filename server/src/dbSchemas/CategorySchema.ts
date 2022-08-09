import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({

    ID: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: true
    }

})

let CategorySchema = mongoose.model('category', categorySchema);

export default CategorySchema;