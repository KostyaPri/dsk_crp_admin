import { useHttp } from "../hooks/http.hook";
import { _serverUrl } from "../settings/config";
import { formateDateRequest } from "../utils/formateDate";

const useOrdersService = () => {
    const { request, clearError, process, setProcess, error } = useHttp();

    const getNewOrders = async () => {
        const result = await request(`${_serverUrl}/new_transaction/`);

        // return result.results;
        return result;
    }

    const getHistoryOrders = async () => {
        const result = await request(`${_serverUrl}/history_transaction/`);

        return result.results;
        // return result;
    }

    const getFilteredOrders = async (givesList, receivesList, dateValue, searchValue, page) => {
        const givesParams = givesList.length !== 0 ? `sold_currency=${givesList.join("&sold_currency=")}` : "";
        const receivesParams = receivesList.length !== 0 ? `bought_currency=${receivesList.join("&bought_currency=")}` : "";
        let dateStartParam = "", dateEndParam = "";
        const searchParam = searchValue ? `search=${searchValue}` : "";

        if (Array.isArray(dateValue) && dateValue.length !== 0) {
            if (formateDateRequest(dateValue[0]) === formateDateRequest(dateValue[1])) {
                dateStartParam = `start_date=${formateDateRequest(dateValue[0])}`;
            } else {
                dateStartParam = `start_date=${formateDateRequest(dateValue[0])}`;
                dateEndParam = `end_date=${formateDateRequest(dateValue[1])}`;
            }
        }

        const params = [givesParams, receivesParams, dateStartParam, dateEndParam, searchParam];

        const result = await request(`${_serverUrl}/history_transaction/?page=${page}&${params.filter(param => param).join('&')}`);
       
        // return result.results;
        return result;
    }

    const postNewOrder = async (data, id) => {
        const result = await request(`${_serverUrl}/new_transaction/${id}/`, 'PUT', data);

        return result;
    }

    const deleteNewOrder = async (id) => {
        const result = await request(`${_serverUrl}/new_transaction/${id}/`, 'DELETE');

        return result;
    }

    const getFacture = async (id) => {
        const result = await request(
            `${_serverUrl}/transaction-requests/${id}/download/`,
            'GET',
            null,
            {},
            true // for get file
        );

        return result;
    }

    const getExchangeUSD = async () => {
        const result = await request(`${_serverUrl}/rate/usd_czk/`);

        return result[0];
    }

    return {
        getNewOrders,
        getHistoryOrders,
        getFilteredOrders,
        postNewOrder,
        getExchangeUSD,
        deleteNewOrder,
        getFacture,
        clearError,
        process,
        setProcess,
        error
    }
}

export default useOrdersService;