import arrowIcon from "../../assets/arrow-icon.svg";
import bookmarkIcon from "../../assets/bookmark-icon.svg";
import arrowCloseIcon from "../../assets/arrow-close-icon.svg";
import arrowOpenIcon from "../../assets/arrow-open-icon.svg";

import Dropdown from 'react-dropdown';
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import useUsersService from "../../services/UsersService";



const UserCreateTransaction = ({ listRates, userInfo }) => {
    const [options, setOptions] = useState([
        "USD", "BTC", "ETH", "LTC", "USDT", "XRP"
    ]);

    const [valueCurrencyGive, setValueCurrencyGive] = useState({ value: "BTC", label: "BTC" });
    const [valueCurrencyReceive, setValueCurrencyReceive] = useState({ value: "USD", label: "USD" });
    const [valueGive, setValueGive] = useState(0);
    const [valueReceive, setValueReceive] = useState(0);
    const [valueTradeSold, setValueTradeSold] = useState(0);
    const [valueTradeBought, setValueTradeBought] = useState(0);
    const [marketRate, setMarketRate] = useState(0);
    const [selectedRate, setSelectedRate] = useState(null);
    const [errorRate, setErrorRate] = useState(null);

    const { postNewTransaction, getRates, process, setProcess } = useUsersService();

    useEffect(() => {
        getRates()
        .then(data => {
            const arr = data.map(item => item.sold_currency);
            arr.push("USD");
            setOptions(arr);
        })
        .catch(err => console.log(err))
    }, []);

    const handleDropdownChange = (selectedOption, setValueCurrency) => {
        setValueCurrency(selectedOption);
    };

    useEffect(() => {
        let foundRate = {};

        if (valueCurrencyGive.value === "USD") {
            foundRate = listRates.find(item =>
                item.sold_currency === valueCurrencyReceive.value &&
                item.bought_currency === valueCurrencyGive.value
            );
        } else {
            foundRate = listRates.find(item =>
                item.sold_currency === valueCurrencyGive.value &&
                item.bought_currency === valueCurrencyReceive.value
            );
        }

        // Меняем местами данные для вычисления результатов 
        if (foundRate && !foundRate.hidden && valueCurrencyGive.value === "USD") {
            const obj = {
                ...foundRate,
                bought_currency: foundRate.sold_currency,
                sold_currency: foundRate.bought_currency,
                dollar_rate: foundRate.coin_rate,
                coin_rate: foundRate.dollar_rate
            };
            setSelectedRate(obj);
            setMarketRate(foundRate.market_rate);
        } else if (foundRate && !foundRate.hidden && valueCurrencyGive.value !== "USD") {
            setSelectedRate(foundRate);
            setMarketRate(foundRate.market_rate);
        } else {
            setSelectedRate(null);
            setMarketRate(0);
        }
    }, [listRates, valueCurrencyGive, valueCurrencyReceive]);

    useEffect(() => {
        setValueTradeSold(valueGive);

        if (valueCurrencyGive.value === 'USD') {
            setValueReceive(valueGive / (selectedRate?.coin_rate || 0))
        } else {
            setValueReceive(valueGive * (selectedRate?.dollar_rate || 0))
        }

        setValueTradeBought((valueReceive - (valueReceive * (marketRate / 100))).toFixed(9));
        console.log(valueCurrencyGive)
        setErrorRate(false);
        setProcess(false);
    }, [valueGive, valueReceive, marketRate, valueCurrencyGive, valueCurrencyReceive, selectedRate]);

    const handleSubmit = (values) => {
        if (!selectedRate) setErrorRate(true);

        let obj;

        try {
            obj = {
                exchange_direction: `${valueCurrencyGive.value} - ${valueCurrencyReceive.value}`,
                ip_address: '000.000.000.0',
                sold_currency: valueCurrencyGive.value,
                bought_currency: valueCurrencyReceive.value,
                sold_amount: valueGive,
                bought_amount: valueReceive.toFixed(9),
                dollar_rate: selectedRate.dollar_rate,
                coin_rate: selectedRate.coin_rate,
                transaction_rate: +(marketRate === 0 ? 0 : ((marketRate * valueReceive) / 100)).toFixed(9), // комиссия при обмене
                market_rate: marketRate,
                fo_id: userInfo.id,
                fo: {
                    id: userInfo.id,
                    name: userInfo.name,
                    surname: userInfo.surname,
                    birth_date: userInfo.birth_date,
                    email: userInfo.email,
                    telegram: userInfo.telegram,
                    phone_number: userInfo.phone_number
                },
                sold: valueCurrencyGive.value !== 'USD' ? true : false,
                processed: true
            }
        } catch (error) {
            setErrorRate(true)
        }

        postNewTransaction(obj)
            .then(data => {
                setProcess('confirmed');
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <div className="user__transaction">
                <Formik
                    initialValues={{
                        market_rate: 0,
                        coin_rate: 0,
                        dollar_rate: 0,
                    }}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="user__header user__transaction__header">
                            <h2 className="user__title">New transaction</h2>
                            <button
                                className="user__btn user__header-btn"
                                type="submit"
                                disabled={(valueGive === 0 || valueGive === '') || process === "loading"}
                            >
                                {
                                    (process === "loading") && "Loading..." ||
                                    (process === "error") && "Error!" ||
                                    "Create"}
                                <img src={bookmarkIcon} alt="bookmark" />
                            </button>
                        </div>
                        <div className="user__transaction__wrapper">
                            <div className="user__transaction__content">
                                <div >
                                    <h2 className="user__title">Client gives</h2>
                                    <div className="user__transaction__inner" >
                                        <Field name="coin_rate">
                                            {({ field }) => (
                                                <input
                                                    type="text"
                                                    className="user__transaction__input"
                                                    {...field}
                                                    onChange={event => {
                                                        if (!/[а-яёa-z]/i.test(event.target.value)) {
                                                            field.onChange(event);
                                                            setValueGive(event.target.value);
                                                            setValueReceive(event.target.value * (selectedRate ? selectedRate.dollar_rate : 0));
                                                        }
                                                    }}
                                                />
                                            )}
                                        </Field>
                                        <Dropdown
                                            options={options}
                                            onChange={(selectedOption) => handleDropdownChange(selectedOption, setValueCurrencyGive)}
                                            value={valueCurrencyGive}
                                            arrowClosed={<img src={arrowCloseIcon} alt="close" />}
                                            arrowOpen={<img src={arrowOpenIcon} alt="open" />} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="user__title">Client receives</h2>
                                    <div className="user__transaction__inner">
                                        <Field name="dollar_rate" >
                                            {({ field }) => (
                                                <input
                                                    type="text"
                                                    className="user__transaction__input"
                                                    readOnly
                                                    {...field}
                                                    onChange={event => {
                                                        if (!/[а-яёa-z]/i.test(event.target.value)) {
                                                            field.onChange(event);
                                                            setValueReceive(event.target.value);
                                                        }
                                                    }}
                                                    value={+valueReceive.toFixed(9)}
                                                />
                                            )}
                                        </Field>
                                        <Dropdown
                                            options={options}
                                            onChange={(selectedOption) => handleDropdownChange(selectedOption, setValueCurrencyReceive)}
                                            value={valueCurrencyReceive}
                                            arrowClosed={<img src={arrowCloseIcon} alt="close" />}
                                            arrowOpen={<img src={arrowOpenIcon} alt="open" />} />
                                    </div>
                                </div>
                                <div >
                                    <h2 className="user__title">Market price (USD)</h2>
                                    <div className="user__curr">
                                        {selectedRate ? (+selectedRate.coin_rate + "" + selectedRate.sold_currency) : 0}
                                        <img className="user__arrow" src={arrowIcon} alt="arrow left" />
                                        {selectedRate ? (+selectedRate.dollar_rate + "" + selectedRate.bought_currency) : 0}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="user__title">Markup %</h2>
                                    <Field name="market_rate" >
                                        {({ field }) => (
                                            <input
                                                type="text"
                                                className="user__transaction__input"
                                                {...field}
                                                onChange={event => {
                                                    if (!/[а-яёa-z]/i.test(event.target.value)) {
                                                        field.onChange(event);
                                                        setMarketRate(event.target.value);
                                                    }
                                                }}
                                                value={+marketRate}
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div className="user__transaction-result">
                                    <h2 className="user__title">Trade</h2>
                                    <div className="user__exchange">
                                        <div className="user__curr">
                                            {parseFloat(valueTradeSold) || 0}
                                            <img className="user__arrow" src={arrowIcon} alt="arrow left" />
                                            {parseFloat(valueTradeBought) || 0}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Form>
                </Formik>

            </div >
        </>
    );
};

export default UserCreateTransaction;