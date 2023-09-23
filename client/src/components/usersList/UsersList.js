import setContent from "../../utils/setContent";
import UsersListItem from "../usersListItem/UsersListItem";


const UsersList = ({ listUsers, process }) => {

    return (
        <div className="table">
            <div className="table__wrapper">
                <table className="table__table">
                    <thead className="table__header">
                        <tr>
                            <td>Initials</td>
                            <td>Register date</td>
                            <td>Phone number</td>
                            <td>Contacts</td>
                            <td>Income statement</td>
                            <td>Verification</td>
                            <td>PO</td>
                            <td className="table__users_hide-cell"></td>
                        </tr>
                    </thead>
                    <tbody className="table__body">
                        {listUsers.map((item) => (
                            <UsersListItem data={item} key={item.id} />
                        ))}
                        {/* {setContent(process, View, listUsers)} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// const View = ({ data }) => {
//     console.log(data);
//     return (
//         <>
//             {data.map((item) => (
//                 <UsersListItem data={item} key={item.id}/>
//             ))}
//         </>
//     )
// }

export default UsersList;