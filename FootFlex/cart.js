/* ================= STORAGE ================= */

function getCart(){
    return JSON.parse(localStorage.getItem("footflex_cart")) || [];
}

function saveCart(cart){
    localStorage.setItem("footflex_cart", JSON.stringify(cart));
    updateBadge();
}

/* ================= ADD TO CART (EVENT DELEGATION) ================= */

document.addEventListener("click", function(e){

    const btn = e.target.closest(".add-to-cart");
    if(!btn) return;

    const card = btn.closest(".product-card");
    if(!card) return;

    const nameEl  = card.querySelector(".pname");
    const priceEl = card.querySelector(".price");
    const sizeEl  = card.querySelector(".size");
    const imgEl   = card.querySelector("img");

    if(!nameEl || !priceEl || !sizeEl || !imgEl){
        alert("Product HTML structure incorrect");
        return;
    }

    const name  = nameEl.innerText.trim();
    const price = Number(priceEl.dataset.price);
    const size  = sizeEl.value;
    const img   = imgEl.src;

    if(!price || isNaN(price)){
        alert("Price not detected. Add data-price attribute.");
        return;
    }

    if(size === ""){
        alert("Please select size");
        return;
    }

    let cart = getCart();

    const id = name + "_" + size;

    const existing = cart.find(p => p.id === id);

    if(existing){
        existing.qty += 1;
    } else {
        cart.push({id,name,price,size,img,qty:1});
    }

    saveCart(cart);
    showToast(name + " added to cart");

});

/* ================= CART PAGE ================= */

document.addEventListener("DOMContentLoaded", ()=>{
    loadCartPage();
    updateBadge();
});

function loadCartPage(){

    const container = document.getElementById("cartItems");
    const totalBox  = document.getElementById("total");

    if(!container || !totalBox) return;

    let cart = getCart();
    container.innerHTML="";
    let total=0;

    cart.forEach((item,index)=>{

        total += item.price * item.qty;

        container.innerHTML += `
        <div class="cart-row">
            <img src="${item.img}" class="cart-img">

            <div>
                <h3>${item.name}</h3>
                <p>Size: ${item.size}</p>
                <p>₹${item.price}</p>
            </div>

            <div class="qty">
                <button onclick="dec(${index})">-</button>
                <span>${item.qty}</span>
                <button onclick="inc(${index})">+</button>
            </div>

            <h3>₹${item.price * item.qty}</h3>

            <button onclick="removeItem(${index})">Remove</button>
        </div>`;
    });

    totalBox.innerText = "Total: ₹" + total;
}

/* ================= CART ACTIONS ================= */

function inc(i){
    let cart=getCart();
    cart[i].qty++;
    saveCart(cart);
    loadCartPage();
}

function dec(i){
    let cart=getCart();
    if(cart[i].qty>1) cart[i].qty--;
    else cart.splice(i,1);
    saveCart(cart);
    loadCartPage();
}

function removeItem(i){
    let cart=getCart();
    cart.splice(i,1);
    saveCart(cart);
    loadCartPage();
}

/* ================= BADGE ================= */

function updateBadge(){
    const badge=document.getElementById("cartCount");
    if(!badge) return;
    let cart=getCart();
    let count=cart.reduce((a,b)=>a+b.qty,0);
    badge.innerText=count;
}

/* ================= TOAST ================= */

function showToast(msg){
    const t=document.createElement("div");
    t.className="toast";
    t.innerText=msg;
    document.body.appendChild(t);
    setTimeout(()=>t.remove(),1500);
}
