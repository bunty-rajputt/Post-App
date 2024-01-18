import React from "react";

import { useParams } from "react-router-dom";

const Greeting = () => {
    const name =useParams();
    return ( 
        <div>
            <h1>Hello {name.student_name}</h1>
        </div>
     );
}
 
export default Greeting;