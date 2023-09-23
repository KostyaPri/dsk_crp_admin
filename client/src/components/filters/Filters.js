import { useEffect, useState } from "react";

import filtersIcon from "../../assets/filters-icon.svg"
import DatePicker from "../datePicker/DatePicker";
import useUsersService from "../../services/UsersService";


const Filters = ({
    givesList,
    setGivesList,
    receivesList,
    setReceivesList,
    setDateValue }) => {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [givesButtons, setGivesButtons] = useState([
        { name: "BTC", text: "Bitcoin (BTC)", active: false },
        { name: "USDT", text: "Tether (USDT)", active: false },
        { name: "ETH", text: "Ethereum (ETH)", active: false },
        { name: "XRP", text: "Ripple (XRP)", active: false },
        { name: "LTC", text: "Litecoin (LTC)", active: false },
        { name: "USD", text: "USD", active: false },
    ]);
    const [receivesButtons, setReceivesButtons] = useState([
        { name: "BTC", text: "Bitcoin (BTC)", active: false },
        { name: "USDT", text: "Tether (USDT)", active: false },
        { name: "ETH", text: "Ethereum (ETH)", active: false },
        { name: "XRP", text: "Ripple (XRP)", active: false },
        { name: "LTC", text: "Litecoin (LTC)", active: false },
        { name: "USD", text: "USD", active: false },
    ]);
    const { getRates } = useUsersService();

    useEffect(() => {
        getRates()
        .then(data => {
            const arr = data.map(item => {
                return {name: item.sold_currency, text: item.sold_currency, active: false}
            })
            arr.push({name: "USD", text: "USD", active: false})
            setGivesButtons(arr);
            setReceivesButtons(arr);
        })
        .catch(err => console.log(err))
    }, []);

    const handleMenuClick = () => {
        setIsMenuActive(!isMenuActive);
    };

    const handleFilterClick = (e, buttonList, setButtons, setButtonList) => {
        const buttonName = e.target.getAttribute("data-name");
        const index = buttonList.indexOf(buttonName);

        if (index === -1) {
            setButtonList((prevList) => [...prevList, buttonName]);
            setButtons((prevButtons) => {
                return prevButtons.map((btn) => {
                    if (btn.name === buttonName) {
                        return { ...btn, active: !btn.active };
                    }
                    return btn;
                });
            });
        } else {
            setButtonList((prevList) =>
                prevList.filter((name) => name !== buttonName)
            );
            setButtons((prevButtons) => {
                return prevButtons.map((btn) => {
                    if (btn.name === buttonName) {
                        return { ...btn, active: !btn.active };
                    }
                    return btn;
                });
            });
        }
    };

    return (
        <div className="filters">
            <button
                className="filters__btn-open"
                onClick={handleMenuClick}
            >
                <img className="filters__btn-open__icon" src={filtersIcon} alt="filters icon" />
                <span>Filters</span>
            </button>
            <div className={`filters__wrapper ${isMenuActive ? "filters__wrapper_active" : ""}`}>
                <div className="filters__blocks">
                    <div className="filters__inner-btns">
                        <h2 className="filters__title">Client gives</h2>
                        <div className="filters__btns">
                            {givesButtons.map(({ name, text, active }, i) => (
                                <button
                                    key={i}
                                    className={`filters__btn ${active ? "filters__btn_active" : ""}`}
                                    data-name={name}
                                    onClick={(e) => handleFilterClick(e, givesList, setGivesButtons, setGivesList)}
                                >{text}</button>
                            ))}
                        </div>
                    </div>
                    <div className="filters__inner-btns">
                        <h2 className="filters__title">Client receives</h2>
                        <div className="filters__btns">
                            {receivesButtons.map(({ name, text, active }, i) => (
                                <button
                                    key={i}
                                    className={`filters__btn ${active ? "filters__btn_active" : ""}`}
                                    data-name={name}
                                    onClick={(e) => handleFilterClick(e, receivesList, setReceivesButtons, setReceivesList)}
                                >{text}</button>
                            ))}
                        </div>
                    </div>
                </div>
                <DatePicker setDateValue={setDateValue} />
                <div className="line"></div>
            </div>
        </div>
    );
};

export default Filters;