import React, {useState, useEffect} from 'react';
import uuidv1 from "uuid";
import './App.css';

import API from './utils/API'

import Header from './components/Header/Header'
import ListWrapper from './components/ListWrapper/ListWrapper'
import Modal from './components/Modal/Modal'
import Loading from './components/Loading/Loading'

import AppContext from './components/Context/context'


function App() {

  const [userData, setData] = useState([]);
  const [filteredUsers, setFilter] = useState([]);
  const [isSorted, setSorted] = useState(false);
  const [isModal, setModalState] = useState({open: false, type: ''});
  
  const getData = async () => {
    try{
      let res = await API.get("/", {
        params: {
          results: 20,
          inc: "name, email, picture, gender, location, dob, phone"
        }
      });
      res.data.results.map(item=>{
        item["id"] = uuidv1();
        return item
      })
      localStorage.setItem('data', JSON.stringify(res.data.results));
      return setData(res.data.results);
    } catch(e){
      console.log(`😱 Axios request failed: ${e}`);
    }
  };

  useEffect(() => {
    let localData = localStorage.getItem('data');
    if(!localData){
      getData();
    }else{
      setData(JSON.parse(localData));
    }
  },[])

  useEffect(() => {
    setFilter(userData);
    localStorage.setItem('data', JSON.stringify(userData));
  }, [userData])

  const filterUsers = (value) => {
    let filter = userData.filter(
      user => (user.name.first + user.name.last).toLowerCase().includes(value.toLowerCase())
    );
    setFilter(filter);
  }

  const sortUsers = () => {
    let sortedList = [];
    if (isSorted === true) {
        sortedList = filteredUsers.reverse();
        setSorted(false);
    }
    else{
      sortedList = [...filteredUsers].sort((a, b) =>
        a.name['first'].localeCompare(b.name['first'])
      ); 
      setSorted(true);
    }
    setFilter(sortedList);
  }

  const saveUser = (newUser, type) => {
    let newUserData = userData; 
    if(type==='add'){
      newUserData.push(newUser);
    } else {
      newUserData.map(function (el, index) {
        if (newUser.id === el.id) {
          newUserData[index] = newUser
        }
        return null;
      });
    }
    setData([...newUserData]);
    setModalState({open:false});
  }

  const deleteUser = (id) => {
    let users = userData;
    let index = users.findIndex(el => el.id === id)
    users.splice(index,1);
    setData([...users]);
    setModalState({open: false})
  }

  return (
    <>
      <AppContext.Provider value={{userData, saveUser, deleteUser, setModalState}}>
        <Header onSearch={filterUsers} onSort={sortUsers}/>
        {userData.length <= 0 ? (
          <Loading/>
        ) : (
          <ListWrapper users={filteredUsers}/>
        )}
        {isModal.open && <Modal type={isModal.type} userId={isModal.id}/>}
      </AppContext.Provider>
    </>
  );
}

export default App;
