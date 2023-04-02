import React, { useEffect, useState } from 'react';
import './Feed.css'

const FeedPage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/feed');
      const basicData = await response.json();

      const userGenerationsPromises = basicData.map(async (entry) => {
        const userResponse = await fetch(`/api/user/${entry.user}/generations/${entry.id}`);
        const userData = await userResponse.json();
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/imagegen-36210.appspot.com/o/images%2F${entry.id}.jpg?alt=media`
        return { ...entry, ...userData, imageUrl };
      });

      const completeData = await Promise.all(userGenerationsPromises);
      setEntries(completeData);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Feed</h1>
      <div className="columns is-multiline">
        {entries.map((entry) => (
          <div key={entry.id} className="column is-one-third">
            <div className="card">
              <header className="card-header">
                <h2 className="card-header-title custom-header-title">
                  {entry.title}
                </h2>
              </header>
              <div className="card-image">
                <figure className="image">
                  <img src={entry.imageUrl} alt={entry.title} />
                </figure>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;


