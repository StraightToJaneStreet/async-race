import React from 'react';

interface CarConfigurationProps {
  updateColor: (newColor: string) => void;
  updateName: (newName: string) => void;
  enabled?: boolean;
  color: string;
  name: string;
}

export default function CarConfiguration({ updateColor, updateName, color, name, enabled }: CarConfigurationProps) {
  const isEnabled = enabled === undefined ? true : enabled;

  return (
    <>
      <input
        type="text"
        className="configurator__name"
        onChange={(e) => updateName(e.target.value)}
        disabled={!isEnabled}
        value={name}
      />
      <input
        className="configurator__color"
        type="color"
        disabled={!isEnabled}
        onChange={(e) => updateColor(e.target.value)}
        value={color}
      />
    </>
  );
}
