import React, { createContext, useState } from 'react';
import { Home } from './pages/Home';
import NewRoom from './pages/NewRoom';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './services/firebase';
import { auth, firebase } from './services/firebase';

type UserType = {
  name: string;
  id: string;
  avatar: string;
}

type AuthContextType = {
  user: UserType | undefined;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);



function App() {
  const [user, setUser] = useState<UserType>();

  async function signInWithGoogle() {
    const provider =  new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        name: displayName,
        avatar: photoURL,
        id: uid,
      })
    }

  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
