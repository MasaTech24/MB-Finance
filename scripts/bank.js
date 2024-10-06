const firebaseConfig = {
  apiKey: "AIzaSyBKDHia_SrwqRklqY1yZRcCbnsidU3yfGk",

  authDomain: "bmo-finance.firebaseapp.com",

  projectId: "bmo-finance",

  storageBucket: "bmo-finance.appspot.com",

  messagingSenderId: "459861017473",

  appId: "1:459861017473:web:e183f5f85173c6af8d9e80"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const userName = localStorage.getItem("userName");
const userId = localStorage.getItem("userId");
const Name = document.getElementById("name");
Name.textContent = userName;

function CheckingBalanceChanges(userId) {
  const userRef = database.ref('users/').child(userId).child('/checking')
  userRef.on('value', snapshot => {
    const currentBalance = snapshot.val();
    if(currentBalance !== null){
      const formattedBalance = '$ ' + currentBalance.toFixed(2);

      document.getElementById('js-checking').textContent = formattedBalance;
   }else{
      console.log('why');
      document.getElementById('js-checking').textContent = 'Unavaible';
    }
  });
  
}
CheckingBalanceChanges(userId)


function SavingsBalanceChanges(userId) {
  const userRef = database.ref('users/').child(userId).child('/saving');
  userRef.on('value', snapshot => {
    const savingBalance = snapshot.val();
    if(savingBalance !== null){
      const formattedBalance = '$ ' + savingBalance.toFixed(2);
      document.getElementById('saving').textContent
      = formattedBalance
    } else {
      document.getElementById('saving').textContent = 'Unavaible';
    }
  });
}
SavingsBalanceChanges(userId);

function RenderTranasationList(userId) {
  const transactionRef = database.ref('users/' + userId + 'transactions/');
  transactionRef.on('value', (snapshot) => {
    const transactions = snapshot.val();
    const transactionList = document.getElementById('js-transaction');
    transactionList.innerHTML = '';
    for (const key in transactions) {
      const transaction = transactions[key];
      transactionList.innerHTML += `
        <div class="transactions-lists ">
          <div class="product-item">
            <div>${transaction.name}</div>
            <p>${transaction.remark}</p>
          </div>
          <div class="amount-div">
            <div>-${transaction.amount}</div>
          </div> 
      </div>
      `
    }
  })
}
RenderTranasationList(userId);
const signOutBtnn = document.querySelector('.js-sign-out');
signOutBtnn.addEventListener('click', () => {
  sessionStorage.removeItem("userEmail");
  sessionStorage.removeItem("userName");
  sessionStorage.removeItem("userChackings");
  sessionStorage.removeItem("userSavings");
  window.location.replace('/index');
  sessionStorage.removeItem('isLoggedIn');
})

