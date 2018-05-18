var map; //mapa
var mapComponent; // mapa Geoext
var storeAllLayers; //almacen de capas
var ventMousePosition; //ventana con la coordenadas del raton
var leftPanel; //panel izquierdo
var nortPanel; //panel norte

var baseMaps; //grupo capas base
var groupLayersPrediales; //grupo prediales
var layersNoLegend; // grupo no leyenda
var groupLimitesAdminis; // grupo límites administrativos
var groupServicesIGAC; // grupo Servicios IGAC
var groupServicesIDEAM; // grupo Servicios IDEAM
var layersUser; //Grupo de capas de usuario

var layerOrtofoto; //capa ortofoto

var layerTerreno; //capa terreno
var sourceLayerTerreno; //source capa terreno
var styleLayerTerrenoEti; //estilo capa terreno con etiqueta
var styleLayerTerrenoNoEti; //estilo capa terreno sin etiqueta
var Cond; // propiedad de condición de propiedad capa terreno
var NEdif; // propiedad del número de edificio capa terreno
var NPiso; // propiedad del número del piso capa terreno
var NUnidad; // propiedad del número de unidad ph o mejora capa terreno

var layerConstruccion; //capa construccion
var sourceLayerConstruccion; //source capa construccion
var styleLayerConstruccionEti; //estilo capa construccion con etiqueta
var styleLayerConstruccionNoEti; //estilo capa construccion sin etiqueta

var layerCobertura; //capa construccion
var sourceLayerCobertura; //source capa construccion
var styleLayerCoberturaEti; //estilo capa construccion con etiqueta
var styleLayerCoberturaNoEti; //estilo capa construccion sin etiqueta

var layerUnidad; //capa unidad
var sourceLayerUnidad; //source capa unidad
var styleLayerUnidadEti; //estilo capa unidad con etiqueta
var styleLayerUnidadNoEti; //estilo capa unidad sin etiqueta

var layerColombia; //capa límite colombia
var sourceLayerColombia; //source capa límite colombia
var styleLayerColombiaEti; //estilo capa límite colombia con etiqueta
var styleLayerColombiaNoEti; //estilo capa límite colombia sin etiqueta

var layerMunicipios; //capa municipios
var sourceLayerMunicipios; //source capa municipios
var styleLayerMunicipiosEti; //estilo capa municipios con etiqueta
var styleLayerMunicipiosNoEti; //estilo capa municipios sin etiqueta
var bboxMunicipios;

var layerDepartamentos; //capa departamentos
var sourceLayerDepartamentos; //source capa departamentos
var styleLayerDepartamentosEti; //estilo capa departamentos con etiqueta
var styleLayerDepartamentosNoEti; //estilo capa departamentos sin etiqueta

var layerMeasure; //capa de medida

var layerDraw;//capa de dibujar
var sourceLayerDraw;//source capa de dibujar
var color; //color de la capa de dibujar

var layerSelect;//capa de selección
var sourcelayerSelect;//source capa de selección

var featuresprint; //features impresión

var layergeocoder; // capa geocoder

var StoreLocZonaUniq; //almacén datos de zonas

var generalLayerOpacity; //controla sobre que capa del arbol se esta procediendo ha realizar clic

//------tooltip identificativo sobre las capas
var tooltipContainer; //muestra un tooltip al pasar sobre algunas capas
var tooltipContent;
var overlayTooltip; //overlay del tooltip

//------fin tooltip identificativo sobre las capas

//------popup identificativo sobre las capas
var popupCloser;
var popupContainer;
var popupContent;
var overlayPopup;

var popupcont = 0;
var popup;
var arrpopup = [];
var popuptipo2;
var isOnDiv = false;
var idDiv;
//------fin popup identificativo sobre las capas

//------ WFS

var typeNameLayer = 'typeName=' + prefijo + ':' + capaTerreno;
var typeNameLayerMun = 'typeName=' + prefijo + ':' + capaMunicipios;
var ordenarPorNumPredial = 'sortBy=numero_predial';
var propertyNumPredial = 'propertyName=numero_predial';
var ordenarPor = 'sortBy=mpio_cnmbr';
var propertyName = 'propertyName=mpio_cnmbr';
//var ordenarPorMun = 'sortBy=municipio';
//var propertyMun = 'propertyName=municipio';
var cqlfilter = 'CQL_FILTER=dpto_dpto_=';
var request = 'request=GetFeature';
var service = 'service=WFS';
var version = 'version=1.3.0';
var format = 'outputFormat=json';

