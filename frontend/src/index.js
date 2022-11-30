import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import { ContextProvider } from './context/Context';
import { CommentsContextProvider } from './context/CommentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ContextProvider>
      <CommentsContextProvider>
      <BrowserRouter>
        <App />
        </BrowserRouter>
        </CommentsContextProvider>
    </ContextProvider>
    
  </>
);

