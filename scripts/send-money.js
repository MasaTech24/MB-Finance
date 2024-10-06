const signOutBtnn = document.querySelector('.js-sign-out');
signOutBtnn.addEventListener('click', () => {
  sessionStorage.removeItem("userEmail");
  sessionStorage.removeItem("userName");
  sessionStorage.removeItem("userChackings");
  sessionStorage.removeItem("userSavings");
  window.location.replace('/index');
  sessionStorage.removeItem('isLoggedIn');
})
// Reference 
const Cance_btn = document.querySelector('#js-cancel-btn');
const send = document.querySelector('.send');
const local = document.querySelector('.local');
const international = document.querySelector('.international');
const inputDiv = document.querySelector('.js-input-div');
const internationalDiv = document.getElementById('international-div');
const sendLocal = document.querySelector('.send-local');
const sendInternation = document.querySelector('.send-international');
const amountDiv = document.getElementById('js-amount-div');
const proceedBtn = document.querySelector('.js-local-btn');
const amountBtn = document.querySelector('.amount-btn');
const comfrimDiv = document.querySelector('#js-confrim-div');
const interProceedBtn = document.querySelector('.js-inter-pro-btn');
const interAmountDiv = document.getElementById('js-inter-amount-div');
const interDiv = document.querySelector('#international-div');
const interAmountBtn = document.querySelector('.inter-amount-btn')
const interConfirmDiv = document.querySelector('#js-inter-confrim-div');
// const interConfirmBtn = document.querySelector('.inter-confrim-btn');
// const interSendOtpDiv = document.querySelector('#inter-send-otp-div');

import users from "./sign-in.js";
const database = firebase.database();

// for local transaction 
// all local transfer inputs 

Cance_btn.addEventListener('click',  () =>{
  window.location.replace("/MB-Finance/my_account.html");
})

// for local  transaction 
document.querySelector('.send-local')
.addEventListener('click', displaySendLocal);
  
function displaySendLocal(){
  send.style.display = "none";
  international.style.display = "none";
  local.style.display = "block";

  // inputDiv.style.display = "block";
  inputDiv.style.display = "flex"
  sendLocal.style.display = "none";
  sendInternation.style.display = "none";
}
// for local back button 
document.querySelector('.js-back-btn')
.addEventListener('click', backButton);

function backButton() {
  send.style.display = "block";
  local.style.display = "none";
  international.style.display = "none"

  inputDiv.style.display = "none";
  internationalDiv.style.display = "none"
  amountDiv.style.display = "none"
  sendLocal.style.display = "block";
  sendLocal.style.display = "flex"
  sendInternation.style.display = "block";
  sendInternation.style.display = "flex"
}
document.querySelector('.amount-back-btn')
.addEventListener('click', amountBackBtn);

document.querySelector('.details-back-btn')
.addEventListener('click', confrimBackBtn);
function amountBackBtn(){
  send.style.display = "none";
  local.style.display = "block";
  international.style.display = "none"

  inputDiv.style.display = "flex";
  internationalDiv.style.display = "none"
  amountDiv.style.display = "none"
  sendLocal.style.display = "none";
  sendInternation.style.display = "none";
}
function confrimBackBtn(){
  send.style.display = "none";
  local.style.display = "block";
  international.style.display = "none"

  inputDiv.style.display = "none";
  internationalDiv.style.display = "none"
  comfrimDiv.style.display = "none"
  amountDiv.style.display = "flex"
  sendLocal.style.display = "none";
  sendInternation.style.display = "none";
}
const selectElement = document.querySelector('#js-select')
selectElement.addEventListener('change', () => {
    const selectOption = selectElement.value
    if (selectOption === 'Current account') {
      // alert(`withdraw from ${selectOption}`);
      localStorage.setItem('currentOption', selectOption);
      localStorage.removeItem('savingOption');
    } else {
    if (selectOption === 'Saving account') {
        // alert(`withdraw from ${selectOption}`);
        localStorage.setItem('savingOption', selectOption);
        localStorage.removeItem('currentOption');
      }
    }
})

// showing the amount content 
proceedBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showAmountContent();
});
  
function showAmountContent() {
  const nameInp = document.querySelector('.name-input').value;
  sessionStorage.setItem('name', nameInp)
  const numberInp = document.querySelector('.number-input').value;

  const bankNameInp = document.querySelector('#bank-name-div').value;
  const remarkInp = document.querySelector('.remark-input').value;
  sessionStorage.setItem('remark', remarkInp)

  if(nameInp === '' || numberInp === '' || bankNameInp === '' || remarkInp === '') {
    alert("Please fill in all input fields.");
    return; 
  }
    send.style.display = "none";
    local.style.display = "block";
    international.style.display = "none";
  
    inputDiv.style.display = "none"
    internationalDiv.style.display = "none"
    amountDiv.style.display = "flex"
    sendLocal.style.display = "none";
    sendInternation.style.display = "none";
}
// showing the confirm details  
amountBtn.addEventListener('click', showComfrimDetails);

