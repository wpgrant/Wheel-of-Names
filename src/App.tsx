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
  const [names, setNames] = useState<string[]>(['Name1', 'Name2', 'Name3']);
  const [currentName, setCurrentName] = useState<string>('');
  const [showParticipants, setShowParticipants] = useState<boolean>(false);
  const [mode, setMode] = useState<'spinner' | 'list'>('spinner'); // Default to spinner mode
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Track the current index for list mode

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

  const handleNext = () => {
    if (names.length > 0) {
      const nextName = names[0]; // Get the first name in the list
      setCurrentName(nextName); // Set it as the current name
      setNames((prevNames) => prevNames.slice(1)); // Remove it from the list
    }
  };

  return (
    <>
      <Header />
      <button onClick={() => setShowParticipants((prev) => !prev)}>
        {showParticipants ? 'Close' : 'Setup'}
      </button>
      <div>
        <button onClick={() => setMode('spinner')}>Spinner Mode</button>
        <button onClick={() => setMode('list')}>List Mode</button>
      </div>
      <ProgressBar currentName={currentName} />
      <Main>
        {showParticipants && (
          <Participants
            handleAddName={handleAddName}
            handleRemoveName={handleRemoveName}
            shuffleNames={shuffleNames}
            sortNames={sortNames}
            names={names}
          />
        )}
        {mode === 'spinner' ? (
          <Wheel
            participants={names}
            handleCurrentName={handleCurrentName}
            removeParticipant={removeParticipant}
          />
        ) : (
          <div>
            <h2>List Mode</h2>
            <h3>Current Participant: {currentName || 'None'}</h3>
            <button
              onClick={handleNext}
              disabled={names.length === 0}
            >
              Next
            </button>
            <ul>
              {names.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </Main>
    </>
  );
}

export default App;
