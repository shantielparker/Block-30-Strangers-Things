//login.jsx
import LoginForm from "../components/LoginForm"
import { Link } from "react-router-dom"
export default function Login({setUserToken}) {


    return (
        <div className=" container text-center">
            <h1 className="display-1">Log in</h1>
            <LoginForm setUserToken={setUserToken}/>
            <p>Not a member yet? <Link to="/register">Click Here to Register!</Link></p>
        </div>
    )
} 