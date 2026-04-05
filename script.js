// NAV
function toggleMenu(){
  document.getElementById("navLinks")?.classList.toggle("active");
}

// ADMIN SECRET
function adminAccess(){
  let pass = prompt("Enter admin password:");
  if(pass === "1234"){
    localStorage.setItem("session","admin");
    location = "admin.html";
  }
}

// AUTH UI
function showLogin(){
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
}

function showRegister(){
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
}

// REGISTER
function register(){
  let u = regUser.value;
  let p = regPass.value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({username:u,password:p});
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered!");
  showLogin();
}

// LOGIN
function login(){
  let u = loginUser.value;
  let p = loginPass.value;

  if(u==="admin" && p==="1234"){
    localStorage.setItem("session","admin");
    location="admin.html";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let found = users.find(x=>x.username===u && x.password===p);

  if(found){
    localStorage.setItem("session",u);
    location="app.html?view=services"; // 🔥 REDIRECT TO SERVICES
  } else {
    alert("Invalid");
  }
}

// ORDER SAVE
function submitOrder(service){
  let order = {
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,
    service: service,
    date: new Date().toLocaleString(),
    status: "Pending"
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order placed!");
}

// ADMIN LOAD
function loadOrders(){
  let table = document.getElementById("ordersTable");
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  table.innerHTML = "";

  orders.forEach((o,i)=>{
    table.innerHTML += `
      <tr>
        <td>${o.name}</td>
        <td>${o.service}</td>
        <td>${o.address}</td>
        <td>${o.date}</td>
        <td>${o.status}</td>
        <td>
          <button onclick="complete(${i})">✔</button>
          <button onclick="removeOrder(${i})">❌</button>
        </td>
      </tr>
    `;
  });
}

function complete(i){
  let orders = JSON.parse(localStorage.getItem("orders"));
  orders[i].status = "Completed";
  localStorage.setItem("orders", JSON.stringify(orders));
  loadOrders();
}

function removeOrder(i){
  let orders = JSON.parse(localStorage.getItem("orders"));
  orders.splice(i,1);
  localStorage.setItem("orders", JSON.stringify(orders));
  loadOrders();
}

document.getElementById("orderForm").addEventListener("submit", function(e){
  e.preventDefault();

  let formData = new FormData();
  formData.append("name", document.getElementById("name").value);
  formData.append("address", document.getElementById("address").value);
  formData.append("service", document.getElementById("service").value);

  fetch("order.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("message").innerText = data;
  });
});