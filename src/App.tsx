import React, { useState } from 'react';

const App: React.FC = () => {
  const [name, setName] = useState('Link');
  const [age, setAge] = useState<string | number>(17);

  const changeName = (newName: string) => {
    setName(newName);
  };

  const changeAge = (newAge: number) => {
    setAge(newAge);
  };

  return (
    <div className="app">
      <p>{name} - {age}</p>
      <button onClick={() => changeName('Zelda')}>Change Name</button>
      <button onClick={() => changeAge(18)}>Change Age</button>
    </div>
  );
};

export default App;
