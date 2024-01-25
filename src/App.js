import React from 'react';
import  {Banner}  from './Articles-for-Front/Articles'; 
import { Nav } from './Articles-for-Front/Nav';
import { Routes,Route } from 'react-router-dom';
import Detail from './Articles-for-Front/Detail';


const App = () => {
  return (
    <>
      <Nav/>      
      <Routes>
        <Route path='/' element={<Banner/>}/>
        <Route path="/readmore/:id" element={<Detail />} />
      </Routes>
   
    </>
  );
};

export default App;


