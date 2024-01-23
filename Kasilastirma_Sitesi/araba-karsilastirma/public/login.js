document.addEventListener('DOMContentLoaded', function() {
  async function login() {
    console.log("Login function started");

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    console.log("Username:", username);
   

    try {
      console.log("Sending fetch request to server");
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log("Response received");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.message === 'Giriş başarılı!') {
        console.log("Login successful, redirecting to compareCars.html");
        localStorage.setItem('token', data.token); // Gerçek token değerini buraya ekleyin
        window.location.href = 'compareCars.html'; // Burası güncellendi
      } else {
        console.log("Login failed:", data.message);
        document.getElementById('result').innerText = JSON.stringify(data.message);
      }
    } catch (error) {
      console.error('Login Error:', error);
      document.getElementById('result').innerText = "Login failed: " + error.message;
    }
  }

  const loginButton = document.getElementById('loginButton');
  console.log("Setting up event listener for login button");

  if (loginButton) {
    loginButton.addEventListener('click', login);
    console.log("Event listener attached to login button");
  } else {
    console.error("Login button not found");
  }
});
