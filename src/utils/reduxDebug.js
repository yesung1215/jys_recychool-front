// Redux 상태를 콘솔에 출력하는 유틸리티 함수
export const logReduxState = (store) => {
  console.log('=== Redux State ===');
  console.log(store.getState());
  console.log('==================');
};

// Redux 상태 구독 함수
export const subscribeToRedux = (store) => {
  return store.subscribe(() => {
    console.log('Redux State Changed:', store.getState());
  });
};

