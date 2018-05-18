/**
 * Creacion del mapa
 **/
var createMap = function() {
	var mymap, mousePositionControl, zoomslider, scaleLine, zoomextent, overviewmap;

	iniciarCapas();

	// Crea el mapa de OpenLayers
	mymap = new ol.Map({
		interactions: ol.interaction.defaults({
			doubleClickZoom: false,
			altShiftDragRotate:false,
			pinchRotate:false
		}),
		target: 'map',
		layers: [baseMaps, groupServicesIGAC, groupServicesIDEAM,  groupLimitesAdminis, layersUser, groupLayersPrediales, layersNoLegend],
		view : new ol.View({
			//center : [921512, 470997],
			center : [1109892.657 , 883016.943],
			projection: 'EPSG:3116',
			zoom : 6,
			minZoom : 5,
			maxZoom : 24,
			extent : [-1196532.2744517857, -1015385.781, 1800456.0974069335, 2686133.044]
		}),
		controls: ol.control.defaults({ attribution: false, zoom: false, rotate: false})
	});

	// Crea el control de barra de zoom
	zoomslider = new ol.control.ZoomSlider();

	// Crea la barra de escala
	scaleLine = new ol.control.ScaleLine();

	// Crea el botón pantalla completa
	zoomextent = new ol.control.ZoomToExtent({
		className: 'zoomExtent',
		label: '',
		tipLabel: 'Vista completa',
		extent: [-198599.0748082276, 84370.46153131116, 2418384.388808227, 1681663.4244686887]
	});

	overviewmap = new ol.control.OverviewMap({
		layers: [baseMaps, layerColombia],
		view : new ol.View({
			center : [1109892.657 , 883016.943],
			projection: 'EPSG:3116',
			zoom : 2,
			minZoom : 2,
			maxZoom : 10,
			extent : [-1196532.2744517857, -1015385.781, 1800456.0974069335, 2686133.044]
		})
	});

	// Crea el control de la posicion del raton
	mousePositionControl = new ol.control.MousePosition({
		projection: 'EPSG: 3116',
		undefinedHTML: "<table width=100%>" +
		    				"<tr>" +
		    					"<td>EPSG: 3116</td>" +
			    			"</tr>" +
			    			"<tr>" +
			    				"<td align='left'>Lon: </td>" +
			    			"</tr>" +
			    			"<tr>" +
			    				"<td align='left'>Lat: </td>" +
			    			"</tr>" +
			    			"<tr>" +
			    				"<td align='rigth'>Escala: </td>" +
		    				"</tr>" +
						"</table>",

		coordinateFormat : function(coordinate) {

    		var lon = coordinate[0].toFixed(3);
    		var lat = coordinate[1].toFixed(3);

    		return "<table width=100%>" +
	    				"<tr>" +
	    					"<td>EPSG: 3116</td>" +
		    			"</tr>" +
		    			"<tr>" +
		    				"<td align='left'>x: " + lon + "</td>" +
		    			"</tr>" +
		    			"<tr>" +
		    				"<td align='left'>y: " + lat + "</td>" +
		    			"</tr>" +
		    			"<tr>" +
		    				"<td align='rigth'>Escala: 1/" + getCurrentScale(map) + "</td>" +
	    				"</tr>" +
    				"</table>";

		},
		className : 'custom-mouse-position',
		target : document.getElementById('mouse-position')
	});

	//Geocoder
	 var provider = OsOpenNamesSearch({
	    url: '//api.geonames.org/searchJSON?'
	 });

	 geocoder = new Geocoder('nominatim', {
	    // Specify the custom provider instance as the "provider" value
	    provider: provider,
	    autoComplete: true,
  		lang: 'es', //en-US, fr-FR
  		placeholder: 'Buscar por ...',
  		targetType: 'text-input',
  		limit: 5,
  		keepOpen: true
	 });

 	 geocoder.on('addresschosen', function (evt) {
    	if (evt.bbox) {
	      mymap.getView().fit(evt.bbox, { duration: 500 });
	    } else {
	      mymap.getView().animate({ zoom: 14, center: evt.coordinate });
	    }
	 });

	// ----Capa geocoder----

	layergeocoder = geocoder.getLayer();

	// ----fin Capa geocoder----

	//añadimos el control al mapa
	mymap.addControl(zoomslider);
	mymap.addControl(scaleLine);
	mymap.addControl(zoomextent);
	mymap.addControl(overviewmap);
	mymap.addControl(mousePositionControl);


	//crea div y overlay para tooltip
	if (tooltipContainer) {
    	tooltipContainer.parentNode.removeChild(tooltipContainer);
  	}
  	tooltipContainer = document.createElement('div');
  	tooltipContainer.className = 'tooltip';

	tooltipContent = document.createElement('div');
	tooltipContent.className = 'tooltipcontent';
	tooltipContainer.appendChild(tooltipContent);

  	overlayTooltip = new ol.Overlay({
		element: tooltipContainer,
		offset: [0, 0],
	  	positioning: 'bottom-left'
  	});
	mymap.addOverlay(overlayTooltip);

	eventpointermove = mymap.on('pointermove', pointermoveIdentificar);

	//evento moveend del mapa
	eventMapZoomend = mymap.on('moveend',
		function(evt) {
			eventoMoveEnd(mymap);
		}
	);

	mymap.on('singleclick',function(evt) {NoSelection(mymap);});

	eventMapSingleClick = mymap.on('singleclick', singleclickIdentificar);

	//fin crea div y overlay para popup

	return mymap;
};

