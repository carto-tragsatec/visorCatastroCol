//include ("../CartoJus/cartojus/public/lib/ext/Ext/ext-all-debug.js");

/**
 * Method: GetWidth
 * lee el ancho del navegador
 *
 * Parameters:
 *
 * Returns:
 * x ancho de navegador.
 *
 */
function GetWidth()
{
    var x = 0;
    if (self.innerHeight)
    {
            x = self.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientHeight)
    {
            x = document.documentElement.clientWidth;
    }
    else if (document.body)
    {
            x = document.body.clientWidth;
    }
    return x;
}

/**
 * Method: GetHeight
 * lee el alto del navegador
 *
 * Parameters:
 *
 * Returns:
 * x alto de navegador.
 *
 */
function GetHeight()
{
    var y = 0;
    if (self.innerHeight)
    {
            y = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight)
    {
            y = document.documentElement.clientHeight;
    }
    else if (document.body)
    {
            y = document.body.clientHeight;
    }
    return y;
}

/**
 * Method: resolucionPantalla
 * devuelve la resolucion de pantalla
 *
 * Parameters:
 *
 * Returns:
 * w ancho de pantalla
 *
 */
function resolucionPantalla()
{
    var w = screen.width;
    return w;
}


/**
 * Method: zoomInicial
 * establece el nivel de zoom inicial a partir de la resolucion
 *
 * Parameters:
 *
 * Returns:
 * zoomActual, nivel de zoom
 *
 */
function zoomInicial()
{
    if (screen.width <= 1024)
    {
        zoomActual = 2;
    }
    else if (screen.width <= 1154)
    {
        zoomActual = 2;
    }
    else if (screen.width <= 1280)
    {
        zoomActual = 4;
    }
    else
    {
        zoomActual = 5;
    }

}

/**
 * Method: dameClave
 * devuelve la clave encriptada en md5
 *
 * Parameters:
 *  clave
 *
 * Returns:
 * clave en encriptacion md5
 *
 */
function dameClave(clave){
    return hex_md5(clave);
}


