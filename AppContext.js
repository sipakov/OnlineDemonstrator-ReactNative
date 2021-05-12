import { createContext } from 'react';

const AppContext = createContext({
  fcmToken: {},
  seFcmToken: () => {},
});

export default AppContext;