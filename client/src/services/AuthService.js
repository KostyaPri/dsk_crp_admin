import { useHttp } from "../hooks/http.hook";
import { _serverUrl } from "../settings/config";


const useAuthService = () => {
    const { request, clearError, process, setProcess, error } = useHttp();

    const login = async (data) => {
        const result = await request(`
            ${_serverUrl}/token/`,
            'POST',
            data
        );

        return result;
    }

    return {
        login,
        clearError,
        process,
        setProcess,
        error
    }
}

export default useAuthService;