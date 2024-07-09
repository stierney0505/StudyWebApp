import { useState } from 'react';
import './App.css'
import InputButton from './components/button/button';
import TextField from './components/text-field/text-field';
import TextArea from './components/text area/textarea';
import DropDown from './components/drop down/drop-down';
import RadioButton from './components/radio button/radio-button';
import CheckBoxes from './components/check boxes/check-boxes';
import { STxt, MTxt, LTxt } from './components/text/text';
import Header from './components/header/header';
import Container from './components/container/container';
import Link from './components/links/link';

function App() {

  const [text, setText] = useState('');
  const [area, setArea] = useState('');
  const options = [{value: 'learner', text: 'Learner'}, {value: 'instructor', text: 'Instructor'}, {value: 'Publisher', text: 'Publisher'}]
  const radioOptions = [{value: 'Yes', checked: true}, {value: 'No', checked: false}, {value: 'Maybe', checked: false}]
  const checkboxOptions = [{value: "Pizza", checked: true}, {value: 'Tacos', checked: true}, {value: 'Burger', checked: false}]

  return (
      <Container>
        <Header />
        <div className='content'>
          <InputButton text="Input Button" /><br></br><br></br>
          <TextField type="text" onChange={setText} value={text} text='Username' />
          <p>{text}</p>
          <TextArea type="text" onChange={setArea} value={area} text='Biography' />
          <p>{area}</p>
          <DropDown hint="Select Role" options={options} text="Choose Car" /><br /><br />
          <RadioButton options={radioOptions} /><br />
          <CheckBoxes options={checkboxOptions} /><br />
          <STxt>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nisi explicabo ab exercitationem quidem, porro architecto ducimus tempora cum adipisci sunt eaque assumenda officia facilis repellendus, modi deserunt, dolor at?</STxt>
          <MTxt>Medium Text</MTxt><br />
          <LTxt>Large Text</LTxt><br />
          <Link href="/" underline={true} >Link to URL</Link><br /><br />
        </div>
      </Container>

  );
}

export default App;
