/**Variables globales del visor CSP, vienen del fichero configuracion.xml*/

//-----url wms y wfs
var WMS = document.getElementById("WMS").value;
if (WMS.substr(WMS.length - 1) != "?") {
	WMS = WMS + "?";
}
var WFS = document.getElementById("WFS").value;
if (WFS.substr(WFS.length - 1) != "?") {
	WFS = WFS + "?";
}
//-----fin url wms y wfs

//-----prefijo en geoserver
var prefijo = document.getElementById("prefijo").value;
//-----fin prefijo en geoserver

//-----grupo de capas base
var grupoBase = document.getElementById("grupoBase").value;

var nbBaseOSM = document.getElementById("nbBaseOSM").value;
var urlBaseOSM = document.getElementById("urlBaseOSM").value;

var nbOrtofoto = document.getElementById("nbOrtofoto").value;
var capaOrtofoto = document.getElementById("capaOrtofoto").value;
//-----fin grupo de capas base

//-----grupo de capas prediales
var grupoPredial = document.getElementById("grupoPredial").value;

var nbTerreno = document.getElementById("nbTerreno").value;
var capaTerreno = document.getElementById("capaTerreno").value;

var nbConstruccion = document.getElementById("nbConstruccion").value;
var capaConstruccion = document.getElementById("capaConstruccion").value;

var nbCobertura = document.getElementById("nbCobertura").value;
var capaCobertura = document.getElementById("capaCobertura").value;

var nbUnidad = document.getElementById("nbUnidad").value;
var capaUnidad = document.getElementById("capaUnidad").value;

var nbElPredialesUnion = document.getElementById("nbElPredialesUnion").value;
var capaElPredialesUnion = document.getElementById("capaElPredialesUnion").value;

//-----fin grupo de capas prediales

//-----grupo de capas limites administrativos
var grupoLimites = document.getElementById("grupoLimites").value;

var nbDepartamentos = document.getElementById("nbDepartamentos").value;
var capaDepartamentos = document.getElementById("capaDepartamentos").value;

var nbMunicipios = document.getElementById("nbMunicipios").value;
var capaMunicipios = document.getElementById("capaMunicipios").value;

var nbColombia = document.getElementById("nbColombia").value;
var capaColombia = document.getElementById("capaColombia").value;

//-----fin grupo de capas limites administrativos

//-----grupo de Servicios IGAC

var grupoServiciosIGAC = document.getElementById("grupoServiciosIGAC").value;

var WMSCartoBasica500 = document.getElementById("WMSCartoBasica500").value;
if (WMSCartoBasica500.substr(WMSCartoBasica500.length - 1) != "?") {
	WMSCartoBasica500 = WMSCartoBasica500 + "?";
}

var nbCartoBasica500 = document.getElementById("nbCartoBasica500").value;
var capaCartoBasica500 = document.getElementById("capaCartoBasica500").value;

var WMSCartoBasica100 = document.getElementById("WMSCartoBasica100").value;
if (WMSCartoBasica100.substr(WMSCartoBasica100.length - 1) != "?") {
	WMSCartoBasica100 = WMSCartoBasica100 + "?";
}

var nbCartoBasica100 = document.getElementById("nbCartoBasica100").value;
var capaCartoBasica100 = document.getElementById("capaCartoBasica100").value;

var WMSCartoBasica10 = document.getElementById("WMSCartoBasica10").value;
if (WMSCartoBasica10.substr(WMSCartoBasica10.length - 1) != "?") {
	WMSCartoBasica10 = WMSCartoBasica10 + "?";
}

var nbCartoBasica10 = document.getElementById("nbCartoBasica10").value;
var capaCartoBasica10 = document.getElementById("capaCartoBasica10").value;


var WMSAreasReglaEsp = document.getElementById("WMSAreasReglaEsp").value;
if (WMSAreasReglaEsp.substr(WMSAreasReglaEsp.length - 1) != "?") {
	WMSAreasReglaEsp = WMSAreasReglaEsp + "?";
}

var nbResguardosIndigenas = document.getElementById("nbResguardosIndigenas").value;
var capaResguardosIndigenas = document.getElementById("capaResguardosIndigenas").value;


var nbComunidadesNegras = document.getElementById("nbComunidadesNegras").value;
var capaComunidadesNegras = document.getElementById("capaComunidadesNegras").value;

//-----fin grupo de Servicios IGAC

//-----grupo de Servicios IDEAM

var grupoServiciosIDEAM = document.getElementById("grupoServiciosIDEAM").value;

var WMSCoberturasTierra = document.getElementById("WMSCoberturasTierra").value;
if (WMSCoberturasTierra.substr(WMSCoberturasTierra.length - 1) != "?") {
	WMSCoberturasTierra = WMSCoberturasTierra + "?";
}

var nbCoberTierra2000_2002 = document.getElementById("nbCoberTierra2000_2002").value;
var capaCoberTierra2000_2002 = document.getElementById("capaCoberTierra2000_2002").value;

var nbCoberTierra2005_2009 = document.getElementById("nbCoberTierra2005_2009").value;
var capaCoberTierra2005_2009 = document.getElementById("capaCoberTierra2005_2009").value;

var nbCoberTierra2010_2012 = document.getElementById("nbCoberTierra2010_2012").value;
var capaCoberTierra2010_2012 = document.getElementById("capaCoberTierra2010_2012").value;

var nbCoberParamos = document.getElementById("nbCoberParamos").value;
var capaCoberParamos = document.getElementById("capaCoberParamos").value;


//-----fin grupo de Servicios IDEAM

//-----Capas de Usuario

var nameUsuario = document.getElementById("nameUsuario").value;

//-----fin Capas de Usuario

//-----URL Geocoder OSM

var urlGeocoderOSM = document.getElementById("urlGeocoderOSM").value;

//-----fin URL Geocoder OSM
