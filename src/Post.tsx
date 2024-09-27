import { useState } from "react";

export default function Post({handleChange}: {handleChange: Function;}){
  const [inputValue, setInputValue] = useState('');
  const changeAction = () => {
    handleChange(inputValue);
    setInputValue('');
  };
  
  return(
  <>
    <label>Type a URL</label>
    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
    <button onClick={() => {changeAction()}}>Chnage URL</button>
  </>
  );
}