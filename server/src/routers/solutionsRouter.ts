import express from 'express';
import { openStdin } from 'process';
import SolutionsManager from '../modules/solutionsManager';

const router = express.Router();
const solutionManager = new SolutionsManager();

const NO_PROJECT_ERR = "NO PROJECT SELECTED";

router.get('/createNewSolution', (req, res) => {   
    solutionManager.createNewProject();
    solutionManager.selectNewProjectAsActive();
    res.end();
})

router.get('/getProjects', (req, res) => {
    let projects = solutionManager.extractAllProjects();
    res.send(JSON.stringify({projects: projects}));
})


router.get('/selectProject/:id', (req, res) => {
    let projectIndex = parseInt(req.params.id);
    solutionManager.setProjectIndex(projectIndex);
    res.end();
})

router.get('/deleteProject/:id', (req, res) => {
    let projectIndex = parseInt(req.params.id);
    solutionManager.deleteProject(projectIndex);
    res.end();
})

router.get('/projectInfo', (req, res) => {
    if(solutionManager.anySolutionIsSelected()){
        let projectInfo = solutionManager.getProjectInfo();
        console.log(projectInfo);
        res.send(JSON.stringify(projectInfo));  
    }else
        res.send({err: NO_PROJECT_ERR})
})

router.post('/changeProjectInfo', (req, res) => {
    if(solutionManager.anySolutionIsSelected()){
        solutionManager.editProjectInfo(req.body);
    }

    res.end();
})

router.get('/addTask', (req, res) => {
    if(solutionManager.anySolutionIsSelected()){
        let newTask = solutionManager.addTask();
        res.send(JSON.stringify({newTask: newTask}));
    }
    else
        res.send(JSON.stringify({err: NO_PROJECT_ERR}))  
})

router.post('/editTask', (req, res) => {
    if(solutionManager.anySolutionIsSelected()){
        let editedTask = solutionManager.editTask(req.body);
        res.send(JSON.stringify({editedTask: editedTask}));
    }
    else res.end({err: NO_PROJECT_ERR});
})

router.get('/getTasks', (req, res) => {
    if(solutionManager.anySolutionIsSelected()){
        let tasks = solutionManager.extractTasks();
        res.send(JSON.stringify({tasks: tasks}));
    }
    else 
        res.send({tasks: []});
})

router.post('/deleteTask', (req, res) => {
    if(solutionManager.anySolutionIsSelected())
        solutionManager.deleteTask(req.body);
    
    res.end();
})

router.get('/addCategory', (req, res) => {
    if(solutionManager.anySolutionIsSelected()){
        let newCat = solutionManager.addCategory();
        res.send(JSON.stringify({newCat: newCat}));
    }
    else 
        res.send({err: NO_PROJECT_ERR});
})

router.post('/editCategory', (req, res) => {
    if(solutionManager.anySolutionIsSelected()){
        let editedCat = solutionManager.editCategory(req.body);  
        res.send({editedCat: editedCat});
    }else res.end(JSON.stringify({err: NO_PROJECT_ERR}));
})

router.post('/deleteCategory', (req, res) => {
    if(solutionManager.anySolutionIsSelected())
        solutionManager.deleteCategory(req.body);
    
    res.end();
})

router.get('/getCategories', (req, res) => {
    if(solutionManager.anySolutionIsSelected())
        res.send(JSON.stringify({ categories: solutionManager.extractProjectCategories() }));
    else
        res.send(JSON.stringify({error: NO_PROJECT_ERR}));    
})


export default router;