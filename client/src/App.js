import React, { useState, useEffect } from 'react';
import axios from 'axios';

const stages = ['brainstorm', 'outline', 'draft', 'revision'];

export default function App() {
  const [userId] = useState('student1');
  const [stageIndex, setStageIndex] = useState(0);
  const [content, setContent] = useState('');
  const [reflection, setReflection] = useState('');
  const [log, setLog] = useState({});

  const currentStage = stages[stageIndex];

  useEffect(() => {
    axios.get('http://localhost:4000/api/essay/' + userId)
      .then(res => setLog(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  const handleSubmit = () => {
    axios.post(`http://localhost:4000/api/essay/${userId}/${currentStage}`, {
      content,
      reflection,
    })
    .then(() => alert('Saved'))
    .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Essay Stage: {currentStage}</h2>
      <textarea
        rows={10}
        cols={60}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your essay content here..."
      /><br/>
      <textarea
        rows={4}
        cols={60}
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Reflection: What did you struggle with? Did you use AI?"
      /><br/>
      <button onClick={handleSubmit}>Submit Stage</button>
      <button onClick={() => setStageIndex(Math.min(stageIndex + 1, stages.length - 1))}>Next Stage</button>
      <h3>Progress Log:</h3>
      <pre>{JSON.stringify(log, null, 2)}</pre>
    </div>
  );
}
