

const redux = require('redux')
const produce = require('immer').produce


const STREET_UPDATED = 'STREET_UPDATED'

const initialState = {
    name:'sirajunnisa',
    address: {
        street: '123 main st',
        city: 'boston',
        state: 'MA'
    }
}

const streetUpdate = (street)=>{
    return{
        type:STREET_UPDATED,
        payload:street
    }
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case STREET_UPDATED:
            // return{
            //     ...state,
            //     address :{
            //         ...state.address,
            //         street:action.payload
            //     }
                
            // }
            return produce(state,(draft)=>{
                draft.address.street = action.payload
            })
        default: {
            return state
        }
    }
}


const store = redux.createStore(reducer)
console.log('initial state' ,store.getState());

const unsubscribe = store.subscribe(()=>{
    console.log('updated state', store.getState());
})

store.dispatch(streetUpdate("893 main St"))
unsubscribe()

 //create the store and dispatch the actions tracking the initial state and the updated state

//1 argument of the producer is current state ,2-is a fn which receives a draft copy of the state
//immer allows us to do is update this draft state as if state is mutable