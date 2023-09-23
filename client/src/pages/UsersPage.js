import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import Search from "../components/search/Search";
import UsersList from "../components/usersList/UsersList";
import useUsersService from "../services/UsersService";
import { Link } from "react-router-dom";

const UsersPage = () => {
    const [listUsers, setlistUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [isNext, setIsNext] = useState(true);
    const { getUsers, getSearchUsers, process, setProcess } = useUsersService();

    const fetchData = (page) => {
        getSearchUsers(searchText, page)
            .then(data => {
                setIsNext(data.next !== null);
                if (page === 1) {
                    setlistUsers(data.results);
                } else {
                    setlistUsers(prevUsers => [...prevUsers, ...data.results]);
                }
                setProcess('confirmed');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        setPage(1);
        fetchData(1); // Значение параметра page передаю так, из-за асинхронности при изменении стейта setPage(1)
    }, [searchText]);

    useEffect(() => {
        if (page != 1) {
            fetchData(page);
        }
    }, [page]);

    return (
        <div className="users">
            <div className="subheader">
                {/* <Filters setHistoryOrders={{}} /> */}
                <Search setSearchText={setSearchText} />
                <Link to="/user/create" className="btn__user">New user</Link>
            </div>
            <InfiniteScroll
                dataLength={listUsers.length}
                next={() => setPage(prevPage => prevPage + 1)}
                hasMore={!!isNext}
            // loader={<h4>Loading...</h4>}
            >
                <UsersList listUsers={listUsers} process={process} />
            </InfiniteScroll>
        </div>
    );
};

export default UsersPage;