function pointermoveIdentificar (evt)
{
	  var pixel = evt.pixel;
	  var features = [];

		var feature = map.forEachFeatureAtPixel(pixel, function(feature, ly) {

			if (typeof Object.assign != 'function') {
			  Object.assign = function(target, varArgs) { // .length of function is 2
			    'use strict';
			    if (target == null) { // TypeError if undefined or null
			      throw new TypeError('Cannot convert undefined or null to object');
			    }

			    var to = Object(target);

			    for (var index = 1; index < arguments.length; index++) {
			      var nextSource = arguments[index];

			      if (nextSource != null) { // Skip over if undefined or null
			        for (var nextKey in nextSource) {
			          // Avoid bugs when hasOwnProperty is shadowed
			          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
			            to[nextKey] = nextSource[nextKey];
			          }
			        }
			      }
			    }
			    return to;
			  };
			}

			if (typeof feature.get('features') === 'undefined') {

				if (ly.get('name') == nbTerreno || ly.get('name') == nbConstruccion || ly.get('name') == nbCobertura || ly.get('name') == nbUnidad){
					if (map.getView().getZoom() >= 14 ){

						features.push(Object.assign({'Tipo': ly.get('name')}, feature.getProperties()));
					}
				}
			}else{

			 	var cfeatures = feature.get('features');
			 	for (var i = 0; i < cfeatures.length; i++) {
			 		features.push(Object.assign({'Tipo': ly.get('name')}, cfeatures[i].getProperties()));
			 	}
			}

		}, {
  		layerFilter: function(ly){  // solo activado para cuatro capas
  			if (ly === layerTerreno || ly === layerConstruccion || ly === layerCobertura || ly === layerUnidad)
  			{
  				return true;
  			}
  			else{
  				return false;
  			}
  		}
		});

		tooltipContainer.style.display = features.length > 0 ? '' : 'none';
		if (features.length > 0) {
			overlayTooltip.setPosition(evt.coordinate);
			showTooltip(features);
		}else{
			tooltipContainer.style.display = 'none';
		}
}

function NoSelection (evt) {
	select.getFeatures().clear();
	map.removeInteraction(select);
}

function singleclickIdentificar (evt){
	var pixel = evt.pixel;
	var features = [];
	var layerPopup;
	arrfeaturesselect = [];

	if(popup != ""){
		map.removeOverlay(popup);
		popup = "";
	}

	var feature = map.forEachFeatureAtPixel(pixel, function(feature, ly) {

		if (typeof Object.assign != 'function') {
			  Object.assign = function(target, varArgs) { // .length of function is 2
			    'use strict';
			    if (target == null) { // TypeError if undefined or null
			      throw new TypeError('Cannot convert undefined or null to object');
			    }

			    var to = Object(target);

			    for (var index = 1; index < arguments.length; index++) {
			      var nextSource = arguments[index];

			      if (nextSource != null) { // Skip over if undefined or null
			        for (var nextKey in nextSource) {
			          // Avoid bugs when hasOwnProperty is shadowed
			          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
			            to[nextKey] = nextSource[nextKey];
			          }
			        }
			      }
			    }
			    return to;
			  };
		}

		if (typeof feature.get('features') === 'undefined') {
			if (ly.get('name') == nbTerreno || ly.get('name') == nbConstruccion || ly.get('name') == nbCobertura || ly.get('name') == nbUnidad){
					if (map.getView().getZoom() >= 14 ){
						features.push(Object.assign({'Tipo': ly.get('name')}, feature.getProperties()));
					}
			}

		}else{
		 	var cfeatures = feature.get('features');
		 	for (var i = 0; i < cfeatures.length; i++) {
		 		features.push(Object.assign({'Tipo': ly.get('name')}, cfeatures[i].getProperties()));
		 	}
		}
		layerPopup = ly
		feature.setProperties(Object.assign({'Tipo': ly.get('name')}, feature.getProperties()));

		arrfeaturesselect.push(feature);

		FeaturesSelect = arrfeaturesselect;

		map.addInteraction(select);

	},{
		layerFilter: function(ly){
			// solo activado para cuatro capas
			if (ly.get('name') == nbTerreno || ly.get('name') == nbConstruccion || ly.get('name') == nbCobertura || ly.get('name') == nbUnidad)
			{
				return true;
			}
			else{
				return false;
			}
		}
	});

	tooltipContainer.style.display = features.length > 0 ? '' : 'none';
	if (features.length > 0)
	{
		showPopup(features, evt.coordinate);

	}

}

