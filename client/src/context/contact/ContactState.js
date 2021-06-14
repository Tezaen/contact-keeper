import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null, //Contact info displayed inside the contact form whenever you hit "update"
        filtered: null, //Array of contacts that will show up on search
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {
        // no need for config if ur not sending anything
        try {
            const res = await axios.get('/api/contacts'); // no need to send token as long as it is in localstorage
    
            dispatch({ 
                type: GET_CONTACTS, 
                payload: res.data 
            });
        } catch (error) {
            dispatch({ 
                type: CONTACT_ERROR,
                payload: error.response.message
            });
        }
    } 

    // Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        try {
            const res = await axios.post('/api/contacts', contact, config); // no need to send token as long as it is in localstorage
    
            dispatch({ 
                type: ADD_CONTACT, 
                payload: res.data 
            });
        } catch (error) {
            dispatch({ 
                type: CONTACT_ERROR,
                payload: error.response.message
            });
        }
    }

    // Delete Contact
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`); // no need to send token as long as it is in localstorage
    
            dispatch({
                type: DELETE_CONTACT, 
                payload: id 
            });
        } catch (error) {
            dispatch({ 
                type: CONTACT_ERROR,
                payload: error.response.message
            });
        }
    }

    //Update Contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config); // no need to send token as long as it is in localstorage
    
            dispatch({ 
                type: UPDATE_CONTACT, 
                payload: res.data 
            });
        } catch (error) {
            dispatch({ 
                type: CONTACT_ERROR,
                payload: error.response.message
            });
        }

    }

    // Clear Contacts
    const clearContacts = () => { // When you log out, you want to clear the state of any contacts 
        dispatch({ type: CLEAR_CONTACTS });
    }

    // Set Current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    // Filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text});
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                clearContacts
            }}
        >
            { props.children }
        </ContactContext.Provider>
    );
};

export default ContactState;