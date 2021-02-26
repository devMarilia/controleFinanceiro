const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')

const dummyTransactions = [{
        id: 1,
        name: 'Bolo de brigadeiro',
        amout: -20
    },
    {
        id: 2,
        name: 'Salário',
        amout: 300
    },
    {
        id: 3,
        name: 'Torta de Frango',
        amout: -10
    },
    {
        id: 4,
        name: 'Violão',
        amout: 150
    }
    
]
console.log(dummyTransactions);

const addTransactionsIntoDOM = transaction => {

    const operator = transaction.amout < 0 ? '-' : '+'
    const CSSclass = transaction.amout < 0 ? 'mius' : 'plus'
    const amoutWithouOperator = Math.abs(transaction.amout)
    const li = document.createElement('li')
    
    li.classList.add(CSSclass)
    li.innerHTML = `
      ${transaction.name}<span>${operator} R$ ${amoutWithouOperator}</span><button class="delete-btn">x</button>
    `
    transactionsUl.append(li)
}
const updateBalanceValues = () => {
    const transactionAmouts = dummyTransactions
        .map(transaction => transaction.amout)

    const total = transactionAmouts
        .reduce((accomulador, transaction) => accomulador + transaction, 0)
        .toFixed(2)

    const income = transactionAmouts
        .filter(value => value > 0)
        .reduce((accomulador, value) => accomulador + value, 0)
        .toFixed(2)

    const expense = Math.abs(transactionAmouts
    .filter(value => value < 0)
    .reduce((accomulador, value) => accomulador + value, 0))
    .toFixed(2)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    dummyTransactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
}
init()
// addTransactionsIntoDOM(dummyTransactions[1])