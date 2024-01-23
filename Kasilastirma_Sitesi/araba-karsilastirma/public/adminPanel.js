window.onload = function() {
  document.getElementById('viewUsers').addEventListener('click', viewUsers);
  document.getElementById('viewCars').addEventListener('click', viewCars);
};



function deleteItem(endpoint, itemId) {
  fetch(endpoint + '/' + itemId, {
      method: 'DELETE'
  }).then(response => {
      if (response.ok) {
          alert('Silme işlemi başarılı!');
          
          if (endpoint.includes('users')) {
              viewUsers();
          } else if (endpoint.includes('cars')) {
              viewCars();
          }
      } else {
          alert('Silme işlemi başarısız!');
      }
  });
}

function viewUsers() {
  fetch('/admin/users')
      .then(response => response.json())
      .then(users => {
          const results = document.getElementById('results');
          results.innerHTML = '<h2>Kullanıcı Listesi</h2>';
          results.innerHTML += '<ul>';
          users.forEach(user => {
              results.innerHTML += `<li>${user.username} - <button onclick="deleteItem('/admin/users', ${user.id})">Sil</button></li>`;
          });
          results.innerHTML += '</ul>';
      });
}

function viewCars() {
  fetch('/admin/cars')
      .then(response => response.json())
      .then(cars => {
          const results = document.getElementById('results');
          results.innerHTML = '<h2>Araba Listesi</h2>';
          results.innerHTML += '<ul>';
          cars.forEach(car => {
              results.innerHTML += `<li>${car.brand} ${car.model} - <button onclick="deleteItem('/admin/cars', ${car.id})">Sil</button></li>`;
          });
          results.innerHTML += '</ul>';
      });
}

document.getElementById('viewUsers').addEventListener('click', viewUsers);
document.getElementById('viewCars').addEventListener('click', viewCars);
