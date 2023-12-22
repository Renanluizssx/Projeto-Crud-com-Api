const lista = document.querySelector(".listar");
const modal = document.querySelector(".modals");
const inputIdUpdate = document.getElementById("id-update");
const inputNomeUpdate = document.getElementById("nome-update");
const inputValorUpdate = document.getElementById("valor-update");
const inputUrlFotoUpdate = document.getElementById("url-foto-update");
const inputNomeAdd = document.getElementById("nome-new");
const inputValorAdd = document.getElementById("valor-new");
const inputUrlFotoAdd = document.getElementById("url-foto-new");
document.addEventListener("DOMContentLoaded", fetchListar);
const buttonAdicionar = document.getElementById("adicione");
const buttonAtualizar = document.getElementById("change");
buttonAdicionar.addEventListener("submit", function (e) {
  Adicionar();
  e.preventDefault();
});
buttonAtualizar.addEventListener("click", function () {
  Update();
  fetchListar();
  location.reload();
});

function Adicionar() {
  let produto = {
    nome: inputNomeAdd.value,
    valor: inputValorAdd.value,
    foto: inputUrlFotoAdd.value,
  };

  fetch("https://profrodolfo.com.br/api/put/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
function deletar(id) {
  console.log(id);
  let confirm = window.confirm("Deseja mesmo deletar");
  if (confirm) {
    fetch(`https://profrodolfo.com.br/api/delete/${id}`)
      .then((res) => res.json())
      .then(() => window.alert("Excluido com Sucesso"));
  } else {
    return false;
  }
}
function Update() {
  let produto = {
    id: inputIdUpdate.value,
    nome: inputNomeUpdate.value,
    valor: inputValorUpdate.value,
    foto: inputUrlFotoUpdate.value,
  };
  console.log(produto);

  fetch("https://profrodolfo.com.br/api/update/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
function listar(api, e) {
  lista.innerHTML += `
        <div class="row">
            <div class="col align-items-center justify-content-center">
              <div class="card mb-3 h-75">
                    <div class="row g-0">
                        <div>
                            <img src="${api.foto}" class="img-fluid" alt="${api.nome}">
                          </div>
                            <div>
                            <div class="card-body col-6 d-flex justify-content-center">
                                <h5 class="card-title">${api.nome}</h5>
                                <p class="card-text0"><small class="text-body-secondary">${api.valor}</p>
                                <div class="buttons">
                                  <button type="button" onclick="editar(${api.id})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-dismiss="modal">Editar</button>
                                  <button type="button" onclick="deletar(${api.id})" class="btn btn-danger">Excluir</button>
        
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        `;
}
function fetchListar(e) {
  lista.innerHTML = ``;
  fetch("https://profrodolfo.com.br/api/listar")
    .then((api) => api.json())
    .then((api) =>
      api.forEach((api) => {
        listar(api);
      })
    );
  console.log("teste");
}

function editar(id) {
  fetch(`https://profrodolfo.com.br/api/listar/${id}`)
    .then((res) => res.json())
    .then((res) => {
      res.map((res) => {
        inputIdUpdate.value = res.id;
        inputNomeUpdate.value = res.nome;
        inputValorUpdate.value = res.valor;
        inputUrlFotoUpdate.value = res.foto;
      });
    });
}
