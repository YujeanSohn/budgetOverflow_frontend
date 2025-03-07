import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import ProgressBar from '../common/elem/ProgressBar';
import InputBox from '../common/elem/InputBox';
import ValidateMsg from '../common/elem/ValidateMsg';
import OptionSelectBox from '../common/elem/OptionSelectBox';
import TextButton from '../common/elem/TextButton';
import ModalBox from '../common/elem/ModalBox';
import BankList from '../goal/post/BankList';

import useTxtInput from '../../hooks/useTxtInput';

import { bankAPI } from '../../apis/client';

import { IBank } from '../../interfaces/interfaces';

import { accntInfo, banksInfo, selectedBankInfo } from '../../recoil/accntAtoms';

interface AccountNoInputProps {
  authNoHandler: (oriSeqNo: string) => void;
  authReqHandler: (result: boolean) => void;
}

const AccountNoInput = ({ authNoHandler, authReqHandler }: AccountNoInputProps) => {
  const savedSelectedBankInfo = useRecoilValue(selectedBankInfo);
  const savedAccntInfo = useRecoilValue(accntInfo);
  const {
    value: accntNo,
    errMsg: accntNoErr,
    onChange: changeAccntNo,
    reset: resetAccntNo,
  } = useTxtInput({
    initValue: savedAccntInfo.accntNo,
    minLength: 11,
    maxLength: 14,
    type: '계좌번호',
    regExp: /^[0-9]{0,15}$/g,
  });

  const banks = useRecoilValue(banksInfo);
  const [showBanks, setShowBanks] = useState<boolean>(false);
  const handleShowBanks = () => {
    setShowBanks(!showBanks);
  };
  const [selectedBank, setSelectedBank] = useState<IBank>(savedSelectedBankInfo);
  const handleBankSelect = (bank: IBank) => {
    setSelectedBank(bank);
    setShowBanks(false);
  };

  const [isValid, setIsValid] = useState<boolean>(false);
  const validate = () => {
    if (accntNo.length === 0 || accntNoErr.length !== 0) return setIsValid(false);
    if (selectedBank.bankId === 0) return setIsValid(false);

    setIsValid(true);
  };

  useEffect(() => {
    validate();
  }, [accntNo, selectedBank]);

  const setSelectedBankInfo = useSetRecoilState(selectedBankInfo);
  const setAccntInfo = useSetRecoilState(accntInfo);
  const [isAuthRequested, setIsAuthRequested] = useState<boolean>(false);
  const handleReqAuthAccnt = async () => {
    try {
      const { data } = await bankAPI.reqAuthAccnt({ bankCode: selectedBank.bankCode, accntNo: accntNo });
      // TEST DATA
      // const data = { successYn: 'Y', oriSeqNo: '' };
      if (data.successYn === 'N') {
        throw new Error();
      }
      authReqHandler(true);
      setIsAuthRequested(true);
      authNoHandler(data.oriSeqNo);
    } catch (e) {
      alert('인증 요청에 실패했습니다. 다시 시도해주세요');
      authReqHandler(false);
      setIsAuthRequested(false);
    } finally {
      setAccntInfo({ accntNo: accntNo, bankCode: selectedBank.bankCode });
      setSelectedBank(selectedBank);
    }
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <TopContent>
          <ProgressBar percentage={33} height={4} borderRadius={0} />
          <StateTitle>어떤 계좌를 연결할까요?</StateTitle>
        </TopContent>
        <BottomContent>
          <ContentBox>
            <SubTitle>계좌 번호</SubTitle>
            <InputWrapper>
              <InputBox
                placeholder='-를 생략한 계좌번호를 입력하세요'
                value={accntNo}
                type='text'
                isDisabled={isAuthRequested}
                onChangeHandler={changeAccntNo}
              />
            </InputWrapper>
            <ValidateMsg msg={accntNoErr} type='error' />
          </ContentBox>
          <ContentBox>
            <SubTitle>은행</SubTitle>
            <OptionSelectBox
              placeholder='은행선택'
              value={selectedBank.bankId !== 0 ? selectedBank.bankName : ''}
              onClickHandler={handleShowBanks}
            />
          </ContentBox>
        </BottomContent>
      </ContentWrapper>
      <TextButton text='계좌 인증하기' onClickHandler={handleReqAuthAccnt} isDisabled={!isValid} />
      <ModalBox show={showBanks}>
        <BankList banks={banks} closeHandler={handleShowBanks} selectHandler={handleBankSelect} />
      </ModalBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StateTitle = styled.div`
  width: 100%;
  text-align: left;
  font: ${(props) => props.theme.headingH2};
`;

const BottomContent = styled(TopContent)``;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray600};
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 30px;
`;

export default AccountNoInput;
