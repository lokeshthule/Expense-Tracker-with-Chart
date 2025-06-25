const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const locatStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
)

let transactions = localStorage.getItem("transactions") != null ?locatStorageTransactions : [];

function addTransaction(e){
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim()=== ''){
        alert("Please add a expense and amount");
    } else{
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value,
        };
        transactions.push(transaction);

        addTransactionToDOM(transaction);

        updateLocalStorage();

        updateValues();
        text.value = "";
        amount.value = "";
    }
}

//add transactions to the dom list
function addTransactionToDOM(transaction){
        //Get the sign plu or minus
        const sign = transaction.amount < 0 ? "-" : "+"
        const item = document.createElement('li')

        //Add classes based on thr value
        item.classList.add(transaction.amount < 0 ? "minus" : "plus")
        item.innerHTML = `
           ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
        `;
        list.appendChild(item);
}

// Update the Balance, income and Expenses
function updateValues(){
    const amounts = transactions.map((transaction) => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income =amounts
                    .filter((item) => item > 0)
                    .reduce((acc, item ) => (acc += item), 0)
                    .toFixed(2);
    const expense = (
        amounts 
            .filter((item) => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2)

    balance.innerText = `${total}`
    money_plus.innerText = `$${income}`
    money_minus.innerText = `$${expense}`
}

// Remove the transaction by ID
function removeTransaction(id){
    transactions = transactions.filter((transaction) => transaction.id != id)

    updateLocalStorage();

    init();
}

function updateLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Initialize the app
 function init(){
    list.innerHTML = '';

    transactions.forEach(addTransactionToDOM);
    updateValues();
 }

 init();

//Generate a Random Id
function generateId(){
     return Math.floor(Math.random() * 100000000);
}

form.addEventListener("submit", addTransaction);