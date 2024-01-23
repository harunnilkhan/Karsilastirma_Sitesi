function register() {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
  
    fetch('http://localhost:3000/auth/checkUnique', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.isUnique) {
          performRegistration(username, email, password);
        } else {
          document.getElementById('result').innerText = 'Kullanıcı adı veya email zaten kullanılıyor.';
        }
      })
      .catch(error => console.error('Error:', error));
  }
  
  function performRegistration(username, email, password) {
    fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('result').innerText = data.message;
      })
      .catch(error => console.error('Error:', error));
  }
  