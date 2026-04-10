/* ========= GET CART ========= */

function getCart(){
    return JSON.parse(localStorage.getItem("footflex_cart")) || [];
}

/* ========= CALCULATE TOTAL ========= */

function calculateTotal(){

    const cart = getCart();
    let total = 0;

    cart.forEach(item=>{
        total += Number(item.price) * Number(item.qty);
    });

    return total;
}

/* ========= LOAD CHECKOUT PAGE ========= */

document.addEventListener("DOMContentLoaded", ()=>{

    const totalBox = document.getElementById("checkoutTotal");
    if(!totalBox) return;

    const total = calculateTotal();

    totalBox.innerText = "Total Amount: ₹" + total;

});

document.querySelector("form")?.addEventListener("submit",(e)=>{
    e.preventDefault();

    // Save order total for payment page
    const total = calculateTotal();
    localStorage.setItem("footflex_payment_total", total);

    window.location = "payment.html";
});


