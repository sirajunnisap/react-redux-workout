const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED'                      //define the constant for the action type 
const CAKE_RESTOCKED ='CAKE_RESTOCKED'   //1
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED ='ICECREAM_RESTOCKED' 


function orderCake () {                                   //action    have object type :   action is a function that return a action that return a object
    return (
        {
            type : CAKE_ORDERED,
            quantity : 1
        }

    )
}

function restockCake(qty = 1){    //2
    return (
        {
            type : CAKE_RESTOCKED,
            payload :qty              // in redux the convention is to use a property called payload for any additional information you want to send
        }
    )
}


function orderIceCream(qty=1){
    return{
        type:ICECREAM_ORDERED,
        payload:qty
    }
}

function restockIceCream(qty=1){
    return{
        type:ICECREAM_RESTOCKED,
        payload:qty
    }
}

const initialCakeState ={
    numberOfCake : 10
}

const initialIceCreamState ={
    numberOfIceCream : 20
}

const  cakeReducer = (state = initialCakeState , action)=>{
    switch(action.type){
        case CAKE_ORDERED :
            return {
                ...state,
                numberOfCake : state.numberOfCake-1
            }
        case CAKE_RESTOCKED :                               //3
            return {
                ...state,
                numberOfCake : state.numberOfCake + action.payload
            }
        default :
        return state
    }
}

const  iceCreamReducer = (state = initialIceCreamState , action)=>{
    switch(action.type){
        case ICECREAM_ORDERED :
            return {
                ...state,
                numberOfIceCream : state.numberOfIceCream-1
            }
        case ICECREAM_RESTOCKED :                               //3
            return {
                ...state,
                numberOfIceCream : state.numberOfIceCream + action.payload
            }
        default :
        return state
    }
}

const rootReducer = combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})

const store = createStore(rootReducer , applyMiddleware(logger))           // pass an argument to create store and pass in the middleware to the apply middleware method and remove the subscibtion console.log
console.log('initiate state', store.getState());

// const unsubscribe = store.subscribe(()=>
// console.log('update state',store.getState()))

const unsubscribe = store.subscribe(()=>{})                              //LOGGER MIDDLEWARE handle all of that    -- we are able to see all logs
                                                                            // initiate state { cake: { numberOfCake: 10 }, iceCream: { numberOfIceCream: 20 } }      
                                                                            // action CAKE_ORDERED @ 06:12:38.716
                                                                            // prev state { cake: { numberOfCake: 10 }, iceCream: { numberOfIceCream: 20 } }       
                                                                            // action     { type: 'CAKE_ORDERED', quantity: 1 }

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(3))     //4



const actions = bindActionCreators({orderCake,restockCake},store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()




unsubscribe()







//we invoke the dispatch on the store and pass in the action
// actions = bindActionCreators({objects(where we specify the different action creators)},what we want to bind it to )

//multiple reducers and combine reducers function