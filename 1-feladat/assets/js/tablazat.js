let carRecords = [];
let nextId = 1;
let debugMode = true; // Csak arra van, hogy console.log-ba kiirassa a carRecors tömböt

document.getElementById("recordForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const model = document.getElementById("carModel").value;
    const year = parseInt(document.getElementById("year").value); 
    const engineCapacity = parseFloat(document.getElementById("engineCapacity").value);  
    const weight = parseFloat(document.getElementById("weight").value); 
    const id = document.getElementById("recordId").value;

    let newRecord = {
        model,
        year,
        engineCapacity,
        weight
    };

    if (id) {
        const index = carRecords.findIndex(record => record.id === parseInt(id)); 
        if (index !== -1) {
            newRecord.id = parseInt(id); 
            carRecords[index] = newRecord;  
        }
    } else {
        newRecord.id = nextId++; 
        carRecords.push(newRecord); 
    }

    displayTable();
    this.reset();
    document.getElementById("recordId").value = "";
});


function deleteRecord(id) {
    const recordId = parseInt(id);
    const index = carRecords.findIndex(record => record.id === recordId); 
    if (index !== -1) {
        carRecords.splice(index, 1); 
        displayTable(); 
    } else {
        alert(`Nincs találat, a törlés nem lehetséges! A keresett ID: ${recordId}`);
        if(debugMode)
        {
            console.log(carRecords)
        }
    }
}

function editRecord(id) {
    const record = carRecords.find(r => r.id === id);
    if (record) {
        document.getElementById("carModel").value = record.model;
        document.getElementById("year").value = record.year;
        document.getElementById("engineCapacity").value = record.engineCapacity;
        document.getElementById("weight").value = record.weight;
        document.getElementById("recordId").value = record.id;
    }
    else
    {
        alert("Súlyos hiba történt, nincs találat!")
        if(debugMode)
        {
            console.log(carRecords)
        }
    }
}

let sortOrder = { ascending: true };
function sortTable(colIndex) {
    /* TODO: Egyszerűsiteni, picit ránézésre bonyolult de működik */
    const table = document.getElementById("dataTable");
    const rows = Array.from(table.rows).slice(1); 
    if (rows.length === 0) {
        alert("A táblázat üres, nincs mit rendezni.");
        return; 
    }


    const cellA = rows[0].cells[colIndex].innerText.trim();
    const isNumeric = !isNaN(cellA) && cellA !== '';  

    rows.sort((a, b) => {
        let cellA = a.cells[colIndex].innerText.trim();
        let cellB = b.cells[colIndex].innerText.trim();

        if (isNumeric) {
            cellA = parseFloat(cellA);
            cellB = parseFloat(cellB);
        }

        if (isNumeric) {
            return sortOrder.ascending
                ? cellA - cellB
                : cellB - cellA;
        }

        return sortOrder.ascending
            ? cellA.localeCompare(cellB)
            : cellB.localeCompare(cellA);
    });

    rows.forEach(row => table.appendChild(row));
    sortOrder.ascending = !sortOrder.ascending;
}

document.getElementById("search").addEventListener("input", function() {
    let searchQuery = this.value.toLowerCase();  
    const searchType = document.getElementById("searchType").value;

    if(debugMode) {
        console.log("Records:");
        console.log(carRecords);
    }
    if (searchQuery === "") {
        displayTable();
        return; 
    }
    const filteredRecords = [];
    carRecords.forEach(record => {
        let value = record[searchType];
        if (searchType === "year" || searchType === "engineCapacity" || searchType === "weight") {
            const numericValue = parseFloat(value);
            const numericSearchQuery = parseFloat(searchQuery);  

            if (!isNaN(numericValue) && !isNaN(numericSearchQuery)) {
                if (numericValue.toString().includes(numericSearchQuery.toString())) {
                    filteredRecords.push(record);
                }
            }
        } else {
            value = value.toString().toLowerCase();
            if (value.includes(searchQuery)) {
                filteredRecords.push(record);
            }
        }
    });
    displayTable(filteredRecords);
});

function displayTable(records = carRecords) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    records.forEach((record) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.model}</td>
            <td>${record.year}</td>
            <td>${record.engineCapacity}</td>
            <td>${record.weight}</td>
            <td>
                <button onclick="deleteRecord(${record.id})">Törlés</button>
                <button onclick="editRecord(${record.id})">Szerkesztés</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
function displayTable(records = carRecords) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    records.forEach((record) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.model}</td>
            <td>${record.year}</td>
            <td>${record.engineCapacity}</td>
            <td>${record.weight}</td>
            <td>
                <button onclick="deleteRecord(${record.id})">Törlés</button>
                <button onclick="editRecord(${record.id})">Szerkesztés</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
function displayFilteredTable(records) {
    displayTable(records); 
}