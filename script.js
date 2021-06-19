let costoHiloUnidad = 0.8;
let costoGrifaXBolsa = 5;
let costoCordonTotal = 0;
let costoHiloNecesario;
let costoManoDeObraASumar;
let costoTelaUsadaF;

//Calcula la mejor posicion de corte (a lo largo/a lo ancho) y cantidad de bolsas por metro.
function calculoPosicion() {
  let costoTelaXMetro = parseInt(document.getElementById("costotela").value);
  let costoCordonXMetro = parseInt(
    document.getElementById("costocordon").value
  );
  let cantidadBolsas = parseInt(
    document.getElementById("cantidadbolsas").value
  );
  let anchoBolsa = parseInt(document.getElementById("anchobolsa").value);
  let largoBolsa = parseInt(document.getElementById("largobolsa").value);
  let anchoTela = parseInt(document.getElementById("anchotela").value);
  let largoTela = 1000;
  let anchoEnAncho = 0;
  for (let i = anchoBolsa; i <= anchoTela; i += anchoBolsa) {
    anchoEnAncho++;
  }
  console.log(anchoEnAncho);
  let largoEnAncho = 0;
  for (let k = largoBolsa; k <= anchoTela; k += largoBolsa) {
    largoEnAncho++;
  }
  let anchoEnLargo = 0;
  for (let m = anchoBolsa; m <= largoTela; m += anchoBolsa) {
    anchoEnLargo++;
  }
  let anchoEnLargoFinal = parseInt(anchoEnLargo / 10);
  let largoEnLargo = 0;
  for (let o = largoBolsa; o <= largoTela; o += largoBolsa) {
    largoEnLargo++;
  }
  let largoEnLargoFinal = parseInt(largoEnLargo / 10);
  //Obtiene la cantidad de bolsas en 1 metro de tela y calcula la mejor opcion de corte.
  let ancho = anchoEnAncho * largoEnLargoFinal;
  let anchoOLargo = "";
  let soloValor;
  if (largoBolsa > anchoTela) {
    let anchoIf = anchoEnAncho * largoEnLargoFinal;
    anchoOLargo = "ancho. Salen: " + anchoIf + " bolsas.";
    soloValor = ancho;
    cantidadTela(
      soloValor,
      anchoEnAncho,
      largoBolsa,
      cantidadBolsas,
      costoTelaXMetro,
      largoEnLargoFinal
    );
  } else {
    let largo = anchoEnLargoFinal * largoEnAncho;
    if (ancho > largo) {
      anchoOLargo = "ancho. Salen: " + ancho + " bolsas.";
      soloValor = ancho;
      console.log(ancho);
      cantidadTela(
        soloValor,
        anchoEnAncho,
        largoBolsa,
        cantidadBolsas,
        costoTelaXMetro,
        largoEnLargoFinal
      );
    } else {
      anchoOLargo = "largo. Salen: " + largo + " bolsas.";
      soloValor = largo;
      cantidadTela(
        soloValor,
        largoEnAncho,
        anchoBolsa,
        cantidadBolsas,
        costoTelaXMetro,
        anchoEnLargoFinal
      );
    }
  }
  let opcionCorte = document.getElementById("opcioncorte");
  let mensajeCorte = document.getElementById("mejorcorte");
  mensajeCorte.innerHTML = "Mejor corte a lo " + anchoOLargo;
  console.log(anchoBolsa, costoCordonXMetro);
  if (costoCordonXMetro > 0)
    costoCordonUtilizado(anchoBolsa, costoCordonXMetro, cantidadBolsas);
  console.log(costoCordonTotal);
  costoGrifasUtilizadas(cantidadBolsas);
  costoHiloUsado(cantidadBolsas);
  costoManoDeObra(anchoBolsa, largoBolsa, cantidadBolsas);
  costoTotalCotizacion(
    costoTelaUsadaF,
    costoHiloNecesario,
    costoCordonTotal,
    costoGrifasTotal,
    costoManoDeObraASumar
  );
}
//Calcula cuantos metros de tela son necesarios.
function cantidadTela(a, b, c, d, e, f) {
  let j = 0;
  let k = a;
  //Calcula cuantos metros son necesarios sin tener en cuenta el remainder.
  for (let i = a; i <= d; i += a) {
    j++;
    k = i;
  }
  //Calcula el metraje extra necesario en caso que la cuenta anterior no sea exacta.
  let restoBolsasDiv = (d - k) / b;
  let restoBolsasRem;
  if (d < k) {
    restoBolsasDiv = f * -1;
  } else {
    restoBolsasRem = (d - k) % b;
    if (restoBolsasRem > 0) {
      restoBolsasDiv + 1;
    }
  }
  let extraMetrosTela = restoBolsasDiv * c;
  if (a > d) {
    extraMetrosTela = extraMetrosTela * -1;
  }
  let metrosNecesarios = document.getElementById("cotizacion");
  let metrosNecesariosFinal = document.getElementById("metrosnecesarios");
  metrosNecesariosFinal.innerHTML =
    "Se necesitan " + j + "," + parseInt(extraMetrosTela) + " metros de tela.";
  costoTelaUsada(j, extraMetrosTela, e);
}
//Calcula el costo de la tela utilizada.
function costoTelaUsada(a, b, c) {
  costoTelaUsadaF = c / 100;
  costoTelaUsadaF = costoTelaUsadaF * (a * 100 + b);
  let costoTelaNecesaria = document.getElementById("costotelanecesaria");
  costoTelaNecesaria.innerHTML =
    "Costo tela: $" + (parseInt(costoTelaUsadaF) + 1);
}
//Calcula el costo del hilo utilizado.
function costoHiloUsado(a) {
  costoHiloNecesario = costoHiloUnidad * a;
  let mensajeCostoHilo = document.getElementById("costohilonecesario");
  mensajeCostoHilo.innerHTML =
    "Costo hilo: $" + (parseInt(costoHiloNecesario) + 1);
}
//Calcula el costo del cordon utilizado.
function costoCordonUtilizado(a, b, c) {
  costoCordonTotal = ((b / 3000) * a * 4 + (20 * b) / 3000) * c;

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
function costoManoDeObra(a, b, c) {
  if (a + b <= 35) {
    costoManoDeObraASumar = 6 * c;
  } else if (a + b <= 55) {
    costoManoDeObraASumar = 7 * c;
  } else if (a + b <= 70) {
    costoManoDeObraASumar = 8 * c;
  } else if (a + b <= 90) {
    costoManoDeObraASumar = 9 * c;
  } else if (a + b <= 130) {
    costoManoDeObraASumar = 15 * c;
  } else costoManoDeObraASumar = 30 * c;
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
