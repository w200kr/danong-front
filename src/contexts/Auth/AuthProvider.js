import React from "react";
import { withRouter } from "react-router-dom";

import AuthContext from './AuthContext.js';
import {Fetch} from 'utils/Fetch.js'


const copyObject = obj=>({...obj, ...JSON.parse(JSON.stringify(obj))})
const AuthProvider = ({ children, history }) => {
  const prevAuth = window.localStorage.getItem('isAuthenticated') || false;
  const prevAuthUser = JSON.parse( window.localStorage.getItem('user') ) || null;
  // if(prevAuthUser){
  //   console.log(prevAuthUser.token)
  // }

  const homeRedirect = ()=>history.push('/')
  const saveUserInfo = res=>{
    const newAuthUser = {...copyObject(value.authUser), ...copyObject(res)}
    // console.log('=================')
    // console.log(res.token)
    // console.log(value.authUser.token)
    // console.log(prevAuthUser.token)
    // console.log(newAuthUser.token)
    // console.log('=================')
    // console.log(value)
    // console.log(copyObject(value))
    setValue({...copyObject(value), authUser:newAuthUser})
    // setValue({...value, authUser: newAuthUser, isAuthenticated: true})
    window.localStorage.clear()
    window.localStorage['isAuthenticated'] = true;
    window.localStorage.setItem('user', JSON.stringify(newAuthUser));
  }

  const login = ({username, password})=>Fetch.post('/api/login/', {
    'username': username,
    'password': password,
  }).then(saveUserInfo).then(homeRedirect);

  const kakaoLogin = ({response, profile})=>{
    // console.log(profile)

    const data = {
      kakao_id: profile.id,
      email: profile.properties?.email,
      name: profile.properties?.nickname,
      // tel
    }

    Fetch.post('/api/login/kakao/', data).then(saveUserInfo).then(homeRedirect);
  }
  const logout = ()=>{
    alert('로그아웃 되었습니다.')
    setValue({...value, authUser: null, isAuthenticated: false})
    window.localStorage.clear()
    history.push('/')
  };

  const signUp = data => Fetch.post('/api/signup/', data).then(res=>history.push('/login'));

  //state초기화 객체 입니다.
  const initialState = {
    isAuthenticated: prevAuth,
    authUser: prevAuthUser,
    saveUserInfo,
    login,
    kakaoLogin,
    logout,
    signUp,
  };
  //Hook을 통한 state, setState를 정의합니다.
  const [value, setValue] = React.useState(initialState);
  React.useEffect(() => {
    // console.log('============STATE CHANGE========')
    // console.log(value)
    // console.log('================================')
  }, [value]); // count가 바뀔 때만 effect를 재실행합니다.

  // React.useEffect(() => {
  //   console.log('=============')
  //   console.log(value.authUser)
  //   console.log('=============')
  // }, [value.authUser]); // count가 바뀔 때만 effect를 재실행합니다.


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
