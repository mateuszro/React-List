import React from 'react'
import styles from './Loading.module.scss'

const Loading = () => {

    return(
        <div className={styles.overlayer}>
            <div className={styles.wrapper}>
                <div className={styles.circle}></div>
                <div className={styles.circle+' '+styles.circle__2}></div>
                <div className={styles.circle + ' ' + styles.circle__3}></div>
                <div className={styles.circle + ' ' + styles.circle__4}></div>
            </div>
            <span className={styles.text}>Loading
                <span className={styles.dot+' '+styles.dot__1}>.</span>
                <span className={styles.dot+' '+styles.dot__2}>.</span>
                <span className={styles.dot+' '+styles.dot__3}>.</span>
            </span>
        </div>
    )
}

export default Loading;