import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './index.css';


//use DOM to render app.js
// ReactDOM.render(
//     <Router>
//         <App />
//     </Router>, document.getElementById('root'));

//dom is deprecated. Use createRoot instead
const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
    <Router>
        <App />
    </Router>)