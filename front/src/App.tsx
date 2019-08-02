import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import { renderRoutes } from 'react-router-config';
import { routes } from './router.config';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading</div>}>
        {renderRoutes(routes)}
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
