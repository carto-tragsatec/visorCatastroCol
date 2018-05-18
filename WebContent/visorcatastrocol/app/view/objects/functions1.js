/**
 * Calcula la escala aproximada del mapa
 *  @param {ol.Map} map
 *
 **/
var getCurrentScale = function(map)
{
	if (map)
	{
	    var view = map.getView();
	    var resolution = view.getResolution();
	    var units = map.getView().getProjection().getUnits();
	    //var dpi = 25.4 / 0.28;
	    var dpi = 96;
	    var mpu = ol.proj.METERS_PER_UNIT[units];
	    var scale = resolution * mpu * 39.37 * dpi;
	    ultimaEscala = formatearMiles(scale.toFixed(0));
	}
	else{
		ultimaEscala = '';
	}
    return ultimaEscala;
};

/**
 *
 * devuelve una capa wms
 * @param {String} url
 * @param {String} name
 * @param {String} pref
 * @param {String} ly
 * @param {String} visibility
 * @param {String} tiled
 * @param {String} style
 * @param {String} proxy
 *
 **/
function getCapaTitleWMS(url, name, pref, ly, visibility, tiled, style, proxy){
	var layer;
	if (pref != '')
	{
		layer = pref + ':' + ly;
	}
	else{
		layer = ly;
	}
	var source;

    if (url.substr(url.length - 1) != "?")
    {
        url = url + "?";
    }

    if (proxy == true)
    {
    	url = 'proxy.jsp?' + encodeURIComponent(url);
    }

	if (tiled == true)
	{
		return new ol.layer.Tile({
			name : name,
			source : new ol.source.TileWMS({
				//url : 'proxy.jsp?' + encodeURIComponent(url),
				url: url,
				params : {
					'LAYERS' : layer,
					'TILED': tiled,
					'STYLES': style
				},
				crossOrigin: null
				//crossOrigin: 'Anonymous'
			}),
			visible : visibility
		});
	}else{

		return new ol.layer.Image({
			name : name,
			source : new ol.source.ImageWMS({
				//url : 'proxy.jsp?' + encodeURIComponent(url),
				url: url,
				ratio: 1,
				params : {
					'LAYERS' : layer,
					'TRANSPARENT': 'true',
					'STYLES': style
				},
				crossOrigin: null
			}),
			visible : visibility
		});
	}
}

/**
 * Finds recursively the layer with the specified key and value.
 * @param {ol.layer.Base} layer
 * @param {String} key
 * @param {any} value
 * @returns {ol.layer.Base}
 */
function findBy(layer, key, value) {

    if (layer.get(key) === value) {
        return layer;
    }

    // Find recursively if it is a group
    if (layer.getLayers) {
        var layers = layer.getLayers().getArray(),
                len = layers.length, result;
        for (var i = 0; i < len; i++) {
            result = findBy(layers[i], key, value);
            if (result) {
                return result;
            }
        }
    }

    return null;
}

/**
 *
 *devuelve el estilo de cerca para los objetos vector
 *@param {String} nameEti, campo para etiquetar la capa
 *@param {String} tip, tipo de dibujo: circle, polygon, icon
 *@param {String} font, fuente para la etiqueta
 *@param {String} textFillColor, color de relleno de la fuente
 *@param {String} textStrokeColor, color de borde de la fuente
 *@param {String} imgFillColor, color del relleno
 *@param {String} imgStrokeColor, color del borde del punto o linea
 *@param {String} imgStrokeWidth, ancho de la linea
 *@param {String} iconsrc, ruta icono
 *@param {String} anchoIcon, ancho icono
 *@param {String} altoIcon, alto icono
 *
 **/
function getEstiloVector (nameEti, tip, font, textFillColor, textStrokeColor, imgFillColor, imgStrokeColor, imgStrokeWidth, iconsrc, anchoIcon, altoIcon){


	if (tip == 'icon')
	{
	    return function(feature, resolution) {
	    	var style;
			var arr = [{eti: "" + nameEti, tipo: tip}];
			var arrSize = [anchoIcon, altoIcon];
			style = new ol.style.Style({
				image:new ol.style.Icon({
					src: iconsrc,
					size: arrSize,
					anchor: [0.5, 0.5],
					anchorXUnits: 'fraction',
					anchorYUnits: 'fraction',
					opacity: 1
				}),
	            text: new ol.style.Text({
	            	font : font,
	                offsetY: altoIcon/2 + 5,
	                fill: new ol.style.Fill({
	                	color: textFillColor
	                }),
	                stroke: new ol.style.Stroke({
	                	color:textStrokeColor,
	                	width : 2
	                })
	           	})
			});


			if (arr[0].eti != "" && feature != null)
			{
				style.getText().setText(feature.get(arr[0].eti));
			}

			return style;

	    };
	}
	else{
		return function(feature, resolution) {
			var styleText;
			var style;
			var arr = [{eti: "" + nameEti, tipo: tip}];
			if (arr[0].tipo == 'circle')
			{
				styleText = new ol.style.Style({
					text : new ol.style.Text({
						font : font,
						//text : feature.get(arr[0].eti),
						offsetY: 14,
						fill : new ol.style.Fill({
							color : textFillColor,
							width : 2
						}),
		                stroke: new ol.style.Stroke({
		                	color: textStrokeColor,
		                	width : 2
		                })
					})
				});
				style = new ol.style.Style({
			    	image: new ol.style.Circle({
			        	radius: 7,
			        	fill: new ol.style.Fill({
			        		color: imgFillColor
			        	}),
			            stroke: new ol.style.Stroke({
			              color: imgStrokeColor,
			              width : imgStrokeWidth
			            })
			      	})
				});

				if (arr[0].eti != "" && feature != null)
				{
					styleText.getText().setText(feature.get(arr[0].eti));
				}

				return [styleText, style];
			}
			else if (arr[0].tipo == 'polygon')
			{
				styleText = new ol.style.Style({
					text : new ol.style.Text({
						font : font,
						//text : feature.get(arr[0].eti),
						fill : new ol.style.Fill({
							color : textFillColor
						}),
		                stroke: new ol.style.Stroke({
		                	color: textStrokeColor,
		                	width : 2
		                })
					}),
					geometry : function(feature) {
						var interiorPoints = feature.getGeometry()
								.getInteriorPoints();
						return interiorPoints.getPoint(0);
					}
				});
				style = new ol.style.Style({
		            stroke: new ol.style.Stroke({
		              color: imgStrokeColor,
		              width : imgStrokeWidth
		            }),
					fill : new ol.style.Fill({
						color : imgStrokeColor
					})
				});

				if (arr[0].eti != "" && feature != null)
				{
					styleText.getText().setText(feature.get(arr[0].eti));
				}

				return [styleText, style];
			}
		};
	}
}

