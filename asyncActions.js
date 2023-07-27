
const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const createStore = redux.createStore

const applyMiddleware = redux.applyMiddleware

//state is an object with three properties..
const initialState={
    loading: false,
    users: [],
    error: '',
}

//Actions  declairing the contants for the action types
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

//request to fetch data
const fetchUsersRequest = ()=>{
    return {
        type:FETCH_USERS_REQUESTED,

    }
}
//second one is to store the list of users if the request was successful   -- receives users as a parameter
const fetchUsersSuccess =(users)=>{
    return {
        type:FETCH_USERS_SUCCEEDED,
        payload:users
    }
}

//final one is to store the error message if the request failed
const fetchUsersFailed = (error)=>{
    return {
        type:FETCH_USERS_FAILED,
        payload:error
    }
}

//define our reducer fn --receives two parameters state and action
const reducer = (state=initialState,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUESTED:
            return{
                ...state,
                loading: true

            }
        case FETCH_USERS_SUCCEEDED:
            return{
                loading:false,
                users: action.payload,
                error:''
            }
        case FETCH_USERS_FAILED:
            return{
                loading:false,
                users:[],
                error: action.payload
            }

    }

}

//define async action creater  --retuns an action   what the thunk middleware bring to the table is the ability for an action creatot to return a function instead of an action object
const fetchUsers=()=>{
    return function(dispatch){               // allows to have side effects such as asynchronius api calls----this fn can also dispatch action--it receives the dispatch method as its argument
        dispatch(fetchUsersRequest())                                                 //now we dispatch the appropriate action before we fire off our api call we dispatch fetch users request---this action creatot will basically set loading to true
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response)=>{
            //resoponse.data is the users
            const users= response.data.map((user)=>user.id)        //when we get  the response we are going to dispatch --passing the user id s   --when the request is successfull we dispatch fetch users action which stores the users in our state
            dispatch(fetchUsersSuccess(users))
        }).catch(error =>{
            //error.message is the error message
            dispatch(fetchUsersFailed(error.message))
        })
    }
}

//create redux stote 
const store = createStore(reducer,applyMiddleware(thunkMiddleware))

//subscribe to our store and dispatch this asynchrounous action creator

store.subscribe(()=>{
    console.log(store.getState());
})
store.dispatch(fetchUsers())