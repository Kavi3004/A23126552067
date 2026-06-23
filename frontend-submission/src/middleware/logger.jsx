 const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbmRhbGFrYXZpQGdtYWlsLmNvbSIsImV4cCI6MTc4MjIwMTA5MywiaWF0IjoxNzgyMjAwMTkzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMWI3YzY2YjctNTc5Ni00M2QxLWI4ZDYtNDg4NzEzODdkM2E1IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2F2aSBhbmRhbGEiLCJzdWIiOiJhMzRmOWZiYi1jZjgzLTQxODEtYTgwNy03NTc0YWJjYjI3YjYifSwiZW1haWwiOiJhbmRhbGFrYXZpQGdtYWlsLmNvbSIsIm5hbWUiOiJrYXZpIGFuZGFsYSIsInJvbGxObyI6ImEyMzEyNjU1MjA2NyIsImFjY2Vzc0NvZGUiOiJNVHF4YXIiLCJjbGllbnRJRCI6ImEzNGY5ZmJiLWNmODMtNDE4MS1hODA3LTc1NzRhYmNiMjdiNiIsImNsaWVudFNlY3JldCI6InZnU0toZmRqc2FDbW5RTVYifQ.Bf76vJp9_Lnkkgzz5Vexhrou94zL5e_p7ZWBSLRklXk";

const LOG_API = "http://4.224.186.213/evaluation-service/logs";

async function Log(stack, level, pkg, message) {
  try {
    const response = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: pkg,
        message: message
      })
    });
    const data = await response.json();
    console.log("Log sent:", data);
    return data;
  } catch (error) {
    console.error("Logging failed:", error.message);
  }
}

export default Log;