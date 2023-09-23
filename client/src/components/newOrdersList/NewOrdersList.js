import { useEffect, useState } from "react";
import setContent from "../../utils/setContent";
import NewOrdersListItem from "../newOrdersListItem/NewOrdersListItem";

const NewOrdersList = ({ listOrders, process, setNewOrders }) => {
    const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        // let socket = new WebSocket("ws://81.95.108.229:8010/ws/transactions/");
        let socket = new WebSocket("ws://127.0.0.1:8000/ws/transactions/");

        socket.onopen = function (e) {
            //   console.log(e);
        };

        socket.onmessage = function (event) {
            setNewOrders(JSON.parse(event.data).reverse());
            console.dir(JSON.parse(event.data));
        };

        socket.onerror = function (error) {
            console.log(error);
        };

        return () => {
            socket.onclose = function (event) {
                if (event.wasClean) {
                    console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
                } else {
                    console.log('[close] Соединение прервано');
                }
            };
        }
    }, []);

    return (
        <div className="table">
            <div className="table__wrapper">
                <table className="table__table">
                    <thead className="table__header">
                        <tr>
                            <td>IP</td>
                            <td>Date & Time</td>
                            <td>Exchange rate</td>
                            <td>Trade</td>
                            <td>Markup %</td>
                            <td>Initials</td>
                            <td>Mail & Telegram</td>
                            <td>Phone number</td>
                            <td className="table__order_hide-cell"></td>
                        </tr>
                    </thead>
                    <tbody className="table__body">
                        {setContent(process, View, { listOrders, setNewOrders })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const View = ({ data }) => {
    const { listOrders, setNewOrders} = data;
  
    return (
        <>
            {listOrders.map((item) => {
                return <NewOrdersListItem
                    data={item}
                    key={item.id}
                    setNewOrders={setNewOrders}
                />
            })}
        </>
    )
}

export default NewOrdersList;