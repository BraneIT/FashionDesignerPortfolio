import { Link } from "react-router-dom"
import './Button.css'

function Button({path, value, color}){
    return(
        <Link to={path} className="buttons" style={{ backgroundColor: color ? color : 'black'}}>{value}</Link>
    )
}

export default Button