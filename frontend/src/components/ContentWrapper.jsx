import React, { useState, useEffect } from 'react';
import Chat from './Chat/Chat';
import ImageDisplay from './ImageDisplay/ImageDisplay';
import Feedback from './Feedback/Feedback';

const ContentWrapper = ({ user }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [saveData, setSaveData] = useState({ prompt: '', imageUrl: '', title: '', user_id: 0 });
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [isPromptUpdated, setIsPromptUpdated] = useState(false);

  useEffect(() => {
    if (isImageUpdated && isPromptUpdated) {
      fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
      }).then((res) => res.json())
        .then((res2) => console.log(res2))
        .catch(err => console.error(err))

      setIsImageUpdated(false);
      setIsPromptUpdated(false);
    }
  }, [isImageUpdated, isPromptUpdated, saveData]);

  const handleInputSubmitted = (e) => {
    setSaveData((prevState) => ({ ...prevState, title: e }));
  }

  const handlePromptReceived = (e) => {
    setPrompt(e);
    setSaveData((prevState) => ({ ...prevState, prompt: e }));
    setIsPromptUpdated(true);
  };

  const handleImageReceived = async (e) => {
    setImageUrl(e);
    setSaveData((prevState) => ({ ...prevState, imageUrl: e }));
    setIsImageUpdated(true);
  };

  useEffect(() => {
    const id = (user && user.isAnonymous) ? `guest_${user.uid}` : user ? user.uid : 0;
    setSaveData((prevState) => ({ ...prevState, user_id: id }));
  }, [user]);

  return (
    <>
      <Chat
        handleInputSubmitted={handleInputSubmitted}
        handlePromptReceived={handlePromptReceived}
        handleImageReceived={handleImageReceived}
      />
      <ImageDisplay imageUrl={imageUrl} />
      <Feedback text={prompt} />
    </>
  );
};

export default ContentWrapper;
