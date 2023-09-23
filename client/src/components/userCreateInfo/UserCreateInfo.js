import { useState } from "react";
import { Formik, Field, Form, useFormikContext } from "formik";

import deliveredIcon from "../../assets/delivered-icon.svg";
import closeIcon from "../../assets/close-icon.svg";
import { useNavigate } from "react-router-dom";
import useUsersService from "../../services/UsersService";
import { formateDate, formateDateRequest } from "../../utils/formateDate";
import StatusMessage from "../statusMessage/StatusMessage";
import Calendar from 'react-calendar';
import calendarIcon from "../../assets/calendar-icon.svg";

const FormWrapper = () => {
    const [initialValues, setInitialValues] = useState({
        initials: '',
        date_indentifier: '',
        po: '',
        phone_number: '',
        telegram: '',
        email: '',
        skan_wallet: '',
        corresponds: '',
        deals_made: '',
        total_amount: '',
        birth_date: '',
        nationality: '',
        place_birth: '',
        gender: '',
        birth_number: '',
        address_residence: '',
        type_id_card: '',
        indetity_card_number: '',
        date_of_validity_from: '',
        date_of_validity_until: '',
        authority: '',
        country: '',
        pep_client: '',
        sanctions: '',
        business_name: '',
        id_number: '',
        address: '',
        country_at_risk: '',
        screening_of_the_client: '',
        client_legal_entity: '',
        skan_id: '',
        skan_person: '',
        client_acts: {}
    })
    const { postInfoUser, process, setProcess, error, clearError } = useUsersService();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        values = {
            address_residence: values.address_residence,
            authority: values.authority,
            birth_date: values.birth_date || "1000-01-01",
            birth_number: values.birth_number,
            client_acts: {
                address: values.address,
                business_name: values.business_name,
                country_at_risk: values.country_at_risk,
                id_number: values.id_number,
                screening_of_the_client: values.screening_of_the_client
            },
            client_legal_entity: values.client_legal_entity || '',
            corresponds: values.corresponds,
            country: values.country,
            date_of_validity_from: values.date_of_validity_from,
            date_of_validity_until: values.date_of_validity_until,
            email: values.email,
            gender: values.gender,
            indetity_card_number: values.indetity_card_number,
            internal_identifier: values.internal_identifier || '',
            name: values.initials.split(' ')[0] || '',
            nationality: values.nationality,
            pep_client: values.pep_client,
            phone_number: values.phone_number,
            place_birth: values.place_birth,
            sanctions: values.sanctions,
            skan_id: values.skan_id,
            skan_wallet: values.skan_wallet,
            skan_person: values.skan_person,
            surname: values.initials.split(' ')[1] || '',
            telegram: values.telegram,
            type_id_card: values.type_id_card
        };

        var isEmptyClientActs = true;
        for (var key in values.client_acts) {
            if (values.client_acts.hasOwnProperty(key) && values.client_acts[key] !== '') {
                isEmptyClientActs = false;
                break;
            }
        }

        if (isEmptyClientActs) {
            delete values.client_acts;
        }

        postInfoUser(values)
            .then(data => {
                navigate(-1);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            {error && <StatusMessage message={error} clearError={clearError} />}
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <UserCreateInfo initialValues={initialValues} />
            </Formik>
        </>
    )
}

const UserCreateInfo = ({ initialValues }) => {
    const [openInfo, setOpenInfo] = useState(true);
    const [openBirthCalendar, setOpenBirthCalendar] = useState(false);
    const [openFromIDCalendar, setOpenFromIDCalendar] = useState(false);
    const [openUntilIDCalendar, setOpenUntilIDCalendar] = useState(false);
    const [valueBirthCalendar, onChangeBirthCalendar] = useState(null);
    const [valueFromIDCalendar, onChangeFromIDCalendar] = useState(null);
    const [valueUntilIDCalendar, onChangeUntilIDCalendar] = useState(null);
    const navigate = useNavigate();
    const { setFieldValue } = useFormikContext();

    const handleOpenInfo = () => {
        setOpenInfo(!openInfo);
    }

    return (
        <div className="user__wrapper">
            <Form>
                <div className="user__header">
                    <h2 className="user__title">User profile</h2>
                    <div className="user__header-btns">
                        <button
                            className="user__btn user__header-btn"
                            type="submit"
                        >
                            Save
                            <img src={deliveredIcon} alt="write" />
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="user__btn user__header-btn"
                            type="button"
                        >
                            Cancel
                            <img src={closeIcon} alt="arrow back" />
                        </button>
                    </div>
                </div>
                <div className="user__info">
                    <div className="user__info-top">
                        <div className="user__info-item">
                            <h2 className="user__info-title">Initials</h2>
                            <Field className="input_data" type="text" name="initials" />
                        </div>
                        <div className="user__info-item">
                            <h2 className="user__info-title">Register</h2>
                            <div className="user__info-text">{formateDate(new Date())}</div>
                            {/* <Field className="input_data" type="text" name="date_indentifier" /> */}
                        </div>
                        <div className="user__info-item">
                            <h2 className="user__info-title">PO</h2>
                            {/* <Field className="input_data" type="text" name="po" /> */}
                            <div className="user__info-text">--</div>
                        </div>

                        <div className="user__info-item">
                            <h2 className="user__info-title">Phone number</h2>
                            <Field className="input_data" type="text" name="phone_number" />
                        </div>
                        <div className="user__info-item">
                            <h2 className="user__info-title">Telegram</h2>
                            <Field className="input_data" type="text" name="telegram" />
                        </div>
                        <div className="user__info-item">
                            <h2 className="user__info-title">Mail</h2>
                            <Field className="input_data" type="email" name="email" />
                        </div>

                        <div className="user__info-item">
                            <h2 className="user__info-title">Income statement</h2>
                            {/* <Field className="input" type="file" name="skan_wallet" /> */}
                            <input
                                className="input"
                                type="file"
                                onChange={(e) => {
                                    setFieldValue("skan_wallet", e.target.files[0])
                                }}
                            />
                        </div>
                        <div className="user__info-item">
                            <h2 className="user__info-title">Verification</h2>
                            <Field className="input" name="corresponds" type="checkbox" />
                        </div>
                        <div className="user__info-item__wrap">
                            <div className="user__info-item">
                                <h2 className="user__info-title">Deals made</h2>
                                <div className="user__info-text">--</div>
                            </div>
                            <div className="user__info-item">
                                <h2 className="user__info-title">Total amount</h2>
                                <div className="user__info-text">--</div>
                            </div>
                        </div>
                    </div>
                    {openInfo && (<>
                        <div className="user__info-body">
                            <div className="user__info-item">
                                <h2 className="user__info-title">Date of birth</h2>
                                <Field
                                    className="input_data"
                                    type="text"
                                    name="birth_date"
                                // value={formateBirthDate(valueCalendar)} 
                                />
                                <button
                                    className="user__date-btn"
                                    onClick={() => setOpenBirthCalendar(!openBirthCalendar)}
                                    type="button"
                                >
                                    <img className="user__date-icon" src={calendarIcon} alt="calendarIcon" />
                                </button>
                                {openBirthCalendar &&
                                    <div className="user__calendar">
                                        <Calendar
                                            onChange={(value) => {
                                                onChangeBirthCalendar(value);
                                                setFieldValue("birth_date", formateDateRequest(value));
                                            }}
                                            value={valueBirthCalendar}
                                            locale={"en"}
                                            formatShortWeekday={(locale, date) => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]}
                                        />
                                    </div>}
                            </div>
                            <div className="user__info-item">
                                <h2 className="user__info-title">Nationality</h2>
                                <Field className="input_data" type="text" name="nationality" />
                            </div>
                            <div className="user__info-item">
                                <h2 className="user__info-title">Place and country of birth</h2>
                                <Field className="input_data" type="text" name="place_birth" />
                            </div>

                            <div className="user__info-item">
                                <h2 className="user__info-title">Gender</h2>
                                <Field
                                    className="input_data"
                                    type="text"
                                    name="gender"
                                    as="select"
                                >
                                    <option value="" label="Select a gender" />
                                    <option value="M" label="Male" />
                                    <option value="F" label="Femele" />
                                    <option value="O" label="Other" />
                                </Field>
                            </div>
                            <div className="user__info-item">
                                <h2 className="user__info-title">Birth number</h2>
                                {/* <Field className="input_data" type="text" name="birth_number" /> */}
                                <Field
                                    className="input_data"
                                    type="text"
                                    name="birth_number"
                                    as="select"
                                >
                                    <option value="" label="Select a birth" />
                                    <option value="A" label="Allocated" />
                                    <option value="U" label="Unassigned" />
                                </Field>
                            </div>
                            <div className="user__info-item">
                                <h2 className="user__info-title">Exact address and country of residence</h2>
                                <Field className="input_data" type="text" name="address_residence" />
                            </div>
                        </div>

                        <div className="user__info-section">
                            <div className="user__info-item">
                                <h2 className="user__info-title">Type of ID card</h2>
                                {/* <Field className="input_data" type="text" name="type_id_card" /> */}
                                <Field
                                    className="input_data"
                                    type="text"
                                    name="type_id_card"
                                    as="select"
                                >
                                    <option value="" label="Select of type" />
                                    <option value="P" label="Passport" />
                                    <option value="I" label="ID card" />
                                    <option value="D" label="Driving licence" />
                                    <option value="R" label="Residence permit" />
                                    <option value="O" label="Other ID" />
                                </Field>
                            </div>
                            <div className="user__info-item">
                                <h2 className="user__info-title">Identity card number</h2>
                                <Field className="input_data" type="text" name="indetity_card_number" />
                            </div>
                        </div>

                        <div className="user__info-item_one">
                            <h2 className="user__info-title">Date of validity of ID</h2>
                            <div className="user__info-text">
                                <div className="user__info-text__wrapper">
                                    <span>From: <Field className="input_data" type="text" name="date_of_validity_from" /></span>
                                    <button
                                        className="user__date-btn"
                                        onClick={() => setOpenFromIDCalendar(!openFromIDCalendar)}
                                        type="button"
                                    >
                                        <img className="user__date-icon" src={calendarIcon} alt="calendarIcon" />
                                    </button>
                                    {openFromIDCalendar &&
                                        <div className="user__calendar">
                                            <Calendar
                                                onChange={(value) => {
                                                    onChangeFromIDCalendar(value);
                                                    setFieldValue("date_of_validity_from", formateDateRequest(value));
                                                }}
                                                value={valueFromIDCalendar}
                                                locale={"en"}
                                                formatShortWeekday={(locale, date) => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]}
                                            />
                                        </div>}
                                </div>
                                <div className="user__info-text__wrapper">
                                    <span>Until: <Field className="input_data" type="text" name="date_of_validity_until" /></span>
                                    <button
                                        className="user__date-btn"
                                        onClick={() => setOpenUntilIDCalendar(!openUntilIDCalendar)}
                                        type="button"
                                    >
                                        <img className="user__date-icon" src={calendarIcon} alt="calendarIcon" />
                                    </button>
                                    {openUntilIDCalendar &&
                                        <div className="user__calendar">
                                            <Calendar
                                                onChange={(value) => {
                                                    onChangeUntilIDCalendar(value);
                                                    setFieldValue("date_of_validity_until", formateDateRequest(value));
                                                }}
                                                value={valueUntilIDCalendar}
                                                locale={"en"}
                                                formatShortWeekday={(locale, date) => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]}
                                            />
                                        </div>}
                                </div>
                            </div>
                        </div>

                        <div className="user__info-item_onesl">
                            <h2 className="user__info-title">Scanned copy of the ID card</h2>
                            <div className="user__info-text">
                                <input
                                    className="input"
                                    type="file"
                                    onChange={(e) => {
                                        setFieldValue("skan_id", e.target.files[0])
                                    }}
                                />
                            </div>
                        </div>

                        <div className="user__info-section user__info-section-second">
                            <div className="user__info-item">
                                <h2 className="user__info-title">The authority that issued ID</h2>
                                <Field className="input_data" type="text" name="authority" />
                            </div>
                            <div className="user__info-item">
                                <h2 className="user__info-title">The country that issued ID</h2>
                                <Field className="input_data" type="text" name="country" />
                            </div>

                            <div className="user__info-item">
                                <h2 className="user__info-title">Is this person or PEP client?</h2>
                                <Field className="input" type="checkbox" name="pep_client" />
                            </div>
                            <div className="user__info-item">
                                <h2 className="user__info-title">International sanctions</h2>
                                <Field className="input" type="checkbox" name="sanctions" />
                            </div>
                        </div>

                        <div className="user__info-item_onesl">
                            <h2 className="user__info-title">Scanned copy PEP</h2>
                            <div className="user__info-text">
                                {/* <Field className="input" type="file" name="w" /> */}
                                <input
                                    className="input"
                                    type="file"
                                    onChange={(e) => {
                                        setFieldValue("skan_person", e.target.files[0])
                                    }}
                                />
                            </div>
                        </div>

                        <h2 className="user__info-title user__info-title-busines">The client acts as a natural person engaged in business </h2>

                        <div className="user__info-section user__info-section-third">
                            <div className="user__info-item">
                                <h2 className="user__info-title">Business name</h2>
                                <Field className="input_data" type="text" name="business_name" />
                            </div>
                            <div className="user__info-item">
                                <h2 className="user__info-title">ID</h2>
                                <Field className="input_data" type="text" name="id_number" />
                            </div>
                            <div className="user__info-item">
                                <h2 className="user__info-title">Register office</h2>
                                <Field className="input_data" type="text" name="address" />
                            </div>
                            <div className="user__info-item">
                                <h2 className="user__info-title">Establishment in a country at risk</h2>
                                <Field className="input" type="checkbox" name="country_at_risk" />
                            </div>
                        </div>

                        <div className="user__info-item_ones">
                            <h2 className="user__info-title">Carry out enchanced screening of the client</h2>
                            <Field className="input" type="checkbox" name="screening_of_the_client" />
                        </div>

                        <div className="user__info-item_ones">
                            <h2 className="user__info-title">The client is a legal entity</h2>
                            <Field
                                className="input_data"
                                type="text"
                                name="client_legal_entity"
                                as="select"
                            >
                                <option value="" label="Select a choices" />
                                <option value="S" label="Statutor" />
                                <option value="P" label="Power of attorney" />
                                <option value="O" label="Other" />
                            </Field>
                        </div>
                    </>)}

                    <button
                        className="user__btn user__open-btn"
                        onClick={() => handleOpenInfo()}
                        type="button"
                    >
                    </button>
                </div>
            </Form>
        </div >
    );
};

export default FormWrapper;