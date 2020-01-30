import React, { useState, useEffect } from "react";
import styles from "./Modal.module.scss";
import uuidv1 from "uuid";
import AppContext from "../Context/context";

import Image from "../Image/Image";

const Modal = ({ type, userId }) => {
  const [newUser, setNewUser] = useState([]);

  useEffect((...newUser) => {
    let user = {};
    if (newUser.length === 0) {
      user = {
        name: { first: "", last: "" },
        email: "",
        phone: "",
        id: uuidv1()
      };
    }
    setNewUser({ ...user });
  }, []);

  const handleInput = e => {
    let user = newUser;
    if (e.target.name.includes(".")) {
      let name = e.target.name.split(".");
      user[name[0]][name[1]] = e.target.value;
    } else {
      user[e.target.name] = e.target.value;
    }

    setNewUser({ ...user });
  };

  return (
    <AppContext.Consumer>
      {({ userData, setModalState, saveUser, deleteUser }) => {
        if (type === "show" || type === "edit") {
          userData.map(function(el, index) {
            if (userId === el.id) {
              setNewUser(userData[index]);
            }
            return null;
          });
        }

        return (
          <div
            className={styles.overlay}
            onClick={() => setModalState({ open: false })}
          >
            <div
              className={styles.overlay__wrapper}
              onClick={e => e.stopPropagation()}
            >
              {newUser.length !== 0 && type !== "delete" && (
                <Image src={newUser.picture} alt={newUser.name} size="large" />
              )}

              <h1 className={styles.title}>
                {
                  {
                    add: "Add User",
                    delete: "Delete User",
                    edit: "Edit User"
                  }[type]
                }
              </h1>
              {type !== "delete" && (
                <form
                  className={styles.contener}
                  autoComplete="off"
                  onSubmit={e => {
                    e.preventDefault();
                    saveUser(newUser, type);
                  }}
                >
                  <p>First name: </p>
                  {type === "edit" || type === "add" ? (
                    <input
                      type="text"
                      name="name.first"
                      value={newUser.length !== 0 && newUser.name.first}
                      onChange={e => handleInput(e)}
                    />
                  ) : (
                    <p>{newUser.length !== 0 && newUser.name.first}</p>
                  )}

                  <p>Last name: </p>
                  {type === "edit" || type === "add" ? (
                    <input
                      type="text"
                      name="name.last"
                      value={newUser.length !== 0 && newUser.name.last}
                      onChange={e => handleInput(e)}
                    />
                  ) : (
                    <p>{newUser.length !== 0 && newUser.name.last}</p>
                  )}

                  <p>Email: </p>
                  {type === "edit" || type === "add" ? (
                    <input
                      type="text"
                      name="email"
                      value={newUser.length !== 0 && newUser.email}
                      onChange={e => handleInput(e)}
                    />
                  ) : (
                    <p>{newUser.length !== 0 && newUser.email}</p>
                  )}

                  {type !== "show" && (
                    <input
                      className={styles.button}
                      type="submit"
                      value={type === "edit" ? "Save" : "Add"}
                    />
                  )}
                </form>
              )}
              {type === "delete" && (
                <div className={styles.Btn__Wrapper}>
                  <button
                    className={styles.button}
                    onClick={() => deleteUser(userId)}
                  >
                    Yes
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => {
                      setModalState({ open: false });
                    }}
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default Modal;
