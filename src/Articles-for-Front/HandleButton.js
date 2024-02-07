import { useNavigate } from "react-router-dom";
import './style.css';
const HandleButton = () => {

    const navigate=useNavigate()
    const HandleBack=()=>{
        navigate(-1)
    }
   
    return ( <>
    <div className="buttons">
    <a className="handle-button" onClick={HandleBack}><i class="fa fa-chevron-left" aria-hidden="true"></i>
</a>

    </div>
 
    </> );
}
 
export default HandleButton;