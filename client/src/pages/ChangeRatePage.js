import { useEffect, useState } from "react";
import RateList from "../components/rateList/RateList";
import useUsersService from "../services/UsersService";
import useOrdersService from "../services/OrdersService";
import CreateRate from "../components/createRate/CreateRate";


const ChangeRatePage = () => {
    const [rateList, setRateList] = useState([]);
    const [exchangeUSD, setExchangeUSD] = useState([]);
    const { getRates, putRate, setProcess, process } = useUsersService();
    const { getExchangeUSD} = useOrdersService();

    useEffect(() => {
        getRates()
            .then(data => {
                setRateList(data);
                setProcess('confirmed');
            })
            .catch(err => {
                console.log(err);
            })

        getExchangeUSD()
            .then(data => {
                setExchangeUSD(data);
                setProcess('confirmed');
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className="rate">
            <CreateRate/>
            <RateList
                rateList={rateList}
                process={process}
                setRateList={setRateList}
                putRate={putRate}
                exchangeUSD={exchangeUSD}
            />
        </div>
    );
};

export default ChangeRatePage;