import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import Filters from "../components/filters/Filters";
import Search from "../components/search/Search";
import useOrdersService from "../services/OrdersService";
import HistoryOrdersList from "../components/historyOrdersList/HistoryOrdersList";

const HistoryPage = () => {
    const [historyOrders, setHistoryOrders] = useState([]);
    const [givesList, setGivesList] = useState([]);
    const [receivesList, setReceivesList] = useState([]);
    const [dateValue, setDateValue] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [isNext, setIsNext] = useState(true);
    const { getFilteredOrders, process, setProcess } = useOrdersService();

    const fetchData = (page) => {
        getFilteredOrders(givesList, receivesList, dateValue, searchText, page)
            .then(data => {
                setIsNext(data.next !== null);

                if (page === 1) {
                    setHistoryOrders(data.results);
                } else {
                    setHistoryOrders(prevOrders => [...prevOrders, ...data.results])
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
    }, [givesList, receivesList, dateValue, searchText]);

    useEffect(() => {
        if (page != 1) {
            fetchData(page);
        }
    }, [page]);

    return (
        <>
            <div className="subheader">
                <Filters
                    givesList={givesList}
                    setGivesList={setGivesList}
                    receivesList={receivesList}
                    setReceivesList={setReceivesList}
                    setDateValue={setDateValue}
                />
                <Search
                    searchText={searchText}
                    setSearchText={setSearchText}
                />
            </div>
            <InfiniteScroll
                dataLength={historyOrders.length}
                next={() => setPage(prevPage => prevPage + 1)}
                hasMore={!!isNext}
            // loader={<h4>Loading...</h4>}
            >
                <HistoryOrdersList
                    listOrders={historyOrders}
                    process={process}
                    setHistoryOrders={setHistoryOrders}
                />
            </InfiniteScroll>
        </>
    );
};

export default HistoryPage;