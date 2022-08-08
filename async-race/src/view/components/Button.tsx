import React from 'react';

interface Props {
  handleClick: () => void;
  label: string;
  enabled?: boolean;
}

export default function Button({ label, handleClick, enabled }: Props) {
  const buttonEnabled = enabled === undefined ? true : enabled;

  return (
    <button
      className='button'
      disabled={!buttonEnabled}
      onClick={handleClick}>
        {label}
    </button>
  );
}