/**
 *
 *	Devuelve un source de tipo vector
 *
 **/
function getSourceVector(prefijo, layerName){

	return new ol.source.Vector({
        format: new ol.format.GeoJSON(),
		url : 'proxy.jsp?' + encodeURIComponent(WFS+
	        'service=WFS&request=GetFeature&'+
	        'version=1.3.0&typename=' + prefijo + ':' + layerName + '&'+
	        'outputFormat=application/json&'+
	        'srsname=EPSG:3116'
	    ),
	    strategy: ol.loadingstrategy.bbox,
        projection: 'EPSG:3116',
        crossOrigin: 'Anonymous'
	});
}


/**
 *
 * muestra un tooltip con datos
 * @param {array} features, features a mostrar
 **/
function showTooltip(features){

	features.sort(function(a,b){

		if (a.Tipo < b.Tipo)
			return -1;
		if (a.Tipo > b.Tipo)
			return 1;
		return 0;
	});

	var contentTooltip = "<table class='tbtooltip'";
	for (var i = 0; i < features.length; i++)
	{
		if (features[i].Tipo == nbTerreno || features[i].Tipo == nbConstruccion || features[i].Tipo == nbCobertura || features[i].Tipo == nbUnidad)
		{
			if (map.getView().getZoom() >= 14 ){
				contentTooltip = contentTooltip + "<tr class='trtooltip'><td class='tdtooltiptit'>" + features[i].Tipo + "</td><td class='tdtooltipvalor'>" + features[i].numero_predial + "</td></tr>";
			}
		}
	}

	if (contentTooltip != "<table class='tbtooltip'")
	{
		contentTooltip = contentTooltip + "</table>";

		tooltipContent.innerHTML = contentTooltip;
	}
	else{
		tooltipContainer.style.display = 'none';
	}
}

/**
 *
 * muestra un tooltip con datos
 * @param {array} features, features a mostrar
   @param {array} coordinate, coordenadas
 **/
