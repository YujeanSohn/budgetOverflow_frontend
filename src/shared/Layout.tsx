import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import Header from './Header';
import Navigation from './Navigation';

import { userAPI } from '../apis/client';
import { userInfo } from '../recoil/atoms';
import { useSetRecoilState } from 'recoil';
import { setCookie } from '../utils/cookie';

export interface IChildrenProps {
  children: React.ReactNode;
}

export interface IResponeType {
  response: string | undefined;
}

function Layout({ children }: IChildrenProps) {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/kakaologin') {
    const code = new URL(window.location.href).searchParams.get('code');
    try {
      const { data } = useQuery('kakaoLogin', () => userAPI.getKakaoSignup(code));
      console.log(code);

      localStorage.setItem('accesstoken', data.data.accesstoken);
      localStorage.setItem('refreshtoken', data.data.refreshtoken);

      // TODO: data 형식 확인후 적용
      const setUserInfo = useSetRecoilState(userInfo);
      setUserInfo({ id: 0, isLogin: true });

      navigate('/pinnumber');
    } catch (error) {
      console.log(error);
    }
  }

  if (location.pathname === '/googlelogin') {
    const code = new URL(window.location.href).searchParams.get('code');
    try {
      const { data } = useQuery('googleLogin', () => userAPI.getGoogleSignup(code));

      console.log(data);

      localStorage.setItem('accesstoken', data.data.accesstoken);
      localStorage.setItem('refreshtoken', data.data.refreshtoken);

      // TODO: data 형식 확인후 적용
      const setUserInfo = useSetRecoilState(userInfo);
      setUserInfo({ id: 0, isLogin: true });

      navigate('/pinnumber');
    } catch (error) {
      console.log(error);
    }
  }

  if (location.pathname === '/naverlogin') {
    // const code = new URL(window.location.href).searchParams.get('code');
    try {
      const response = userAPI.getNaverSignup();

      console.log(response);
      // setCookie('accessToken', response.data)
      // const response = useQuery('googleLogin', () => userAPI.getNaverSignup(code));
      // console.log(response);

      // localStorage.setItem('accesstoken', data.data.accesstoken);
      // localStorage.setItem('refreshtoken', data.data.refreshtoken);

      // TODO: data 형식 확인후 적용
      // const setUserInfo = useSetRecoilState(userInfo);
      // setUserInfo({ id: 0, isLogin: true });

      // navigate('/pinnumber');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header />
      <div>{children}</div>
      <Navigation />
    </div>
  );
}

export default Layout;
