function addCar() {
  var carBrand = document.getElementById('carBrand').value;
  var carModel = document.getElementById('carModel').value;
  var carYear = document.getElementById('carYear').value;
  var carPrice = document.getElementById('carPrice').value;
  var carEngineCapacity = document.getElementById('carEngineCapacity').value;
  var carHorsepower = document.getElementById('carHorsepower').value;
  var carTorque = document.getElementById('carTorque').value;
  var carFuelType = document.getElementById('carFuelType').value;
  var carTransmissionType = document.getElementById('carTransmissionType').value;
  var carWeight = document.getElementById('carWeight').value;

  if (!carBrand || !carModel || !carYear || !carPrice || !carEngineCapacity || !carHorsepower || !carTorque || !carFuelType || !carTransmissionType || !carWeight) {
    alert("Lütfen tüm alanları doldurunuz.");
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/cars/addCar", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          alert("Araba başarıyla eklendi");
         
          document.getElementById('carBrand').value = '';
          document.getElementById('carModel').value = '';
          document.getElementById('carYear').value = '';
          document.getElementById('carPrice').value = '';
          document.getElementById('carEngineCapacity').value = '';
          document.getElementById('carHorsepower').value = '';
          document.getElementById('carTorque').value = '';
          document.getElementById('carFuelType').value = '';
          document.getElementById('carTransmissionType').value = '';
          document.getElementById('carWeight').value = '';
      }
  };

  var data = JSON.stringify({
      "brand": carBrand,
      "model": carModel,
      "year": carYear,
      "price": carPrice,
      "engine_capacity": carEngineCapacity,
      "horsepower": carHorsepower,
      "torque": carTorque,
      "fuel_type": carFuelType,
      "transmission_type": carTransmissionType,
      "weight": carWeight
  });

  xhr.send(data);
}

document.getElementById('addCarForm').addEventListener('submit', function(e) {
  e.preventDefault();
  addCar();
});

function redirectToCompareCars() {
  window.location.href = 'compareCars.html';
}
