let cart=[];

function addToCart(item){
cart.push(item);
document.getElementById("cart").innerText="Cart: "+cart.join(", ");
}

function submitForm(e){
e.preventDefault();
alert("Thank you! We will contact you soon.");
}
