import React, { createContext, useState, ReactNode,  Dispatch, SetStateAction } from 'react';



interface AuthContextType {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;

}

const defaultValue: AuthContextType = {
  isAuth: false,
  setIsAuth: () => {},
  isLoading: false,
  setLoading: () => {},

};

export const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(false);


  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading, setLoading}}>
      {children}
    </AuthContext.Provider>
  );
};
