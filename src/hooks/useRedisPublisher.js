import { createClient } from 'redis';
import { useState, useEffect } from 'react';

const useRedisPublisher = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const initializeClient = async () => {
      const redisUrl = import.meta.env.VITE_REDIS_URL;
      const redisClient = createClient({ url: redisUrl });

      redisClient.on('error', (err) => console.error('Quang - Redis Client Error', err));

      await redisClient.connect();
      setClient(redisClient);
    };

    initializeClient().then(() => console.log('Quang - Redis client connected'));

    // Cleanup on unmount
    return () => {
      if (client) {
        client.quit();
      }
    };
  }, []);

  /**
   * Publishes a message to a Redis channel to create a new user
   * @param userId : string - User ID from google auth
   * @param userHouse : string - House name from user input
   * @returns {Promise<void>}
   */
  const publishToChannel = async (userId, userHouse) => {
    if (!client) {
      console.error('Quang - Redis client is not ready');
      return;
    }

    try {
      const channel = 'create-new-user';
      const message = {
        userId,
        timestamp: new Date().toISOString(),
        house: userHouse
      }
      await client.publish(channel, JSON.stringify(message));
      console.log(`Quang - Message published to channel ${channel}:`, message);
    } catch (error) {
      console.error('Quang - Error publishing to Redis channel:', error);
    }
  };

  return publishToChannel;
};

export default useRedisPublisher;

// Example usage
// const publishToChannel = useRedisPublisher();
// const [userId, setUserId] = useState('');        // Get this from google auth
// const [userHouse, setUserHouse] = useState('');  // Get this from user input
//
// const handlePublish = () => {
//   if (!userId || !userHouse) {
//     alert('Please provide both User ID and House');
//     return;
//   }
//   publishToChannel(userId, userHouse);
//   setUserId('');
//   setUserHouse('');
// };