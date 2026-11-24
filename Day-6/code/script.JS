let products = [
    {name: "Water Lily", price: 8999,image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST7Svu4aoPtt7Fr1kwngqVvjQHTJN4qXVf6_p2nwvyVQ&s=10"},
    {name: "Spare", price: 6999,image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8f8Wsmxhr_y-mA2C6rQBFUZRieN2YxfFpucLjL9yvQA&s=10"},
    {name: "Clean Water", price: 6999,image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeMslEZ925GtfIGQZbZ4_5Oi8W3G361kpN0_3njTo_VA&s=10"}
];
let cart = [];
let quantity = [1, 1, 1, 1, 1];
function showMenu() {
    let menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    }
    else {
        menu.style.display = "block";
    }
}
function displayProducts(list) {
    let output = "";
    list.forEach((p) => {
        let i = products.indexOf(p);
        output += `
    <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Price: Rs.${p.price}</p>
        <button onclick="changeQty(${i}, -1)">-</button>
        <span id="qty${i}">${quantity[i]}</span>
        <button onclick="changeQty(${i}, 1)">+</button>
        <br><br>
        <button onclick="addCart(${i})">Add to Cart</button>
    </div>
`;
    });
    document.getElementById("products").innerHTML = output;
}
function changeQty(i, value) {
    quantity[i] += value;
    if (quantity[i] < 1) {
        quantity[i] = 1;
    }
    document.getElementById("qty" + i).innerText = quantity[i];
}
function addCart(i) {
    let item = cart.find(p => p.name === products[i].name);
    if (item) {
        item.quantity += quantity[i];
    }
    else {
        cart.push({
            name: products[i].name,
            price: products[i].price,
            quantity: quantity[i]
        });
    }
    displayCart();
}
function displayCart() {
    let output = "";
    let total = 0;
    cart.forEach((p) => {
        output += `
            <p>${p.name} - Rs.${p.price} x ${p.quantity}</p>
        `;
        total += p.price * p.quantity;
    });
    document.getElementById("cartItems").innerHTML = output;
    document.getElementById("total").innerText = total;
}
document.getElementById("search").addEventListener("input", function() {
    let value = this.value.toLowerCase();
    let filtered = products.filter((p) =>
        p.name.toLowerCase().includes(value)
    );
    displayProducts(filtered);
});
function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");
    if (name === "") {
        message.innerText = "Enter your name";
    }
    else if (email === "") {
        message.innerText = "Enter your email";
    }
    else if (password.length < 8) {
        message.innerText = "Password must contain 8 characters";
    }
    else {
        message.innerText = "Registration Successful";
    }
    return false;
}
displayProducts(products);
displayCart();
