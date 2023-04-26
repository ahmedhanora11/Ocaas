import React from 'react'
import { AUTH, LOGOUT } from '../constants/actionTypes.js'


const authReducer = ( state={ authData: null }, action ) => {
  
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data })); //

            return { ...state, authData: action?.data }; //ok
        
        case LOGOUT:
            localStorage.clear();

            return { ...state, authData: null }; //ok

        default:
            return state;
    }

};

export default authReducer;