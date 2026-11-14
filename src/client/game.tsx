import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

export const Game = () => {
  const [currentWord, setCurrentWord] = useState('reddit');
  const [inputWord, setInputWord] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Type a word starting with "t"!');
  const [history, setHistory] = useState<string[]>(['reddit']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputWord.trim().toLowerCase();

    if (trimmed.length < 2) {
      setMessage('Word must be at least 2 letters long.');
      return;
    }

    const requiredLetter = currentWord.slice(-1);
    if (!trimmed.startsWith(requiredLetter)) {
      setMessage(`Word must start with "${requiredLetter.toUpperCase()}"!`);
      return;
    }

    if (history.includes(trimmed)) {
      setMessage('That word has already been used!');
      return;
    }

    setCurrentWord(trimmed);
    setHistory([...history, trimmed]);
    setScore(prev => prev + 1);
    setInputWord('');
    setMessage(`Great job! Next word starts with "${trimmed.slice(-1).toUpperCase()}".`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h2>REDDIT</h2>
      <p>Score: {score}</p>
      <p>Current Word: <strong>{currentWord}</strong></p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          placeholder={`Starts with ${currentWord.slice(-1).toUpperCase()}...`}
        />
        <button type="submit" style={{ marginLeft: '8px' }}>Submit Word</button>
      </form>
      <p style={{ marginTop: '15px', color: '#555' }}>{message}</p>

      <div style={{ marginTop: '20px' }}>
        <h4>Word History</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {history.map((word, index) => (
            <li key={index} style={{ padding: '2px 0' }}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
ReactDOM.createRoot(document.getElementById('root')!).render(<Game />);