/**
 * Method: extraeId
 *
 * Parameters:
 *  resText respuesta getFeatureInfo
 *  nbCodigo campo codigo de la capa
 *
 * Returns:
 * {String}
 */
 function extraeId(respText, nbCodigo)
 {
     var id = "";
     var lines = respText.split('\n');

     for (lcv = 0; lcv < (lines.length); lcv++)
     {
         var vals = lines[lcv].replace(/^\s*/,'').replace(/\s*$/,'').replace(/ = /,"=").replace(/'/g,'').split('=');
         if (vals[1] == "") {
             vals[1] = "Desconocido";
         }
         if (vals[0].indexOf(nbCodigo) != -1 ) {
             id = vals[1];
         }
     }
    return id;
 }


/**
 * Method: reemplazaLiteral
 * reemplaza el literal de los campos a mostrar en el visor
 *
 * Parameters:
 *  resText respuesta getFeatureInfo
 *  nbCodigo campo codigo de la capa
 *
 * Returns:
 * {String}
 */
function reemplazaLiteral (literal)
{
    var nuevoLiteral="";
    switch (literal) {
        case 'SEDE':
            nuevoLiteral = "SEDE";
            break;
        case 'TIPO':
            nuevoLiteral = "TIPO";
            break;
        case 'NUM_UJD':
            nuevoLiteral = "UNIDADES JUDICIALES";
            break;
        case 'NUM_MUN':
            nuevoLiteral = "NÃÆÃÂ¯ÃâÃÂ¿ÃâÃÂ½MERO MUNICIPIOS";
            break;
        case 'MODULO':
            nuevoLiteral ="MÃÆÃÂ¯ÃâÃÂ¿ÃâÃÂ½DULO INGRESO";
            break;
        case 'INGRESO':
            nuevoLiteral = "ASUNTOS INGRESADOS";
            break;
        case 'RESUELT':
            nuevoLiteral = "ASUNTOS RESUELTOS";
            break;
        case 'PENDIEN':
            nuevoLiteral = "ASUNTOS PENDIENTES";
            break;
        case 'PROMEDI':
            nuevoLiteral = "PROMEDIO INGRESO";
            break;
        case 'REL_MOD':
            nuevoLiteral = "RELACIÃÆÃÂ¯ÃâÃÂ¿ÃâÃÂ½N MÃÆÃÂ¯ÃâÃÂ¿ÃâÃÂ½DULO";
            break;
        case 'LITIGIO':
            nuevoLiteral = "ÃÆÃÂ¯ÃâÃÂ¿ÃâÃÂ½NDICE LITIGIOSIDAD";
            break;
        case 'VACANC':
            nuevoLiteral = "PORCENTAJE VACANTES";
            break;
        case 'NUM_HAB':
            nuevoLiteral = "POBLACIÃÆÃÂ¯ÃâÃÂ¿ÃâÃÂ½N";
            break;
        case 'UND_HAB':
            nuevoLiteral = "PORCENTAJE UNID. JUDICIALES";
            break;
        case 'SUP_KM2':
            nuevoLiteral = "SUPERFICIE (km<sup>2</sup>)";
            break;
        case 'MUNICIP':
            nuevoLiteral = "MUNICIPIO";
            break;
        case 'SUP_KM2':
            nuevoLiteral = "SUPERFICIE (km<sup>2</sup>)";
            break;
        case 'PROVINC':
            nuevoLiteral = "PROVINCIA";
            break;
        case 'SUP_KM2':
            nuevoLiteral = "SUPERFICIE";
            break;
        case 'CCAA':
            nuevoLiteral = "CCAA";
            break;
        case 'AREA_KM2':
            nuevoLiteral = "SUPERFICIE (km<sup>2</sup>)";
            break;
        default:
            nuevoLiteral = literal;
            break;
    }
    return nuevoLiteral;
}


/**
 * Method: sldIdentificar
 * genera un estilo mediante una cadena sld para la identificacion
 *
 * Parameters:
 *
 * Returns:
 * {String}
 */
function sldIdentificar(capa)
{
    var sld;


    sld = '<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>';
    sld = sld + '<StyledLayerDescriptor version=\"1.0.0\" xsi:schemaLocation=\"http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd\" xmlns=\"http://www.opengis.net/sld\" xmlns:ogc=\"http://www.opengis.net/ogc\" xmlns:se=\"http://www.opengis.net/se\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">';
    sld = sld + '<NamedLayer>';
    sld = sld + '<Name>' + capa + '</Name>';
    sld = sld + '<UserStyle>';
    sld = sld + '<Title>xxx</Title>';
    sld = sld + '<Name>xxx</Name>';
    sld = sld + '<IsDefault>0</IsDefault>';
    sld = sld + '<FeatureTypeStyle>';

    sld = sld + '<Rule>';
    sld = sld + '<Name>identificacion</Name>';
    sld = sld + '<Title>identificacion</Title>';
    sld = sld + '<PolygonSymbolizer>';
    sld = sld + '<Stroke>';
    sld = sld + '<CssParameter name="stroke">#D7DF01</CssParameter>';
    sld = sld + '<CssParameter name=\"stroke-width\">1.2</CssParameter>';
    sld = sld + '<CssParameter name=\"stroke-opacity\">1</CssParameter>';
    sld = sld + '</Stroke>';
    sld = sld + '<Fill>';
    sld = sld + '<CssParameter name=\"fill\">#FFFF00</CssParameter>';
    sld = sld + '<CssParameter name=\"fill-opacity\">0.7</CssParameter>';
    sld = sld + '</Fill>';
    sld = sld + '</PolygonSymbolizer>';
    sld = sld + '</Rule>';

    sld = sld + '</FeatureTypeStyle>';
    sld = sld + '</UserStyle>';
    sld = sld + '</NamedLayer>';
    sld = sld + '</StyledLayerDescriptor>'; ;

    return sld;
}

function timeStamp(now) {
  //var now = new Date();
  var date = [now.getDate(), now.getMonth() + 1,  now.getFullYear() ];
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
  /*var suffix = ( time[0] < 12 ) ? "AM" : "PM";

  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
  time[0] = time[0] || 12;

  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }

  return date.join("/") + " " + time.join(":") + " " + suffix;*/
  return date.join("/") + " " + time.join(":");
}


function getPrefijoURL()
{
      var strAux = document.location.pathname.substring(0, document.location.pathname.indexOf("/",1));
      var strPrefijoUrl = document.location.protocol + "//" + document.location.host + strAux;
      return strPrefijoUrl;
}


function AbrirFichero(fichXML)
{
    var xmlDoc=undefined;
    try
    {
        if (document.all) //IE
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        }
        else //firefox
        {
            xmlDoc = document.implementation.createDocument("","",null);
        }
        xmlDoc.async=false;
        xmlDoc.load(fichXML);
    }
    catch(e)
    {
        try { //otros safari, chrome
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET",fichXML,false);
            xmlhttp.send(null);
            xmlDoc = xmlhttp.responseXML.documentElement;
            return xmlDoc;
        }
        catch (e)
        {
            return undefined;
        }
    }
    return xmlDoc;
}

 /**
 * Funcion que devuelve la fecha actual y la fecha modificada n dias
 * Tiene que recibir el numero de dias en positivo o negativo para sumar o
 * restar a la fecha actual.
 * Ejemplo:
 *  calcularFecha(-10) => restara 10 dias a la fecha actual
 *  calcularFecha(30) => aÃÆÃÂ¯ÃâÃÂ¿ÃâÃÂ½adira 30 dias a la fecha actual
 */
