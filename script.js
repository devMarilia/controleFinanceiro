const transactionsUl = document.querySelector('#transactions')
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
const init = () => {
    dummyTransactions.forEach(addTransactionsIntoDOM)
}
init()
// addTransactionsIntoDOM(dummyTransactions[1])