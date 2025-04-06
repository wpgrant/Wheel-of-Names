import { FC } from 'react';
import styled from 'styled-components';
import logo from './img/splunk-logo.png';

const HeaderContainer = styled.header`
  background-color:rgb(196, 22, 123);
  min-height: 8vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: black;
`;


export const Header: FC = () => (
  <HeaderContainer>
    <h1><img src={logo} height={'35px'} /> Specialist Standup Spinner</h1>
  </HeaderContainer>
);
