
//Variables iniciales
 var loading = 0;
 var requestedTiles = {};
 var canvas;
 var onTilesLoaded = null;

 var img = new Image;
 img.crossOrigin = "";

 var header = new Image;
 header.crossOrigin = "";

 var fontsize;

 var raster = new ol.layer.Tile({
	  source: new ol.source.OSM()
	});

 var tileLoadStart = function() {
      ++loading;
 };

 var tileLoadEnd = function() {
      --loading;
      if (loading < 0)
		console.warn(requestedTiles);
	  if (loading === 0 && onTilesLoaded){
	  	console.debug("delay trigger exporting pdf", loading);
	  	onTilesLoaded();
	    onTilesLoaded = null;
	  }
 };

 var tileLoadError = function(ev) {
	console.error(ev.tile.l);
  	tileLoadEnd(ev);
 }


 /**
  * Impresión del mapa
  *  @param {String} format
     @param {String} resolution
     @param {Ext.LoadMask} myMask
  *
  **/
function print(format, resolution, myMask){

	 myMask.show();

	 if (Array.isArray(FeaturesSelect)){
	 	var length = FeaturesSelect.length;
	 }else{
	 	var length = FeaturesSelect.getArray().length;
	 }
	 if (length == 0){

	 	var dimsmap = {
		        a3: [420, 297],
		        a4: [297, 210]
		      };

	 	 var dims = {
		        a3: [533, 336],
		        a4: [369, 234]
		      };

		 var posics = {
			        a3: [10, 25],
			        a4: [10, 20]
			      };

	 	 var dimsrect = {
			        a3: [400, 252],
		        	a4: [277, 175]
			      };

		 var posicsrect = {
			        a3: [9.5, 24.5],
			        a4: [9.5, 19.5]
			      };

		 var posicstext = {
			        a3: [200, 287],
			        a4: [138, 204]
			      };

		 var posicsescala = {
				    a3: [325, 217],
				    a4: [202, 135]
				  };

		 var dimsimg = {
			        a3: [55, 55.5],
			        a4: [55, 55.5]
			      };

		 var posicsimg = {
			        a3: [355.3, 221.8],
			        a4: [232.3, 139.8]
			      };

		 var dimsheader = {
			        a3: [420, 20],
			        a4: [297, 16,9]
			      };


	 	var bbox = bboxMunicipios.split(",", 4);

	 	for (i = 0; i < bbox.length; i++){
	 		bbox[i] = parseFloat(bbox[i]);
	 	}

		var extent = Ext.getCmp('geoextMap').getExtent();

	 	if (format == 'a3'){
		 	img.src = 'visorcatastrocol/app/img/leyendaA4.png';
		 	header.src = 'visorcatastrocol/app/img/cabeceraA3.png';
			fontsize = 13;
		 }else if (format == 'a4'){
		 	img.src = 'visorcatastrocol/app/img/leyendaA4.png';
			header.src = 'visorcatastrocol/app/img/cabeceraA4.png';
			fontsize = 10;
		 }

	 }else{

	 	 if (Array.isArray(FeaturesSelect)){
		 	var featuresprint = FeaturesSelect[0].getProperties();
		 	var extent = Ext.getCmp('geoextMap').getExtent();
		 }else{
		 	var featuresprint = FeaturesSelect.getArray()[0].getProperties();
		 	var extent = Ext.getCmp('geoextMap').getExtent();
		 }

		 var dimsmap = {
		        a3: [420, 297],
		        a4: [297, 210]
		      };

	 	 var dims = {
		        a3: [413, 336],
		        a4: [250, 234]
		      };

		 var posics = {
			        a3: [10, 25],
			        a4: [10, 20]
			      };

		 var dimsrect = {
			        a3: [310, 252],
			        a4: [187, 175]
			      };

		 var posicsrect = {
			        a3: [9.5, 24.5],
			        a4: [9.5, 19.5]
			      };

		 var posicstext = {
			        a3: [200, 287],
			        a4: [138, 204]
			      };

		 var dimsimg = {
			        a3: [84.2, 35.5],
			        a4: [84.2, 35.5]
			      };

		 var posicsimg = {
			        a3: [325, 241],
			        a4: [202, 159]
			      };

		var posicstable = {
				    a3: [325, 24],
				    a4: [202, 19.5]
				  };

		var posicsescala = {
				    a3: [325, 234.2],
				    a4: [202, 152.2]
				  };

		 var dimsheader = {
			        a3: [420, 20],
			        a4: [297, 16.9]
			      };

		 var posictable = posicstable[format];

		 if (format == 'a3'){
		 	img.src = 'visorcatastrocol/app/img/leyendaA4v2.png';
		 	header.src = 'visorcatastrocol/app/img/cabeceraA3.png';
			fontsize = 13;
		 }else if (format == 'a4'){
		 	img.src = 'visorcatastrocol/app/img/leyendaA4v2.png';
			header.src = 'visorcatastrocol/app/img/cabeceraA4.png';
			fontsize = 10;
		 }

	 }

	map.once('postcompose', function(event) {
		canvas = event.context.canvas;
	});

	 if(baseMaps.getVisible() == true){
	 	var arraybaselayers = baseMaps.getLayers().getArray();

	 	for (i = 0; i < arraybaselayers.length; i++){
	 		 if (arraybaselayers[i].getProperties().name == nbOrtofoto && arraybaselayers[i].getVisible() == true) {
			    	var source = arraybaselayers[i].getSource();
					source.on('tileloadstart', tileLoadStart);
					source.on('tileloadend', tileLoadEnd);
					source.on('tileloaderror', tileLoadError);
			 }else if (arraybaselayers[i].getProperties().name == nbBaseOSM && arraybaselayers[i].getVisible() == true) {
			    	var source = arraybaselayers[i].getSource();
					source.on('tileloadstart', tileLoadStart);
					source.on('tileloadend', tileLoadEnd);
					source.on('tileloaderror', tileLoadError);
			 }
	 	}

	 }else{
			var source = raster.getSource();
			source.on('tileloadstart', tileLoadStart);
			source.on('tileloadend', tileLoadEnd);
			source.on('tileloaderror', tileLoadError);
	 }

	var dim = dims[format];
	var dimmap = dimsmap[format];
	var dimrect = dimsrect[format];
	var posic = posics[format];
	var posicrect = posicsrect[format];
	var dimimg = dimsimg[format];
	var posicimg = posicsimg[format];

	var posicescala = posicsescala[format];
	var dimheader = dimsheader[format];
	var posictext = posicstext[format];

	var width = Math.round(dim[0] * resolution / 25.4);
	var height = Math.round(dim[1] * resolution / 25.4);


	var sizemap = /** @type {ol.Size} */ (map.getSize());
	var resolution = (map.getView().getResolution());
	var zoom = (map.getView().getZoom());

	if (featuresprint != undefined){

		var keys = Object.keys(featuresprint);
		var columns = ["Atributos", "Valor"];
		var rows = [];

		if (featuresprint.Tipo == nbTerreno)
		{
			if (map.getView().getZoom() >= 14 ){

				k = keys[(keys.length - 1)];
				rows.push(["Tipo", featuresprint[k]]);

			}
		}
		if (featuresprint.Tipo == nbConstruccion)
		{
			if (map.getView().getZoom() >= 14 ){

				k = keys[(keys.length - 1)];
				rows.push(["Tipo", featuresprint[k]]);

			}
		}
		if (featuresprint.Tipo == nbCobertura)
		{
			if (map.getView().getZoom() >= 14 ){

				k = keys[(keys.length - 1)];
				rows.push(["Tipo", featuresprint[k]]);

			}
		}
		if (featuresprint.Tipo == nbUnidad)
		{
			if (map.getView().getZoom() >= 14 ){

				k = keys[(keys.length - 1)];
				rows.push(["Tipo", featuresprint[k]]);
			}
		}


		for (i = 0; i < keys.length; i++)
		{
			k = keys[i];

			if (typeof featuresprint[k] !== 'object')
				{
					if (featuresprint.Tipo == nbTerreno)
					{
						if (map.getView().getZoom() >= 14 ){

							if (k == "departamento"){
								var departamento = featuresprint[k];
							}else if (k == "dpto_cnmbr"){
								rows.push(["Departamento", departamento + " | " + featuresprint[k]]);
							}else if (k == "municipio"){
								var municipio = featuresprint[k];
							}else if (k == "mpio_cnmbr"){
								rows.push(["Municipio", municipio + " | " + featuresprint[k]]);
							}else if (k == "zona"){
								rows.push(["Zona", featuresprint[k]]);
							}else if (k == "sector"){
								rows.push(["Sector", featuresprint[k]]);
							}else if (k == "comuna"){
								rows.push(["Comuna", featuresprint[k]]);
							}else if (k == "barrio"){
								rows.push(["Barrio", featuresprint[k]]);
							}else if (k == "manzana"){
								rows.push(["Manzana", featuresprint[k]]);
							}else if (k == "predio"){
								rows.push(["Predio", featuresprint[k]]);
							}else if (k == "cond_propi"){
								rows.push(["Condición de propiedad", featuresprint[k]]);
							}else if (k == "superficie"){
								rows.push(["Superficie (m2)", featuresprint[k]]);
							}

						}
					}
					if (featuresprint.Tipo == nbConstruccion)
					{
						if (map.getView().getZoom() >= 14 ){

							if (k == "numero_predial"){
								rows.push(["Número Predial", featuresprint[k]]);
							}else if (k == "numero_pisos"){
								rows.push(["Número de pisos", featuresprint[k]]);
							}else if (k == "superficie"){
								rows.push(["Superficie (m2)", featuresprint[k]]);
							}

						}
					}
					if (featuresprint.Tipo == nbCobertura)
					{
						if (map.getView().getZoom() >= 14 ){

							if (k == "numero_predial"){
								rows.push(["Número Predial", featuresprint[k]]);
							}else if (k == "uso"){
								rows.push(["Cobertura del suelo", featuresprint[k]]);
							}else if (k == "superficie"){
								rows.push(["Superficie (m2)", featuresprint[k]]);
							}

						}
					}
					if (featuresprint.Tipo == nbUnidad)
					{
						if (map.getView().getZoom() >= 14 ){

							if (k == "departamento"){
								var departamento = featuresprint[k];
							}else if (k == "dpto_cnmbr"){
								rows.push(["Departamento", departamento + " | " + featuresprint[k]]);
							}else if (k == "municipio"){
								var municipio = featuresprint[k];
							}else if (k == "mpio_cnmbr"){
								rows.push(["Municipio", municipio + " | " + featuresprint[k]]);
							}else if (k == "zona"){
								rows.push(["Zona", featuresprint[k]]);
							}else if (k == "sector"){
								rows.push(["Sector", featuresprint[k]]);
							}else if (k == "comuna"){
								rows.push(["Comuna", featuresprint[k]]);
							}else if (k == "barrio"){
								rows.push(["Barrio", featuresprint[k]]);
							}else if (k == "manzana"){
								rows.push(["Manzana", featuresprint[k]]);
							}else if (k == "predio"){
								rows.push(["Predio", featuresprint[k]]);
							}else if (k == "cond_propi"){
								rows.push(["Condición de propiedad", featuresprint[k]]);
							}else if (k == "superficie"){
								rows.push(["Superficie (m2)", featuresprint[k]]);
							}
						}
					}
				}
		}

	}

	var exportpdf = function(){
	  var data = canvas.toDataURL('image/png');
      var pdf = new jsPDF('landscape', undefined, format);
      pdf.setDrawColor(0);
      pdf.addImage(data, 'JPEG', posic[0], posic[1]);
      pdf.addImage(img, 'PNG', posicimg[0], posicimg[1], dimimg[0], dimimg[1]);
      pdf.addImage(header, 'PNG', 0, 0, dimheader[0], dimheader[1]);
      pdf.rect(posicrect[0], posicrect[1], dimrect[0]+0.8, dimrect[1]+0.8);
      if (length != 0){
       pdf.rect(posicimg[0], posicimg[1], dimimg[0]+0.8, dimimg[1]+0.8);
      }
      pdf.setFont('helvetica');
      pdf.setFontType('normal');
      pdf.setFontSize(fontsize);

      if (length != 0){
      	pdf.autoTable(columns, rows, {
      			theme : 'plain',
		    	styles: {
		    		fontSize: 8,
    				font: "helvetica",
    				fontStyle: 'normal',
    				lineColor: 0,
    				lineWidth: 0.01,
    				halign: "center"
		    	},
		    	headerStyles: {
		    		fillColor: [0, 123, 221],
		    		fontSize: 9,
    				font: "helvetica",
    				fontStyle: 'bold',
    				textColor: 255,
    				halign: "center"
		    	},
			    tableWidth: 85,
			    margin: {top: posictable[1], left: posictable[0]}
		});
		pdf.autoTable(["Escala", "1/" + getCurrentScale(map)], [], {
      			theme : 'plain',
		    	styles: {
		    		fontSize: 8,
    				font: "helvetica",
    				fontStyle: 'normal',
    				lineColor: 0,
    				lineWidth: 0.01,
    				halign: "center"
		    	},
      			tableWidth: 85,
			    margin: {top: posicescala[1], left: posicescala[0]}

      	});
      }else{
      	pdf.autoTable(["Escala", "1/" + getCurrentScale(map)], [], {
	      			theme : 'plain',
			    	styles: {
			    		fontSize: 8,
	    				font: "helvetica",
	    				fontStyle: 'normal',
	    				fillColor: 255,
	    				lineColor: 0,
	    				lineWidth: 0.01,
	    				halign: "center"
			    	},
	      			tableWidth: dimimg[0],
				    margin: {top: posicescala[1], left: posicimg[0]}


	     });
      }

      pdf.save('mapa.pdf');
      loading = 0;

      map.setSize(sizemap);
      map.getView().setResolution(resolution);
      map.getView().setZoom(zoom);
      map.getView().fit(extent, sizemap);

      map.renderSync();
      document.body.style.cursor = 'auto';
      myMask.hide();

	}
	  map.setSize([width, height]);
	  map.getView().fit(extent, /** @type {ol.Size} */ (map.getSize()));
	  map.getView().setResolution(resolution);
	  map.getView().setZoom(zoom);

	  map.renderSync();
    window.setTimeout(function() {
	    if (loading === 0) {
	      exportpdf();
	    } else {
	      console.log("waiting for tiles ", loading);
	      onTilesLoaded = exportpdf;
	    }
	  }, 100);
}
