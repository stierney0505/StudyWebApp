import { useState } from 'react';
import './App.css'
import InputButton from './components/button/button';
import TextField from './components/text field/textfield';
import TextArea from './components/text area/textarea';
import DropDown from './components/drop down/dropdown';

function App() {

  const [text, setText] = useState('');
  const [area, setArea] = useState('');
  const options = [{value: 'learner', text: 'Learner'}, {value: 'instructor', text: 'Instructor'}, {value: 'Publisher', text: 'Publisher'}]
  
  return (
   <div>
      <InputButton text="Input Button"/><br></br><br></br>
      <TextField type="text" onChange={setText} value={text} text='Username' />
      <p>{text}</p>
      <TextArea type="text" onChange={setArea} value={area} text='Biography' />
      <p>{area}</p>
      <DropDown hint="Select Role" options={options} text="Choose Car" />
   </div>
  );
}

export default App;
