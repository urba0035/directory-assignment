// list function
const list = (array) => {
    return array.map(client => {
        return `
            <li class="list-group-item d-flex justify-content-between" data-index="${client.index}">
                ${client.name} <strong>$ ${client.balance}</strong>
            </li>
        `;
    }).join("");
};


// order function
const order = (array, property) => {
    return array.sort((a, b) => {
        if (a[property] > b[property]) {
            return 1;
        } else if (a[property] < b[property]) {
            return -1;
        } else {
            return 0;
        }
    });
};


// total function
const total = (array) => {
    return array.reduce((sum, client) => {
        return sum + parseFloat(client.balance);
    }, 0);
};


// info function
const info = (index) => {
    return clients.find(client => client.index == index);
};


// search function
const search = (query) => {
    return clients.filter(client => {
        return client.name.toLowerCase().includes(query.toLowerCase());
    });
};


// page functionality
const listElement = document.getElementById("list");
const searchInput = document.getElementById("query");
const propertySelect = document.getElementById("property");
const card = document.getElementById("card");


// shows all clients when page loads
listElement.innerHTML = list(clients);


// search function
searchInput.addEventListener("keyup", function () {
    const query = searchInput.value;
    const results = search(query);
    listElement.innerHTML = list(results);
});


// order function
propertySelect.addEventListener("change", function () {
    const property = propertySelect.value;
    order(clients, property);   // directly sort original
    listElement.innerHTML = list(clients);
});


// click event
listElement.addEventListener("click", function (event) {

    const li = event.target.closest("li");

    if (!li) return;

    const index = li.getAttribute("data-index");
    const client = info(Number(index));

    card.innerHTML = `
        <div class="card p-3">
            <h4>${client.name}</h4>
            <p>Index: ${client.index}</p>
            <p>Balance: $${client.balance}</p>
        </div>
    `;
});
