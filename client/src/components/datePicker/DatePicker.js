import { useEffect, useRef, useState } from "react";
import Calendar from 'react-calendar';
import calendarIcon from "../../assets/calendar-icon.svg";

const formateDate = (date) => {
    const dateObj = new Date(date);

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
}

const countDays = (dates) => {
    const timeDiff = Math.abs(dates[0].getTime() - dates[1].getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffDays === 1) {
        return "1 day";
    } else {
        return `${diffDays} days`;
    }
}

const DatePicker = ({ setDateValue }) => {
    const [value, onChange] = useState(new Date());
    const [open, setOpen] = useState(false);
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const onCancelClick = () => {
        setDateValue([]); // for request
        onChange([]); // for local
        setOpen(!open);
    }

    const handleOpenCalendar = () => {
        setOpen(!open);
    }

    const handleClickDone = () => {
        setDateValue(value);
        setOpen(!open);
    }

    const outDate = () => {
        if (Array.isArray(value) && value.length !== 0) {
            if (formateDate(value[0]) === formateDate(value[1])) {
                return `with ${formateDate(value[0])}`;
            } else {
                return `${formateDate(value[0])} - ${formateDate(value[1])}`;
            }
        }
    }

    return (
        <>
            <div className="filters__date" ref={popupRef}>
                <h2 className="filters__title">Select Date</h2>
                <div className="filters__panel">
                    <input
                        className="filters__date-input"
                        placeholder={outDate()}>
                    </input>
                    <button className="filters__date-btn" onClick={handleOpenCalendar}>
                        <img className="filters__date-icon" src={calendarIcon} alt="calendarIcon" />
                    </button>
                </div>
                {open ?
                    <div className="calendar__wrapper">
                        <Calendar
                            onChange={onChange}
                            value={value}
                            selectRange={true}
                            locale={"en"}
                            formatShortWeekday={(locale, date) => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]}
                            showDoubleView={true}
                        />
                        <div className="calendar__footer">
                            <div className="calendar__days">
                                {(value.length !== 0) && `${Array.isArray(value) ? countDays(value) : '0 day'}`}
                            </div>
                            <div className="calendar__btns">
                                <button
                                    className="calendar__btn"
                                    onClick={onCancelClick}>Cancel</button>
                                <button
                                    className="calendar__btn calendar__btn_blue"
                                    onClick={handleClickDone}>Done</button>
                            </div>
                        </div>
                    </div> : null}
            </div>

        </>
    )

};

export default DatePicker;