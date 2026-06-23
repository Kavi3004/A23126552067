import { useState, useEffect } from 'react';
import Log from './middleware/logger.jsx';
import { fetchNotifications, getTopN } from './services/notificationService.js';
import NotificationCard from './components/NotificationCard.jsx';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topN, setTopN] = useState(10);

  useEffect(() => {
    Log("frontend", "info", "page", "App component mounted");

    const loadNotifications = async () => {
      try {
        Log("frontend", "info", "page", "Loading notifications");
        const data = await fetchNotifications();
        setNotifications(data);
        setLoading(false);
        Log("frontend", "info", "state", "Notifications state updated successfully");
      } catch (err) {
        Log("frontend", "error", "page", `Failed to load notifications: ${err.message}`);
        setError(err.message);
        setLoading(false);
      }
    };

    void loadNotifications();
  }, []);

  const handleTopNChange = (e) => {
    const value = Number(e.target.value);
    Log("frontend", "info", "component", `User changed top N to ${value}`);
    setTopN(value);
  };

  const prioritized = getTopN(notifications, topN);

  if (loading) {
    Log("frontend", "info", "page", "Rendering loading state");
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</h2>;
  }

  if (error) {
    Log("frontend", "error", "page", `Rendering error state: ${error}`);
    return <h2 style={{ color: 'red', textAlign: 'center' }}>Error: {error}</h2>;
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1>📬 Priority Inbox</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>Show top: </label>
        <select value={topN} onChange={handleTopNChange}
          style={{ padding: '4px 8px', marginLeft: '8px' }}>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      <p>Showing <strong>{prioritized.length}</strong> most important notifications</p>

      {prioritized.map((n, index) => (
        <NotificationCard key={n.ID} notification={n} index={index} />
      ))}
    </div>
  );
}

export default App;