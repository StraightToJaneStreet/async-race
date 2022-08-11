import { createAction } from '@reduxjs/toolkit';

export const createActionCreatorFactory =
  <TPrefix extends string>(PREFIX: TPrefix) =>
  <Payload, TSuffix extends string>(suffix: TSuffix) => {
    const actionType: `${TPrefix}/${TSuffix}` = `${PREFIX}/${suffix}`;
    return createAction<Payload, `${TPrefix}/${typeof suffix}`>(actionType);
  };
