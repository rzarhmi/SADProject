import {LOG_IN, LOG_OUT} from "../actions/index";

export default function (state = {}, action) {
    switch (action.type){
        case  LOG_IN:
            return {...state, isLoggedIn: true, whoIsLoggedIn: action.payload};
        case LOG_OUT:
            return {...state, isLoggedIn: false, whoIsLoggedIn: null};
        default:
            return state;
    }
}