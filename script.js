let costoTelaXMetro = document.getElementById("costotela").value;
let costoHiloUnidad = 0.8;
let costoCordonXMetro = document.getElementById("costocordon").value;
let cantidadBolsas = document.getElementById("cantidadbolsas").value;
let costoGrifaXBolsa = 5;

//Calcula la mejor posicion de corte (a lo largo/a lo ancho) y cantidad de bolsas por metro.
function calculoPosicion() {
  let anchoBolsa = parseInt(document.getElementById("anchobolsa").value);
  let largoBolsa = parseInt(document.getElementById("largobolsa").value);
  let anchoTela = parseInt(document.getElementById("anchotela").value);
  let largoTela = 1000;
  let anchoEnAncho = 0;
  for (let i = anchoBolsa; i <= anchoTela; i += anchoBolsa) {
    anchoEnAncho++;
  }
  let largoEnAncho = 0;
  for (let k = largoBolsa; k <= anchoTela; k += largoBolsa) {
    largoEnAncho++;
  }
  let anchoEnLargo = 0;
  for (let m = anchoBolsa; m <= largoTela; m += anchoBolsa) {
    anchoEnLargo++;
  }
  let anchoEnLargoFinal = anchoEnLargo / 10;
  let largoEnLargo = 0;
  for (let o = largoBolsa; o <= largoTela; o += largoBolsa) {
    largoEnLargo++;
  }
  let largoEnLargoFinal = largoEnLargo / 10;
  //Obtiene la cantidad de bolsas en 1 metro de tela y calcula la mejor opcion de corte.
  let ancho = anchoEnAncho * largoEnLargoFinal;
  let anchoOLargo = "";
  let soloValor;
  if (largoBolsa > anchoTela) {
    let anchoIf = anchoEnAncho * largoEnLargoFinal;
    anchoOLargo = "ancho. Salen: " + anchoIf + " bolsas.";
    soloValor = ancho;
    cantidadTela(soloValor, anchoEnAncho, largoBolsa);
  } else {
    let largo = anchoEnLargoFinal * largoEnAncho;
    if (ancho > largo) {
      anchoOLargo = "ancho. Salen: " + ancho + " bolsas.";
      soloValor = ancho;
      cantidadTela(soloValor, anchoEnAncho, largoBolsa);
    } else {
      anchoOLargo = "largo. Salen: " + largo + " bolsas.";
      soloValor = largo;
      cantidadTela(soloValor, largoEnAncho, anchoBolsa);
    }
  }
  let opcionCorte = document.getElementById("opcioncorte");
  let mensajeCorte = document.getElementById("mejorcorte");
  mensajeCorte.innerHTML = "Mejor corte a lo " + anchoOLargo;
  if (costoCordonXMetro > 0) costoCordonUtilizado(anchoBolsa);
  costoGrifasUtilizadas(cantidadBolsas);
  costoManoDeObra(anchoBolsa, largoBolsa);
  costoTotalCotizacion(
    costoTelaXMetro,
    costoHiloNecesario,
    costoCordonTotal,
    costoGrifasTotal,
    costoManoDeObraASumar
  );
}
//Calcula cuantos metros de tela son necesarios.
function cantidadTela(a, b, c) {
  let cantidadBolsas = parseInt(
    document.getElementById("cantidadbolsas").value
  );
  let j = 0;
  let k = a;
  //Calcula cuantos metros son necesarios sin tener en cuenta el remainder.
  for (let i = a; i <= cantidadBolsas; i += a) {
    j++;
    k = i;
  }
  //Calcula el metraje extra necesario en caso que la cuenta anterior no sea exacta.
  let restoBolsasDiv = (cantidadBolsas - k) / b;
  let restoBolsasRem = (cantidadBolsas - k) % b;
  if (restoBolsasRem > 0) {
    restoBolsasDiv + 1;
  }
  let extraMetrosTela = restoBolsasDiv * c;
  if (a > cantidadBolsas) {
    extraMetrosTela = extraMetrosTela * -1;
  }
  let metrosNecesarios = document.getElementById("cotizacion");
  let metrosNecesariosFinal = document.getElementById("metrosnecesarios");
  metrosNecesariosFinal.innerHTML =
    "Se necesitan " + j + "," + parseInt(extraMetrosTela) + " metros de tela.";
  costoTelaUsada(j, extraMetrosTela);
  costoHiloUsado(cantidadBolsas);
}
//Calcula el costo de la tela utilizada.
function costoTelaUsada(a, b) {
  costoTelaXMetro = costoTelaXMetro / 100;
  costoTelaXMetro = costoTelaXMetro * (a * 100 + b);
  let costoTelaNecesaria = document.getElementById("costotelanecesaria");
  costoTelaNecesaria.innerHTML =
    "Costo tela: $" + (parseInt(costoTelaXMetro) + 1);
}
//Calcula el costo del hilo utilizado.
function costoHiloUsado(a) {
  let costoHiloNecesario = costoHiloUnidad * a;
  let mensajeCostoHilo = document.getElementById("costohilonecesario");
  mensajeCostoHilo.innerHTML =
    "Costo hilo: $" + (parseInt(costoHiloNecesario) + 1);
}
//Calcula el costo del cordon utilizado.
function costoCordonUtilizado(a) {
  let costoCordonTotal = (costoCordonXMetro / 3000) * a * 4 + 20;
  let mensajeCostoCordon = document.getElementById("costocordonnecesario");
  mensajeCostoCordon.innerHTML =
    "Costo cordon: $" + (parseInt(costoCordonTotal) + 1);
}
//Calcula el costo de las grifas utilizadas.
function costoGrifasUtilizadas(a) {
  costoGrifasTotal = costoGrifaXBolsa * a;
  let mensajeCostoGrifas = document.getElementById("costogrifasnecesarias");
  mensajeCostoGrifas.innerHTML = "Costo grifas: $" + parseInt(costoGrifasTotal);
}
//Calcula el costo mano de obra.
function costoManoDeObra(a, b) {
  let costoManoDeObraASumar;
  if (a + b <= 10) {
    costoManoDeObraASumar = 6;
  } else if (a + b <= 20) {
    costoManoDeObraASumar = 7;
  } else if (a + b <= 40) {
    costoManoDeObraASumar = 8;
  } else if (a + b <= 50) {
    costoManoDeObraASumar = 9;
  } else if (a + b <= 65) {
    costoManoDeObraASumar = 15;
  } else costoManoDeObraASumar = 30;
  let mensajeCostoManoDeObra = document.getElementById("costomanodeobra");
  mensajeCostoManoDeObra.innerHTML =
    "Costo mano de obra: $" + parseInt(costoManoDeObraASumar);
}
//Calcula el costo total de la cotizacion solicitada.
function costoTotalCotizacion(a, b, c, d, e) {
  let costoTotal = a + b + c + d + e;
  let mensajeCostoTotal = document.getElementById("costototal");
  mensajeCostoTotal.innerHTML = "Total: $" + parseInt(costoTotal);
}

//Trae la informacion ingresada de la seccion de cotizacion
let botonCortes = document.getElementById("botoninformacion");
botonCortes.addEventListener("click", calculoPosicion);