function showComfrimDetails() {
  const amountInp = document.querySelector('.amount-input').value;
  
  const formattedAmountInp = Number(amountInp).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
  sessionStorage.setItem('amount', formattedAmountInp)
  
  const nameInp = document.querySelector('.name-input').value;

  const numberInp = document.querySelector('.number-input').value;
  const bankNameInp = document.querySelector('#bank-name-div').value;

  document.querySelector('.name').textContent = nameInp;
  document.querySelector('.number').textContent = numberInp;
  document.querySelector('.bank').textContent = bankNameInp;
  document.querySelector('.amount').textContent = formattedAmountInp;

  if(amountInp === ''){
    alert("Please fill in all input fields.");
    return; 
  }

  send.style.display = "none";
  local.style.display = "block";
  international.style.display = "none";

  inputDiv.style.display = "none"
  internationalDiv.style.display = "none"
  amountDiv.style.display = "none"
  comfrimDiv.style.display = "flex"
  sendLocal.style.display = "none";
  sendInternation.style.display = "none";
}
// showing the withdrawal details and function 
function sendMoney(userid){
  const amountInp = Number(document.querySelector('.amount-input').value);
  const currentOption = localStorage.getItem('currentOption');
  const savingOption = localStorage.getItem('savingOption');
  if (currentOption) {
    database.ref('users/' + userid + '/checking').once('value')
    .then((snapshot) => {
      let checkingBalance = snapshot.val();
      if (checkingBalance >= amountInp) {
        let newTotalBalance = checkingBalance - amountInp;
        database.ref('users/' + userid + '/checking').set(newTotalBalance);
        localStorage.removeItem('currentOption');
      }else{
        alert('Insufficient balance')
      }
    })
  }
  if (savingOption) {
    database.ref('users/' + userid + '/saving').once('value')
    .then((snapshot) => {
      let savingBalance = snapshot.val();
      if (savingBalance >= amountInp) {
        let newTotalBalance = savingBalance - amountInp;
        database.ref('users/' + userid + '/saving').set(newTotalBalance);
        localStorage.removeItem('savingOption');
      } else {
        alert('Insufficient balance')
      }
    })
  }
  saveTransaction(); 
  displaySuccessful();
}
function saveTransaction(){
  const amount = sessionStorage.getItem('amount');
  const name = sessionStorage.getItem('name');
  const remark = sessionStorage.getItem('remark');
  // Get the current user's ID
  const userId = localStorage.getItem("userId");
  const transactionDetails = {
    name: name,
    remark: remark,
    amount: amount
  };
  const userTransactionRef = database.ref('users/' + userId + '/transactions');
  userTransactionRef.push(transactionDetails);

}

document.querySelector('#confirm-details-btn').addEventListener('click', () => {
  document.querySelector('#confirm-details-btn').innerHTML = 'Please wait...'
  sendOTP();
});

// showing the OTP input details and function 
function sendOTP() {
  let emailInput = sessionStorage.getItem("userEmail");
  const OTPDiv = document.getElementById('send-otp-div');
  let otpInp = document.getElementById('otp-input');
  const otpBtn = document.querySelector('#otp-btn');

  // Generate an OTP 
  let otp = Math.floor(Math.random() * 1000000);

  let emailBody = `
  <h1> Confirm Transation form MB Finance</h2>
  <h2> Your OTP is </h2> ${otp}
  `;
  Email.send({
    SecureToken : "f5aa37ee-bee0-41d8-9596-073b787babdc",
    To : emailInput,
    From : "karenmayortega76@gmail.com",
    Subject : "This is from MB Finance",
    Body : emailBody
  }).then(
    message => {
      if(message === 'OK'){
        send.style.display = "none";
        local.style.display = "block";
        international.style.display = "none";

        inputDiv.style.display = "none"
        internationalDiv.style.display = "none"
        amountDiv.style.display = "none";
        interAmountDiv.style.display = "none";
        comfrimDiv.style.display = "none";
        OTPDiv.style.display = "grid";
        sendLocal.style.display = "none";
        sendInternation.style.display = "none";
        console.log('ok')


        otpBtn.addEventListener('click', (e)=>{
          e.preventDefault()
          if(otpInp.value == otp){
            // alert('Email address verified...');
            const userId = localStorage.getItem("userId");
            sendMoney(userId);
          }else{
            alert('Enter correct otp')
          }
        })
      }
    }
  );
}

