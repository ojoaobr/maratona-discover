const Modal = {
  open(){
    document
    .querySelector('.modal-overlay')
    .classList
    .add('active')
  },
  close(){
    document
    .querySelector('.modal-overlay')
    .classList
    .remove('active')
  }
}

const transactions = [
  {
    id: 1,
    description: 'Água',
    amount: -10000,
    date: '06/01/2021'
  },
  {
    id: 2,
    description: 'Salário',
    amount: 80000,
    date: '10/03/2021'
  },
]

const Transaction = {
  all:transactions,
  add(transaction){
    Transaction.all.push(transaction)
    App.reload()
  },
  incomes(){
    let income = 0;
    Transaction.all.forEach(transaction => {
      if(transaction.amount > 0){
        income += transaction.amount;
      }
    })
    return income;
  },
  expenses(){
    let expense = 0;
    Transaction.all.forEach(transaction => {
      if(transaction.amount < 0){
        expense += transaction.amount;
      }
    })
    return expense;
  },
  total(){
    return Transaction.incomes() + Transaction.expenses;
  }
}

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index){
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)
    DOM.transactionsContainer.appendChild(tr)
  },
  innerHTMLTransaction (transaction) {
    const CSSClass = transaction.amount > 0 ? 'income' : 'expense'
    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
    <td class="description">${transaction.description}</td>
    <td class=${CSSClass}>${amount}</td>
    <td class="date">${transaction.date}</td>
    <td>
      <img src="./assets/minus.svg" alt="Remover Transação">
    </td>
    `

    return html
  },
  updateBalance() {
    document
    .getElementById('incomeDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document
    .getElementById('expenseDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document
    .getElementById('totalDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.total())
  },
  clearTransactions(){
    console.log('=>' , DOM)
    DOM.transactionsContainer.innerHTML = "";
  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")
    value = Number(value) / 100
    value = value.toLocalesString("pt-BR",{
      style: "currency",
      currency: "BRL"
    })

    return signal + value
  }
}

const App = {
  init() {
    Transaction.allforEach(transaction => {
      DOM.addTransaction(transaction)
    })
    
    DOM.updateBalance()
  },
  reload() {
    DOM.clearTransactions()
    App.init()
  }
}

Transaction.add({
  id: 39,
  description: 'alo',
  amount: 2000,
  date: '19/02/2021'
})