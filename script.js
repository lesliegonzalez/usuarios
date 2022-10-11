
//Solicitud Fetch para mandar a traer API
function solicitudFetch(){
    let tamaño = 0;
    let usuarios;

    fetch("https://reqres.in/api/users?delay=3")
    .then( (response) => response.json())
    .then( (conversion) => {
        //Se asigna el valor de la respuesta a una variable
        usuarios = conversion.data;
        //Guardar en local storage info de la API
        usarLocalStorage(usuarios);
        //Creación de div de acuerdo con el número de usuarios
        mostrarInfo(usuarios);
    })
}

function leerUsuario(){
    const timeout = JSON.parse(localStorage.getItem("timeout"));
    const objBoton = document.getElementById("boton");
    const objSpinner = document.getElementById("spinner");

    objSpinner.hidden = false;

    if(timeout > Date.now()){
        leerLocalStorage();
    }
    else{
        localStorage.clear();
        solicitudFetch(); 
    }

    objBoton.disabled = true;
}

function mostrarInfo(usuarios){
    for (let i = 0; i < usuarios.length; i++) {
        let div = document.createElement('div');
        const objDiv = document.getElementById("container");
        let name = usuarios[i].first_name + " " + usuarios[i].last_name;
        let email = usuarios[i].email;
        let avatar = usuarios[i].avatar;
        let idDinamico = "div" + i;
        let formato = 
            `<img src="${avatar}" class="card-img-top rounded-circle mx-auto" style="width: 200px">
            <div class="card-body">
                <h5 class="card-title text-center">${name}</h5>
                <p class="card-text text-center"><a href='#'>${email}</a></p>
            </div>`;

       
        div.id = idDinamico;
        div.innerHTML = formato;
        div.className = 'card h-100';
        objDiv.appendChild(div);
    }
}

function usarLocalStorage(usuarios){
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("timeout", Date.now()+60000);
}

function leerLocalStorage(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    mostrarInfo(usuarios);
}

function refresh(){
    location.reload();
}