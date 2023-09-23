import { useEffect } from "react";
import setContent from "../../utils/setContent";
import HistoryOrdersListitem from "../historyOrdersListItem/HistoryOrdersListitem";

const HistoryOrdersList = ({ listOrders, process, setHistoryOrders }) => {

    return (
        <div className="table">
            <div className="table__wrapper">
                <table className="table__table">
                    <thead className="table__header">
                        <tr>
                            <td>ID</td>
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
                        {listOrders.map((item, i) => {
                            return <HistoryOrdersListitem
                                data={item}
                                key={'' + item.id + i}
                                setNewOrders={setHistoryOrders}
                            />
                        })}
                        {/* {setContent(process, View, { listOrders, setNewOrders })} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// const View = ({ data }) => {
//     const { listOrders, setNewOrders } = data;

//     return (
//         <>
//             {listOrders.map((item) => {
//                 return <HistoryOrdersListitem
//                     data={item}
//                     key={item.id}
//                     setNewOrders={setNewOrders}
//                 />
//             })}
//         </>
//     )
// }

export default HistoryOrdersList;