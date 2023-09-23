import { useHttp } from "../hooks/http.hook";
import { _serverSiteUrl } from "../settings/config";

const useCommentService = () => {
    const { request, clearError, process, setProcess, error } = useHttp();

    const addComment = async (data) => {
        const result = await request(`${_serverSiteUrl}/coments/create/`, 'POST', data);

        return result
    }

    const getComment = async () => {
        const result = await request(`${_serverSiteUrl}/coments/`);

        return result;
    }

    const deleteComment = async (id) => {
        const result = await request(`${_serverSiteUrl}/coments/${id}`, 'DELETE');

        return result;
    }

    return {
        addComment,
        getComment,
        deleteComment,
        clearError,
        process,
        setProcess,
        error
    }
}

export default useCommentService;