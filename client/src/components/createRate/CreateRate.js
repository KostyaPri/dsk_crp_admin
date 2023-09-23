import { Formik, Form, Field } from "formik";
import useUsersService from "../../services/UsersService";
import arrowIcon from "../../assets/arrow-icon.svg";
import bookmarkIcon from "../../assets/bookmark-icon.svg";
import { useEffect } from "react";

const CreateRate = () => {
    const { createRate, setProcess, process } = useUsersService();

    const handleSubmit = (values) => {
        createRate(values)
            .then(data => {
                console.log('data');
                setProcess('confirmed');
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
    }

    return (
        <Formik
            initialValues={{
                market_rate: '',
                coin_rate: '',
                dollar_rate: '',
                sold_currency: '',
                bought_currency: 'USD',
                market_rate_other: '',
                round_num: '',
                image: null,
                exchange_direction: 'S',
                hidden: false,
            }}
            onSubmit={handleSubmit}
        >
            <Form className="rate__create">
                <div className="rate__header">
                    <h2 className="rate__title">Create rate</h2>
                    <button
                        className="user__btn user__header-btn"
                        type="submit"
                    >
                        {
                            (process === "loading") && "Loading..." ||
                            (process === "error") && "Error!" ||
                            "Create"}
                        <img src={bookmarkIcon} alt="bookmark" />
                    </button>
                </div>
                <div className="rate__wrapper">
                    <div className="rate__inner">
                        <Field name="sold_currency">
                            {({ field }) => (
                                <div className="rate__create__item">
                                    <label htmlFor={field.name}>Coin Currency</label>
                                    <input
                                        type="text"
                                        className="user__transaction__input"
                                        {...field}
                                    />
                                </div>
                            )}
                        </Field>
                        <Field name="coin_rate">
                            {({ field }) => (
                                <div className="rate__create__item">
                                    <label htmlFor={field.name}>Coin Rate</label>
                                    <input
                                        type="text"
                                        className="user__transaction__input"
                                        {...field}
                                        onChange={event => {
                                            if (!/[а-яёa-z]/i.test(event.target.value)) {
                                                field.onChange(event);
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        </Field>
                        <img className="rate__arrow" src={arrowIcon} alt="arrow left" />
                        <Field name="bought_currency">
                            {({ field }) => (
                                <div className="rate__create__item">
                                    <label htmlFor={field.name}>Dollar Currency</label>
                                    <input
                                        type="text"
                                        className="user__transaction__input"
                                        {...field}
                                    />
                                </div>
                            )}
                        </Field>
                        <Field name="dollar_rate">
                            {({ field }) => (
                                <div className="rate__create__item">
                                    <label htmlFor={field.name}>Dollar Rate</label>
                                    <input
                                        type="text"
                                        className="user__transaction__input"
                                        {...field}
                                        onChange={event => {
                                            if (!/[а-яёa-z]/i.test(event.target.value)) {
                                                field.onChange(event);
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        </Field>
                    </div>

                    <Field name="market_rate">
                        {({ field }) => (
                            <div className="rate__create__item">
                                <label htmlFor={field.name}>Murkup</label>
                                <input
                                    type="text"
                                    className="user__transaction__input"
                                    {...field}
                                    onChange={event => {
                                        if (!/[а-яёa-z]/i.test(event.target.value)) {
                                            field.onChange(event);
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </Field>

                    <Field name="market_rate_other">
                        {({ field }) => (
                            <div className="rate__create__item">
                                <label htmlFor={field.name}>Murkup 2</label>
                                <input
                                    type="text"
                                    className="user__transaction__input"
                                    {...field}
                                    onChange={event => {
                                        if (!/[а-яёa-z]/i.test(event.target.value)) {
                                            field.onChange(event);
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </Field>

                    <Field name="round_num">
                        {({ field }) => (
                            <div className="rate__create__item">
                                <label htmlFor={field.name}>Rounding</label>
                                <input
                                    type="text"
                                    className="user__transaction__input"
                                    {...field}
                                    onChange={event => {
                                        if (!/[а-яёa-z]/i.test(event.target.value)) {
                                            field.onChange(event);
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </Field>

                    <Field name="image">
                        {({ field, form }) => (
                            <div className="rate__create__item">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={(event) => {
                                        form.setFieldValue(field.name, event.currentTarget.files[0]);
                                    }}
                                />
                            </div>
                        )}
                    </Field>
                </div>
            </Form>
        </Formik>
    );
};

export default CreateRate;