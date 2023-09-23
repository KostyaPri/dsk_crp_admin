import { NavLink } from "react-router-dom";

import docsIcon from "../../assets/docs-icon.svg";
import { useEffect, useState } from "react";

const onLogout = () => {
    sessionStorage.removeItem('access-token');
    window.location.reload();
}

const Header = () => {
    const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        // let socket = new WebSocket("ws://81.95.108.229:8010/ws/transactions/");
        let socket = new WebSocket("ws://127.0.0.1:8000/ws/transactions/count/");

        socket.onopen = function(e) {
        //   console.log(e);
        };

        socket.onmessage = function(event) {
          setMessageCount(event.data)
        };

        socket.onerror = function(error) {
          console.log(error);
        };

        return () => {
          socket.onclose = function(event) {
            if (event.wasClean) {
              console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            } else {
              console.log('[close] Соединение прервано');
            }
          };
        }
    }, []);

    return (
        <>
            <div className="header">
                <nav className="header__menu">
                    <ul className="header__menu-list">
                        <li className="header__menu-list__item ">
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active" : ""
                                }
                            >
                                New orders <span>{messageCount}</span>
                            </NavLink>
                        </li>
                        <li className="header__menu-list__item">
                            <NavLink
                                to="/history"
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active" : ""
                                }
                            >
                                History
                            </NavLink>
                        </li>
                        <li className="header__menu-list__item" >
                            <NavLink
                                to="/users"
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active" : ""
                                }
                            >
                                Users
                            </NavLink>
                        </li>
                        <li className="header__menu-list__item">
                            <NavLink
                                to="/comments"
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active" : ""
                                }
                            >
                                Comments
                            </NavLink>
                        </li>
                        <li className="header__menu-list__item">
                            <NavLink
                                to="/change-rate"
                                className={({ isActive, isPending }) =>
                                    isPending ? "" : isActive ? "active" : ""
                                }
                            >
                                Change rate
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="header__user">
                    <button
                        className="header__user-btn"
                        onClick={() => onLogout()}
                    >
                        <img className="header__user-icon" src={docsIcon} alt="" />
                    </button>
                </div>
            </div>
        </>

    );
};

export default Header;