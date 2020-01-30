import React from 'react';
import styles from './Sort.module.scss'

const Sort = ({onSort}) => {
    return(
        <button className={styles.btn} onClick={()=>onSort()}>Sort</button>
    )
}

export default Sort;