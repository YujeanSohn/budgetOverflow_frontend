import React from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { goalApi } from '../../../../apis/client';

// TODO : 공통 버튼 컴포넌트 리팩터링
const GroupGoalWithDrawButton = () => {
  const param = useParams();

  const { mutate } = useMutation('withDrawGoal', () => goalApi.withdrawGoal(param.id));

  const handleWithdrawGoalButton = () => {
    mutate();
  };

  return <WithdrawButton onClick={() => handleWithdrawGoalButton()}>그만하기</WithdrawButton>;
};

const WithdrawButton = styled.button`
  max-width: 370px;
  width: 100%;
  height: 51px;
  border-radius: 8px;
  padding: 12px 16.5px;
`;

export default GroupGoalWithDrawButton;
