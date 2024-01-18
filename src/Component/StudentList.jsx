import React from "react";
import { Link } from "react-router-dom";


const Student = () => {
    const students=["ali ","ahmad ","umar "]
    return ( 
        <div>
        
        {students.map((students)=>(
                <>
                <Link to={`/Student/${students}`}>
                    <h1>{students}</h1>
                </Link>
</>
))}
    
        </div>

    
     );
}
 
export default Student ;

