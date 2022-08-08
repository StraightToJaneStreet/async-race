import { createAction } from "@reduxjs/toolkit";

const PREFIX = 'createCarState';
type TPrefix = `${typeof PREFIX}`;

const wrappedCreateAction = <Payload, TSuffix extends string>(suffix: TSuffix) => {
  const actionType: `${TPrefix}/${TSuffix}` = `${PREFIX}/${suffix}`;
  return createAction<Payload, `${TPrefix}/${typeof suffix}`>(actionType);
}

const actionSetName = wrappedCreateAction<string, 'setColor'>('setColor');
const actionSetColor = wrappedCreateAction<string, 'setName'>('setName');
