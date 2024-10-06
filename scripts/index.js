function myFunction() {
  let x = document.getElementById("navLinks");
  
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
window.onload =  () => {
  const saveLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (saveLoggedIn == true) {
    console.log('logged IN')
    window.location.href = '/My_account';
  }
}