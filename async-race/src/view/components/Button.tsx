import React from 'react';

interface Props {
  handleClick: () => void;
  label: string;
  enabled?: boolean;
  small?: boolean;
}

export default function Button({ label, handleClick, enabled, small }: Props) {
  const buttonEnabled = enabled === undefined ? true : enabled;

  return (
    <button
      className={`button${small === true ? ' button--small' : ''}`}
      disabled={!buttonEnabled}
      onClick={handleClick}>
        {label}
    </button>
  );
}
