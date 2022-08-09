import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({

    ID: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    personID: {
        type: String,
        required: true
    },

    statusIndex: {
        type: Number,
        required: true
    },

    deadlineDate: {
        type: Date,
        required: true
    },

    categoryID: {
        type: String,
        required: true
    },
})

let TaskSchema = mongoose.model('task', taskSchema);

export default TaskSchema;