import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import styled from 'styled-components';

const MeetingOnTimeText = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
`;

interface MeetingOnTimeProps {
  names: string[];
}

export const MeetingOnTime: FC<MeetingOnTimeProps> = ({
  names
}) => {

  const [isMeetingOnTime, setIsMeetingOnTime] = useState(true);

  const calculateMeetingStatus = () => {
    const remainingMinutes = 60 - new Date().getMinutes();
    const requiredMinutes = names.length * 5;
    return requiredMinutes < remainingMinutes;
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsMeetingOnTime(calculateMeetingStatus());
    }, 10000);
    setIsMeetingOnTime(calculateMeetingStatus());
    return () => clearInterval(interval);
  }, [names]);

  return (
    <MeetingOnTimeText>
      {isMeetingOnTime ? (
        <h1>Meeting is on time</h1>
      ) : (
        <h1 style={{ color: 'red' }}>Meeting is running late</h1>
      )}
    </MeetingOnTimeText>
  )
};
