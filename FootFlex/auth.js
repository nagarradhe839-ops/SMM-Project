function registerUser(e){
e.preventDefault();

let user={
name:document.getElementById("name").value,
email:document.getElementById("email").value,
password:document.getElementById("password").value
};

localStorage.setItem("velouraUser",JSON.stringify(user));
alert("Account created! Please login.");
window.location="login.html";
}

function loginUser(e){
e.preventDefault();

let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

let stored=JSON.parse(localStorage.getItem("velouraUser"));

if(stored && stored.email===email && stored.password===password){
alert("Login Successful!");
localStorage.setItem("loggedIn",true);
window.location="index.html";
}
else{
alert("Invalid credentials");
}
}
