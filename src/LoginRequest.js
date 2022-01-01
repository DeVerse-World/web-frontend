import './App.css';
import MetamaskBox from "./MetamaskBox";

function LoginRequest(props) {
    console.log("Login Request Session Key")
    console.log(props.match.params.key)
    localStorage.setItem("session_key", props.match.params.key)
    return (
        <>
            <div>
                Click on Connect Wallet above
            </div>
        </>
    )
}

export default LoginRequest;
