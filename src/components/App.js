import './App.css';
import React , {useState ,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
// import { v4 as uuid } from "uuid";
import AddContact from './AddContact';
import ContactList from './ContactList';
import api from '../api/contacts';
 


function App() {

  // const LOCAL_STORAGE_KEY = "contacts";
  //react state
  const [contacts, setContacts] = useState([]);

  const addContactHandler = async (contact) => {


    const request = {
      id: Math.floor(Math.random() * 1000000),
      ...contact
    }
    const response = await api.post("/user/create", request);
    console.log(response.data);

    setContacts([...contacts, response.data]); 
    console.log(contacts);

   } 


   const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };


  const retriveContacts= async () => {
    const response = await api.get("user/details");
    return await response.data;
  }

  useEffect(() => {
  //   const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if(retriveContacts) setContacts(retriveContacts);
   


  const getAllContacts = async () => {
    const allContacts = await retriveContacts();
    if(allContacts) setContacts(allContacts);
  };
  getAllContacts();
  }
  , []);

  useEffect(() => {
    //console.log("useEffect");
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);


  // const contacts = [
  //   {
  //       id: "1",
  //       "name": "John",
  //       "email": "john@gmail.com"
  //     },
  //     {
  //       id: "2",
  //       "name": "Minkal",
  //       "email": "abc@gmail.com"
  //     }]


  return (
    <div className="ui container">

   
    <Router>
    <Header/>
      <Routes>
        <Route path='/add' exact Component={() => (<AddContact addContactHandler={addContactHandler} />)} />

        <Route path='/' exact Component={ () => (<ContactList contacts={contacts} getContactId={removeContactHandler} />)} />
      </Routes>
     
    {/* <AddContact addContactHandler={addContactHandler}/>
    <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
    </Router>

    </div>
   
  
   
  );
}

export default App;