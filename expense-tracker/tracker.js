let log = document.querySelector(".log");
let form = document.querySelector("form#expenseTracker");
let total = document.querySelector(".total");

// Remove $ from price to standardize input
let cleanPrice = val => {
    let regex = /[$]/g;
    if(form.cost.value.match(regex)){
        return val.split('$')[1]
    }
    return val;
};

let addNewRow = () => {
    // Create div and update classname
    let newRow = document.createElement('div');
    newRow.className = "log__row";

    // Create row html with user data
    newRow.innerHTML = `
        <div class="log__cell date">${form.date.value}</div>
        <div class="log__cell item">${form.item.value}</div>
        <div class="log__cell price">$${cleanPrice(form.cost.value)}</div>`;

    // Append new row to end of log section
    log.appendChild(newRow);
};

// Calculate total expenses
let calcTotal = () => {
    let prices = document.querySelectorAll('.price');
    let cost = 0;
    prices.forEach(row => {
        let priceSplit = row.textContent.split('$');
        cost += parseFloat(priceSplit[1]);
    });
    total.innerHTML = `Total: $${cost}`;
};

form.addEventListener('submit', e => {
    e.preventDefault();
    addNewRow();
    calcTotal();
});