window.onload = function() {
    loadCarOptions();
    checkAdminStatus();
};

function loadCarOptions() {
    fetch('http://localhost:3000/cars')
        .then(response => response.json())
        .then(data => {
            const car1Select = document.getElementById('car1');
            const car2Select = document.getElementById('car2');
            
            data.forEach(car => {
                const option1 = document.createElement('option');
                option1.value = car.id;
                option1.text = `${car.brand} ${car.model} - ${car.year}`;
                car1Select.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = car.id;
                option2.text = `${car.brand} ${car.model} - ${car.year}`;
                car2Select.appendChild(option2);
            });
        });
}

function goToAddCarPage() {
    window.location.href = 'addCar.html'; 
}

function redirectToAdminPanel() {
    window.location.href = 'adminPanel.html';
  }
  
  
  function checkAdminStatus() {
    fetch('/get-user-info')
        .then(response => response.json())
        .then(data => {
            if (data.isAuthenticated && data.user.isAdmin) {
                document.getElementById('editButton').style.display = 'block';
            }
        });
}

function compareCars() {
    const car1Id = document.getElementById('car1').value;
    const car2Id = document.getElementById('car2').value;

    Promise.all([
        fetch(`http://localhost:3000/cars/${car1Id}`).then(response => response.json()),
        fetch(`http://localhost:3000/cars/${car2Id}`).then(response => response.json())
    ]).then(([car1Data, car2Data]) => {
        const table = document.getElementById('comparisonResult');

       
        table.innerHTML = `<tr><th>Özellikler</th><th>1. Araba</th><th>2. Araba</th></tr>`;

       
        const propertyNames = ['Marka', 'Model', 'Üretim Yılı', 'Fiyat', 'Motor Hacmi', 'Beygir Gücü', 'Tork', 'Yakıt Tipi', 'Vites Tipi', 'Ağırlık'];
        const properties = ['brand', 'model', 'year', 'price', 'engine_capacity', 'horsepower', 'torque', 'fuel_type', 'transmission_type', 'weight'];

        properties.forEach((prop, index) => {
            const row = `<tr><td>${propertyNames[index]}</td><td>${car1Data[prop] ?? 'Bilgi Yok'}</td><td>${car2Data[prop] ?? 'Bilgi Yok'}</td></tr>`;
            table.innerHTML += row;
        });
    });
}
