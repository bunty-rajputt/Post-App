import React from "react";
import { Routes,Route, Navigate } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Head from "./Header";
import PageNotFound from "./PageNotFound";
import Student from "./StudentList";
import Greeting from "./Greeting";




 export const Rout = () => {
    return (
        <>
        <Routes>
        <Route path="/" element={<Navigate to='/home'/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="Student" element={<Head/>}>
            <Route index element={<Student/>}/>
            <Route path=":student_name" element={<Greeting/>}/>
            </Route>
            
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        </>
      );
}