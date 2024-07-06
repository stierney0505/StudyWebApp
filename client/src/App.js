import { useState } from 'react';
import './App.css'
import InputButton from './components/button/button';
import TextField from './components/text field/textfield';

function App() {

  const [text, setText] = useState('');

  return (
   <div>
      <InputButton text="Input Button"/><br></br><br></br>
      <TextField type="text" onChange={setText} value={text} text='Username' /><br></br><br></br>
      <p>{text}</p>

   </div>
  );
}

export default App;