function eventoMoveEnd (mymap){
	if (mymap.getView().getZoom() < 14){

		layerTerreno.setStyle(styleLayerTerrenoNo);
		layerConstruccion.setStyle(styleLayerConstruccionNo);
		layerCobertura.setStyle(styleLayerCoberturaNo);
		layerUnidad.setStyle(styleLayerUnidadNo);

		if(popup != ""){
			mymap.removeOverlay(popup);
			popup = "";
		}

		if(select != ""){
			select.getFeatures().clear();
			FeaturesSelect = select.getFeatures();
			mymap.removeInteraction(select);
		}

		contTerreno = 0;
		contConstr = 0;
		contCobert = 0;
		contUnidad = 0;
		contElempredial = 0;
		myRenderer();
		Ext.getCmp('treecolumn').getView().refresh();

	}else if (mymap.getView().getZoom() < 18){

		layerTerreno.setStyle(styleLayerTerrenoNoEti);
		layerConstruccion.setStyle(styleLayerConstruccionNoEti);
		layerCobertura.setStyle(styleLayerCoberturaNoEti);
		layerUnidad.setStyle(styleLayerUnidadNoEti);

		contTerreno = 1;
		contElempredial = 1;
		contConstr = 1;
		contCobert = 1;
		contUnidad = 1;

		myRenderer();
		Ext.getCmp('treecolumn').getView().refresh();

		map.addInteraction(select);

	}else if (mymap.getView().getZoom() > 20){

		layerTerreno.setStyle(styleLayerTerrenoEti);
		layerConstruccion.setStyle(styleLayerConstruccionNoEti);
		layerCobertura.setStyle(styleLayerCoberturaNoEti);
		layerUnidad.setStyle(styleLayerUnidadNoEti);

		contTerreno = 1;
		contElempredial = 1;
		contConstr = 1;
		contCobert = 1;
		contUnidad = 1;

		myRenderer();
		Ext.getCmp('treecolumn').getView().refresh();

		map.addInteraction(select);

	}else if (mymap.getView().getZoom() > 13){

		layerTerreno.setStyle(styleLayerTerrenoNoEti);
		layerConstruccion.setStyle(styleLayerConstruccionNoEti);
		layerCobertura.setStyle(styleLayerCoberturaNoEti);
		layerUnidad.setStyle(styleLayerUnidadNoEti);

		contTerreno = 1;
		contElempredial = 1;
		contConstr = 1;
		contCobert = 1;
		contUnidad = 1;
		myRenderer();
		Ext.getCmp('treecolumn').getView().refresh();

		map.addInteraction(select);

	}

}

 function OsOpenNamesSearch(options) {
    var url = options.url;
    return {
      /**
       * Get the url, query string parameters and optional JSONP callback
       * name to be used to perform a search.
       * @param {object} options Options object with query, key, lang,
       * countrycodes and limit properties.
       * @return {object} Parameters for search request
       */
      getParameters: function (opt) {
        return {
          url: url,
          //callbackName: 'callback',
          params: {
            name: opt.query,
            country: "CO",
            username: "visorcolombia",
            //maxRows: 5,
            featureCode: "PPL"
          }
        };
      },
      /**
       * Given the results of performing a search return an array of results
       * @param {object} data returned following a search request
       * @return {Array} Array of search results
       */
      handleResponse: function (results) {
          return results.geonames.map(function (result) {
	          return ({
    			    lon: result.lng,
    			    lat: result.lat,
    			    address: {
    			      name: result.toponymName,
    			      state: result.adminName1 + ', ',
    			      country: result.countryName
    			    },
    			    original: {
    			      formatted: result.name,
    			      details: result
    			    }
    			  });
		      });
      }
    };
  }
