layout = (function() {

	return {
		init : function() {

			//Definición de la proyección ESPG:3116
			proj4.defs('EPSG:3116', '+proj=tmerc +lat_0=4.596200416666666 +lon_0=-74.07750791666666 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

			var proj3116 = ol.proj.get('EPSG:3116');
			proj3116.setExtent([-16077300.3195290366, -9008540.6055290367, 20320540.994470963, 19051790.2804709632]);

			//ventana con la coordenadas del raton
			ventMousePosition = createVentMousePosition();

			//creamos el mapa
			map = createMap();

			//store de las capas
			storeAllLayers = Ext.create('GeoExt.data.store.LayersTree', {
				id: 'storeAllLayers',
				layerGroup : map.getLayerGroup()
			});

			storeAllLayers.symbols = ['ol.Map'];

			//creamos el panel izquierdo
			leftPanel = createPanelLeft();

			//Crea el panel de cabecera
			nortPanel = Ext.create('Ext.panel.Panel', {
				id: 'nortPanel',
				region: 'north',
				height: 70,
				collapsible: false,
				html : '<div id="cabecera">' + '</div>',
				items : [{
		            		xtype: 'button',
		    				iconCls: 'icoAyuda',
							cls: 'btnAyuda',
		    				id: 'btnayuda',
		    				align: 'right',
		    				margin: '10 15 0 0',
		    				handler: function() {
		    					if(Ext.getCmp('windowVentAyuda') != null)
		    					{
		    						Ext.getCmp('windowVentAyuda').destroy();

		    					}
		    					Ext.create('Ext.window.Window', {
		    			        	title: "Ayuda: Versión 1.0.0",
		    			        	id: 'windowVentAyuda',
		    			        	width: 700,
		    			        	height: 500,
		    			        	layout: 'column',
		    			        	constrainHeader: true,
		    			        	closable: false,
		    			            	items: [{
		    			            	xtype: 'panel',
		    			            	id: 'panelVentAyuda',
		    					    	height: 425,
		    					    	width: 695,
		    			            	html: '<iframe src="ManualAyuda.pdf" width="100%" height="100%"></iframe>'

		    			           	 }],
		    			           	tbar: ['->',{
		    			            	xtype: 'button',
		    			           		text: 'Cerrar',
		    			           		handler: function(){
		    			           			Ext.getCmp('panelVentAyuda').setHtml('');
		    			           			Ext.getCmp('windowVentAyuda').close();
		    			           		}
		    			            }],
		    						listeners:{
		    							resize: function(thisWindow, width, height, eOpts)
		    							{
		    								if (height > 100)
		    								{
		    									Ext.getCmp('panelVentAyuda').setHeight(height-75);
		    								}
		    								if (width > 100)
		    								{
		    									Ext.getCmp('panelVentAyuda').setWidth(width-5);
		    								}
		    							}
		    						}
		    					}).show();
		    				}
						}]
			});



			Ext.create('Ext.Viewport', {
				id: 'Viewport',
				layout : 'border',
				items : [{
					xtype: 'panel',
					id : 'extjsMapPanel',
					region : 'center',
					layout : 'fit',
					items : [{
						xtype: 'gx_map',
						id: 'geoextMap',
						map: map
					}]

				},
				leftPanel,
				nortPanel,
				ventMousePosition.show()
				],
				listeners:{
					resize: function(thisViewport, width, height, oldWidth, oldHeight, eOpts)
					{
						//ventana de coordenadas
						posX = thisViewport.getWidth() - Ext.getCmp('ventMousePosition').getWidth() -20 ;
						posY = thisViewport.getHeight() - 105;
						Ext.getCmp('ventMousePosition').setPosition(posX, posY);
					}
				}
			});

		}
	};
})();
