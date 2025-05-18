import React, { createContext, useState, useEffect } from 'react';

export const ProfilePicContext = createContext();

export const ProfilePicProvider = ({ children }) => {
  const [profilePic, setProfilePic] = useState('/assets/nopfp.jpg');

  useEffect(() => {
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) {
      setProfilePic(savedPic);
    }
  }, []);

  const updateProfilePic = (newPic) => {
    localStorage.setItem('profilePic', newPic);
    setProfilePic(newPic);
  };

  return (
    <ProfilePicContext.Provider value={{ profilePic, updateProfilePic }}>
      {children}
    </ProfilePicContext.Provider>
  );
};
