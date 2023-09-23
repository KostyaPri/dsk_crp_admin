import { useState } from "react";
import useAuthService from "../services/AuthService";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, clearError, process, setProcess, error } = useAuthService();

    const onSubmit = (data) => {
        login(data)
            .then(data => {
                sessionStorage.setItem('access-token', data.access);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSubmit({ username, password });
        }
    };

    return (
        <>
            <div className="login__wrapper">
                <div className="login-block">
                    <div className="login__error-message" style={{"display": error ? "block" : "none"}}>password or username is incorrect!</div>
                    <div className={`login-block-one ${error && "login_error"}`}>
                        <input
                            className={`login__input`}
                            type="text"
                            placeholder="Log in"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                clearError();
                            }}
                        />
                    </div>
                    <div className={`login-block-two ${error && "login_error"}`}>
                        <input
                            className={`login__input`}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>{ 
                                setPassword(e.target.value);
                                clearError();
                            }}
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                    <button
                        className="login__btn"
                        onClick={() => onSubmit({ username, password})}
                    >Press enter -</button>
                </div>
            </div>
        </>
    );
};

export default LoginPage;