import Log from '../middleware/logger.jsx';

const typeColors = {
  Placement: '#FFD700',
  Result: '#4A90D9',
  Event: '#27AE60'
};

function NotificationCard({ notification, index }) {
  Log("frontend", "debug", "component", `Rendering card #${index + 1} - ${notification.Type}`);

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      borderLeft: `5px solid ${typeColors[notification.Type] || '#ccc'}`,
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{
          backgroundColor: typeColors[notification.Type],
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {notification.Type}
        </span>
        <small style={{ color: '#888' }}>
          #{index + 1}
        </small>
      </div>
      <p style={{ margin: '8px 0', fontWeight: '500' }}>
        {notification.Message}
      </p>
      <small style={{ color: '#aaa' }}>
        {new Date(notification.Timestamp).toLocaleString()}
      </small>
    </div>
  );
}

export default NotificationCard;