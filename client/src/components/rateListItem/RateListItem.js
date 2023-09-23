import { useEffect, useRef, useState } from "react";
import arrowIcon from "../../assets/arrow-icon.svg";
import moreIcon from "../../assets/more-icon.svg";
import useUsersService from "../../services/UsersService";

const RateListItem = (props) => {
    const [activeEdit, setActiveEdit] = useState(false);

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
            {activeEdit ?
                <Edit
                    {...props}
                    setActiveEdit={setActiveEdit}
                    activeEdit={activeEdit}

                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    toggleMenu={toggleMenu}
                    popupRef={popupRef}
                /> :
                <View
                    {...props}
                    setActiveEdit={setActiveEdit}
                    activeEdit={activeEdit}

                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    toggleMenu={toggleMenu}
                    popupRef={popupRef}
                />
            }
        </>
    );
};

const View = ({
    data,
    setActiveEdit,
    activeEdit,
    setRateList,
    rateList,

    activeMenu,
    setActiveMenu,
    toggleMenu,
    popupRef
}) => {
    const {
        coin_rate, bought_currency, exchange_direction, round_num, image,
        hidden, id, market_rate, market_rate_other, dollar_rate, sold_currency
    } = data;
    const [formData, setFormData] = useState({ ...data });
    const { putRate, deleteRate, process, setProcess } = useUsersService();

    const toggleHide = () => {
        const updatedFormData = {
            ...formData,
            hidden: !formData.hidden
        };

        setFormData(updatedFormData);

        delete updatedFormData.image;

        putRate(id, updatedFormData)
            .then(data => {
                // Создаем копию списка
                const updatedList = rateList.slice();

                // Находим индекс элемента списка с заданным идентификатором
                const itemIndex = updatedList.findIndex(item => item.id === id);

                // Если элемент найден по индексу, обновляем его данные
                if (itemIndex !== -1) {
                    updatedList[itemIndex] = { ...updatedList[itemIndex], ...data };
                    setRateList(updatedList); // Устанавливаем новый список с обновленными данными
                }

                setProcess('confirmed');
                // onToggleActiveItem(id);
                setActiveMenu(!activeMenu);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
    }

    const onDelete = () => {
        deleteRate(id)
            .then(data => {
                // // Создаем копию списка
                // const updatedList = rateList.slice();

                // // Находим индекс элемента списка с заданным идентификатором
                // const itemIndex = updatedList.findIndex(item => item.id === id);

                // // Если элемент найден по индексу, обновляем его данные
                // if (itemIndex !== -1) {
                //     updatedList[itemIndex] = { ...updatedList[itemIndex], ...data };
                //     setRateList(updatedList); // Устанавливаем новый список с обновленными данными
                // }

                setProcess('confirmed');
                setActiveMenu(!activeMenu);
                window.location.reload()
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
    }

    return (
        <tr>
            <td>
                <div>{sold_currency} <img className="tabele__arrow" src={arrowIcon} alt="arrow left" /> {bought_currency}</div>
            </td>
            <td className="table__bank-rate">
                <div>
                    {+coin_rate} {sold_currency}
                    <img className="tabele__arrow" src={arrowIcon} alt="arrow left" />
                    {+dollar_rate} {bought_currency}
                </div>
            </td>
            <td>{+market_rate}%</td>
            <td>{+market_rate_other}%</td>
            <td>{+round_num}</td>
            <td className="table__link-item">
                <a href={image} target="_blank">...{image.substring(image.lastIndexOf("/"))}</a>
            </td>
            <td className="table__more" ref={popupRef}>
                <div onClick={() => toggleMenu()}>
                    <img src={moreIcon} alt="more info about user" />
                </div>
                {
                    activeMenu && (
                        <ul className="table__more-list">
                            <li
                                className="table__more-list-first"
                                onClick={() => setActiveEdit(!activeEdit)}
                            >Edit</li>
                            <li onClick={() => toggleHide()}>{hidden ? "Show" : "Hide"}</li>
                            <li onClick={() => onDelete()}>Delete</li>
                        </ul>
                    )
                }
            </td>
            {hidden && <td className="table__status">hidden</td>}
        </tr>
    )
}

const Edit = ({
    data,
    setActiveEdit,
    activeEdit,
    setRateList,
    rateList,

    activeMenu,
    setActiveMenu,
    toggleMenu,
    popupRef
}) => {
    const {
        coin_rate, bought_currency, exchange_direction, round_num, image,
        hidden, id, market_rate, market_rate_other, dollar_rate, sold_currency
    } = data;
    const [formData, setFormData] = useState({ ...data });
    const { putRate, deleteRate, process, setProcess } = useUsersService();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleInputChange = (e, name) => {

        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/[а-яёa-z]/i, ''); // Удаление всех символов, кроме цифр
        // Обновление значения в форме
        setFormData(prevState => ({
            ...prevState,
            [name]: numericValue
        }));
    };

    const changeRate = () => {
        if (!selectedImage) {
            delete formData.image;
        }

        putRate(id, formData)
            .then(data => {
                // Создаем копию списка
                console.log(data)
                const updatedList = rateList.slice();

                // Находим индекс элемента списка с заданным идентификатором
                const itemIndex = updatedList.findIndex(item => item.id === id);

                // Если элемент найден по индексу, обновляем его данные
                if (itemIndex !== -1) {
                    updatedList[itemIndex] = { ...updatedList[itemIndex], ...data };
                    setRateList(updatedList); // Устанавливаем новый список с обновленными данными
                }

                setActiveMenu(!activeMenu);
                setProcess('confirmed');
                setActiveEdit(!activeEdit);
                // onToggleActiveItem(id);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
    }

    const toggleHide = () => {
        // setHide(!hide);
        const updatedFormData = {
            ...formData,
            hidden: !formData.hidden
        };

        setFormData(updatedFormData);

        delete updatedFormData.image;

        putRate(id, updatedFormData)
            .then(data => {
                // Создаем копию списка
                const updatedList = rateList.slice();

                // Находим индекс элемента списка с заданным идентификатором
                const itemIndex = updatedList.findIndex(item => item.id === id);

                // Если элемент найден по индексу, обновляем его данные
                if (itemIndex !== -1) {
                    updatedList[itemIndex] = { ...updatedList[itemIndex], ...data };
                    setRateList(updatedList); // Устанавливаем новый список с обновленными данными
                }

                setActiveMenu(!activeMenu);
                setProcess('confirmed');
                setActiveEdit(!activeEdit);
                // onToggleActiveItem(id);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
    }

    const onDelete = () => {
        deleteRate(id)
            .then(data => {
                // // Создаем копию списка
                // const updatedList = rateList.slice();

                // // Находим индекс элемента списка с заданным идентификатором
                // const itemIndex = updatedList.findIndex(item => item.id === id);

                // // Если элемент найден по индексу, обновляем его данные
                // if (itemIndex !== -1) {
                //     updatedList[itemIndex] = { ...updatedList[itemIndex], ...data };
                //     setRateList(updatedList); // Устанавливаем новый список с обновленными данными
                // }

                setProcess('confirmed');
                setActiveMenu(!activeMenu);
                window.location.reload()
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
    }

    return (
        <tr>
            <td>
                <div>{sold_currency} <img className="tabele__arrow" src={arrowIcon} alt="arrow left" /> {bought_currency}</div>
            </td>
            <td className="table__bank-rate">
                <div>
                    <input
                        className="input_data"
                        type="text"
                        name="coin_rate"
                        value={formData.coin_rate}
                        onChange={(e) => handleInputChange(e, "coin_rate")}
                    /> {sold_currency}
                    <img className="tabele__arrow" src={arrowIcon} alt="arrow left" />
                    <input
                        className="input_data"
                        type="text"
                        name="dollar_rate"
                        value={formData.dollar_rate}
                        onChange={(e) => handleInputChange(e, "dollar_rate")}
                    /> {bought_currency}
                </div>
            </td>
            <td>
                <input
                    className="input_data"
                    type="text"
                    name="market_rate"
                    value={formData.market_rate}
                    onChange={(e) => handleInputChange(e, "market_rate")}
                />
                %</td>
            <td>
                <input
                    className="input_data"
                    type="text"
                    name="market_rate_other"
                    value={formData.market_rate_other}
                    onChange={(e) => handleInputChange(e, "market_rate_other")}
                />
                %</td>
            <td>
                <input
                    className="input_data"
                    type="text"
                    name="round_num"
                    value={formData.round_num}
                    onChange={(e) => handleInputChange(e, "round_num")}
                />
            </td>
            <td style={{ "display": "flex", "flexDirection": "column" }}>
                <a href={image} target="_blank">...{image.substring(image.lastIndexOf("/"))}</a>
                <input
                    type="file"
                    name="image"
                    onChange={(e) => {
                        setSelectedImage(true)
                        setFormData(prevState => ({
                            ...prevState,
                            "image": e.target.files[0]
                        }));
                    }}
                />
            </td>
            <td className="table__more" ref={popupRef}>
                <div onClick={() => toggleMenu()}>
                    <img src={moreIcon} alt="more info about user" />
                </div>
                {
                    activeMenu && (
                        <ul className="table__more-list">
                            {
                                process === 'loading' ?
                                    (<li
                                        className="table__more-list-first"
                                    >Loading...</li>) :
                                    (<li
                                        className="table__more-list-first"
                                        onClick={() => changeRate()}
                                    >Save</li>)

                            }
                            <li onClick={() => toggleHide()}>{hidden ? "Show" : "Hide"}</li>
                            <li onClick={() => onDelete()}>Delete</li>
                            <li onClick={() => setActiveEdit(!activeEdit)}>Cancel</li>
                        </ul>
                    )
                }
            </td>
            {hidden && <td className="table__status">hidden</td>}
        </tr>
    )
}

export default RateListItem;