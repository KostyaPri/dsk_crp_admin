import { useState } from "react";
import setContent from "../../utils/setContent";
import RateListItem from "../rateListItem/RateListItem";
import arrowIcon from "../../assets/arrow-icon.svg";

const RateList = ({ rateList, process, setRateList, exchangeUSD }) => {

    return (
        <div className="table table__rate-wrapp">
            <div className="table__wrapper">
                <table className="table__table">
                    <thead className="table__header">
                        <tr>
                            <td>Currency</td>
                            <td>Bank rate</td>
                            <td>Markup</td>
                            <td>Markup 2</td>
                            <td>Rounding</td>
                            <td>Image</td>
                            <td className="table__rate_hide-cell"></td>
                        </tr>
                    </thead>
                    <tbody className="table__body">
                        <tr>
                            <td>
                                <div>{exchangeUSD.usd} <img className="tabele__arrow" src={arrowIcon} alt="arrow left" /> {exchangeUSD.czk}</div>
                            </td>
                            <td className="table__bank-rate">
                                <div>
                                    {+exchangeUSD.usd_rate} {exchangeUSD.usd}
                                    <img className="tabele__arrow" src={arrowIcon} alt="arrow left" />
                                    {+exchangeUSD.czk_rate} {exchangeUSD.czk}
                                </div>
                            </td>
                            <td>
                                --
                            </td>
                            <td>
                                --
                            </td>
                            <td className="table__more">
                            </td>
                        </tr>
                        {setContent(process, View, { rateList, setRateList })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const View = ({ data }) => {
    const [activeItemId, setActiveItemId] = useState(null);
    const { rateList, setRateList } = data;

    const onToggleActiveItem = (itemId) => {
        setActiveItemId(activeItemId === itemId ? null : itemId);
    };

    return (
        <>
            {rateList.map(item => (
                <RateListItem
                    data={item}
                    key={item.id}
                    onToggleActiveItem={onToggleActiveItem}
                    activeItemId={activeItemId}
                    setRateList={setRateList}
                    rateList={rateList}
                />
            ))}
        </>
    )
}

export default RateList;