const apiUrl = "http://gamf.nhely.hu/ajax2/";
const code = "OKYA01efg456";  

/*TODO: Ellenőrizni az authentikációt, valamiért nem szeretne menni */
function loadData() {
    axios.post(`${apiUrl}?op=read&code=${code}`)
        .then(response => {
            const data = response.data;
            console.log(response)
            if (data) {
                /*
                teszteles miatt kikommentezve
                const list = data.list.map(d => `<p>${d.id}: ${d.name}, ${d.height} cm, ${d.weight} kg</p>`).join("");
                document.getElementById("dataList").innerHTML = list;

                const heights = data.list.map(d => parseInt(d.height)).filter(n => !isNaN(n));
                const sum = heights.reduce((a, b) => a + b, 0);
                const avg = (sum / heights.length).toFixed(2);
                const max = Math.max(...heights);
                document.getElementById("stats").innerHTML = `
                    <p>Összeg: ${sum}</p>
                    <p>Átlag: ${avg}</p>
                    <p>Legnagyobb: ${max}</p>
                `;
                */
            } else {
                showMessage("Hiba történt a lista betöltésekor vagy üres a lista!", true);
            }
        })
        .catch(error => {
            showMessage("Hiba történt az adatok betöltésekor! Hiba:" + error, true);
            console.error(error);
        });
}


function createData() {
    const name = document.getElementById("createName").value.trim();
    const height = document.getElementById("createHeight").value.trim();
    const weight = document.getElementById("createWeight").value.trim();

    if (!name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
        showMessage("Hibás adatbevitel! Az adatok nem lehetnek üresek, és legfeljebb 30 karakter hosszúak lehetnek.", true);
        return;
    }

    const formData = new URLSearchParams();
    formData.append("op", "create");
    formData.append("code", code);
    formData.append("name", name);
    formData.append("height", height);
    formData.append("weight", weight);

    axios.post(apiUrl, formData)
        .then(response => {  
            console.log("axios valasz:", response);  
            showMessage("Sikeres hozzáadás!");
            loadData();
        })
        .catch(error => {
            console.error("Hiba történt az új adat hozzáadásakor:", error);
            showMessage("Hiba történt az új adat hozzáadásakor! Hiba: " + error, true);
        });

}

function updateData() {
    const id = document.getElementById("updateId").value;
    const name = document.getElementById("updateName").value.trim();
    const height = document.getElementById("updateHeight").value.trim();
    const weight = document.getElementById("updateWeight").value.trim();

    if (!name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
        showMessage("Hibás adatbevitel! Az adatok nem lehetnek üresek, és legfeljebb 30 karakter hosszúak lehetnek.", true);
        return;
    }

    const formData = new URLSearchParams();
    formData.append("op", "update");
    formData.append("code", code);
    formData.append("id", id);
    formData.append("name", name);
    formData.append("height", height);
    formData.append("weight", weight);

    axios.post(apiUrl, formData)
        .then(() => {
            showMessage("Sikeres módosítás!");
            loadData();
        })
        .catch(error => {
            showMessage("Hiba történt az adat módosításakor! Hiba:" + error, true);
            console.error(error);
        });
}

function getDataForId() {
    const id = document.getElementById("updateId").value;

    axios.post(`${apiUrl}?op=read&code=${code}`)
        .then(response => {
            console.log(response)
            const data = response.data;
            if (data) {
                const record = data.list.find(r => r.id === id);
                
                if (record) {
                    document.getElementById("updateName").value = record.name;
                    document.getElementById("updateHeight").value = record.height;
                    document.getElementById("updateWeight").value = record.weight;
                } else {
                    showMessage("Nincs ilyen ID!", true);
                }
            } else {
                showMessage("Hiba történt a lista betöltésekor!", true);
            }
        })
        .catch(error => {
            showMessage("Hiba történt a rekord lekérdezésekor!", true);
            console.error(error);
        });
}

function deleteData() {
    const id = document.getElementById("deleteId").value;
    const formData = new URLSearchParams();
    formData.append("op", "delete");
    formData.append("code", code);
    formData.append("id", id);

    axios.post(apiUrl, formData)
        .then(() => {
            showMessage("Sikeres törlés!");
            loadData();
        })
        .catch(error => {
            showMessage("Hiba történt az adat törlésekor! Hiba:" + error, true);
            console.error(error);
        });
}

function showMessage(msg, isError = false) {
    const div = document.getElementById("message");
    div.innerText = msg;
    div.style.color = isError ? "red" : "green";
}