//------Fin WFS

//------Declaración de modelos
Ext.define('modelLocPredial', {
	extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type: 'string', mapping: 'properties.numero_predial'}
    ]
});

//Modelo de localizacion Municipios
Ext.define('modelLocMun', {
	extend: 'Ext.data.Model',
    fields: [
    	{name: 'idDep', type: 'string', mapping: 'properties.dpto_dpto_'},
        {name: 'codMun',  type: 'string', mapping: 'properties.mpio_ccdgo'},
        {name: 'nbMun',  type: 'string', mapping: 'properties.mpio_cnmbr'}
    ]
});

//Modelo de localizacion Zonas

Ext.define('modelLocZona', {
	extend: 'Ext.data.Model',
    fields: [
    	{name: 'idZona', type: 'string', mapping: 'properties.zona'},
    	{name: 'nbZona', type: 'string', mapping: 'properties.zona'}
    ]
});

//Modelo de localizacion Sectores

Ext.define('modelLocSector', {
	extend: 'Ext.data.Model',
    fields: [
    	{name: 'idSector', type: 'string', mapping: 'properties.sector'}
    ]
});

//Modelo de localizacion Comunas/Corregimientos

Ext.define('modelLocComuna', {
	extend: 'Ext.data.Model',
    fields: [
    	{name: 'idComuna', type: 'string', mapping: 'properties.comuna'}
    ]
});

//Modelo de localizacion Barrios

Ext.define('modelLocBarrio', {
	extend: 'Ext.data.Model',
    fields: [
    	{name: 'idBarrio', type: 'string', mapping: 'properties.barrio'}
    ]
});

//Modelo de localizacion Manzanas/Veredas

Ext.define('modelLocManzana', {
	extend: 'Ext.data.Model',
    fields: [
    	{name: 'idManzana', type: 'string', mapping: 'properties.manzana'}
    ]
});

//Modelo de localizacion Predio

Ext.define('modelLocPredio', {
	extend: 'Ext.data.Model',
    fields: [
    	{name: 'idPredio', type: 'string', mapping: 'properties.predio'}
    ]
});

//Modelo de localizacion Condición Propiedad

Ext.define('modelLocCondProp', {
	extend: 'Ext.data.Model',
    fields: [
    	{name: 'idCondProp', type: 'string', mapping: 'properties.cond_propi'}
    ]
});

//Modelo de localizacion No. del Edificio

Ext.define('modelLocEdif', {
	extend: 'Ext.data.Model',
    fields: [
    	{name: 'idEdif', type: 'string', mapping: 'properties.edificio'}
    ]
});

//Modelo de localizacion No. del Piso

Ext.define('modelLocPiso', {
	extend: 'Ext.data.Model',
    fields: [
    	{name: 'idPiso', type: 'string', mapping: 'properties.npiso'}
    ]
});

//Modelo de localizacion Mejora

Ext.define('modelLocMejora', {
	extend: 'Ext.data.Model',
    fields: [
    	{name: 'idMejora', type: 'string', mapping: 'properties.unidadph'}
    ]
});

//------Fin Declaración de modelos

//funcionalidad añadir wms, constantes de conexion
var DEFAULT_CAPABILITIES_PARAMS_WMS = {
   'service': "WMS",
   'request': "GetCapabilities",
   'version': "1.3.0"
};
//funcionalidad añadir wfs, constantes de conexion
var DEFAULT_CAPABILITIES_PARAMS_WFS = {
   'service': "WFS",
   'request': "GetCapabilities",
   'version': "1.3.0"//,
   //'outputFormat': "application/json"
};
//funcionalidad añadir wmts, constantes de conexion
var DEFAULT_CAPABILITIES_PARAMS_WMTS = {
   'service': "WMTS",
   'request': "GetCapabilities"
};

// Evento Single Click
var eventMapSingleClick;

//Evento Pointer Move
var eventpointermove;

//Geocoder
var geocoder;

//Interacción de seleccionar atributos

var select;
var FeaturesSelect;
var arrfeaturesselect;

//Deshabilitar Leyenda

var checkelempredial = 0;
var checkterreno = 0;
var checkunidad = 0;
var checkconstruccion = 0;
var checkcobertura = 0;
var contTerreno;
var contConstr;
var contCobert;
var contUnidad;
var contElempredial;
