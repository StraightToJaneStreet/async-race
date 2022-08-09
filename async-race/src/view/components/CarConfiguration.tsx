import React from 'react';

interface CarConfigurationProps {
  updateColor: (newColor: string) => void;
  updateName: (newName: string) => void;
  color: string;
  name: string;
}

export default function CarConfiguration({ updateColor, updateName, color, name }: CarConfigurationProps) {
  return (
    <>
      <input 
        type="text"
        className="configurator__name"
        onChange={(e) => updateName(e.target.value)}
        value={name}/>
      <input
        className="configurator__color"
        type="color"
        onChange={(e) => updateColor(e.target.value)}
        value={color}/>
    </>
  );
}