function showPopup(features, coordinate){

	if(popup != ""){
		map.removeOverlay(popup);
		popup = "";
	}

	if (features.length == 1)
	{
		var keys = Object.keys(features[0]);
		//keys.sort();
		var contentPopup = "<table class='tbtooltip'";

		for (i = 0; i < keys.length; i++)
		{
			k = keys[i];

			if (typeof features[0][k] !== 'object')
			{
				if (features[0].Tipo == nbTerreno)
				{
					if (map.getView().getZoom() >= 14 ){

						if (k == "Tipo"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Tipo" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "departamento"){
							var departamento = features[0][k];
						}else if (k == "dpto_cnmbr"){
							contentPopup = contentPopup + "<tr class='trtooltip departamento'><td class='tdtooltiptit'>" + "Departamento" + "</td><td class='tdtooltipvalor'>" + departamento + " | " + features[0][k] + "</td></tr>";
						}else if (k == "municipio"){
							var municipio = features[0][k];
						}else if (k == "mpio_cnmbr"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Municipio" + "</td><td class='tdtooltipvalor'>" + municipio + " | " + features[0][k] + "</td></tr>";
						}else if (k == "zona"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Zona" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "sector"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Sector" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "comuna"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Comuna" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "barrio"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Barrio" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "manzana"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Manzana" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "predio"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Predio" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "cond_propi"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Condición de propiedad" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "superficie"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Superficie (m2)" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}



					}
				}
				if (features[0].Tipo == nbConstruccion)
				{
					if (map.getView().getZoom() >= 14 ){

						if (k == "Tipo"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Tipo" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "numero_predial"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Número predial" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "numero_pisos"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Número de pisos" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "superficie"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Superficie (m2)" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}

					}
				}
				if (features[0].Tipo == nbCobertura)
				{
					if (map.getView().getZoom() >= 14 ){

						if (k == "Tipo"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Tipo" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "numero_predial"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Número predial" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "uso"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Cobertura del suelo" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "superficie"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Superficie (m2)" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}

					}
				}
				if (features[0].Tipo == nbUnidad)
				{
					if (map.getView().getZoom() >= 14 ){

						if (k == "Tipo"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Tipo" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "departamento"){
							var departamento = features[0][k];
							//contentPopup = contentPopup + "<tr class='trtooltip departamento'><td class='tdtooltiptit'>" + "Departamento" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "dpto_cnmbr"){
							contentPopup = contentPopup + "<tr class='trtooltip departamento'><td class='tdtooltiptit'>" + "Departamento" + "</td><td class='tdtooltipvalor'>" + departamento + " | " + features[0][k] + "</td></tr>";
						}else if (k == "municipio"){
							var municipio = features[0][k];
							//contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Municipio" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "mpio_cnmbr"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Municipio" + "</td><td class='tdtooltipvalor'>" + municipio + " | " + features[0][k] + "</td></tr>";
						}else if (k == "zona"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Zona" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "sector"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Sector" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "comuna"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Comuna" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "barrio"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Barrio" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "manzana"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Manzana" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "predio"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Predio" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "cond_propi"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Condición de propiedad" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "superficie"){
							contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Superficie (m2)" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}
					}
				}

			}
		}

		if (contentPopup != "<table class='tbtooltip'")
		{
			contentPopup = contentPopup + "</table>";

			var container = document.createElement('div');
			container.className = 'popup';

			var closer = document.createElement('a');
			closer.setAttribute('href', '#');
			closer.setAttribute('class', 'popupcloser');
			container.appendChild(closer);

			var content = document.createElement('div');
			content.className = 'popupcontent';
			container.appendChild(content);

			content.innerHTML = contentPopup;

			popup = new ol.Overlay({
		        element: container,
		        autoPan: true,
		        offset: [-11, -12],
		        positioning: 'bottom-left',
		        autoPanAnimation: {
		          duration: 250
		        }
		  	});

			closer.onclick = function() {
				map.removeOverlay(popup);
				select.getFeatures().clear();
				FeaturesSelect = select.getFeatures();
				map.removeInteraction(select);
		  	};

		  	map.addOverlay(popup);
			  popup.setPosition(coordinate);


		}else{
			tooltipContainer.style.display = 'none';
		}


	}
	else{
		popupcont = popupcont + 1;
		features.sort(function(a,b){
			if (a.Tipo < b.Tipo)
				return -1;
			if (a.Tipo > b.Tipo)
				return 1;
			return 0;
		});

		contentPopup = "<table class='tbtooltip'";

		popup = new ol.Overlay({
				id: "popup" + popupcont,
		        autoPan: true,
		        offset: [-11, -12],
		        positioning: 'bottom-left',
		        autoPanAnimation: {
		          duration: 250
		        }
			});

		for (var i = 0; i < features.length; i++)
		{

			if (features[i].Tipo == nbTerreno || features[i].Tipo == nbConstruccion || features[i].Tipo == nbCobertura ||features[i].Tipo == nbUnidad)
			{
				if (map.getView().getZoom() >= 14 ){
					contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdpopuptit'>" + features[i].Tipo + "</td><td class='tdpopupver'><a href='#' class='enlace' onclick='findElementsForShowPopup(\"" + features[i].numero_predial + "\", \"" + features[i].Tipo + "\", \"" + features[i].geometry.getExtent() + "\", " + coordinate + ");return false;'>" + features[i].numero_predial + "</a></td></tr>";
				}

			}

		}

		if (contentPopup != "<table class='tbtooltip'")
		{
			contentPopup = contentPopup + "</table>";
			//contentPopup = contentPopup1;

			popupContainer = document.createElement('div');
			popupContainer.className = 'popuplist';

			var closer = document.createElement('a');
			closer.setAttribute('href', '#');
			closer.setAttribute('class', 'popupcloser');
			popupContainer.appendChild(closer);

			var content = document.createElement('div');
			content.className = 'popupcontent';
			popupContainer.appendChild(content);
			content.innerHTML = contentPopup;


			popup.setElement(popupContainer);


			closer.onclick = function() {
				map.removeOverlay(popup);
				select.getFeatures().clear();
				FeaturesSelect = select.getFeatures();
				map.removeInteraction(select);
		  	};

		  	map.addOverlay(popup);
		  	arrpopup.push(popup);
			popup.setPosition(coordinate);

		}else{
			tooltipContainer.style.display = 'none';
		}

	}

}


/**
 *
 * Busca el elemento de la lista e invoca la funcion para mostrar todos sus atributos
 * @param {string} id
 * @param {string} tipo
 	 @param {string} featcoord
	 @param {string} x
	 @param {string} y
 **/
function findElementsForShowPopup(id, tipo, featcoord, x, y)
{
	var feature = null;
	var features;
	FeaturesSelect = arrfeaturesselect;

	var arr = FeaturesSelect;
	if (tipo == layerTerreno.get('name'))
	{
		features = sourceLayerTerreno.getFeatures();
		for (var i = 0; i < arr.length; i++) {

			if (arr[i].getProperties().numero_predial == id && arr[i].getGeometry().getExtent() == featcoord)
			{
				select.getFeatures().clear();
				FeaturesSelect = select.getFeatures();
				FeaturesSelect.push(arrfeaturesselect[i]);
				map.addInteraction(select);
			}
		}
	}
	else if (tipo == layerConstruccion.get('name'))
	{
		features = sourceLayerConstruccion.getFeatures();
		for (var i = 0; i < arr.length; i++) {

			if (arr[i].getProperties().numero_predial == id && arr[i].getGeometry().getExtent() == featcoord)
			{
				select.getFeatures().clear();
				FeaturesSelect = select.getFeatures();
				FeaturesSelect.push(arrfeaturesselect[i]);
				map.addInteraction(select);
			}
		}
	}
	else if (tipo == layerCobertura.get('name'))
	{

		features = sourceLayerCobertura.getFeatures();
		for (var i = 0; i < arr.length; i++) {

			if (arr[i].getProperties().numero_predial == id && arr[i].getGeometry().getExtent() == featcoord)
			{
				select.getFeatures().clear();
				FeaturesSelect = select.getFeatures();
				FeaturesSelect.push(arrfeaturesselect[i]);
				map.addInteraction(select);
			}
		}
	}

	else if (tipo == layerUnidad.get('name'))
	{
		features = sourceLayerUnidad.getFeatures();
		for (var i = 0; i < arr.length; i++) {

			if (arr[i].getProperties().numero_predial == id && arr[i].getGeometry().getExtent() == featcoord)
			{
				select.getFeatures().clear();
				FeaturesSelect = select.getFeatures();
				FeaturesSelect.push(arrfeaturesselect[i]);
				map.addInteraction(select);
			}
		}
	}


	for (var i = 0; i < features.length; i++) {

		if (features[i].getProperties().numero_predial == id && features[i].getGeometry().getExtent() == featcoord)
		{
			feature = features[i];

			break;
		}
	}

	var coordinate = [x, y];
	var featurespopup = [Object.assign({'Tipo': tipo}, feature.getProperties())];
	var keys = Object.keys(featurespopup[0]);
		//keys.sort();

	var contentPopup1 = "<table class='tbtooltip'";
	for (i = 0; i < keys.length; i++)
	{
		k = keys[i];

		if (typeof featurespopup[0][k] !== 'object')
			{
				if (featurespopup[0].Tipo == nbTerreno)
				{
					if (map.getView().getZoom() >= 14 ){

						if (k == "Tipo"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Tipo" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "departamento"){
							var departamento = featurespopup[0][k];
							//contentPopup = contentPopup + "<tr class='trtooltip departamento'><td class='tdtooltiptit'>" + "Departamento" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "dpto_cnmbr"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip departamento'><td class='tdtooltiptit'>" + "Departamento" + "</td><td class='tdtooltipvalor'>" + departamento + " | " + featurespopup[0][k] + "</td></tr>";
						}else if (k == "municipio"){
							var municipio = featurespopup[0][k];
							//contentPopup = contentPopup + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Municipio" + "</td><td class='tdtooltipvalor'>" + features[0][k] + "</td></tr>";
						}else if (k == "mpio_cnmbr"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Municipio" + "</td><td class='tdtooltipvalor'>" + municipio + " | " + featurespopup[0][k] + "</td></tr>";
						}else if (k == "zona"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Zona" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "sector"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Sector" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "comuna"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Comuna" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "barrio"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Barrio" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "manzana"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Manzana" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "predio"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Predio" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "cond_propi"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Condición de propiedad" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "superficie"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Superficie (m2)" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}
					}
				}
				if (featurespopup[0].Tipo == nbConstruccion)
				{
					if (map.getView().getZoom() >= 14 ){

						if (k == "Tipo"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Tipo" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "numero_predial"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Número predial" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "numero_pisos"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Número de pisos" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "superficie"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Superficie (m2)" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}

					}
				}
				if (featurespopup[0].Tipo == nbCobertura)
				{
					if (map.getView().getZoom() >= 14 ){

						if (k == "Tipo"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Tipo" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "numero_predial"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Número predial" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "uso"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Cobertura del suelo" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "superficie"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Superficie (m2)" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}

					}
				}
				if (featurespopup[0].Tipo == nbUnidad)
				{
					if (map.getView().getZoom() >= 14 ){

						if (k == "Tipo"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Tipo" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "departamento"){
							var departamento = featurespopup[0][k];
						}else if (k == "dpto_cnmbr"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip departamento'><td class='tdtooltiptit'>" + "Departamento" + "</td><td class='tdtooltipvalor'>" + departamento + " | " + featurespopup[0][k] + "</td></tr>";
						}else if (k == "municipio"){
							var municipio = featurespopup[0][k];
						}else if (k == "mpio_cnmbr"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Municipio" + "</td><td class='tdtooltipvalor'>" + municipio + " | " + featurespopup[0][k] + "</td></tr>";
						}else if (k == "zona"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Zona" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "sector"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Sector" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "comuna"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Comuna" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "barrio"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Barrio" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "manzana"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Manzana" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "predio"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Predio" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "cond_propi"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Condición de propiedad" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}else if (k == "superficie"){
							contentPopup1 = contentPopup1 + "<tr class='trtooltip'><td class='tdtooltiptit'>" + "Superficie (m2)" + "</td><td class='tdtooltipvalor'>" + featurespopup[0][k] + "</td></tr>";
						}
					}
				}

			}
		}

		if (contentPopup1 != "<table class='tbtooltip'")
		{
			contentPopup1 = contentPopup1 + "</table>";

			var container = document.createElement('div');
			container.className = 'popup';

			var closer = document.createElement('a');
			closer.setAttribute('href', '#');
			closer.setAttribute('class', 'popupcloser');
			container.appendChild(closer);

			var content = document.createElement('div');
			content.className = 'popupcontent';
			container.appendChild(content);

			var back = document.createElement('a');
			back.setAttribute('href', '#');
			back.setAttribute('class', 'popupback');
			container.appendChild(back);

			content.innerHTML = contentPopup1;
			popup.setElement(container);

			closer.onclick = function() {
				map.removeOverlay(popup);
				select.getFeatures().clear();
				FeaturesSelect = select.getFeatures();
				map.removeInteraction(select);
		  	};

		  	back.onclick = function() {
		    	popup.setElement(popupContainer);
		    	select.getFeatures().clear();
				FeaturesSelect = select.getFeatures();

				for (var i = 0; i < arrfeaturesselect.length; i++) {
						FeaturesSelect.push(arrfeaturesselect[i]);
						map.addInteraction(select);
				}

		    	return false;
		  	};

		}else{
			tooltipContainer.style.display = 'none';
		}
}

/**
* Finds recursively the layer with the specified key and value.
* @param {ol.layer.Base} layer
* @param {String} key
* @param {any} value
* @returns {ol.layer.Base}
*/
function findGroup() {
	var arr =[];

    for (var i = 0; i < map.getLayerGroup().getLayers().getArray().length; i++)
    {
    	var group = map.getLayerGroup().getLayers().getArray()[i];

    	if (group.get('name') == grupoPredial)
    	{
    		arr = group.getLayers().getArray();

    	}

    }
    return arr;
}


/**
*
* Selecciona elemento en el mapa
* @param {string} id
* @param {string} tipo
**/
function SelectElements(id)
{
	var feature = null;
	var features;
	var message = true;
	var fase = 0;

	select = new ol.interaction.Select();
	if (fase == 0){
    	var url = 'proxy.jsp?' + encodeURIComponent(WFS+
        'service=WFS&request=GetFeature&'+
        'version=1.3.0&typename=' + prefijo + ':' + capaTerreno + '&'+
        'outputFormat=application/json&'+
        'srsname=EPSG:3116');

		Ext.Ajax.request({
			url: url,
			async: false,
			method: 'POST',
			success: function(response, opts) {
				features = new ol.format.GeoJSON().readFeatures(response.responseText);

			}
		});

		for (var i = 0; i < features.length; i++) {
			select.getFeatures().clear();
			map.addInteraction(select);
			FeaturesSelect = select.getFeatures();

			if (features[i].getProperties().numero_predial == id){
				message = false;
				features[i].setProperties(Object.assign({'Tipo': nbTerreno}, features[i].getProperties()));
				FeaturesSelect.push(features[i]);
				var extent = features[i].getGeometry();
				//map.getView().fit(extent);
				map.getView().fit(extent, {padding: [170, 50, 30, 150], constrainResolution: false});

				fase = 0;
				break;
			}else{
				fase = 1;
			}
		}
	}
	if (fase == 1){

        var url = 'proxy.jsp?' + encodeURIComponent(WFS+
        'service=WFS&request=GetFeature&'+
        'version=1.3.0&typename=' + prefijo + ':' + capaConstruccion + '&'+
        'outputFormat=application/json&'+
        'srsname=EPSG:3116');

		Ext.Ajax.request({
			url: url,
			async: false,
			method: 'POST',
			success: function(response, opts) {
				features = new ol.format.GeoJSON().readFeatures(response.responseText);

			}
		});

		for (var i = 0; i < features.length; i++) {
			select.getFeatures().clear();
			map.addInteraction(select);
			FeaturesSelect = select.getFeatures();

			if (features[i].getProperties().numero_predial == id){

				message = false;
				features[i].setProperties(Object.assign({'Tipo': nbConstruccion}, features[i].getProperties()));
				FeaturesSelect.push(features[i]);
				var extent = features[i].getGeometry();
				//map.getView().fit(extent);
				map.getView().fit(extent, {padding: [170, 50, 30, 150], constrainResolution: false});

				fase = 0;
				break;
			}else{
				fase = 2;
			}
		}

	}
	if (fase ==2){

   		 var url = 'proxy.jsp?' + encodeURIComponent(WFS+
        'service=WFS&request=GetFeature&'+
        'version=1.3.0&typename=' + prefijo + ':' + capaUnidad + '&'+
        'outputFormat=application/json&'+
        'srsname=EPSG:3116');

		Ext.Ajax.request({
			url: url,
			async: false,
			method: 'POST',
			success: function(response, opts) {
				features = new ol.format.GeoJSON().readFeatures(response.responseText);

			}
		});

		for (var i = 0; i < features.length; i++) {
			select.getFeatures().clear();
			map.addInteraction(select);
			FeaturesSelect = select.getFeatures();

			if (features[i].getProperties().numero_predial == id){

				message = false;
				features[i].setProperties(Object.assign({'Tipo': nbUnidad}, features[i].getProperties()));
				FeaturesSelect.push(features[i]);
				var extent = features[i].getGeometry();
				//map.getView().fit(extent);
				map.getView().fit(extent, {padding: [170, 50, 30, 150], constrainResolution: false});

				fase = 0;
				break;
			}
		}
	}

	return message;
}

/**
*
* Añade una capa a un grupo
*
**/

function addLayersGroup (layer, nameGroup)
{
	var layersGroup = findBy(map.getLayerGroup(), 'name', nameGroup);
	layersGroup.getLayers().insertAt(0, layer);

	/*var layers = layersGroup.getLayers();
	layers.insertAt(0, layer);
  	for (var j = 0; j < layersGroup.getLayers().getLength(); j++) {
		var layer = layersGroup.getLayers().pop();
		layer = {};
	}
	return layers;*/
}

/**
*
* Crea la ventana de Añadir Servicios Externos
*
**/

function createWindowServices()
{
	Ext.create('Ext.window.Window', {
		id: 'windowServices',
		constrainHeader: true,
		title: 'Añadir servicios WMS/WMTS',
		width : 600,
		//height : 290,
		height : 390,
		closable: true,
		resizable: true,
		collapsible: true,
		items:[{
			xtype: 'tabpanel',
			id: 'tabPanelServices',
			border: false,
			items:[{
				title: 'Introducir servicio',
				border: false,
				items:[{
					columnWidth: '1',
					border: false,
					margin : '10 0 0 5',
					layout: 'column',
					items:[{
						columnWidth: '0.7',
						border: false,
						items:[{
							xtype: 'textfield',
							id: 'txtUrlService',
							fieldLabel : 'URL',
							labelWidth : 50,
							width: 380,
							emptyText: '....'
						}]
					},{
						columnWidth: '0.25',
						border: false,
						items:[{
							xtype: 'textfield',
							id: 'txtVersionService',
							fieldLabel: 'Versión',
							labelWidth: 50,
							width: 110,
							value: '1.3.0'
						}]
					},{
						columnWidth: '0.05',
						border: false,
						items:[{
							xtype: 'button',
							tooltip: 'Conectar',
							iconCls : 'conectar',
							handler: function() {
								if (Ext.getCmp('txtUrlService').getValue() !== "")
								{
									//url del servicio a consultar
									var urlServ = Ext.getCmp('txtUrlService').getValue();
									var urlWms = urlServ;
									var urlWmts = urlServ;
									var urlWfs = urlServ;

									if (urlWms.substr(urlWms.length - 1) != "?") {
										urlWms = urlWms + "?";
									}
									urlWms = 'proxynotdiscriminate.jsp?' + urlWms;

									if (urlWfs.substr(urlWfs.length - 1) != "?") {
										urlWfs = urlWfs + "?";
									}
									urlWfs = 'proxynotdiscriminate.jsp?' + urlWfs;

									if (urlWmts.substr(urlWmts.length - 1) != "?") {
										urlWmts = urlWmts + "?";
									}
									urlWmts = 'proxynotdiscriminate.jsp?' + urlWmts;

									//parametros
									var params = getParameterString(DEFAULT_CAPABILITIES_PARAMS_WMS);
									urlWms = urlAppend(urlWms, params);

									//borramos el store del grid
									if(Ext.getStore('storeGridServices').getCount() > 0){
										Ext.getStore('storeGridServices').removeAll();
									}


									if (Ext.getCmp('typeServiceWms').getValue() == true)
									{
										var version = Ext.getCmp('txtVersionService').getValue();
										//cargamos los datos obtenidos del servicio
										Ext.Ajax.request({
											url: urlWms,
											success: function(response, opts) {
												 var records = [];
												 var data = response.responseXML;
												 records = readRecordsWms(data);
												 var arr = [];
												 for (var i = 0; i < records.length; i++) {
												 	arr.push({nombre: records[i].Name, titulo: records[i].Title, url:urlServ, tipo: 'WMS', crsvalido: 1, version: version});
												 }
												 Ext.getStore('storeGridServices').add(arr);
											},
											failure: function(response, opts) {
												Ext.MessageBox.show({
													title : 'Error',
													msg : 'Error durante la consulta del servicio WMS',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.INFO
												});
											}
										});
									}
									else if (Ext.getCmp('typeServiceWmts').getValue() == true)
									{
										params = getParameterString(DEFAULT_CAPABILITIES_PARAMS_WMTS);
										urlWmts = urlAppend(urlWmts, params);

										Ext.Ajax.request({
											url: urlWmts,
											success: function(response, opts) {
												var records = [];
												var data = response.responseXML;
												records = readRecordsWmts(data);
												//console.log(records);
												 var arr = [];
												 for (var i = 0; i < records.length; i++) {
												 	arr.push({nombre: records[i].Name, titulo: records[i].Title, url:urlServ, matrixSet: records[i].matrixSet, projection: records[i].projection, resolutions: records[i].resolutions, matrixIds: records[i].matrixIds, tipo: 'WMTS', crsvalido: records[i].crsvalido});
												 }
												 Ext.getStore('storeGridServices').add(arr);
											},
											failure: function(response, opts) {
												Ext.MessageBox.show({
													title : 'Error',
													msg : 'Error durante la consulta del servicio WMTS',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.INFO
												});
											}
										});
									}
								}
								else{
									Ext.MessageBox.show({
										title : 'Información',
										msg : 'Debe introducir la url del servicio',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.INFO
									});
								}

							}
						}]
					}]
				},{
					columnWidth: '1',
					border: false,
					layout: 'column',
					margin : '0 0 10 0',
					items:[{
						columnWidth: '0.5',
						border: false,
						margin : '0 0 0 20',
						items:[{
							xtype: 'radiofield',
							boxLabel: 'es WMS',
							name: 'typeService',
							id: 'typeServiceWms',
							checked: true,
			                listeners:{
			                    change: function(thisRadio, newValue, oldValue, eOpts)
			                    {
			                        if (Ext.getCmp('typeServiceWms').getValue() == true)
			                        {
			                            Ext.getCmp('typeServiceWmts').setValue(false);
			                            Ext.getCmp('txtVersionService').setDisabled(false);

			                        }
			                    }
			                }
						}]
					},{
						columnWidth: '0.5',
						border: false,
						margin : '0 0 0 20',
						items:[{
							xtype: 'radiofield',
							boxLabel: 'es WMTS',
							name: 'typeService',
							id: 'typeServiceWmts',
			                listeners:{
			                    change: function(thisRadio, newValue, oldValue, eOpts)
			                    {
			                        if (Ext.getCmp('typeServiceWmts').getValue() == true)
			                        {
			                            Ext.getCmp('typeServiceWms').setValue(false);
			                            Ext.getCmp('txtVersionService').setDisabled(true);
			                        }
			                    }
			                }
						}]
					}]
				},{
					xtype: 'gridpanel',
					id: 'gridServices',
					height: '100%',
					width: '100%',
					margin : '0 0 0 3',
					scrollable: true,
					store: Ext.create('Ext.data.Store', {
						//model: 'modelGridServicesWms',
						id: 'storeGridServices'
					}),
				 	columns: [{
		                text: 'Título',
		                flex: 3,
		                sortable: true,
		                cellWrap: true,
		                dataIndex: 'titulo'
				 				},{
		                text: 'Nombre',
		                flex: 3,
		                sortable: true,
		                cellWrap: true,
		                dataIndex: 'nombre'
				 					},{
		                text: 'Previsualizar',
		                flex: 1,
		                xtype : 'actioncolumn',
		                align: 'center',
		                items : [{
				            	iconCls : 'previsualizar',
				            	tooltip : 'Previsualizar',
				            	handler : function(grid, rowIndex, colIndex, btn, event) {
				            		//mapPrev(layer)
				            		var rec = Ext.getStore('storeGridServices').getAt(rowIndex);
				            		if (rec)
				            		{
				            			mapPrev(rec, event.getX(), event.getY());
				            		}
				            	}
			                }]
				 					},{
		                text: 'Añadir',
		                flex: 1,
		                xtype : 'actioncolumn',
		                align: 'center',
		                items : [{
				            	iconCls : 'añadir',
				            	tooltip : 'Añadir servicio',
				            	handler : function(grid, rowIndex, colIndex, btn, event) {

				            		var rec = Ext.getStore('storeGridServices').getAt(rowIndex);
				            		if (rec)
				            		{
				            			mapAddLayer(rec);
				            		}

				            		Ext.getStore('storeAllLayers').filterBy(function(record) {
														if (record.data.text != 'NoLegend' && record.data.text.indexOf("geocoder-layer")) {
															return true;
														}
												});

				            	}
		                }]
				 					}]
				}]
			}]
		}],
		listeners:{
			resize: function(thisWindow, width, height, eOpts)
			{
				Ext.getCmp('gridServices').setHeight(height-155);
				Ext.getCmp('gridServices').setWidth(width-10);
			}
		}
	}).show();
}


//FUNCIONES DE LA VENTANA DE SERVICIOS EXTERNOS

getParameterString = function(params) {
	var paramsArray = [];

	for (var key in params) {
		var value = params[key];
		if ((value != null) && (typeof value != 'function')) {
			var encodedValue;
			if (typeof value == 'object' && value.constructor == Array) {
				/* value is an array; encode items and separate with "," */
				var encodedItemArray = [];
				var item;
				for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
					item = value[itemIndex];
					encodedItemArray
							.push(encodeURIComponent((item === null || item === undefined)
											? ""
											: item));
				}
				encodedValue = encodedItemArray.join(",");
			} else {
				/* value is a string; simply encode */
				encodedValue = encodeURIComponent(value);
			}
			paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
		}
	}

	return paramsArray.join("&");
};


