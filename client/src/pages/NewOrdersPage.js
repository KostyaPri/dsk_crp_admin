import { useEffect, useState } from "react";
import useOrdersService from "../services/OrdersService";
import NewOrdersList from "../components/newOrdersList/NewOrdersList";

const NewOrdersPage = () => {
    const [newOrders, setNewOrders] = useState([]);
    const { getNewOrders, process, setProcess } = useOrdersService();

    useEffect(() => {
        getNewOrders()
            .then(data => {
                setNewOrders(data);
                setProcess('confirmed');
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <NewOrdersList listOrders={newOrders} process={process} setNewOrders={setNewOrders}/>
        </>
    );
};

export default NewOrdersPage;