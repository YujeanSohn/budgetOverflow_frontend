import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from './PublicLayout';
import RefreshLayout from './RefreshLayout';
import AuthLayout from './AuthLayout';
import Redirect from '../pages/Redirect';
import LoginPage from '../pages/LoginPage';
import KakaoLogin from '../pages/KakaoLogin';
import GoogleLogin from '../pages/GoogleLogin';
import NaverLogin from '../pages/NaverLogin';
import PinNumberPage from '../pages/PinNumberPage';
import Home from '../pages/Home';
import SelectGoalType from '../pages/SelectGoalType';
import CreateGoalData from '../pages/CreateGoalData';
import SelectAccnt from '../pages/SelectAccnt';
import AgreementOfCollectionPersonalInfo from '../pages/AgreementOfCollectionPersonalInfo';
import CreateAccnt from '../pages/CreateAccnt';
import DetailGoal from '../pages/DetailGoal';
import LookupGoals from '../pages/LookupGoals';
import SearchGoals from '../pages/SearchGoals';
import DetailUser from '../pages/DetailUser';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/kakaologin' element={<KakaoLogin />} />
          <Route path='/naverlogin' element={<NaverLogin />} />
          <Route path='/googlelogin' element={<GoogleLogin />} />
        </Route>
        <Route element={<RefreshLayout />}>
          <Route path='/pinnumber' element={<PinNumberPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/agreement' element={<AgreementOfCollectionPersonalInfo />} />
          <Route path='/goals/post/type' element={<SelectGoalType />} />
          <Route path='/goals/post/data/:type' element={<CreateGoalData />} />
          <Route path='/goals/post/account/choose' element={<SelectAccnt />} />
          <Route path='/goals/post/account/post' element={<CreateAccnt />} />
          <Route path='/goals/:id' element={<DetailGoal />} />
          <Route path='/goals/lookup' element={<LookupGoals />} />
          <Route path='/goals/lookup/search' element={<SearchGoals />} />
          <Route path='/users/:id' element={<DetailUser />} />
        </Route>
        <Route path='/' element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
