import React, { useState } from 'react';

const Character = ({ client, clientIndex}) => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

  return (
    <div>
      <h2>{client}</h2>
      {show ? <p>{clientIndex}</p> : null}
      <button onClick={toggle}>{show ? 'hide' : 'show'}</button>
    </div>
  );
};

export default Character;
