import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserEdit, faAddressCard } from "@fortawesome/free-solid-svg-icons";

import AppContext from '../../Context/context'

import styles from './ListItem.module.scss';

import Image from '../../Image/Image'

const ListItem = forwardRef(({picture,name, id,...props},ref) => {

  return (
      <AppContext.Consumer>
        {({ setModalState }) => (
        <li ref={ref} className={styles.Item}>
          <div className={styles.Item__Delete}>
            <FontAwesomeIcon
              className={styles.Icon}
              icon={faTrash}
              onClick={(props) => { setModalState({ open: true, type: 'delete', id: id }) }}
            />
          </div>
          <div className={styles.Item__Edit}>
            <FontAwesomeIcon
              className={styles.Icon}
              icon={faUserEdit}
              onClick={(props) => { setModalState({ open: true, type: 'edit', id: id }) }}
            />
          </div>
          <div className={styles.Item__Wrapper} 
            onClick={(props) => {setModalState({open:true, type:'show', id:id})}}
          >
            <Image src={picture} alt={name}/>
            <div>
              <p className={styles.FullName}>
                <span>{name.first}</span>
                <span> {name.last}</span>
              </p>
              <p className={styles.Mail}>{props.email}</p>
            </div>
            <FontAwesomeIcon
              className={styles.Icon__card}
              icon={faAddressCard}
            />
          </div>
          </li>
        )}
      </AppContext.Consumer>
  );
})

export default ListItem;


ListItem.propTypes = {
  picture: PropTypes.object
}

ListItem.defaultProps = {
  picture: null
}