
import { useEffect, useState } from 'react';

type UserType = {
  id: number;
  name: string;
  email: string;
};

type UserProps = {
  userId: number;
};

function App() {
  const [userCounter, setUserCounter] = useState(1);

  return (
    <div>
      <button onClick={() => setUserCounter((prev) => prev + 1)}>
        Fetch new User: {userCounter}
      </button>

      <User userId={userCounter} />
    </div>
  );
}

export default App;

// Artificial delay of 3 seconds
const delay = () =>
  new Promise<void>((resolve) => {
    console.log('1. Delay started: 3 seconds');

    setTimeout(() => {
      console.log('3. Delay completed');
      resolve();
    }, 3000);
  });

function User({ userId }: UserProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    console.log('Effect started for user:', userId);

    // Abort after 2 seconds
    const timeoutId = setTimeout(() => {
      console.log('2. Timeout reached: aborting after 2 seconds');
      controller.abort();
    }, 2000);

    const fetchUser = async () => {
      setLoading(true);
      setError(false);
      setUser(null);

      try {
        // This delay is NOT cancelled by controller.abort()
        await delay();

        console.log(
          '4. Starting fetch. Signal aborted:',
          controller.signal.aborted
        );

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const data: UserType = await response.json();

        setUser(data);
      } catch (err) {
        console.error('5. Request error:', err);

        if (err instanceof Error && err.name === 'AbortError') {
          setError(true);
        } else {
          setError(true);
        }
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
        console.log('6. Finally executed');
      }
    };

    fetchUser();

    return () => {
      console.log('Cleanup for user:', userId);
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [userId]);

  if (loading) return <h2>Loading...</h2>;

  if (error) {
    return <h2>Something went wrong or request was aborted.</h2>;
  }

  return (
    <div>
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
}
