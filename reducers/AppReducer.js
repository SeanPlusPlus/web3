import { log } from '../utils/logger'

export default (state, action) => {

  const d = new Date();
  log('→', 'rgb(229, 231, 235)', d.toLocaleTimeString());
  log('action', 'rgb(251, 189, 35)', action);

  switch (action.type) {
    case 'UPDATE_MODAL':
      return {
        ...state,
        modal: action.payload,
      }
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        account: action.payload,
      }
    case 'UPDATE_NETWORK_VERSION':
      return {
        ...state,
        networkVersion: action.payload,
      }
    default:
      return state;
  }
}