import { createAction, handleActions } from 'redux-actions'

// dux패턴
// type
const MY_TYPE = "mytestreducer/MY_TYPE"
const MY_PAYLOAD_TYPE = "mytestreducer/MY_PAYLOAD_TYPE"

// action
export const myType = createAction(MY_TYPE)
export const myPayloadType = createAction(MY_PAYLOAD_TYPE)

// state
const initialState = {
  myTestName: "홍길동",
  myTestAge: 20,
  myTestAddress: "서울시 강남구"
}

// reducer
const mytest = handleActions({
  [MY_TYPE]: (state, action) => ({...state, myTestAge: state.myTestAge + 1}),
  [MY_PAYLOAD_TYPE]: (state, action) => ({...state, myTestName: action.payload}),
}, initialState)

export default mytest;








