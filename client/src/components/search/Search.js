import { useState } from "react";
import searchIcon from "../../assets/search-icon.svg"

const Search = ({ searchText, setSearchText }) => {

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <div className="search">
            <input
                className="search__input"
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={handleInputChange}
            />
            <button className="search__btn">
                <img className="search__icon" src={searchIcon} alt="search icon" />
            </button>
        </div>
    );
};

export default Search;