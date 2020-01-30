import React from 'react';
import PropTypes from "prop-types";

import styles from './Header.module.scss'

import Search from './Search/Search'
import Sort from './Sort/Sort'

const Header = ({onSearch, onSort}) => {
    return(
        <header className={styles.Header}>
            <Search onSearch={onSearch}/>
            <Sort onSort={onSort}/>
        </header>
    )
}

export default Header;

Header.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
}
