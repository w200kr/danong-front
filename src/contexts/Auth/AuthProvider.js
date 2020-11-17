import React from "react";
import { withRouter } from "react-router-dom";

import AuthContext from './AuthContext.js';
import {Fetch} from 'utils/Fetch.js'


const AuthProvider = ({ children, history }) => {
  const prevAuth = window.localStorage.getItem('isAuthenticated') || false;
  const prevAuthUser = JSON.parse( window.localStorage.getItem('user') ) || null;

  const login = ({username, password})=>Fetch.post('/api/login/', {
    'username': username,
    'password': password,
  }).then(res=>{
    setValue({...value, authUser: res, isAuthenticated: true})
    window.localStorage['isAuthenticated'] = true;
    window.localStorage.setItem('user', JSON.stringify(res));
    history.push('/')
  });

  const logout = ()=>{
    alert('로그아웃 되었습니다.')
    setValue({...value, authUser: null, isAuthenticated: false})
    window.localStorage.clear()
  };

  const signUp = data => Fetch.post('/api/signup/', data).then(res=>history.push('/login'));

  //state초기화 객체 입니다.
  const initialState = {
    isAuthenticated: prevAuth,
    authUser: prevAuthUser,
    login,
    logout,
    signUp,
  };
  //Hook을 통한 state, setState를 정의합니다.
  const [value, setValue] = React.useState(initialState);

  // useEffect(() => {
  //   alert('ksdjlk')
  // }, [value.isAuthenticated]); // count가 바뀔 때만 effect를 재실행합니다.


  return (  
  //AuthProvider에 state를 사용할 컴포넌트들을 호출하려면
  //{children}이 있어야 합니다
  //그래서 마지막 return에서 {children}을 리턴해줍니다.
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default withRouter(AuthProvider);
