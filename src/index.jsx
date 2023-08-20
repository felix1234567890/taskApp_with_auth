import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root') 
if (!domNode) throw new Error('Failed to find the root element');
const root = createRoot(domNode)
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