function readRecordsWms (data/*, fields*/) {
	var format = new ol.format.WMSCapabilities();
    data = format.read(data);

    var version = data.version;
    var capability = data.Capability || {};
    var url = capability.Request && capability.Request.GetMap && capability.Request.GetMap.DCPType[0].HTTP.Get.OnlineResource;
    var layers = capability.Layer.Layer;
    var formats = capability.Exception;
    //var exceptions = serviceExceptionFormat(formats);
    var records = [];

    if(url && layers) {
        var layer;
        for(var i=0, lenI=layers.length; i<lenI; i++){
            layer = layers[i];
            if(layer.Name) {
            	records.push(layer);
            }
        }
    }
    return records;
}


function readRecordsWmts (data) {
	var records = [];
	var format = new ol.format.WMTSCapabilities();
    data = format.read(data);

    //console.log(data);

    var content = data.Contents;
    var layers = content.Layer;
    var tileMatrixSet = content.TileMatrixSet;
    //codigo crs del nuestro mapa
    var codigoCrs = map.getView().getProjection().getCode();
    var crsEncontrado = 0;

    if (layers){
        for(var i=0, lenI=layers.length; i<lenI; i++)
        {
		    var resolutions;
		    var matrixIds;
            var record = {};
            var identificadorCRS;

            layer = layers[i];
			var tileMatrixSetLink = layer.TileMatrixSetLink;
	    	//recorro todos los crs
		    for (var j = 0; j< tileMatrixSetLink.length; j++)
		    {
		    	//comparo los crs con los del mapa
		    	if (tileMatrixSetLink[j].TileMatrixSet.indexOf(codigoCrs) != -1 || tileMatrixSetLink[j].TileMatrixSet == codigoCrs || findProjectionGoogle(tileMatrixSetLink[j].TileMatrixSet) != -1)
		    	{
		    		//console.log("Crs encontrado " + tileMatrixSetLink[j].TileMatrixSet);
		    		record.crsvalido = 1;
		    		crsEncontrado = 1;
		    		identificadorCRS = tileMatrixSetLink[j].TileMatrixSet;
		    	}
		    }
		    if (crsEncontrado == 0)
		    {
		    	record.crsvalido = 0;
		    	crsEncontrado = 1;
		    	identificadorCRS = tileMatrixSetLink[0].TileMatrixSet;
		    }
		    if (crsEncontrado == 1)
		    {
			    for (var j = 0; j < tileMatrixSet.length; j++)
			    {
			    	if (identificadorCRS == tileMatrixSet[j].Identifier)
			    	{
						var numMatrixIds = tileMatrixSet[j].TileMatrix.length;
						matrixIds = new Array(numMatrixIds);
						resolutions = new Array(numMatrixIds);
						var projection = ol.proj.get(codigoCrs);
						//console.log(projection);
						var projectionExtent = projection.getExtent();
						//console.log(projectionExtent);

						for (var z = 0; z < numMatrixIds; z++)
						{
							var size = ol.extent.getWidth(projectionExtent) / tileMatrixSet[j].TileMatrix[z].TileHeight;
							matrixIds[z] = z;
							resolutions[z] = size / Math.pow(2, z);
						}
					}
			    }
		    }

			//registro
			record.Name = layer.Identifier;
			record.Title = layer.Title;
			record.matrixSet = identificadorCRS;
			record.projection = ol.proj.get(codigoCrs);
			record.resolutions = resolutions;
			record.matrixIds = matrixIds;

			records.push(record);
        }

    }
    return records;
}

