/* ================= LOAD PAYMENT AMOUNT ================= */

function loadPayment(){
    const total = localStorage.getItem("footflex_payment_total") || 0;
    document.getElementById("payAmount").innerText = "Amount: ₹" + total;
}

/* ================= SUCCESS FUNCTION ================= */

function paymentSuccess(method){

    // Show confirmation message
    alert("Payment Successful via " + method + " 🎉\nYour order has been placed.");

    // Clear stored data
    localStorage.removeItem("footflex_cart");
    localStorage.removeItem("footflex_payment_total");

    // Go to home page safely
    setTimeout(()=>{
        window.location.href = "index.html";
    },800);
}

/* ================= PAYMENT METHODS ================= */

function payUPI(){
    simulateProcessing("UPI");
}

function payCard(){
    simulateProcessing("Card");
}

function payCOD(){
    paymentSuccess("Cash on Delivery");
}

/* ================= FAKE PROCESSING LOADER ================= */

function simulateProcessing(method){

    const amountBox = document.getElementById("payAmount");
    amountBox.innerText = "Processing Payment... ⏳";

    setTimeout(()=>{
        paymentSuccess(method);
    },1500);
}
