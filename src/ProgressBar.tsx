import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
`;

const ProgressFill = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  background-color: #4caf50;
  height: 20px;
  transition: width 0.3s ease-in-out;
`;

interface ProgressBarProps {
  currentName: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  currentName,
}) => {
  const [progress, setProgress] = useState(0);

  const incrementProgress = () => {
    setProgress((prev) => Math.min(prev + 10, 100)); // Increment by 10%, max 100%
  };

  useEffect(() => {
    setProgress(0);
  }, [currentName]);

  return (
    <div>
    <h1>{currentName}</h1>
    <ProgressContainer>
      <ProgressFill width={progress} />
    </ProgressContainer>
    <button onClick={incrementProgress}>Increment Progress</button>
    </div>
  );
};
