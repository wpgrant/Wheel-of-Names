import styled from 'styled-components';

import { Participants } from './Participants';
//import { Question } from './Question';
import { ProgressBar } from './ProgressBar';
import { Wheel } from './Wheel';

import './App.css';
import { useState } from 'react';
import { Header } from './Header';

const Main = styled.main`
  display: flex;
  justify-content: space-around;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const MAX_PARTICIPANTS = 18;

function App() {
  const [names, setNames] = useState<string[]>(['Adam','Barbara','Charlie']);
  const [currentName, setCurrentName] = useState<string>('');
  const [showParticipants, setShowParticipants] = useState<boolean>(false);

  const handleAddName = (name: string) => {
    if (names.length < MAX_PARTICIPANTS) {
      setNames([...names, name]);
    }
  };

  const handleRemoveName = (index: number) => {
    setNames(names.filter((_, i) => i !== index));
  };

  const shuffleNames = () => {
    const shuffledNames = [...names].sort(() => Math.random() - 0.5);
    setNames(shuffledNames);
  };

  const sortNames = () => {
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    setNames(sortedNames);
  };

  const handleCurrentName = (name: string) => {
    setCurrentName(name);
  };

  const removeParticipant = (name: string) => {
    setNames(names.filter((participant) => participant !== name));
  };

  return (
    <>
      <Header />
      {/* <Question />*/}
      <button onClick={() => setShowParticipants((prev) => !prev)}>
        {showParticipants ? 'Close' : 'Setup'}
      </button>
      <ProgressBar 
        currentName={currentName}
      />
      <Main>
      {showParticipants && (<Participants
          handleAddName={handleAddName}
          handleRemoveName={handleRemoveName}
          shuffleNames={shuffleNames}
          sortNames={sortNames}
          names={names}
        />
      )}
        <Wheel
          participants={names}
          handleCurrentName={handleCurrentName} 
          removeParticipant={removeParticipant}
        />
      </Main>
    </>
  );
}

export default App;
