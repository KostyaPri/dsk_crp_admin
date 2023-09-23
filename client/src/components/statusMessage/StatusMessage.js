import { useEffect } from "react";

const StatusMessage = ({ message, clearError }) => {
    useEffect(() => {
        setTimeout(() => clearError(), 3000); // видалення компоненту після закінчення анімації
    }, []);
    
    return (
        <div className="status-message">
            <div className='notif notif-color-1 notif-active'>
                <p>{message}</p>
                <div className="notif-progress"></div>
            </div>
        </div>
    )
}

export default StatusMessage;