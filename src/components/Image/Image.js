import React from "react";
import styles from './Image.module.scss';


const Image = ({ src, alt, size }) => {
    if (src) {
        return <img 
                    className={size==='large' ? styles.Image + ' ' + styles.Image__large : styles.Image} 
                    src={size==='large' ? src.large : src.medium} 
                    alt={alt.first} 
                />
    }
    else {
        return <div 
                    className={
                        size==='large' ? 
                        styles.Image__thumbnail + ' ' + styles.Image__large :
                        styles.Image__thumbnail}
                ></div>
    }
}

export default Image;