/**
 *
 */
 	var measure; // global so we can remove it later
 	var draw;

	/**
	 * Currently drawn feature.
	 * @type {ol.Feature}
	 */
	var sketch;


	/**
	 * The help tooltip element.
	 * @type {Element}
	 */
	var helpTooltipElement;


	/**
	 * Overlay to show the help messages.
	 * @type {ol.Overlay}
	 */
	var helpTooltip;


	/**
	 * The measure tooltip element.
	 * @type {Element}
	 */
	var measureTooltipElement;


	/**
	 * Overlay to show the measurement.
	 * @type {ol.Overlay}
	 */
	var measureTooltip;


	/**
	 * Message to show when the user is drawing a polygon.
	 * @type {string}
	 */
	var continuePolygonMsg = 'Click para continuar dibujando el polígono';


	/**
	 * Message to show when the user is drawing a line.
	 * @type {string}
	 */
	var continueLineMsg = 'Click para continuar dibujando la línea';

	/**
	 * Handle pointer move.
	 * @param {ol.MapBrowserEvent} evt
	 */
	var pointerMoveHandler = function(evt) {
	  if (evt.dragging) {
	    return;
	  }
	  /** @type {string} */
	  var helpMsg = 'Click para empezar a dibujar';
	  /** @type {ol.Coordinate|undefined} */
	  var tooltipCoord = evt.coordinate;

	  if (sketch) {
	    var output;
	    var geom = (sketch.getGeometry());
	    if (geom instanceof ol.geom.Polygon) {
	      output = 'Área: ' + formatArea(/** @type {ol.geom.Polygon} */ (geom));
	      helpMsg = continuePolygonMsg;
	      tooltipCoord = geom.getInteriorPoint().getCoordinates();
	    } else if (geom instanceof ol.geom.LineString) {
	      output = 'Distancia: ' + formatLength( /** @type {ol.geom.LineString} */ (geom));
	      helpMsg = continueLineMsg;
	      tooltipCoord = geom.getLastCoordinate();
	    }
	    //measureTooltipElement.innerHTML = output;
	    //measureTooltip.setPosition(tooltipCoord);

	    Ext.getCmp('lblMeasureResult').setText(output, false);

	  }

	  helpTooltipElement.innerHTML = helpMsg;
	  helpTooltip.setPosition(evt.coordinate);
	};


	function addInteraction(typeSelect) {
	  var type = (typeSelect == 'area' ? 'Polygon' : 'LineString');
	  measure = new ol.interaction.Draw({
	    //source: source,
	  	source: layerMeasure.getSource(),
	    type: /** @type {ol.geom.GeometryType} */ (type),
	    style: new ol.style.Style({
	      fill: new ol.style.Fill({
	        color: 'rgba(255, 255, 255, 0.2)'
	      }),
	      stroke: new ol.style.Stroke({
	        color: 'rgba(255, 255, 0, 1)',
	        lineDash: [10, 10],
	        width: 2
	      }),
	      image: new ol.style.Circle({
	        radius: 5,
	        stroke: new ol.style.Stroke({
	          color: 'rgba(255, 255, 0, 1)'
	        }),
	        fill: new ol.style.Fill({
	          color: 'rgba(255, 255, 255, 0.2)'
	        })
	      })
	    })
	  });
	  map.addInteraction(measure);

	  createMeasureTooltip();
	  createHelpTooltip();

	  measure.on('drawstart',
	  	function(evt) {

	    	layerMeasure.getSource().clear();
	        // set sketch
	        sketch = evt.feature;
	 	}, this);

	  measure.on('drawend',
	      function(evt) {
	        measureTooltipElement.className = 'tooltip tooltip-static textoAyudaMedir';
	        measureTooltip.setOffset([0, -7]);
	        // unset sketch
	        sketch = null;
	        // unset tooltip so that a new one can be created
	        measureTooltipElement = null;
	        createMeasureTooltip();
	      }, this);
	}

	/**
	 * Creates a new help tooltip
	 */
	function createHelpTooltip() {
	  if (helpTooltipElement) {
	    helpTooltipElement.parentNode.removeChild(helpTooltipElement);
	  }
	  helpTooltipElement = document.createElement('div');
	  helpTooltipElement.className = 'tooltip textoAyudaMedir';
	  helpTooltip = new ol.Overlay({
	    element: helpTooltipElement,
	    offset: [15, 0],
	    positioning: 'center-left'
	  });
	  map.addOverlay(helpTooltip);
	}


	/**
	 * Creates a new measure tooltip
	 */
	function createMeasureTooltip() {
	  if (measureTooltipElement) {
	    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
	  }
	  measureTooltipElement = document.createElement('div');
	  measureTooltipElement.className = 'tooltip tooltip-measure textoAyudaMedir';
	  measureTooltip = new ol.Overlay({
	    element: measureTooltipElement,
	    offset: [0, -15],
	    positioning: 'bottom-center'
	  });
	  map.addOverlay(measureTooltip);
	}

	/**
	 * format length output
	 * @param {ol.geom.LineString} line
	 * @return {string}
	 */
	var formatLength = function(line) {
	  var length = Math.round(line.getLength() * 100) / 100;
	  var output;
	  /*if (length > 100) {
	    output = (Math.round(length / 1000 * 100) / 100) +
	        ' ' + 'km';
	  } else {
	    output = (Math.round(length * 100) / 100) +
	        ' ' + 'm';
	  }*/

	  if (Ext.getCmp('comboMeasureUnid').getValue() == 'km')
	  {
	  	output = (Math.round(length / 1000 * 100) / 100).toFixed(2) + ' ' + 'km';
	  }
	  else if (Ext.getCmp('comboMeasureUnid').getValue() == 'm') {
	  	output = (Math.round(length * 100) / 100).toFixed(2) + ' ' + 'm';
	  }

	  return output;
	};


	/**
	 * format length output
	 * @param {ol.geom.Polygon} polygon
	 * @return {string}
	 */
	var formatArea = function(polygon) {
	  var area = polygon.getArea();
	  var output;
	  /*if (area > 10000) {
	    output = (Math.round(area / 1000000 * 100) / 100) +
	        ' ' + 'km<sup>2</sup>';
	  } else {
	    output = (Math.round(area * 100) / 100) +
	        ' ' + 'm<sup>2</sup>';
	  }*/

	  if (Ext.getCmp('comboMeasureUnid').getValue() == 'km2')
	  {
	  	output = (Math.round(area / 1000000 * 100) / 100).toFixed(2) + ' ' + 'Km<sup>2</sup>';
	  }
	  else if (Ext.getCmp('comboMeasureUnid').getValue() == 'ha')
	  {
	  	output = (Math.round(area * 100) / 100 / 10000).toFixed(2) + ' ' + 'ha';
	  }
	  else if (Ext.getCmp('comboMeasureUnid').getValue() == 'm2')
	  {
	  	output = (Math.round(area * 100) / 100).toFixed(2) + ' ' + 'm<sup>2</sup>';
	  }
	  return output;
	};

	function addInteractionDraw(typeSelect) {

		  draw = new ol.interaction.Draw({
		  	source: layerDraw.getSource(),
		    type: /** @type {ol.geom.GeometryType} */ typeSelect,
		    style: new ol.style.Style({
			    stroke: new ol.style.Stroke({
			      color: color,
			      width: 2
			    }),
			    image: new ol.style.Circle({
			      radius: 7,
			      fill: new ol.style.Fill({
			        color: color
			      })
			    })
			  })
		  });
		  map.addInteraction(draw);

		  createMeasureTooltip();
		  createHelpTooltip();

		  draw.on('drawstart',
		  	function(evt) {

		    	//layerDraw.getSource().clear();
		        // set sketch
		        sketch = evt.feature;
		 	}, this);

		  draw.on('drawend',
		      function(evt) {
		        measureTooltipElement.className = 'tooltip tooltip-static textoAyudaMedir';
		        measureTooltip.setOffset([0, -7]);
		        // unset sketch
		        sketch = null;
		        // unset tooltip so that a new one can be created
		        measureTooltipElement = null;
		        createMeasureTooltip();
		      }, this);
		}
