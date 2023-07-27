

const redux = require('redux')
const createStore = redux.createStore

const CAKE_ORDERED = 'CAKE_ORDERED'  


// an action is an object that has a type property
//an action creator is a function that returns an object
function orderCake(){
    return(
        {
            type : CAKE_ORDERED,
            quantity : 1
        }
    )
}

// We need two arguments to write a reducer fn 
// The state of the application before making any change and
// The action 

//app's state has to be represented by a single object

const initialState = {
    nomOfCake : 10
}

const reducer = (state = initialState,action) =>{
    switch(action.type){
        case CAKE_ORDERED :
            return{
                nomOfCake:state.nomOfCake -1
            }
        default:
            return state
    }
}

//the remaining part is implementing the fn body that will return the new state of the app's based on the current state and action

const store = createStore(reducer)
console.log('initial state ', store.getState());

//we have not performed any state transition yet getState should effectively give us the initial state of our application

const unsubsribe = store.subscribe(()=> console.log('updated state',store.getState()))

// subscribe method accepts a function

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

// dispatch method accepts an action assets parameter

// const unsubsribe =store.subscribe() //.....
//unsubsribe from the store by calling the fn returned by the subscribe method

unsubsribe()

// //$ node index.js
// initial state  { nomOfCake: 10 }
// updated state { nomOfCake: 9 }
// updated state { nomOfCake: 8 }
// updated state { nomOfCake: 7 }

//each action of ordering a cake one cake has been reduced from the store


//start- const store = createStore(reducer) -- createStore method from the redux library accepts a parameter 
//the reducer fn which controls how the state transitions happen and this in turn contains the initial state of the application --  const reducer = (state = initialState,action)
// once the store is created we log the console the state of the application which is in fact the initial state and this corresponds to our first log satement in the terminal

//after that we set up a listener for the store so anytime the store updates we log the state to the console --const unsubsribe = store.subscribe(()=> console.log('updated state',store.getState()))
//when we dispatch the first action reducer sees that the action type is cake_ordered  it will then try to match this type with the switch cases in th ereducer function 
//it matches the first case and then simply decrements the number of cakes by one and returns the new state
//that the store stayed updated the listener is called which locks to the console the updated state

//at the end we simply unsubscribe to any changes in the store
//if  you were to dispatch an action after unsubscribing you 