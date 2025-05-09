
class Car {
    constructor(brand, model, color, year) {
        this.brand = brand; 
        this.model = model; 
        this.color = color; 
        this.year = year;   
    }

    displayCarInfo() {
        let carInfo = document.createElement('div');
        carInfo.innerHTML = `
            <h3>Autó Adatok:</h3>
            <p><strong>Márka:</strong> ${this.brand}</p>
            <p><strong>Típus:</strong> ${this.model}</p>
            <p><strong>Szín:</strong> ${this.color}</p>
            <p><strong>Évjárat:</strong> ${this.year}</p>
        `;
        document.body.appendChild(carInfo); 
    }
}

class ElectricCar extends Car {
    constructor(brand,model, color, year, batteryCapacity) {
        super(brand, model, color, year); 
        this.batteryCapacity = batteryCapacity; 
    }

    displayCarInfo() {
        let carInfo = document.createElement('div');
        carInfo.innerHTML = `
            <h3>Elektromos Autó Adatok:</h3>
            <p><strong>Márka:</strong> ${this.brand}</p>
            <p><strong>Típus:</strong> ${this.model}</p>
            <p><strong>Szín:</strong> ${this.color}</p>
            <p><strong>Évjárat:</strong> ${this.year}</p>
            <p><strong>Akkumulátor Kapacitás:</strong> ${this.batteryCapacity} kWh</p>
        `;
        document.body.appendChild(carInfo); //ezt kellet használni a feladat leirásában, de ez végett az oldal aljára teszi
        console.log("Generált autó:")
        console.log(carInfo)
    }
}

document.getElementById('carForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const color = document.getElementById('color').value;
    const year = document.getElementById('year').value;
    const carType = document.getElementById('carType').value; 

    let newCar;
    if (carType === "electric") {
        newCar = new ElectricCar(brand, model, color, year, 75);  
    } else {
        newCar = new Car(brand, model, color, year);  
    }

    newCar.displayCarInfo(); 

    document.getElementById('carForm').reset();
});
