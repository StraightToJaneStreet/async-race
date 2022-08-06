import React from 'react';

interface Props {
  handleClick: () => void,
  label: string
}

export default function Button({ label, handleClick }: Props) {
  return (
    <button
      className='button'
      onClick={handleClick}>
        {label}
    </button>
  );
}
