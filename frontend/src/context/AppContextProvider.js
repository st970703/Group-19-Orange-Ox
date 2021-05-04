import React from 'react';
import useGet from '../hooks/useGet';
import axios from 'axios';

const AppContext = React.createContext({
  canvases: [],
  friends: []
});

function AppContextProvider({children}) {
  const {
    data: user,
    isLoading: userLoading,
    update: updateUser,
    deleteItem: deleteUser,
    create: createUser
  } = useGet('/api/users', []);
}