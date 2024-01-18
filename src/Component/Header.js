import { Outlet  } from "react-router-dom";
const Head = () => {
    return ( 
        <>
        <div style={{width:"100%",height:"300px", backgroundColor:"blue" }}><h1>Header</h1></div>
        <Outlet/></>
     );
}
 
export default Head;