const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')



const localStorageTransections = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransections : [] 

// Remoção da transação

const remuveTransection =  ID => {
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
        updateLocalStorage()
    init()
}

const addTransactionsIntoDOM = transaction => {

    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSclass = transaction.amount < 0 ? 'mius' : 'plus'
    const amountWithouOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')
    
    li.classList.add(CSSclass)
    li.innerHTML = `
      ${transaction.name}
      <span>${operator} R$ ${amountWithouOperator}</span>
      <button class="delete-btn" onclick="remuveTransection(${transaction.id})">
        x
      </button>
    `
    transactionsUl.append(li)
}
const updateBalanceValues = () => {
    const transactionAmounts = transactions
        .map(transaction => transaction.amount)

    const total = transactionAmounts
        .reduce((accomulador, transaction) => accomulador + transaction, 0)
        .toFixed(2)

    const income = transactionAmounts
        .filter(value => value > 0)
        .reduce((accomulador, value) => accomulador + value, 0)
        .toFixed(2)

    const expense = Math.abs(transactionAmounts
    .filter(value => value < 0)
    .reduce((accomulador, value) => accomulador + value, 0))
    .toFixed(2)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
}
init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

// Lista de eventos

const generateId = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if(transactionName === '' || transactionAmount === '') {
        alert('Por favor, preencha tanto o nome quanto o valor da transação')
        return
    }

    const transaction = { 
        id: generateId(), 
        name: transactionName, 
        amount:Number(transactionAmount) 
    }
    transactions.push(transaction)
    init()

    updateLocalStorage()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})