import express from 'express';
import ProjectSolution from '../modules/projectSolution';

const router = express.Router();

let solutions: ProjectSolution[] = [];

router.get('/', (req, res) => {

    res.send('page not available');

    //res.render('main');
})

router.get('/debug', (req, res) => {
    console.log('JA PIERDOLE');
    res.send({debug: 'debug message', exampleData: 45});
})

// router.get('/newProject', (req, res) => {
//     res.render('new-project');
// })




export default router;