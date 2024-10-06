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

let users = {
  Harvey_Morley: {
    id: 'Harvey_Morley',
    name: 'Harvey Morley',
    email: 'harveymorley2112@gmail.com',
    password: 'JettsDad2112@',
    checking: 1300000/100,
    saving: 30000/100,
  },
  Bailey_Kay: {
    id: 'Bailey_Kay',
    name: 'Bailey Kay',
    email: 'baileykayx76@gmail.com',
    password: 'password456',
    checking: 50000/100,
    saving: 10000 / 100,
  },
  Karen_Noxy: {
    id: 'Karen_Noxy',
    name: 'Karen Noxy',
    email: 'leograyson1969@gmail.com',
    password: 'password00',
    checking: 30000/100,
    saving: 1000/100,
  },
};
export default users;

document.addEventListener('DOMContentLoaded', () => {
  const signInBtn = document.querySelector('#sign-btn');
  const passwordInp = document.getElementById('password'); 
  signInBtn.addEventListener('click', () => {
    const password = passwordInp.value;
    signIn(password);
  })
});
function signIn(password){
  localStorage.setItem("userpassword", password);
  let emailInput = document.getElementById('email').value;
  // const password = document.getElementById('password').value; 

  for (let userid in users) {
    if (users[userid].email === emailInput) {
      if( users[userid].password === password){
        alert('Sign in successful!');
        firebase.auth().signInAnonymously()
        .then(() => {
          console.log('Anonymous authentication successful.')
        })
        .catch((error) => {
          console.error('Anonymous authentication failed:', error);
        });
        database.ref('users/' + userid).on('value', (snapshot) => {
          const data = snapshot.val();
          console.log(data);
        });
        database.ref('users/' + userid).push(users[userid])
        .then(() => {
          console.log("User saved successfully!");
        }).catch((error) => {
          console.error("Error saving user:", error);
        });
        document.querySelector('#sign-btn').innerHTML = 'Please wait...';
        sessionStorage.setItem('isLoggedIn', true);
        localStorage.setItem("userName", users[userid].name);
        localStorage.setItem("userId", users[userid].id);
        localStorage.setItem("userChackings", users[userid].checking);
        localStorage.setItem("userSavings", users[userid].saving);
        sendOTP();
        return true;
      }else{
        alert('Wrong password')
        return false;
      }
    }
  } 
  alert('Email not found');
}
function sendOTP() {
  // Reference  
  let emailInput = document.getElementById('email').value;
  sessionStorage.setItem("userEmail", emailInput);
  const otpverify = document.getElementsByClassName('otpverify')[0];
  const mainForm = document.querySelector('.main-form');
  let otpInp = document.getElementById('opt-input');
  const otpBtn = document.querySelector('.opt-btn');

  // Generate an OTP 
  let otp = Math.floor(Math.random() * 1000000);

  let emailBody = `
  <h1> Welcome to MB Finance</h2>
  <h2> Your OTP is </h2> ${otp}
  `;
  Email.send({
    // 994501B42584E496588F63403A45BF3899DB
    SecureToken : "d2640e04-1651-4372-b5db-eeac16179d0a ",
    To : emailInput,
    From : "leograyson1969@gmail.com",
    Subject : "This is from MB Finance",
    Body : emailBody
  }).then(
    message => {
      if(message === 'OK'){
        otpverify.style.display = "block";
        mainForm.style.display = "none";
        console.log('sent')
        otpBtn.addEventListener('click', (e)=>{
          e.preventDefault()
          console.log('clicked')
          if(otpInp.value == otp){
            alert('Email address verified...')
            window.location.replace("/MB-Finance/my_account.html");
          }else{
            alert('Enter correct otp')
          }
        })
      }
    }
  ).catch((error) => {
    console.error(error)
  })
}

// const fgtPwdLink =  document.querySelector('.fgt-pwd');

// fgtPwdLink.addEventListener('click', ()=> {
//   alert('Service Unavailable, try again later....');
// });
