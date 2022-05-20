import React from "react";
import axios from 'axios';
import { configData } from '../config/config.helper';
import { encrptLocalStorage } from '../config/secure';
import {decryptLocalStorage} from '../config/secure'
// const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const UserContext = {
    loginUser,
    signup,
    profileData,
    signOut,
    // permission,
    // currentUser: currentUserSubject.asObservable(),
    // get currentUserValue () {
    //     return currentUserSubject.value
    //  },    
};
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, userData : action.payload };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false ,userData:null};
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var userData=null
  if(localStorage.getItem("currentUserData")){
    userData= decryptLocalStorage(JSON.parse(localStorage.getItem("currentUserData")))
  }
  var [state, dispatch] = React.useReducer(userReducer, {
    // isAuthenticated: !!decryptLocalStorage(localStorage.getItem("currentUser")),
    isAuthenticated: !!userData,
    // userData:JSON.parse(localStorage.getItem("currentUser")),
    userData:userData
 
    
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

function profileData (response,dispatch){
}
// ###########################################################


function loginUser(email, password,dispatch) {
  
    const apiRequest= axios.post(configData.API_URL + "systemUser/login", {
        email,
        password
      })
      return apiRequest
      .then(response => {
        
        if (response.data.token){
          var response_data=response.data
          localStorage.setItem("currentUser",response_data.id)

          localStorage.setItem("currentUserData", JSON.stringify(response_data));
          encrptLocalStorage('currentUserData',response_data)
          
          localStorage.setItem("currentToken", JSON.stringify(response_data.token));          
          localStorage.setItem("refreshToken", JSON.stringify(response_data.refreshToken));          
        }
     
        dispatch({ type: 'LOGIN_SUCCESS' ,payload: response.data })
        return response_data;
      });
    
  }

  function signup(username,email,password,dispatch){
   
    const apiRequest= axios.post(configData.API_URL + "systemUser", {
      username,
      email,
      password,
      'status':true,
    })
    return apiRequest
    .then(response => {
      if (response.data.token){
        var response_data=response.data
        localStorage.setItem("currentUser", JSON.stringify(response_data));
        localStorage.setItem("currentToken", JSON.stringify(response_data.token));          
        localStorage.setItem("refreshToken", JSON.stringify(response_data.refreshToken));          
      }
      dispatch({ type: 'LOGIN_SUCCESS' })
      return response_data;
    });
  }

  function signOut(dispatch) {
    localStorage.clear();
    // currentUserSubject.next(null);
    dispatch({ type: "SIGN_OUT_SUCCESS" });
    // history.push("/login");
  }

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut ,signup,profileData , UserStateContext};
