import { useHttp } from "../hooks/http.hook";
import { _serverUrl } from "../settings/config";

const useUsersService = () => {
    const { request, clearError, process, setProcess, error } = useHttp();

    const getUsers = async () => {
        const result = await request(`${_serverUrl}/user/`);

        return result.results;
        // return result;
    }

    const getUserInfo = async (id) => {
        const result = await request(`${_serverUrl}/user/${id}/`);

        return result;
    }

    const getUserTransactions = async (id) => {
        const result = await request(`${_serverUrl}/user/transaction/${id}`);

        // if (Array.isArray(result.results[0].transactions)) return result.results[0].transactions;

        return result.results;
        // return result.results[0].transactions;
    }

    const getRates = async () => {
        const result = await request(`${_serverUrl}/rate`);

        return result.filter(item => item.sold_currency !== "USD");
    }

    const createRate = async (data) => {
        const result = await request(`${_serverUrl}/rate/create/`, 'POST', data);

        return result;
    }

    const deleteRate = async (id) => {
        const result = await request(`${_serverUrl}/rate/${id}/`, 'DELETE');

        return result;
    }

    const postNewTransaction = async (data) => {
        const result = await request(`${_serverUrl}/new_transaction/`, 'POST', data);

        return result;
    }

    const getSearchUsers = async (data, page) => {
        const result = await request(`${_serverUrl}/user/?page=${page}&search=${data}`);

        // return result.results;
        return result;
    }

    const putRate = async (id, data) => {
        const result = await request(`${_serverUrl}/rate/${id}/`, 'PUT', data);

        return result;
    }

    const putInfoUser = async (id, values) => {
        const result = await request(`
        ${_serverUrl}/user/update/${id}/`,
            'PUT',
            values,
        );

        return result;
    }

    const blockUser = async (id, values) => {
        const result = await request(`
        ${_serverUrl}/user/update/${id}/`,
            'PUT',
            values,
        );

        return result;
    }

    const postInfoUser = async (values) => {

        const result = await request(`
        ${_serverUrl}/user/create/`,
            'POST',
            values,
            // {'Content-Type':'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'}
        );

        return result;
    }

    return {
        getUserInfo,
        getUsers,
        getUserTransactions,
        getRates,
        postNewTransaction,
        postInfoUser,
        getSearchUsers,
        putRate,
        createRate,
        deleteRate,
        putInfoUser,
        blockUser,
        clearError,
        process,
        setProcess,
        error
    }
}

export default useUsersService;