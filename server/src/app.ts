
import express from 'express';
import path from 'path';
import mainRouter from './routers/mainRouter';
import solutionsRouter from './routers/solutionsRouter';
import cors from 'cors';
import DBCommunicator from './modules/DB/DBCommunicator';


const app = express();
const PORT = 8080;


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/', mainRouter);
app.use('/solution', solutionsRouter);

DBCommunicator.connectToDB();

app.listen(PORT, () => {
    console.log(" > Server running on [ " + PORT + " ]");
})