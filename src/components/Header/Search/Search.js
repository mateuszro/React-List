import React, {useState} from 'react';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({onSearch}) =>{

    const [isFocus, setFocus] = useState(false);

    return (
      <div className={styles.Search}>
        <FontAwesomeIcon 
            className={styles.Icon} 
            icon={faSearch} 
            style={
                isFocus ? ({width: '25px', height:'25px', transform: 'rotateZ(90deg)'}) : ''
            }/>
        <input 
            className={styles.Input} 
            type="text" 
            onFocus={()=>{setFocus(true)}}
            onBlur={()=>{setFocus(false)}}
            onChange={(e)=>{onSearch(e.currentTarget.value);}}
            
        />
      </div>
    );
}

export default Search;