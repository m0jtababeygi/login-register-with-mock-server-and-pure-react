import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './pages/routes';
import {ToasterProvider} from './share/toaster/ToasterProvider';

function App() {
  return (
    <>
    <ToasterProvider>
      <RouterProvider router={router} />
    </ToasterProvider>
    </>
  );
}

export default App;