function findProjectionGoogle(proj){
	var arr = ["EPSG:3116","GoogleMapsCompatible", "EPSG:900913", "EPSG:102100", "EPSG:102113", "urn:Ogc:Def:crs:EPSG:6.18:3:3116", "http://www.opengis.net/gml/srs/epsg.xml#3116"];
	return arr.indexOf(proj);
}


function mapPrev(rec, x, y)
{
	//y = y - Ext.getCmp('').getHeight()/2
	console.log(rec);
	if(rec.get('crsvalido') == 1)
	{
		y = y -160;
		/*var lyBaseMapPrev = new ol.layer.Tile({
			name : nameMapQuestOSM,
			source: new ol.source.MapQuest({layer: 'osm'}),
			visible : true
		});	*/
		var lyBaseMapPrev = new ol.layer.Tile({
			name : nbBaseOSM,
			source : new ol.source.OSM({
				url : urlBaseOSM,
				crossOrigin: 'Anonymous'
			}),
			visible : true
		});

		var ly;
		if (rec.get('tipo') == 'WMS')
		{
			var startResolution =
		        ol.extent.getWidth(ol.proj.get('EPSG:3857').getExtent()) / 256;
		    var resolutions = new Array(22);
		    for (var i = 0, ii = resolutions.length; i < ii; ++i) {
		      resolutions[i] = startResolution / Math.pow(2, i);
		    }

			ly = new ol.layer.Tile({
				name : rec.get('titulo'),
				source : new ol.source.TileWMS({
					url : rec.get('url'),
					params : {
						'LAYERS' : rec.get('nombre'),
						'VERSION': rec.get('version')
					},
					serverType: 'geoserver',
			          tileGrid: new ol.tilegrid.TileGrid({
			            extent: [-9750822.095514398,-265187.8844813815,-6747152.632020911,1292904.500083237],
			            resolutions: resolutions,
			            tileSize: [512, 256]
			          }),
			        projection: 'EPSG:3857'
				}),
				visible : true


			});
		}
		else if(rec.get('tipo') == 'WMTS')
		{
			ly = new ol.layer.Tile({
				name : rec.get('titulo'),
				extent: rec.get('projection').getExtent(),
				source: new ol.source.WMTS({
			    	url: rec.get('url'),
			        layer: rec.get('nombre'),
					matrixSet: rec.get('matrixSet'),
					format: 'image/png',
					projection: rec.get('projection'),
					tileGrid: new ol.tilegrid.WMTS({
						origin: ol.extent.getTopLeft(rec.get('projection').getExtent()),
						resolutions: rec.get('resolutions'),
						matrixIds: rec.get('matrixIds')
					}),
					style: 'default'
				}),
				visible : true
			});
		}
		var mapPrev = new ol.Map({
			layers : [lyBaseMapPrev,ly],
			view : new ol.View({
				center : [1109892.657 , 883016.943],
				projection: 'EPSG:3116',
				zoom : 4,
				minZoom : 3
			}),
			controls: ol.control.defaults({ attribution: false})
		});
		Ext.create('Ext.window.Window', {
			id: 'windowMapPrev',
			title: 'Previsualización: ' + rec.get('titulo'),
			constrainHeader: true,
			x: x + 5,
			y: y,
			width : 450,
			height : 320,
			closable: true,
			resizable: true,
			collapsible: true,
			layout: 'border',
			items : [{
				xtype: 'panel',
				region : 'center',
				layout: 'fit',
				//border: true,
				items : [{
					xtype: 'gx_map',
					map : mapPrev
				}]
			},{
				xtype: 'panel',
				region : 'south',
				layout: 'fit',
				height: 30,
				items:[{
					layout: 'column',
					border: false,
					items:[{
						columnWidth: '0.5',
						xtype: 'checkboxfield',
						boxLabel: nbBaseOSM,
						checked: true,
						margin:'0 0 0 10',
						listeners:{
							change: function(thisCheckbox, newValue, oldValue, eOpts )
							{
								var layer = findBy(mapPrev.getLayerGroup(), 'name', nbBaseOSM);
								if (layer)
								{
									if(thisCheckbox.getValue())
									{
										layer.setVisible(true);
									}
									else{
										layer.setVisible(false);
									}
								}
							}
						}
					},{
						columnWidth: '0.5',
						xtype: 'checkboxfield',
						boxLabel: rec.get('titulo'),
						checked: true,
						margin:'0 0 0 10',
						listeners:{
							change: function(thisCheckbox, newValue, oldValue, eOpts )
							{
								var layer = findBy(mapPrev.getLayerGroup(), 'name', rec.get('titulo'));
								if (layer)
								{
									if(thisCheckbox.getValue())
									{
										layer.setVisible(true);
									}
									else{
										layer.setVisible(false);
									}
								}
							}
						}
					}]
				}]
			}]
		}).show();
	}
	else{
		Ext.MessageBox.show({
			title : 'Error',
			msg : 'Esta capa no esta disponible en un Sistema de Referencia compatible con el del visor o no se puede interpretar',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	}

}

urlAppend = function(url, paramStr) {

    var newUrl = url;

    if (paramStr) {

            var parts = (url + " ").split(/[?&]/);

            newUrl += (parts.pop() === " " ? paramStr : parts.length ? "&"

                            + paramStr : "?" + paramStr);

    }

    return newUrl;

};

function mapAddLayer(rec)
{
	if(rec.get('crsvalido') == 1)
	{
		if (rec.get('tipo') == 'WMS')
		{
				var startResolution = ol.extent.getWidth(ol.proj.get('EPSG:3116').getExtent()) / 256;
		    var resolutions = new Array(22);
		    for (var i = 0, ii = resolutions.length; i < ii; ++i) {
		      resolutions[i] = startResolution / Math.pow(2, i);
		    }

			ly = new ol.layer.Tile({
				name : rec.get('titulo'),
				source : new ol.source.TileWMS({
					url : rec.get('url'),
					params : {
						'LAYERS' : rec.get('nombre'),
						'VERSION': rec.get('version')
					},
					crossOrigin: null,
					serverType: 'geoserver',
			          tileGrid: new ol.tilegrid.TileGrid({
			            extent: [-9750822.095514398,-265187.8844813815,-6747152.632020911,1292904.500083237],
			            resolutions: resolutions,
			            tileSize: [512, 256]
			          }),
			         projection: 'EPSG:3116'
				}),
				visible : true
			});
		}
		else if(rec.get('tipo') == 'WMTS')
		{
			ly = new ol.layer.Tile({
				name : rec.get('titulo'),
				extent: rec.get('projection').getExtent(),
				source: new ol.source.WMTS({
			    url: rec.get('url'),
			    layer: rec.get('nombre'),
					matrixSet: rec.get('matrixSet'),
					format: 'image/png',
					projection: rec.get('projection'),
					tileGrid: new ol.tilegrid.WMTS({
						origin: ol.extent.getTopLeft(rec.get('projection').getExtent()),
						resolutions: rec.get('resolutions'),
						matrixIds: rec.get('matrixIds')
					}),
					style: 'default',
					crossOrigin: null
				}),
				visible : true
			});
		}
		addLayersGroup (ly, nameUsuario);

		Ext.getStore('storeAllLayers').clearFilter();
		Ext.getStore('storeAllLayers').filterBy(function(record) {
			if (record.data.text != 'NoLegend') {
				return true;
			}
		});

	}
	else{
		Ext.MessageBox.show({
			title : 'Error al añadir capa',
			msg : 'Esta capa no esta disponible en un Sistema de Referencia compatible con el del visor o no se puede interpretar',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	}


}
