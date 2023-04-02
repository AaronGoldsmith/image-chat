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
        return { ...entry, ...userData };
      });

      const completeData = await Promise.all(userGenerationsPromises);
      setEntries(completeData);
    };

    fetchData();
  }, []);

  return (
    <div className="Feed">
      <h1>Feed</h1>
      <div>
        {entries.map((entry) => (
          <div key={entry.id} className="feed-item">
            <h2>{entry.title}</h2>
            <img src={entry.image} alt={entry.title} />
            <p>{entry.prompt}</p>
            <datetime>{entry.datetime}</datetime>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