function calcularFecha(days){
    milisegundos=parseInt(35*24*60*60*1000);

    fecha=new Date();
    day=fecha.getDate();
    // el mes es devuelto entre 0 y 11
    month=fecha.getMonth()+1;
    year=fecha.getFullYear();

    //Obtenemos los milisegundos desde media noche del 1/1/1970
    tiempo=fecha.getTime();
    //Calculamos los milisegundos sobre la fecha que hay que sumar o restar...
    milisegundos=parseInt(days*24*60*60*1000);
    //Modificamos la fecha actual
    total=fecha.setTime(tiempo+milisegundos);
    //day=fecha.getDate();
    //month=fecha.getMonth()+1;
    year=fecha.getFullYear();

    if ((fecha.getMonth() + 1) > 0 && (fecha.getMonth() + 1) < 10)
    {
        month = "0" + (fecha.getMonth() + 1);
    }
    else{
        month = "" + (fecha.getMonth() + 1);
    }

    if (fecha.getDate() > 0 && fecha.getDate() < 10)
    {
        day = "0" + fecha.getDate();
    }
    else{
        day = "" + fecha.getDate();
    }


    return year+"-"+month+"-"+day;
}


function replaceAll(text, busca, reemplaza ){
  while (text.toString().indexOf(busca) != -1)
      text = text.toString().replace(busca,reemplaza);
  return text;
}


function monthFormatEEUUtoES (month)
{
    return month +1;
}

function ConvertDDToDMS(D, lng){
    return {
        dir : D<0?lng?'W':'S':lng?'E':'N',
        deg : 0|(D<0?D=-D:D),
        min : ((D - (0|(D<0?D=-D:D))) * 60).toFixed(2)
        //min : 0|D%1*60//,
        //sec :(0|D*60%1*6000)/100
    };
}

function formatearCoord (value, dig)
{
    var valueFormatted = value.toString();
    var lg = valueFormatted.length;
    if(lg < dig)
    {
        for (var i = 0; i < (dig - lg); i++)
        {
            valueFormatted = "0" + valueFormatted;
        }
    }
    return valueFormatted;
}

function formatearVel (value)
{
    var valueInteger;
    var valueDecimal = "0";
    var arr;
    if(value.toString().indexOf(".") != -1)
    {
        arr = value.toString().split(".");
        valueInteger = arr[0];
        valueDecimal = arr[1].substring(0, 1);
    }
    else if (value.toString().indexOf(",") != -1){
        arr = value.toString().split(",");
        valueInteger = arr[0];
        valueDecimal = arr[1].substring(0, 1);
    }
    else{
        arr = value.toString();
        valueInteger = arr;
    }
    var lg = valueInteger.length;

    if(lg < 2)
    {
        for (var i = 0; i < (2 - lg); i++)
        {
            valueInteger = "0" + valueInteger;
        }
    }

    return valueInteger + "." + valueDecimal;
}

function formatearRumbo (value)
{
    var valueFormatted;
    if (value.toString().indexOf(".") != -1)
    {
        valueFormatted = value.toString().split(".")[0];
    }
    else if (value.toString().indexOf(",") != -1)
    {
        valueFormatted = value.toString().split(",")[0];
    }
    else{
        valueFormatted = value.toString();
    }
    var lg = valueFormatted.length;
    if(lg < 3)
    {
        for (var i = 0; i < (3 - lg); i++)
        {
            valueFormatted = "0" + valueFormatted;
        }
    }
    return valueFormatted;
}

