'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        stateArr.push({ ...newState });
        break;

      case 'removeProperties':
        for (const key in newState) {
          for (const removeKey of action.keysToRemove) {
            if (key === removeKey) {
              delete newState[key];
            }
          }
        }
        stateArr.push({ ...newState });
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        stateArr.push({ ...newState });
        break;
    }
  }

  return stateArr;
}

module.exports = transformStateWithClones;