// showing the successful message details and function 
function displaySuccessful(){
  const OTPDiv = document.getElementById('send-otp-div');
  const successfulDiv = document.querySelector('.successful');
  const amountInp = document.querySelector('.amount-input').value;
  const formattedAmountInp = Number(amountInp).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
  document.querySelector('.you-sent').textContent = formattedAmountInp ;
  document.querySelector('.deducted').textContent = formattedAmountInp ;

  send.style.display = "none";
  local.style.display = "none";
  international.style.display = "none";

  inputDiv.style.display = "none"
  internationalDiv.style.display = "none"
  amountDiv.style.display = "none";
  interAmountDiv.style.display = "none";
  comfrimDiv.style.display = "none";
  OTPDiv.style.display = "none";
  successfulDiv.style.display = "flex";
  sendLocal.style.display = "none";
  sendInternation.style.display = "none";
}
document.querySelector('#successful-btn')
.addEventListener('click', () => {
  window.location.replace("/my_account.html");
});


// for international transaction 
document.querySelector('.send-international').addEventListener('click', displaySendInternational);

function displaySendInternational(){
  send.style.display = "none";
  local.style.display = "none";
  international.style.display = "block";

  inputDiv.style.display = "none"
  internationalDiv.style.display = "flex"
  sendLocal.style.display = "none";
  sendInternation.style.display = "none";
}
// for international back button 
document.getElementById('international-back-btn')
.addEventListener('click', backButton);

// showing international amount back button 
document.querySelector('.inter-amount-back-btn')
.addEventListener('click', interAmountBackBtn);
function interAmountBackBtn(){
  send.style.display = "none";
  local.style.display = "none";
  international.style.display = "block"

  inputDiv.style.display = "none";
  internationalDiv.style.display = "none"
  interAmountDiv.style.display = "none"
  interDiv.style.display = "flex";
  sendLocal.style.display = "none";
  sendInternation.style.display = "none";
}

// showing international confrim back button 
document.querySelector('.inter-details-back-btn')
.addEventListener('click', interConfrimBackBtn);
function interConfrimBackBtn(){
  send.style.display = "none";
  local.style.display = "none";
  international.style.display = "block"

  inputDiv.style.display = "none";
  internationalDiv.style.display = "none"
  interConfirmDiv.style.display = "none"
  interAmountDiv.style.display = "flex";
  interDiv.style.display = "none";
  sendLocal.style.display = "none";
  sendInternation.style.display = "none";
}

const interSelectElement = document.querySelector('#inter-select');
interSelectElement.addEventListener('change', () => {
  const interSelectOption = interSelectElement.value
  if (interSelectOption === 'Current account') {
    // alert(`withdraw from ${interSelectOption}`);
    localStorage.setItem('interCurrentOption', interSelectOption);
    localStorage.removeItem('interSavingOption');
  } else {
    if (interSelectOption === 'Saving account') {
      // alert(`withdraw from ${interSelectOption}`);
      localStorage.setItem('interSavingOption', interSelectOption);
      localStorage.removeItem('interCurrentOption');
    }
  }
})
// showing international amount content
interProceedBtn.addEventListener('click', showInterAmountContent);
function showInterAmountContent() {
  const nameInp = document.querySelector('.js-acc-name').value;
  localStorage.setItem('internameInp', nameInp);

  const swiftInp = document.querySelector('.js-Swift-code').value;

  const bankNameInp = document.querySelector('.js-bank-name').value;

  const remarkInp = document.querySelector('.js-remark').value;
  localStorage.setItem('interRemarkInp', remarkInp);


  if(nameInp === '' || swiftInp === '' || bankNameInp === '' || remarkInp === '') {
    alert("Please fill in all input fields.");
    return;
  }
  send.style.display = "none";
  local.style.display = "none";
  international.style.display = "block";

  inputDiv.style.display = "none"
  internationalDiv.style.display = "none"
  amountDiv.style.display = "none";
  interAmountDiv.style.display = "flex"
  sendLocal.style.display = "none";
  sendInternation.style.display = "none";
}

// showing international confirm details
interAmountBtn.addEventListener('click', showInterComfrimDetails)
function showInterComfrimDetails() {
  const amountInp = document.querySelector('.js-amount').value;

  const formattedAmountInp = Number(amountInp).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  localStorage.setItem('interAmount', formattedAmountInp)
  const nameInp = document.querySelector('.js-acc-name').value;

  const swiftInp = document.querySelector('.js-Swift-code').value;
  const bankNameInp = document.querySelector('.js-bank-name').value;

  document.querySelector('.js-name').textContent = nameInp;
  document.querySelector('.js-SwiftCode').textContent = swiftInp;
  document.querySelector('.js-bank').textContent = bankNameInp;
  document.querySelector('.js-amounts').textContent = formattedAmountInp;

  if(amountInp === ''){
    alert("Please fill in all input fields.");
    return; 
  }

  send.style.display = "none";
  local.style.display = "none";
  international.style.display = "block";

  inputDiv.style.display = "none";
  internationalDiv.style.display = "none";
  interAmountDiv.style.display = "none";
  interConfirmDiv.style.display = "flex";
  // OTPDiv.style.display = "none";
  sendLocal.style.display = "none";
  sendInternation.style.display = "none";
}

