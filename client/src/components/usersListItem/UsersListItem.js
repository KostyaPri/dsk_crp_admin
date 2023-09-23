import { formateDate } from "../../utils/formateDate";
import moreIcon from "../../assets/more-icon.svg";
import { Link } from "react-router-dom";


const UsersListItem = ({ data }) => {
    const { id, name, surname, phone_number, email, telegram, corresponds, skan_wallet, date_indentifier } = data;

    return (
        <>
            <tr>
                <td className="initials">
                    <Link to={`/user/${id}`}>
                        <div className="user-name">
                            {name} {surname}
                        </div>
                    </Link>
                </td>
                <td>{formateDate(date_indentifier)}</td>
                <td>{phone_number}</td>
                <td>{email} <br /> {telegram}</td>
                <td>{skan_wallet ? 'yes' : 'no'}</td>
                <td>{corresponds ? 'yes' : 'no'}</td>
                <td>no</td>
                <td className="table__more">
                    <div >
                        <Link to={`/user/${id}`}>
                            <img src={moreIcon} alt="more info about user" />
                        </Link>
                    </div>
                </td>
            </tr>
        </>
    );
};



export default UsersListItem;