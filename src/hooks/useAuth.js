// src/hooks/useAuth.js (VERIFIQUE A IMPORTAÇÃO)

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js'; // <-- Verifique se está importando de AuthContext.js

export const useAuth = () => {
  return useContext(AuthContext);
};