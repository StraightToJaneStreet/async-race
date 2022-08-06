import React from 'react';

interface CarConfigurationProps {
  updateColor: (newColor: string) => void;
  updateName: (newName: string) => void;
}

export default function CarConfiguration(_props: CarConfigurationProps) {
  return (
    <>
      <input type="text" />
      <input type="color" />
    </>
  );
}
