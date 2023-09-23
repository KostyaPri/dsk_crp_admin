import { formateDate } from "../../utils/formateDate";

import arrowIcon from "../../assets/arrow-icon.svg";
import moreIcon from "../../assets/more-icon.svg";
import useOrdersService from "../../services/OrdersService";
import { _serverUrl } from "../../settings/config";
import { useEffect, useRef, useState } from "react";

const HistoryOrdersListitem = ({ data }) => {
    const { ip_address, transaction_id, datetime, sold_currency, bought_currency, transaction_rate,
        coin_rate, dollar_rate, sold_amount, bought_amount, id, market_rate, sold,
        fo: { name, surname, email, telegram, phone_number } } = data;
    const { getFacture } = useOrdersService();

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

    const handleFacture = () => {
        getFacture(id)
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${sold ? `Vydana${transaction_id}.pdf` : 'Fakture.zip'}`);
                link.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <tr>
                <td>{transaction_id}</td>
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
                <td className="item__markup">{`${+market_rate}%(${+transaction_rate} ${bought_currency})`}</td>
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
                            <ul className="table__more-list">
                                <li
                                    // href={`${_serverUrl}//api/v1/admin/transaction-requests/${id}/download/`}
                                    className="table__more-list-first"
                                    onClick={() => handleFacture()}
                                >Show facture</li>
                            </ul>
                        )
                    }
                </td>
            </tr>
        </>
    );
};

export default HistoryOrdersListitem;