document.querySelector('#inter-confrim-btn').addEventListener('click', () => {
  document.querySelector('#inter-confrim-btn').innerHTML = 'Please wait...'
  interSendOTP()
});

function interSendOTP() {
  let emailInput = sessionStorage.getItem("userEmail");
  const OTPDiv = document.getElementById('send-otp-div');
  let otpInp = document.getElementById('otp-input');
  const otpBtn = document.querySelector('#otp-btn');

  // Generate an OTP 
  let otp = Math.floor(Math.random() * 1000000);

  let emailBody = `
  <h1> Confirm Transation for MB Finance</h2>
  <h2> Your OTP is </h2> ${otp}
  `;
  console.log('CLICKED')
  Email.send({
    SecureToken : "f5aa37ee-bee0-41d8-9596-073b787babdc",
    To : emailInput,
    From : "karenmayortega76@gmail.com",
    Subject: "This is from MB Finance",
    Body : emailBody
  }).then(
    message => {
      if(message === 'OK'){
        send.style.display = "none";
        local.style.display = "none";
        international.style.display = "block";

        inputDiv.style.display = "none"
        internationalDiv.style.display = "none"
        amountDiv.style.display = "none";
        interAmountDiv.style.display = "none";
        // comfrimDiv.style.display = "none";
        interConfirmDiv.style.display = "none";
        OTPDiv.style.display = "grid";
        sendLocal.style.display = "none";
        sendInternation.style.display = "none";
        console.log('ok')


        otpBtn.addEventListener('click', (e)=>{
          e.preventDefault()
          if(otpInp.value == otp){
            // alert('Email address verified...');
            const userId = localStorage.getItem("userId");
            interSendMoney(userId)
          }else{
            alert('Enter correct otp')
          }
        })
      }
    }
  );
}
function interSendMoney(userid){
  const amountInp = Number(document.querySelector('.js-amount').value);
  const interCurrent = localStorage.getItem('interCurrentOption');
  const interSaving = localStorage.getItem('interSavingOption');

  if (interCurrent) {
    database.ref('users/' + userid + '/checking').once('value')
    .then((snapshot) => {
      let interCheckingBalance = snapshot.val();
      if (interCheckingBalance >= amountInp) {
        let interNewTotalBalance = interCheckingBalance - amountInp;
        database.ref('users/' + userid + '/checking').set(interNewTotalBalance);
      }else{
        alert('Insufficient balance')
      }
    })
  }

  if (interSaving) {
    database.ref('users/' + userid + '/saving').once('value')
    .then((snapshot) => {
      let interSavingBalance = snapshot.val();
      if (interSavingBalance >= amountInp) {
        let interNewTotalBalance = interSavingBalance - amountInp;
        database.ref('users/' + userid + '/saving').set(interNewTotalBalance);
      }else{
        alert('Insufficient balance')
      }
    })
  }
  InterSaveTransaction()
  interDisplaySuccessful();
}
function InterSaveTransaction() {
  const interAmount = localStorage.getItem('interAmount');
  const interName = localStorage.getItem('internameInp');
  const interRemark = localStorage.getItem('interRemarkInp');
  // Get the current user's ID
  const userId = localStorage.getItem("userId");
  const transactionDetails = {
    name: interName,
    remark: interRemark,
    amount: interAmount
  };
  const userTransactionRef = database.ref('users/' + userId + '/transactions');
  userTransactionRef.push(transactionDetails);

}
function interDisplaySuccessful(){
  const OTPDiv = document.getElementById('send-otp-div');
  const successfulDiv = document.querySelector('.successful');
  const amountInp = document.querySelector('.js-amount').value;
  const formattedAmountInp = Number(amountInp).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
  document.querySelector('.you-sent').textContent = formattedAmountInp ;
  document.querySelector('.deducted').textContent = formattedAmountInp ;

  send.style.display = "none";
  local.style.display = "none";
  international.style.display = "none";

  inputDiv.style.display = "none"
  internationalDiv.style.display = "none"
  amountDiv.style.display = "none";
  interAmountDiv.style.display = "none";
  comfrimDiv.style.display = "none";
  OTPDiv.style.display = "none";
  successfulDiv.style.display = "flex";
  sendLocal.style.display = "none";
  sendInternation.style.display = "none";
}
