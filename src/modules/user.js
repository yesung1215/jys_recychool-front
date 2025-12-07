import { createAction, handleActions } from "redux-actions";

// 타입
const SET_PREVIOUS_URL = "user/SET_PREVIOUS_URL";
const SET_USER = "user/SET_USER";
const SET_USER_STATUS = "user/USER_STATUS";

// 액션
export const setPreviousUrl = createAction(SET_PREVIOUS_URL);
export const setUser = createAction(SET_USER);
export const setUserStatus = createAction(SET_USER_STATUS);

const UserInitialValue = {
  currentUser: {
    id: 0,
    userName: "",
    userBirthday: new Date(),
    userEmail: "",
    userPhone: "",
    userExp: 0,
    userLevel: 0,
    userThumbnailName: "",
    userThumbnailUrl: "",
    userNickname: "",
    userProvider: "",
  },
  isLogin: false,
  previousUrl: "",
};

// 리듀서
const user = handleActions(
  {
    [SET_PREVIOUS_URL]: (state, action) => ({
      ...state,
      previousUrl: action.payload,
    }),
    [SET_USER]: (state, action) => ({ ...state, currentUser: action.payload }),
    [SET_USER_STATUS]: (state, action) => ({
      ...state,
      isLogin: action.payload,
    }),
  },
  UserInitialValue
);


export default user;
