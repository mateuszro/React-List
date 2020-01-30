import React, {forwardRef} from 'react'
import style from './AddUser.module.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AppContext from '../Context/context'

const AddUser = forwardRef((props, ref) =>{
    return(
        <AppContext.Consumer>
            {({setModalState})=>(
                <li ref={ref} className={style.Item} onClick={() => setModalState({open:true, type:'add'})}>
                    <div className={style.Plus}>
                        <FontAwesomeIcon
                            className={style.Icon}
                            icon={faPlus}
                        />
                    </div>
                </li>
            )}
        </AppContext.Consumer>
    )
})

export default AddUser;