
const database = firebase.database();
const userId = localStorage.getItem("userId");
renderTransactionList(userId);

// function renderTransactionList(userId) {
//   const transactionList = document.getElementById('js-transaction');
//   transactionList.classList.add('transactionList')
//   const transactionRef = database.ref('users/' + userId + '/transactions/');
//   transactionRef.on('value', (snapshot) => {
//     transactionList.innerHTML = '';
//     snapshot.forEach((childSnapshot) => {
//       const transaction = childSnapshot.val();
//       const transactionItem = document.createElement('div');
//       transactionItem.innerHTML = `
//         <div class="transactions-lists ">
//             <div class="product-item">
//               <div>${transaction.name}</div>
//               <p>${transaction.remark}</p>
//             </div>
//             <div class="amount-div">
//               <div>-${transaction.amount}</div>
//             </div> 
//         </div>
//       `;
//       transactionList.appendChild(transactionItem);
//     });
//   });
// }
function renderTransactionList(userId) {
  const transactionList = document.getElementById('js-transaction');
  transactionList.classList.add('transactionList')
  const transactionRef = database.ref('users/' + userId + '/transactions/');
  transactionRef.on('value', (snapshot) => {
    const transactions = snapshot.val();

    // Convert the transactions object to an array and sort it by date in descending order
    const sortedTransactions = Object.values(transactions).sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    // Reverse the order of the sorted transactions to display the user's last transaction first
    sortedTransactions.reverse();

    // Clear the transaction list before rendering the sorted transactions
    transactionList.innerHTML = '';

    // Render the sorted transaction list on the browser
    sortedTransactions.forEach((transaction) => {
      const transactionItem = document.createElement('div');
      transactionItem.innerHTML = `
        <div class="transactions-lists ">
            <div class="product-item">
              <div>${transaction.name}</div>
              <p>${transaction.remark}</p>
            </div>
            <div class="amount-div">
              <div>-${transaction.amount}</div>
            </div> 
        </div>
      `;
      transactionList.appendChild(transactionItem);
    });
  });
}