function dateToFormatUTC (date) {

  return date.getUTCFullYear() +
    '-' + pad( date.getUTCMonth() + 1 ) +
    '-' + pad( date.getUTCDate() ) +
    'T' + pad( date.getUTCHours() ) +
    ':' + pad( date.getUTCMinutes() ) +
    ':' + pad( date.getUTCSeconds() ) +
    '.' + (date.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
    'Z';
}

function dateToFormatWFS (date) {

  return date.getFullYear() +
    '-' + pad( date.getMonth() + 1 ) +
    '-' + pad( date.getDate() ) +
    'T' + pad( date.getHours() ) +
    ':' + pad( date.getMinutes() ) +
    ':' + pad( date.getSeconds() ) +
    '.' + (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
    'Z';
}

function pad(number) {
  if ( number < 10 ) {
    return '0' + number;
  }
  return number;
}

function rumboGradosToCadena (rumbo)
{
    var r = parseInt(rumbo);
    if(r == 0 || r == 360)
    {
        return "N";
    }
    else if(r == 90)
    {
        return "E";
    }
    else if (r == 180)
    {
        return "S";
    }
    else if (r == 270)
    {
        return "W";
    }
    else if (r >0 && r < 90)
    {
        return "NE";
    }
    else if (r >90 && r < 180)
    {
        return "SE";
    }
    else if (r >180 && r < 270)
    {
        return "SW";
    }
    else if (r >270 && r < 360)
    {
        return "NW";
    }
    else{
    	return "";
    }
}

function fechafechamenosX(dias)
{
    var d = new Date();

    var mes;
    if ((d.getMonth() + 1) > 0 && (d.getMonth() + 1) < 10)
    {
        mes = "0" + (d.getMonth() + 1);
    }
    else{
        mes = "" + (d.getMonth() + 1);
    }
    var dia;
    if (d.getDate() > 0 && d.getDate() < 10)
    {
        dia = "0" + d.getDate();
    }
    else{
        dia = "" + d.getDate();
    }

    var hora;
    if (d.getHours() >= 0 && d.getHours() < 10)
    {
        hora = "0" + d.getHours();
    }
    else{
        hora = "" + d.getHours();
    }

    var min;
    if (d.getMinutes() >= 0 && d.getMinutes() < 10)
    {
        min = "0" + d.getMinutes();
    }
    else{
        min = "" + d.getMinutes();
    }

    var seg;
    if (d.getSeconds() >= 0 && d.getSeconds() < 10)
    {
        seg = "0" + d.getSeconds();
    }
    else{
        seg = "" + d.getSeconds();
    }
    var fechaActual = d.getFullYear() + "-" + mes + "-" + dia + "T" + hora + ":" + min + ":" + seg + ".000Z";
    var fechaMenosUnDia = calcularFecha(-dias) + "T" + hora + ":" + min + ":" + seg + ".000Z";
    return {
        dia : fechaActual,
        diaMenosX : fechaMenosUnDia
    };
}

function getDiaHoraActu()
{
    var d = new Date();

    var mes;
    if ((d.getMonth() + 1) > 0 && (d.getMonth() + 1) < 10)
    {
        mes = "0" + (d.getMonth() + 1);
    }
    else{
        mes = "" + (d.getMonth() + 1);
    }
    var dia;
    if (d.getDate() > 0 && d.getDate() < 10)
    {
        dia = "0" + d.getDate();
    }
    else{
        dia = "" + d.getDate();
    }

    var hora;
    if (d.getHours() >= 0 && d.getHours() < 10)
    {
        hora = "0" + d.getHours();
    }
    else{
        hora = "" + d.getHours();
    }

    var min;
    if (d.getMinutes() >= 0 && d.getMinutes() < 10)
    {
        min = "0" + d.getMinutes();
    }
    else{
        min = "" + d.getMinutes();
    }

    var seg;
    if (d.getSeconds() >= 0 && d.getSeconds() < 10)
    {
        seg = "0" + d.getSeconds();
    }
    else{
        seg = "" + d.getSeconds();
    }
    var fechaActual = d.getFullYear() + "-" + mes + "-" + dia + "T" + hora + ":" + min + ":" + seg + ".00Z";
    return {
        dia : fechaActual
    };
}

function eliminarDuplicados(arr)
{
	var i, len=arr.length, out=[], obj={};

 	for (i=0;i<len;i++)
 	{
    	obj[arr[i]]=0;
	}
	for (i in obj) {
    	out.push(i);
	}
 	return out;
}

function restarFechas(f1, f2)
{
	 var aFecha1 = f1.split('-');
	 var aFecha2 = f2.split('-');
	 var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
	 var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
	 var dif = fFecha2 - fFecha1;
	 //var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
	 var dias = Math.ceil(dif / (1000 * 60 * 60 * 24)) + 1;
	 return dias;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Funcion que devuelve un numero separando los separadores de miles
 * Puede recibir valores negativos y con decimales
 */
function formatearMiles(numero){
    // Variable que contendra el resultado final
    var resultado = "";

        // Si el numero empieza por el valor "-" (numero negativo)
    if(numero[0]=="-")
    {
        // Cogemos el numero eliminando los posibles puntos que tenga, y sin
        // el signo negativo
        nuevoNumero=numero.replace(/\./g,'&#39;').substring(1);
    }else{
        // Cogemos el numero eliminando los posibles puntos que tenga
        nuevoNumero=numero.replace(/\./g,'&#39;');
        }

        // Si tiene decimales, se los quitamos al numero
    if(numero.indexOf(",")>=0)
        nuevoNumero=nuevoNumero.substring(0,nuevoNumero.indexOf(","));

        // Ponemos un punto cada 3 caracteres
    for (var j, i = nuevoNumero.length - 1, j = 0; i >= 0; i--, j++)
        resultado = nuevoNumero.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + resultado;

        // Si tiene decimales, se lo aÃÂ±adimos al numero una vez forateado con
    // los separadores de miles
    if(numero.indexOf(",")>=0)
        resultado+=numero.substring(numero.indexOf(","));

        if(numero[0]=="-")
    {
        // Devolvemos el valor aÃÂ±adiendo al inicio el signo negativo
        return "-"+resultado;
    }else{
        return resultado;
    }
}

/**
 * Funcion que modifica la leyenda estableciéndole los iconos de simbología
 *
 */

var myRenderer = function(value, metadata, record) {
	if (metadata != null)
	{
		metadata.tdAttr = 'data-qtip="' + value + '"';
		if (value == "Elementos prediales") {

			if (contElempredial == 1) {
					metadata.iconCls = "";
					metadata.tdCls = "";
					record.data.checked = true;
					if (checkelempredial == 0){
						record.data.checked = true;
						checkelempredial = checkelempredial + 1;
					}
					if (layerUnidad.getVisible() == false && layerConstruccion.getVisible() == false && layerTerreno.getVisible() == false && layerCobertura.getVisible() == false){
						record.data.checked = false;
						if(popup != ""){
							map.removeOverlay(popup);
							popup = "";
						}
					}/*else{
						record.data.checked = true;
					}*/
			}else{
					metadata.iconCls = "disabled x-item-disabled";
					metadata.tdCls = "disabled x-item-disabled";
					record.data.checked = false;
			}

		}

		else if (value == "Unidad") {
			if (contUnidad == 1) {
					metadata.iconCls = "icounidad";
					metadata.tdCls = "";
					if (checkunidad == 0){
						record.data.checked = true;
						checkunidad = checkunidad + 1;
					}
					if (layerUnidad.getVisible() == true){
						record.data.checked = true;
					}

			}else{
					metadata.iconCls = "disabled x-item-disabled icounidad";
					metadata.tdCls = "disabled x-item-disabled";
					record.data.checked = false;
					//x-item-disabled
			}

		}

		else if (value == "Cobertura") {
			if (contCobert == 1) {
					metadata.iconCls = "icocobertura";
					metadata.tdCls = "";
					if (checkcobertura == 0){
						record.data.checked = true;
						checkcobertura = checkcobertura + 1;
					}
					if (layerCobertura.getVisible() == true){
						record.data.checked = true;
					}

			}else{
					metadata.iconCls = "disabled x-item-disabled icocobertura";
					metadata.tdCls = "disabled x-item-disabled";
					record.data.checked = false;
			}

		}

		else if (value == "Construcción") {
			if (contConstr == 1) {
					metadata.iconCls = "icoconstruccion";
					metadata.tdCls = "";
					if (checkconstruccion == 0){
						record.data.checked = true;
						checkconstruccion = checkconstruccion + 1;
					}
					if (layerConstruccion.getVisible() == true){
						record.data.checked = true;
					}

			}else{
					metadata.iconCls = "disabled x-item-disabled icoconstruccion";
					metadata.tdCls = "disabled x-item-disabled";
					record.data.checked = false;
			}

		}

		else if (value == "Terreno" ) {
			if (contTerreno == 1) {
					metadata.iconCls = "icoterreno";
					metadata.tdCls = "";
					if (checkterreno == 0){
						record.data.checked = true;
						checkterreno = checkterreno + 1;
					}
					if (layerTerreno.getVisible() == true){
						record.data.checked = true;
					}else{
						map.removeInteraction(select);
					}


			}else{
					metadata.iconCls = "disabled x-item-disabled icoterreno";
					metadata.tdCls = "disabled x-item-disabled";
					record.data.checked = false;
			}

		}



		if (value == "Colombia") {
			metadata.iconCls = "icocolombia";
		}

		if (value == "Departamentos") {
			metadata.iconCls = "icodepartamentos";
		}

		if (value == "Municipios") {
			metadata.iconCls = "icomunicipios";
		}


		return value;
	}
}
