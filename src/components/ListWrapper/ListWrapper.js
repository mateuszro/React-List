import React from 'react';
import PropTypes from "prop-types";

import posed, { PoseGroup } from "react-pose";
//import { tween } from "popmotion";

import styles from './ListWrapper.module.scss';

//import { List } from "react-virtualized";

import ListItem from './ListItem/ListItem'
import AddUser from '../AddUser/AddUser'

const PersonItem = posed(ListItem)({
  enter: {
    x: 0,
    opacity: 1,
    delay: 100,
    transition: {
      x: { type: 'spring', stiffness: 500, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    x: 0,
    opacity: 0,
    transition: { duration: 300 }
  }
});

const AddPersonItem = posed(AddUser)({
  enter: {
    x: 0,
    opacity: 1,
    delay: 100,
    transition: {
      x: { type: 'spring', stiffness: 500, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    x: 0,
    opacity: 0,
    transition: { duration: 300 }
  }
});



const ListWrapper = ({users}) => {

    return (
      <>
        <ul className={styles.List}>
          <PoseGroup animateOnMount>
            {users.map((user) => {
              return (
                <PersonItem key={user.id} {...user}/>
              );
            })}
            <AddPersonItem key='NewUser'/>
          </PoseGroup>
          <i arial-hidden="true"></i>
          <i arial-hidden="true"></i>
        </ul>
      </>
    );
}

export default ListWrapper;


ListWrapper.propTypes = {
  users: PropTypes.array.isRequired
}