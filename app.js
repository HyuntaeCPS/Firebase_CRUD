// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCCH6Sm-suP2mKJaTtENNRbSOey2yhK-Kg",
  authDomain: "mahasiswa-d66bd.firebaseapp.com",
  projectId: "mahasiswa-d66bd",
  storageBucket: "mahasiswa-d66bd.appspot.com",
  messagingSenderId: "1039329303518",
  appId: "1:1039329303518:web:2b47997b336509aca79b4f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let namaV = document.getElementById("nama");
let npmV = document.getElementById("npm");
let tbody = document.getElementById("tbody");
let editnama = document.getElementById("editnama");
let editnpm = document.getElementById("editnpm");
let idV = document.getElementById("id");
//Create Data

function createData() {
  let data = {
    nama: namaV.value,
    npm: npmV.value
  };
  database.ref("datamahasiswa").push(data);
  namaV.value = "";
  npmV.value = "";
}

// Read Data
database.ref("datamahasiswa").on("value", ambildata);
function ambildata(snapshoot) {
  let table = "";
  let no = 1;
  snapshoot.forEach((data) => {
    // console.log(data.val());
    table += `
          <tr>   
            <th scope="row">${no}</th>
            <td>${data.val().nama}</td>
            <td>${data.val().npm}</td>
            <td><button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editRow('${data.key}')">
            Edit
            </button>
            <button type="button" class="btn btn-danger" onclick="deleteRow('${data.key}') ">Hapus</button>
            
            
            </td>
          </tr>
    
    `;
    no++;
  });

  tbody.innerHTML = table;
}

//show data edit
function editRow(id) {
  database.ref("datamahasiswa/" + id).on("value", function (snapshoot) {
    editnama.value = snapshoot.val().nama;
    editnpm.value = snapshoot.val().npm;
    idV.value = id;
  });
}

//update data
function updateData() {
  let updateData = document.getElementById("updateData");
  let data = {
    nama: editnama.value,
    npm: editnpm.value
  };
  database.ref("datamahasiswa/" + idV.value).update(data);
  updateData.setAttribute("data-bs-dismiss", "modal");
}

function deleteRow(id) {
  database.ref("datamahasiswa/" + id).remove();
}
