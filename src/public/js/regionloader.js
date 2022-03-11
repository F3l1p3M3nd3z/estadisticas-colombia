

//selectores
const nombredpto = document.querySelectorAll(".map path "); // obtiene los id de los departamentos
const departamentos = document.querySelector("#departamentos"); // select en el que se injectan los departamentos
const municipios = document.querySelector("#municipios");
const select = document.querySelector(".up h1");
const estadisticas = document.querySelector(".down")
const btnconsulta = document.querySelector("#btn_consulta")
const btncerrar = document.querySelector("#btncerrar")
const like = document.querySelector("#like")

//variables
let option = departamentos.options;
let munOpt = municipios.options;
let nombres = [];
let munNombres = [];

//eventListeners
like.addEventListener('click', ()=>{
  like.style.fill = "red";
});

departamentos.addEventListener("change", (e) => {
  nombredpto.forEach((dpto, index) => {
    if (e.target.value == nombredpto[index].id) {
      btnconsulta.disabled = false;
      value1 =  select.textContent = dpto.id;
      nombredpto[index].style.fill = "tomato";
      
    } else {
      nombredpto[index].style.fill = "#F5F5F5";
    }
  });
  obtenerMunicipios(e.target.value);
  
});

municipios.addEventListener("change", (e) => {    
  let municipioactual = e.target.value
  select.textContent = value1 + " / " + municipioactual
});

btnconsulta.addEventListener('click', () => {
  ejecutarConsulta()
});

btncerrar.addEventListener('click', () => {
  estadisticas.hidden = true
  municipios.disabled = false;
  departamentos.disabled = false
  select.parentElement.hidden = false

})

//funciones
function obtenerDepartamentos() {
  nombredpto.forEach((dpto) => {
    nombres.push(dpto.id);
  });
};

function mostrarDepartamentos() {
  nombres.forEach((dpto, index) => {
    option[index] = new Option(dpto);
    option[index].setAttribute("value", dpto);
  });
  option[6].disabled = true;
}

function obtenerMunicipios(nomb) {
  let dpto = nomb;
  let geturl =
    "https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=" + dpto;
  fetch(geturl)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      mostrarMunicipios(res, dpto);
      //console.log(res)
    });
};

function mostrarMunicipios(array, nom) {
  munNombres = [];
  array.forEach((e) => {
    if (e.departamento == nom) {
      munNombres.push(e.municipio);
    }
  });
  selectMun();
}
function selectMun() {
  limpiar();
  munNombres.forEach((mun, index) => {
    munOpt[index] = new Option(mun);
    munOpt[index].setAttribute("value", mun);
  });
}
function limpiar() {
  while (municipios.firstChild) {
    municipios.removeChild(municipios.firstChild);
  }
}

function ejecutarConsulta() {
  municipios.disabled = true;
  departamentos.disabled = true
  select.parentElement.hidden = true
  estadisticas.hidden = false
};

function onInit() {
  select.parentElement.hidden = false
  estadisticas.hidden = true;
  btnconsulta.disabled = true;
  obtenerDepartamentos();
  mostrarDepartamentos();
  
}

onInit();

