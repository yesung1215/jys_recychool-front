import React from 'react';
import { useSelector } from 'react-redux';

const ReduxDebugger = () => {
  const userState = useSelector((state) => state.user);

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: '#f0f0f0',
      padding: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      maxWidth: '300px',
      fontSize: '12px',
      zIndex: 9999,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Redux 상태</h3>
      <div style={{ marginBottom: '10px' }}>
        <strong>로그인 상태:</strong> {userState.isLogin ? '✅ 로그인됨' : '❌ 로그아웃'}
      </div>
      <div>
        <strong>사용자 정보:</strong>
        <pre style={{
          background: '#fff',
          padding: '8px',
          borderRadius: '3px',
          overflow: 'auto',
          maxHeight: '200px',
          fontSize: '11px',
          marginTop: '5px'
        }}>
          {JSON.stringify(userState.currentUser, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ReduxDebugger;

