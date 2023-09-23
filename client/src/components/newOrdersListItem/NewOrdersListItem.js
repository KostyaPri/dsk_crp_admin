import { useEffect, useRef, useState } from "react";

import { formateDate } from "../../utils/formateDate";

import arrowIcon from "../../assets/arrow-icon.svg";
import moreIcon from "../../assets/more-icon.svg";
import useOrdersService from "../../services/OrdersService";
import useUsersService from "../../services/UsersService";

const NewOrdersListItem = ({ data, setNewOrders }) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setActiveMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setActiveMenu(!activeMenu);
    }

    return (
        <>
            <View
                data={data}
                setNewOrders={setNewOrders}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                toggleMenu={toggleMenu}
                popupRef={popupRef}
            />
        </>
    );
};

const View = ({
    data,
    setNewOrders,
    activeMenu,
    setActiveMenu,
    toggleMenu,
    popupRef
}) => {
    const { ip_address, datetime, sold_currency, bought_currency, transaction_rate,
        coin_rate, dollar_rate, sold_amount, bought_amount, id, market_rate,
        fo: { name, surname, email, telegram, phone_number } } = data;
    const { postNewOrder, deleteNewOrder, setProcess, process } = useOrdersService();
    const { blockUser } = useUsersService();

    const onCreate = () => {
        setProcess('loading');
        postNewOrder({ ...data, processed: true, fo_id: data.fo.id }, id)
            .then(data => {
                setNewOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
                setActiveMenu(!activeMenu);
                setProcess('confirmed');
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
    }

    const onDelete = () => {
        setProcess('loading');
        deleteNewOrder(id)
            .then((data) => {
                setNewOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
                setActiveMenu(!activeMenu);
                setProcess('confirmed');
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
    }

    const onBlock = () => {
        setProcess('loading');
        data.fo.block = !data.fo.block;

        blockUser(data.fo.id, data.fo)
        .then(res => {
            setNewOrders((prevOrders) => prevOrders.filter((order) => order.fo.id !== data.fo.id));
            setActiveMenu(!activeMenu);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <tr>
            <td>{ip_address}</td>
            <td className="item__date">
                <div>
                    {formateDate(datetime)}
                </div>
            </td>
            <td>
                <div>{sold_currency} <img className="tabele__arrow" src={arrowIcon} alt="arrow left" /> {bought_currency}<br /></div>
                <div>{+coin_rate} <img className="tabele__arrow" src={arrowIcon} alt="arrow left" /> {+dollar_rate}</div>
            </td>
            <td>
                <div>{+sold_amount} <img className="tabele__arrow" src={arrowIcon} alt="arrow left" /> {+bought_amount}</div>
            </td>
            <td className="item__markup">
                <td className="item__markup">{`${+market_rate}%(${+transaction_rate} ${bought_currency})`}</td>
            </td>
            <td className="initials">
                <div className="user-name">
                    {name} {surname}
                </div>
            </td>
            <td>{email} <br /> {telegram}</td>
            <td>{phone_number}</td>
            <td className="table__more" ref={popupRef}>
                <div onClick={() => toggleMenu()}>
                    <img src={moreIcon} alt="more info about user" />
                </div>
                {
                    activeMenu && (
                        <ul className="table__more-list" >
                            {process === "loading" ? <li className="table__more-list-first">Loading...</li> :
                                <>
                                    <li
                                        className="table__more-list-first"
                                        onClick={() => onCreate()}
                                    >Create transaction</li>
                                    <li onClick={() => onDelete()}>Remove</li>
                                    <li onClick={() => onBlock()}>
                                        {!data.fo.block ? 'Block' : 'Unblock'}
                                        </li>
                                </>
                            }
                        </ul>
                    )
                }
            </td>
        </tr>
    )
}

export default NewOrdersListItem;