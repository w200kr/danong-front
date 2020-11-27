import React from "react";
import { withRouter } from "react-router-dom";

import AuthContext from './AuthContext.js';
import {Fetch} from 'utils/Fetch.js'

const copyObject = obj=>({...obj, ...JSON.parse(JSON.stringify(obj))})
const AuthProvider = ({ children, history }) => {

  const [prevAuthUser, setPrevAuthUser] = React.useState(JSON.parse( window.localStorage.getItem('user') ) || {})

  const homeRedirect = ()=>history.push('/')
  const saveUserInfo = res=>{
    // const newAuthUser = {...copyObject(value.prevAuthUser), ...copyObject(res)}
    const newAuthUser = {...prevAuthUser, ...res}
    setPrevAuthUser(newAuthUser)
    // setValue({...copyObject(value), authUser: newAuthUser, isAuthenticated: 'token' in newAuthUser})
  }
  const login = ({username, password})=>Fetch.post('/api/login/', {
    'username': username,
    'password': password,
  }).then(saveUserInfo).then(homeRedirect);

  const kakaoLogin = ({response, profile})=>{
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
    setValue({...initialState, authUser: {}, isAuthenticated: false})
    window.localStorage.clear()
    history.push('/')
  };
  const signUp = data => Fetch.post('/api/signup/', data).then(res=>history.push('/login'));

  //state초기화 객체 입니다.
  const initialState = {
    saveUserInfo,
    login,
    kakaoLogin,
    logout,
    signUp,
    authUser: prevAuthUser,
    isAuthenticated: 'token' in prevAuthUser,
  };
  //Hook을 통한 state, setState를 정의합니다.
  const [value, setValue] = React.useState(initialState);

  // React.useEffect(() => {
  //   console.log('reload')
  //   setPrevAuthUser( JSON.parse( window.localStorage.getItem('user') ) || {} )
  // });

  React.useEffect(() => {
    console.log('prevAuthUser change')
    if (Object.keys(prevAuthUser).length>0){
      console.log('prevAuthUser not null')
      console.log(prevAuthUser)
      setValue({
        ...initialState,
        authUser: prevAuthUser,
        isAuthenticated: 'token' in prevAuthUser,
      })
    }
  }, [prevAuthUser]);

  React.useEffect(() => {
    console.log('value change')
    window.localStorage.clear()
    window.localStorage['isAuthenticated'] = 'token' in value.authUser;
    window.localStorage.setItem('user', JSON.stringify(value.authUser));
  }, [value.authUser]);

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
