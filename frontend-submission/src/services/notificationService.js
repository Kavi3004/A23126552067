import Log from '../middleware/logger.jsx';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbmRhbGFrYXZpQGdtYWlsLmNvbSIsImV4cCI6MTc4MjE5OTI1NSwiaWF0IjoxNzgyMTk4MzU1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzgwNjU2ZGUtY2ZiMy00Yjg3LWIzN2UtMTY4M2Y5NWY2YzAwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2F2aSBhbmRhbGEiLCJzdWIiOiJhMzRmOWZiYi1jZjgzLTQxODEtYTgwNy03NTc0YWJjYjI3YjYifSwiZW1haWwiOiJhbmRhbGFrYXZpQGdtYWlsLmNvbSIsIm5hbWUiOiJrYXZpIGFuZGFsYSIsInJvbGxObyI6ImEyMzEyNjU1MjA2NyIsImFjY2Vzc0NvZGUiOiJNVHF4YXIiLCJjbGllbnRJRCI6ImEzNGY5ZmJiLWNmODMtNDE4MS1hODA3LTc1NzRhYmNiMjdiNiIsImNsaWVudFNlY3JldCI6InZnU0toZmRqc2FDbW5RTVYifQ.RyWOygU_d8IONNVJQS-V-nSBq12EyhfPe2HBX8ie0a4";

const API = "http://4.224.186.213/evaluation-service/notifications";

// Priority weights
const PRIORITY = {
  Placement: 3,
  Result: 2,
  Event: 1
};

// Get top N notifications by priority + recency
export function getTopN(notifications, n = 10) {
  Log("frontend", "debug", "utils", `Sorting ${notifications.length} notifications, top ${n}`);
  
  return [...notifications]
    .sort((a, b) => {
      const weightDiff = (PRIORITY[b.Type] || 0) - (PRIORITY[a.Type] || 0);
      if (weightDiff !== 0) return weightDiff;
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, n);
}

// Fetch notifications from API
export async function fetchNotifications() {
  Log("frontend", "info", "api", "Fetching notifications from server");
  
  try {
    const res = await fetch(API, {
      headers: {
        "Authorization": `Bearer ${TOKEN}`
      }
    });

    if (!res.ok) {
      Log("frontend", "error", "api", `HTTP error: ${res.status}`);
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    Log("frontend", "info", "api", `Successfully fetched ${data.notifications.length} notifications`);
    return data.notifications;

  } catch (error) {
    Log("frontend", "fatal", "api", `Fetch failed: ${error.message}`);
    throw error;
  }
}