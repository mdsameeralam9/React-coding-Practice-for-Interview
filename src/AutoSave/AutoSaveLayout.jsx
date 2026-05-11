import React, { useState } from 'react';

const AutoSaveLayout = () => {

  const [inputValue, setInputValue] = useState(
    localStorage.getItem('textValue') ?? ''
  );

  const handleChange = (e) => {
    const val = e.target.value;

    localStorage.setItem('textValue', val);

    setInputValue(val);
  };

  return (
    <div>
      <h1>Auto Save</h1>

      <input
        className='border'
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default AutoSaveLayout;