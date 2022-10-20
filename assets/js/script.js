// local storage Crud function
var dataForm = document.querySelector('.dataForm');
var item = document.querySelector('.item');
var loginForm = document.querySelector('.loginForm');
var logoutBtn = document.querySelector('.logout-btn a');
var quantity = document.querySelector('.quantity');
var username = document.querySelector('.username');
var password = document.querySelector('.password');
var dataItems = document.querySelector('.data-items');
var user1 = sessionStorage.getItem('username');
var pass1 = sessionStorage.getItem('password');
var editId = null;

function homeFunction() {
  var data = JSON.parse(localStorage.getItem('itemName'));
  var collection = data ? data : [];

  document.load = dataLoad();
  function dataLoad() {
    collection = JSON.parse(localStorage.getItem('itemName'));
    if (collection != null) {
      var li = '';
      collection.forEach(function (list, index) {
        li += ` <li class="data-list">
      <ul class="item-store">
                <li class="store-list">${index + 1}</li>
                <li class="store-list">${list.item}</li>
                <li class="store-list">${list.quantity}</li>
                <li class="store-list">
                  <a href="#FIXME" class="edit-btn" title="Edit" rel="noopener noreferrer">edit</a>
                </li>
                <li class="store-list">
                  <a href="#FIXME" class="delete-btn" data-del="${index}" title="Delete" rel="noopener noreferrer">delete</a>
                </li>
              </ul>
              </li>`;
      });
      dataItems.innerHTML = li;
      // Delete function
      if (dataItems.children.length != 0) {
        var deleteBtn = document.querySelectorAll('.delete-btn');
        deleteBtn.forEach(function (delBtn) {
          delBtn.addEventListener('click', function () {
            var delIndex = delBtn.dataset.del;
            collection.splice(delIndex, 1);
            localStorage.setItem('itemName', JSON.stringify(collection));
            dataLoad();
          });
        })
      }
      // Edit function
      if (dataItems.children.length != 0) {
        var editBtn = document.querySelectorAll('.edit-btn');
        editBtn.forEach(function (edBtn, ind) {
          edBtn.addEventListener('click', function () {
            editId = ind;
            item.value = edBtn.parentElement.parentElement.children[1].innerText;
            quantity.value = edBtn.parentElement.parentElement.children[2].innerText;
          })
        })
      };
    }
  }
  // submit function
  dataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    newList();
  });
  // new list add function
  function newList() {
    if (item.value.trim() != "" && quantity.value != "") {
      var dataObj = {
        item: item.value,
        quantity: quantity.value
      }
      if (editId === null) {
        collection.push(dataObj);
      } else {
        collection[editId] = dataObj;
      }
      localStorage.setItem('itemName', JSON.stringify(collection));
      dataLoad();
      item.value = "";
      quantity.value = "";
      editId = null;
    }
  }
  // logout function
  logoutBtn.addEventListener('click', function () {
    location.href = './login.html';
  })
}

function loginFunction() {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    login();
    username.value = '';
    password.value = '';
  });
  localStorage.setItem('username', 'saif');
  localStorage.setItem('password', '1234');
  var user = localStorage.getItem('username');
  var pass = localStorage.getItem('password');

  function login() {
    if (username.value === user && pass === password.value) {
      sessionStorage.setItem('username', username.value);
      sessionStorage.setItem('password', password.value);
      location.href = './index.html';
    } else {
      console.log('please enter valid username and password');
    }
  }
}

if (document.body.classList.contains("home")) {
  if (user1 && pass1) {
    homeFunction();
  } else {
    location.href = './login.html';
  }
} else if (document.body.classList.contains("loginPage")) {
  if (user1 && pass1) {
    location.href = './index.html';
  } else {
    loginFunction();
  }
}
























