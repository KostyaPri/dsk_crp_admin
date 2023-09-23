import { useEffect, useState } from "react";
import UserCreateTransaction from "../components/userCreateTransaction/UserCreateTransaction";
import UserInfo from "../components/userInfo/UserInfo";
import useUsersService from "../services/UsersService";
import { useParams } from "react-router-dom";
import HistoryOrdersList from "../components/historyOrdersList/HistoryOrdersList";

const UserInfoPage = () => {
    const [listOrders, setListOrders] = useState([]);
    const [listRates, setListRates] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const { id } = useParams();
    const { getUserTransactions, getRates, setProcess, process } = useUsersService();

    useEffect(() => {
        getUserTransactions(id)
            .then(data => {
                setListOrders(data);
                setProcess('confirmed');
            })
            .catch(err => {
                console.log(err);
                setProcess('error')
            })

        getRates()
            .then(data => {
                setListRates(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <UserInfo setUserInfo={setUserInfo}/>
            <UserCreateTransaction listRates={listRates} userInfo={userInfo} />
            <h2 className="user__title user__title_table">Transactions history</h2>
            <HistoryOrdersList listOrders={listOrders} process={process} />
        </>
    );
};

export default UserInfoPage;