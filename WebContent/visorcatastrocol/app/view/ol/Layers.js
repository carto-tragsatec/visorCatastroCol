/**
 * Creación de estilos y capas
 *
 */
function iniciarCapas()
{
	var startResolution = ol.extent.getWidth(ol.proj.get('EPSG:3857').getExtent()) / 256;
  var resolutions = new Array(22);
  for (var i = 0, ii = resolutions.length; i < ii; ++i) {
      resolutions[i] = startResolution / Math.pow(2, i);
  }

	// ----Grupo capas base----
	baseMaps = new ol.layer.Group({
		name : grupoBase,
		layers : [
			new ol.layer.Tile({
				name : nbBaseOSM,
				source : new ol.source.OSM({
					url : urlBaseOSM,
					crossOrigin: 'Anonymous'
				}),
				visible : true
			}),
			new ol.layer.Tile({
				name : nbOrtofoto,
				source : new ol.source.TileWMS({
					url: 'proxy.jsp?' + encodeURIComponent(WMS),
					ratio: 1,
					params : {
						'LAYERS' : prefijo + ':' + capaOrtofoto,
						'TRANSPARENT': 'true',
						'TILED': 'true',
						'STYLES': ''
					},
					crossOrigin: null,
					serverType: 'geoserver',
			    projection: 'EPSG:3857'
				}),
				visible : false
			})
		]
	});
	// ----fin grupo capas base----

	// ----Grupo Servicios IGAC----

	groupServicesIGAC = new ol.layer.Group({
		name : grupoServiciosIGAC,
		layers : [
			new ol.layer.Tile({
			name : nbCartoBasica500,
			source : new ol.source.TileWMS({
				url: WMSCartoBasica500,
				ratio: 1,
				params : {
					'LAYERS' : capaCartoBasica500
				},
				crossOrigin: null,
				serverType: 'geoserver',
        tileGrid: new ol.tilegrid.TileGrid({
          extent: [-9750822.095514398,-265187.8844813815,-6747152.632020911,1292904.500083237],
          resolutions: resolutions,
          tileSize: [512, 256]
        }),
        projection: 'EPSG:3857'
			}),
			visible : false
		}), new ol.layer.Tile({
			name : nbCartoBasica100,
			source : new ol.source.TileWMS({
				url: WMSCartoBasica100,
				ratio: 1,
				params : {
					'LAYERS' : capaCartoBasica100,
					'TRANSPARENT': 'true',
					'STYLES': ''
				},
				crossOrigin: null,
				serverType: 'geoserver',
		          tileGrid: new ol.tilegrid.TileGrid({
		            extent: [-9750822.095514398,-265187.8844813815,-6747152.632020911,1292904.500083237],
		            resolutions: resolutions,
		            tileSize: [512, 256]
		          }),
		         projection: 'EPSG:3857'
			}),
			visible : false
		}), new ol.layer.Tile({
			name : nbCartoBasica10,
			source : new ol.source.TileWMS({
				url: WMSCartoBasica10,
				ratio: 1,
				params : {
					'LAYERS' : capaCartoBasica10,
					'TRANSPARENT': 'true',
					'STYLES': ''
				},
				crossOrigin: null,
				serverType: 'geoserver',
		          tileGrid: new ol.tilegrid.TileGrid({
		            extent: [-9750822.095514398,-265187.8844813815,-6747152.632020911,1292904.500083237],
		            resolutions: resolutions,
		            tileSize: [512, 256]
		          }),
		         projection: 'EPSG:3857'
			}),
			visible : false
		}), new ol.layer.Tile({
			name : nbResguardosIndigenas,
			source : new ol.source.TileWMS({
				url: WMSAreasReglaEsp,
				ratio: 1,
				params : {
					'LAYERS' : capaResguardosIndigenas,
					'TRANSPARENT': 'true',
					'STYLES': ''
				},
				crossOrigin: null,
				serverType: 'geoserver',
		          tileGrid: new ol.tilegrid.TileGrid({
		            extent: [-9750822.095514398,-265187.8844813815,-6747152.632020911,1292904.500083237],
		            resolutions: resolutions,
		            tileSize: [512, 256]
		          }),
		         projection: 'EPSG:3857'
			}),
			visible : false
		}), new ol.layer.Tile({
			name : nbComunidadesNegras,
			source : new ol.source.TileWMS({
				url: WMSAreasReglaEsp,
				ratio: 1,
				params : {
					'LAYERS' : capaComunidadesNegras,
					'TRANSPARENT': 'true',
					'STYLES': ''
				},
				crossOrigin: null,
				serverType: 'geoserver',
		          tileGrid: new ol.tilegrid.TileGrid({
		            extent: [-9750822.095514398,-265187.8844813815,-6747152.632020911,1292904.500083237],
		            resolutions: resolutions,
		            tileSize: [512, 256]
		          }),
		         projection: 'EPSG:3857'
			}),
			visible : false
		})
	 ]
	});
	// ----fin grupo Servicios IGAC----

	// ----Grupo Servicios IDEAM----
	groupServicesIDEAM = new ol.layer.Group({
		name : grupoServiciosIDEAM,
		layers : [
			new ol.layer.Tile({
			name : nbCoberTierra2000_2002,
			source : new ol.source.TileWMS({
				url: WMSCoberturasTierra,
				ratio: 1,
				params : {
					'LAYERS' : capaCoberTierra2000_2002,
					'TRANSPARENT': 'true',
					'STYLES': ''
				},
				crossOrigin: null,
				serverType: 'geoserver',
		          tileGrid: new ol.tilegrid.TileGrid({
		            extent: [-9750822.095514398,-265187.8844813815,-6747152.632020911,1292904.500083237],
		            resolutions: resolutions,
		            tileSize: [512, 256]
		          }),
		         projection: 'EPSG:3857'
			}),
			visible : false
		}), new ol.layer.Tile({
			name : nbCoberTierra2005_2009,
			source : new ol.source.TileWMS({
				url: WMSCoberturasTierra,
				ratio: 1,
				params : {
					'LAYERS' : capaCoberTierra2005_2009,
					'TRANSPARENT': 'true',
					'STYLES': ''
				},
				crossOrigin: null,
				serverType: 'geoserver',
		          tileGrid: new ol.tilegrid.TileGrid({
		            extent: [-9750822.095514398,-265187.8844813815,-6747152.632020911,1292904.500083237],
		            resolutions: resolutions,
		            tileSize: [512, 256]
		          }),
		         projection: 'EPSG:3857'
			}),
			visible : false
		}), new ol.layer.Tile({
			name : nbCoberTierra2010_2012,
			source : new ol.source.TileWMS({
				url: WMSCoberturasTierra,
				ratio: 1,
				params : {
					'LAYERS' : capaCoberTierra2010_2012,
					'TRANSPARENT': 'true',
					'STYLES': ''
				},
				crossOrigin: null,
				serverType: 'geoserver',
		        tileGrid: new ol.tilegrid.TileGrid({
		            extent: [-9750822.095514398,-265187.8844813815,-6747152.632020911,1292904.500083237],
		            resolutions: resolutions,
		            tileSize: [512, 256]
		          }),
		    projection: 'EPSG:3857'
			}),
			visible : false
		}), new ol.layer.Tile({
			name : nbCoberParamos,
			source : new ol.source.TileWMS({
				url: WMSCoberturasTierra,
				ratio: 1,
				params : {
					'LAYERS' : capaCoberParamos,
					'TRANSPARENT': 'true',
					'STYLES': ''
				},
				crossOrigin: null,
				serverType: 'geoserver',
		        tileGrid: new ol.tilegrid.TileGrid({
		            extent: [-9750822.095514398,-265187.8844813815,-6747152.632020911,1292904.500083237],
		            resolutions: resolutions,
		            tileSize: [512, 256]
		          }),
		        projection: 'EPSG:3857'
			}),
			visible : false
		})

		]
	});
	// ----fin grupo Servicios IDEAM----

	//----capa terreno
	sourceLayerTerreno =  new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        strategy: function(extent, resolution) {
		    if(this.resolution && this.resolution != resolution){
		    	this.clear();
		    }
		    return [extent];
        },
        loader: function(extent, resolution, projection)
        {
        	//en la version  wfs 1.3.0 cambia el orden en el bbox
        	// 1.0.0 --> (xmin, ymin, xmax, ymax)
        	// 1.1.0 y 1.3.0 --> (ymin,xmin,ymax,xmax)
        	var bbox = extent[1] + "," + extent[0] + "," + extent[3] + "," + extent[2];

			    var url = 'proxy.jsp?' + encodeURIComponent(WFS+
	        'service=WFS&request=GetFeature&'+
	        'version=1.3.0&typename=' + prefijo + ':' + capaTerreno + '&'+
	        'outputFormat=application/json&'+
	        'srsname=EPSG:3116');
	        url = url + encodeURIComponent("&bbox=" + bbox);

    			if (map.getView().getZoom() >= 14){
    				Ext.Ajax.request({
      				url: url,
      				async: false,
      				method: 'POST',
      				success: function(response, opts) {
    						sourceLayerTerreno.clear();
    						var features = new ol.format.GeoJSON().readFeatures(response.responseText);
    						sourceLayerTerreno.addFeatures(features);
    					}
    				});
    			}

	        this.resolution = resolution;
        },
        projection: 'EPSG:3116',
        crossOrigin: 'Anonymous'
	});

	styleLayerTerrenoEti = function(feature) {
		var styleText = new ol.style.Style({
			text : new ol.style.Text({
				font : "bold 10px tahoma",
				text : feature.get('manzana') + '\n' + feature.get('predio') ,
        stroke: new ol.style.Stroke({
        	color: '#FFFFFF',
        	width : 2
        })
			}),
			geometry : function(feature) {
				var interiorPoints = feature.getGeometry()
						.getInteriorPoints();
				return interiorPoints.getPoint(0);
			}
		});
		var style = new ol.style.Style({
		 stroke: new ol.style.Stroke({
            color: '#5cdb91',
            width : 2
     })
		});
		return [styleText, style];
	};

	styleLayerTerrenoNoEti = function(feature) {
		var style = new ol.style.Style({
			 stroke: new ol.style.Stroke({
	            color: '#5cdb91',
	            width : 2
	     })
		});
		return [style];
	};

	styleLayerTerrenoNo = function(feature) {
		var style = new ol.style.Style({
			stroke: new ol.style.Stroke({
				color : 'rgba(255,255,255,0)'
			})
		});
		return [style];
	};


	layerTerreno = new ol.layer.Vector({
		name: nbTerreno,
		source: sourceLayerTerreno,
		style: styleLayerTerrenoNo,
        visible : true
	});
	//----fin capa terreno

	//----capa construccion
	sourceLayerConstruccion =  new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        strategy: function(extent, resolution) {
		    if(this.resolution && this.resolution != resolution){
		    	this.clear();
		    }
		    return [extent];
        },
        loader: function(extent, resolution, projection)
        {
        	//en la version  wfs 1.3.0 cambia el orden en el bbox
        	// 1.0.0 --> (xmin, ymin, xmax, ymax)
        	// 1.1.0 y 1.3.0 --> (ymin,xmin,ymax,xmax)
        	var bbox = extent[1] + "," + extent[0] + "," + extent[3] + "," + extent[2];

			    var url = 'proxy.jsp?' + encodeURIComponent(WFS+
	        'service=WFS&request=GetFeature&'+
	        'version=1.3.0&typename=' + prefijo + ':' + capaConstruccion + '&'+
	        'outputFormat=application/json&'+
	        'srsname=EPSG:3116');
	        url = url + encodeURIComponent("&bbox=" + bbox);

	        if (map.getView().getZoom() >= 14){
    				Ext.Ajax.request({
    					url: url,
    					async: false,
    					method: 'POST',
    					success: function(response, opts) {
    						sourceLayerConstruccion.clear();
    						var features = new ol.format.GeoJSON().readFeatures(response.responseText);
    						sourceLayerConstruccion.addFeatures(features);
    					}
    				});
	        }
	        this.resolution = resolution;
        },
        projection: 'EPSG:3116',
        crossOrigin: 'Anonymous'
	});

	styleLayerConstruccionEti = function(feature, resolution) {
		var styleText = new ol.style.Style({
			text : new ol.style.Text({
				font : "bold 10px tahoma",
				text : feature.get('numero_predial'),
				fill : new ol.style.Fill({
					color : '#000000'
				}),
        stroke: new ol.style.Stroke({
        	color: '#FFFFFF',
        	width : 2
        })
			}),
			geometry : function(feature) {
				var interiorPoints = feature.getGeometry()
						.getInteriorPoints();
				return interiorPoints.getPoint(0);
			}
		});
		var style = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#FFFF00',
        width : 2
      }),
			fill : new ol.style.Fill({
				color : 'rgba(255,255,0,0.4)'
			})
		});
		return [styleText, style];
	};
	styleLayerConstruccionNoEti = function(feature) {
		var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: '#FF0000',
              width : 2
            })
		});
		return [style];
	};

	styleLayerConstruccionNo = function(feature) {
		var style = new ol.style.Style({
			stroke: new ol.style.Stroke({
				color : 'rgba(255,255,255,0)'
			}),
            fill : new ol.style.Fill({
				color : 'rgba(255,255,255,0)'
			})
		});
		return [style];
	};

	layerConstruccion = new ol.layer.Vector({
		name: nbConstruccion,
		source: sourceLayerConstruccion,
		style: styleLayerConstruccionNo,
        visible : true
	});
	//----fin capa construccion

	//----capa cobertura
	sourceLayerCobertura =  new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        strategy: function(extent, resolution) {
		    if(this.resolution && this.resolution != resolution){
		    	this.clear();
		    }
		    return [extent];
        },
        loader: function(extent, resolution, projection)
        {
        	//en la version  wfs 1.3.0 cambia el orden en el bbox
        	// 1.0.0 --> (xmin, ymin, xmax, ymax)
        	// 1.1.0 y 1.3.0 --> (ymin,xmin,ymax,xmax)
        	var bbox = extent[1] + "," + extent[0] + "," + extent[3] + "," + extent[2];

			    var url = 'proxy.jsp?' + encodeURIComponent(WFS+
	        'service=WFS&request=GetFeature&'+
	        'version=1.3.0&typename=' + prefijo + ':' + capaCobertura + '&'+
	        'outputFormat=application/json&'+
	        'srsname=EPSG:3116');
	        url = url + encodeURIComponent("&bbox=" + bbox);

	        if (map.getView().getZoom() >= 14){
    				Ext.Ajax.request({
    					url: url,
    					async: false,
    					method: 'POST',
    					success: function(response, opts) {
    						sourceLayerCobertura.clear();
    						var features = new ol.format.GeoJSON().readFeatures(response.responseText);
    						sourceLayerCobertura.addFeatures(features);
    					}
    				});
	        }
	        this.resolution = resolution;
        },
        projection: 'EPSG:3116',
        crossOrigin: 'Anonymous'
	});

	styleLayerCoberturaEti = function(feature, resolution) {
		var styleText = new ol.style.Style({
			text : new ol.style.Text({
				font : "bold 10px tahoma",
				text : feature.get('numero_predial'),
				fill : new ol.style.Fill({
					color : '#000000'
				}),
        stroke: new ol.style.Stroke({
        	color: '#FFFFFF',
        	width : 2
        })
			}),
			geometry : function(feature) {
				var interiorPoints = feature.getGeometry()
						.getInteriorPoints();
				return interiorPoints.getPoint(0);
			}
		});
		var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: '#0971B2',
              width : 2
            }),
			fill : new ol.style.Fill({
				color : 'rgba(255,255,0,0.4)'
			})
		});
		return [styleText, style];
	};
	styleLayerCoberturaNoEti = function(feature) {
		var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: '#0971B2',
              width : 2
            })
		});
		return [style];
	};

	styleLayerCoberturaNo = function(feature) {
		var style = new ol.style.Style({
			stroke: new ol.style.Stroke({
				color : 'rgba(255,255,255,0)'
			}),
            fill : new ol.style.Fill({
				color : 'rgba(255,255,255,0)'
			})
		});
		return [style];
	};

	layerCobertura = new ol.layer.Vector({
		name: nbCobertura,
		source: sourceLayerCobertura,
		style: styleLayerCoberturaNo,
        visible : true
	});
	//----fin capa cobertura

	//----capa unidad
	sourceLayerUnidad =  new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        strategy: function(extent, resolution) {
		    if(this.resolution && this.resolution != resolution){
		    	this.clear();
		    }
		    return [extent];
        },
        loader: function(extent, resolution, projection)
        {
        	//en la version  wfs 1.3.0 cambia el orden en el bbox
        	// 1.0.0 --> (xmin, ymin, xmax, ymax)
        	// 1.1.0 y 1.3.0 --> (ymin,xmin,ymax,xmax)
        	var bbox = extent[1] + "," + extent[0] + "," + extent[3] + "," + extent[2];

			var url = 'proxy.jsp?' + encodeURIComponent(WFS+
	        'service=WFS&request=GetFeature&'+
	        'version=1.3.0&typename=' + prefijo + ':' + capaUnidad + '&'+
	        'outputFormat=application/json&'+
	        'srsname=EPSG:3116');
	        url = url + encodeURIComponent("&bbox=" + bbox);

	        if (map.getView().getZoom() >= 14){
				Ext.Ajax.request({
					url: url,
					async: false,
					method: 'POST',
					success: function(response, opts) {
						sourceLayerUnidad.clear();
						var features = new ol.format.GeoJSON().readFeatures(response.responseText);
						sourceLayerUnidad.addFeatures(features);
					}
				});
	        }
	        this.resolution = resolution;
        },
        projection: 'EPSG:3116',
        crossOrigin: 'Anonymous'
	});
	styleLayerUnidadEti = function(feature, resolution) {
		var styleText = new ol.style.Style({
			text : new ol.style.Text({
				font : "bold 10px tahoma",
				text : feature.get('numero_predial'),
				fill : new ol.style.Fill({
					color : '#000000'
				}),
        stroke: new ol.style.Stroke({
        	color: '#FFFFFF',
        	width : 2
        })
			}),
			geometry : function(feature) {
				var interiorPoints = feature.getGeometry()
						.getInteriorPoints();
				return interiorPoints.getPoint(0);
			}
		});
		var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: '#FFFF00',
              width : 2
            })
		});
		return [styleText, style];
	};
	styleLayerUnidadNoEti = function(feature) {
		var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: '#8206B4',
              width : 2
            })
		});
		return [style];
	};

	styleLayerUnidadNo = function(feature) {
		var style = new ol.style.Style({
			stroke: new ol.style.Stroke({
				color : 'rgba(255,255,255,0)'
			})
		});
		return [style];
	};

	layerUnidad = new ol.layer.Vector({
		name: nbUnidad,
		source: sourceLayerUnidad,
		style: styleLayerUnidadNo,
        visible : true
	});
	//----fin capa unidad

	// ----capa de medida----
	layerMeasure = new ol.layer.Vector({
		source: new ol.source.Vector({
			crossOrigin: 'Anonymous'
		}),
	    style: new ol.style.Style({
	    	fill: new ol.style.Fill({
	        	color: 'rgba(255, 255, 255, 0.4)'
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
	          		color: 'rgba(255, 255, 255, 0.4)'
	        	})
	      	})
	    })
	});
	// ----fin capa de medida----

	// ----capa de dibujar----
	sourceLayerDraw = new ol.source.Vector();

	layerDraw = new ol.layer.Vector({
	  source: sourceLayerDraw,
	  style: new ol.style.Style({
	    fill: new ol.style.Fill({
	      color: 'rgba(255,255,255,0)'
	    }),
	    stroke: new ol.style.Stroke({
	      color: 'rgba(255,255,255,0)',
	      width: 2
	    }),
	    image: new ol.style.Circle({
	      radius: 7,
	      fill: new ol.style.Fill({
	        color: 'rgba(255,255,255,0)'
	      })
	    })
	  })
	});
	// ----fin capa de dibujar----

		// ----Iteracción de selección----

	select = new ol.interaction.Select({
		layers: [layerCobertura, layerConstruccion, layerTerreno, layerUnidad ],
		multi: true
	});

	FeaturesSelect = select.getFeatures();
	// ----fin capa de selección----


	// ----Grupo Capa Usuario----

	layersUser = new ol.layer.Group({
		name: nameUsuario
	});
	// ----Grupo fin Capa Usuario----

	// ----Grupo capas prediales----
	groupLayersPrediales = new ol.layer.Group({
		name : grupoPredial,
		layers:[layerCobertura, layerConstruccion, layerTerreno, layerUnidad ]
	});
	// ----fin grupo capas prediales----

	// ----Grupo capas no leyenda----
	layersNoLegend = new ol.layer.Group({
		name: 'NoLegend',
		layers:[layerMeasure, layerDraw]
	});
	// ----fin grupo capas no leyenda----

	//----capa departamentos
	sourceLayerDepartamentos = getSourceVector(prefijo, capaDepartamentos, "");
	styleLayerDepartamentosEti = function(feature, resolution) {
		var styleText = new ol.style.Style({
      			text : new ol.style.Text({
      				font : "bold 10px tahoma",
      				text : feature.get('dpto_cnmbr'),
      				fill : new ol.style.Fill({
      					color : '#000000'
      				}),
              stroke: new ol.style.Stroke({
              	color: '#FFFFFF',
              	width : 4
              })
      			})
		});
		var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: '#8b8687',
              width : 2
            })
		});
		return [styleText, style];
	};
	styleLayerDepartamentosNoEti = function(feature) {
		var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: '#8b8687',
              width : 4
            })
		});
		return [style];
	};

	layerDepartamentos = new ol.layer.Vector({
		name: nbDepartamentos,
		source: sourceLayerDepartamentos,
		style: styleLayerDepartamentosEti,
        visible : true
	});
	//----fin capa departamentos

	//----capa municipios
	sourceLayerMunicipios = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        strategy: function(extent, resolution) {
  		    if(this.resolution && this.resolution != resolution){
  		    	this.clear();
  		    }
  		    return [extent];
        },
        loader: function(extent, resolution, projection)
        {
        	bboxMunicipios = extent[1] + "," + extent[0] + "," + extent[3] + "," + extent[2];

    			var url = 'proxy.jsp?' + encodeURIComponent(WFS+
	        'service=WFS&request=GetFeature&'+
	        'version=1.3.0&typename=' + prefijo + ':' + capaMunicipios + '&'+
	        'outputFormat=application/json&'+
	        'srsname=EPSG:3116');
    	    url = url + encodeURIComponent("&bbox=" + bboxMunicipios);
      		Ext.Ajax.request({
      				url: url,
      				async: false,
      				method: 'POST',
      				success: function(response, opts) {
      					sourceLayerMunicipios.clear();
      					var features = new ol.format.GeoJSON().readFeatures(response.responseText);
      					sourceLayerMunicipios.addFeatures(features);
      				}
          });

  	      this.resolution = resolution;
        },
        projection: 'EPSG:3116',
        crossOrigin: 'Anonymous'
	});
	styleLayerMunicipiosEti = function(feature, resolution) {
		var styleText = new ol.style.Style({
			text : new ol.style.Text({
				font : "bold 10px tahoma",
				text : feature.get('mpio_cnmbr'),
				fill : new ol.style.Fill({
					color : '#000000'
				}),
                stroke: new ol.style.Stroke({
                	color: '#FFFFFF',
                	width : 2
                })
			})
		});
		var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: '#6E7783',
              width : 1
            })
		});
		return [styleText, style];
	};
	styleLayerMunicipiosNoEti = function(feature) {
		var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: '#6E7783',
              width : 1
            })
		});
		return [style];
	};

	layerMunicipios = new ol.layer.Vector({
		name: nbMunicipios,
		source: sourceLayerMunicipios,
		style: styleLayerMunicipiosNoEti,
        visible : true
	});
	//----fin capa municipios

	//----capa colombia

	sourceLayerColombia = getSourceVector(prefijo, capaColombia, "");
	styleLayerColombiaEti = function(feature, resolution) {
		var styleText = new ol.style.Style({
			text : new ol.style.Text({
				font : "bold 10px tahoma",
				text : feature.get('numero_predial'),
				fill : new ol.style.Fill({
					color : '#000000'
				}),
                stroke: new ol.style.Stroke({
                	color: '#FFFFFF',
                	width : 2
                })
			})
		});
		var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: '#333030',
              width : 2
            })/*,
			fill : new ol.style.Fill({
				color : 'rgba(255,255,0,0.4)'
			})   */
		});
		return [styleText, style];
	};
	styleLayerColombiaNoEti = function(feature) {
		var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: '#333030',
              width : 2
            })/*,
			fill : new ol.style.Fill({
				color : 'rgba(198,171,235,0.8)'
			}) */
		});
		return [style];
	};

	layerColombia = new ol.layer.Vector({
		name: nbColombia,
		source: sourceLayerColombia,
		style: styleLayerColombiaNoEti,
        visible : true
	});
	//----fin capa colombia

	// ----Grupo capas prediales----
	groupLimitesAdminis = new ol.layer.Group({
		name : grupoLimites,
		layers:[layerMunicipios, layerDepartamentos, layerColombia]
	});
	// ----fin grupo capas prediales----

}
