import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
  position: relative; /* Add relative positioning for text overlay */
`;

const ProgressFill = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  background-color: #4caf50;
  height: 20px;
  transition: width 0.3s ease-in-out;
`;

const ProgressText = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: white;
  pointer-events: none; /* Prevent text from interfering with clicks */
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

  const isSpeakerTime = progress <= 60;
  const isQATime = progress > 60 && progress < 100;
  const isOvertime = progress >= 100;

  useEffect(() => {
    // Reset progress when currentName changes
    setProgress(0);

    // Increment progress over time
    if (currentName !== '') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return prev;
          }
          return prev + .033; // Increment by .05 every 100ms
          //return prev + 1; // for testing
        });
      }, 100); // Adjust the interval duration (100 ms)

      return () => {
        clearInterval(interval);
      };
    }
  }, [currentName]);

  return (
    <div>
    {isSpeakerTime && (
      <h1>{currentName} only</h1>
    )}
    {isQATime && (
      <h1>Ask {currentName} Questions</h1>
    )}
    {isOvertime && (
      <h1>We need to spin!</h1>
    )}

    <ProgressContainer>
      <ProgressFill width={progress} />
      <ProgressText>{Math.round(progress)}%</ProgressText>
    </ProgressContainer>
    {/* <button onClick={incrementProgress}>Increment Progress</button> */}
    </div>
  );
};
