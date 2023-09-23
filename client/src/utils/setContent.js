import Spinner from "../components/spinner/Spinner";


const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return null;
        case 'loading':
            return <Spinner/>;
        case 'confirmed':
            return <Component data={data}/>;
        case 'error':
            return <div className="error">Error!</div>
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;