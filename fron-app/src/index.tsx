import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import MainView from './views/main';
import NewProjectView from './views/newProject';
import ProjectView from './views/project';
import NoProjectView from './views/noProject';

//import './styles/main.css';
import OpenProjectView from './views/openProject';
import StatisticsView from './views/statistics';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <Router>
      <Routes>
          <Route path='/' element={<ProjectView />} />
          <Route path='/newProject' element={<NewProjectView/>} />
          <Route path='/openProject' element={<OpenProjectView />} />
          <Route path='/statistics' element={<StatisticsView />} />
          <Route path='/noProject' element={<NoProjectView />} />
      </Routes>
  </Router>
);
