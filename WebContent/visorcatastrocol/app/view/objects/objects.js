
/**
 *
 *crea una ventana con información
 *
 **/
function createVentMousePosition (){
	var myVentMousePosition = Ext.create('Ext.Window', {
		id : 'ventMousePosition',
		renderTo : Ext.getBody(),
		draggable : false,
		closable : false,
		header : false,
		resizable : false,
		border : false,
		bodyBorder : false,
		frame : true,
		width : 130,
		height : 90,
		floating : {
			shadow : false
		},
		html : '<div id="mouse-position"></div>'
	});

	return myVentMousePosition;
}

/**
 *
 *crea el panel izquierdo: capas
 *
 **/
function createPanelLeft()
{
	var myPanelLeft = Ext.create('Ext.panel.Panel',{
		id: 'leftPanel',
		title: 'Cartografía y herramientas',
		region: 'west',
		width : 340,
		collapsed: false,
		collapsible: true,
		resizable: false,
		items:[{
			xtype: 'tabpanel',
			id: 'tabpanelTools',
			resizable: false,
			border: false,
			activeTab: 0,
			items:[{
				title: 'Capas',
				width: '100%',
				border : true,
				items:[{
					xtype : 'treepanel',
					id : 'treepanelLayers',
					border : false,
					store : storeAllLayers,
					rootVisible : false,
					collapsible : false,
					collapsed : false,
					autoScroll : true,
					lines : true,
					hideHeaders : true,
		      margin: '0 0 0 -5',
					columns : {
						header : false,
						items : [{
							xtype : 'treecolumn',
							id: 'treecolumn',
							dataIndex : 'text',
							disabled: true,
							width : 270,
							margin: '0 0 0 0',
							renderer : myRenderer
						},{
							text: 'Value',
							width : 60,
							xtype: 'widgetcolumn',
							align: 'center',
							margin: '0 0 0 0',
							widget : {
								xtype: 'slider',
								hideLabel: true,
								width: 50,
								minValue: 0,
								maxValue: 100,
								value: 100,
								tipText : function(thumb) {
									return Ext.String.format('{0}% transparencia',(100 - thumb.value));
								},
								listeners : {
									change : function(thisSlider, newValue, thumb, eOpts) {
										//aplicamos transparencia
										var layerOpacity = findBy(map.getLayerGroup(), 'name', generalLayerOpacity);
										layerOpacity.setOpacity(newValue / 100);
									}
								}
							}
						}]
					},
					listeners: {
						itemmouseenter: function(gridview, record) {
							//obtenemos el nombre de la capa sobre la que se realiza la transparencia
							generalLayerOpacity  = record.get('text');
						},
						render: function(){
							Ext.getStore('storeAllLayers').filterBy(function(record) {
								if (record.data.text != 'NoLegend'  && record.data.text != nameUsuario && record.data.text.indexOf("geocoder-layer")) {
									return true;
								}
							});

						}
					}
				}]
			},{
				title: 'Localización de elementos',
				width: '100%',
				border : true,
				items:[{
			        xtype: 'form',
							id:'LocForm',
			        bodyPadding: 10,
			        layout: 'anchor',
			        scrollable:true,
			        width: '100%',
			        items: [{
			        		xtype: 'fieldset',
			            width: '100%',
			            title: 'Búsqueda progresiva del identificador predial',
			            columnWidth: 0.5,
			            labelWidth: 75,
			            labelAlign: 'top',
									msgTarget: 'under',
			            items: [{
				            layout: 'column',
										margin: '10 5 0 5',
										border: false,
										items:[{
											columnWidth: '0.735',
											border: false,
											layout: {
								    		type: 'vbox',
								    		align: 'center'
											},
											items:[{
				            		xtype: 'combobox',
												name: 'ComboDepartamento',
												fieldLabel: 'Selecciona el Departamento',
												labelAlign: 'top',
												msgTarget: 'under',
												id: 'ComboDepartamento',
												width: '100%',
										    queryMode: 'local',
										    displayField: 'name',
										    valueField: 'cod',
										    store: Ext.create('Ext.data.Store', {
											    	fields: ['name', 'cod']
											  }),
												listeners:{
										    	render: function (thisCombo, eOpts)
										    	{

										    		var arr = sourceLayerDepartamentos.getFeatures();

										    		var arrAuxname = [];

										    		for (var i = 0; i < arr.length; i++)
										    		{
										    			//arrAuxname.push({name: arr[i].get('departamento'), cod: arr[i].get('departamento')});
										    			arrAuxname.push({name: arr[i].get('dpto_cnmbr'), cod: arr[i].get('dpto_ccdgo')});

										    		}
										    		thisCombo.getStore().insert(0, arrAuxname);

										    	},
										    	select: function (thisCombo, record, eOpts){

											    	Ext.getCmp('Identificador').setValue("");
														Ext.getCmp('Identificador').setDisabled(true);

														Ext.getCmp('ComboMunicipio').setDisabled(false);
														Ext.getCmp('btncentrardep').setDisabled(false);

														cqlfilter = 'CQL_FILTER=dpto_dpto_=' + "'" + thisCombo.getValue() + "'";

														propertyName = 'propertyName=mpio_cnmbr,mpio_ccdgo';

														typeNameLayerMun = 'typeName=' + prefijo + ':' + capaMunicipios;

														ordenarPor = 'sortBy=mpio_cnmbr';

														Ext.getCmp('ComboMunicipio').getStore().getProxy().url = 'proxy.jsp?' + encodeURIComponent(WFS + request + '&' + service + '&' + version + '&' +  typeNameLayerMun + '&' + cqlfilter + '&' + format + '&' + ordenarPor + '&' + propertyName);

														Ext.getCmp('ComboMunicipio').getStore().load();
													},
													change: function(){

														Ext.getCmp('ComboMunicipio').setValue("");
														Ext.getCmp('ComboZona').setValue("");
														Ext.getCmp('ComboSector').setValue("");
														Ext.getCmp('ComboComuna').setValue("");
														Ext.getCmp('ComboBarrio').setValue("");
														Ext.getCmp('ComboManzana').setValue("");
														Ext.getCmp('ComboPredio').setValue("");
													}
								    		}
					            }]
										},{ columnWidth: '0.265',
													border: false,
													layout: {
								    				type: 'vbox',
								    				align: 'center'
													},
													items:[{
					            			xtype: 'button',
					    							text: 'Centrar',
					    							disabled: true,
					    							id: 'btncentrardep',
					    							margin: '26 15 0 0',
					    						  listeners: {
				    						    	click: function(thisbutton, e, eOpts){
				    						    		var features = sourceLayerDepartamentos.getFeatures();
				    						    		var cod = Ext.getCmp('ComboDepartamento').getValue();

				    						    		for (var i = 0; i < features.length; i++) {
				    						    			if (features[i].getProperties().dpto_ccdgo == cod){
				    						    				var extent = features[i].getGeometry();
				    						    				map.getView().fit(extent, {padding: [170, 50, 30, 150], constrainResolution: false});
				    						    			}
				    						    		}
				    									}
		    						    		}
													}]
												}]
										},{
					            layout: 'column',
											margin: '0 5 0 5',
											border: false,
											items:[{
												columnWidth: '0.735',
												border: false,
												layout: {
									    		type: 'vbox',
									    		align: 'center'
												},
												items:[{
													xtype: 'combobox',
													name: 'ComboMunicipio',
													id: 'ComboMunicipio',
													fieldLabel: 'Selecciona el Municipio',
													labelAlign: 'top',
													msgTarget: 'under',
													disabled: true,
													width: '100%',
											    store: Ext.create('Ext.data.Store', {
												    	id: 'storeLocMun',
												    	model: 'modelLocMun',
												    	autoLoad: false,
												    	proxy: {
												    		type: 'ajax',
												    		url: 'proxy.jsp?' + WFS + request + '&' + service + '&' + version + '&' +  typeNameLayerMun  + '&' + cqlfilter + '&' + format + '&' + ordenarPor,
												    		reader: {
												    			type: 'json',
												    			rootProperty: 'features'
												    		}
												    	}
											    }),
											    displayField: 'nbMun',
											    valueField: 'codMun',
											    triggerAction: "all",
											    queryMode: 'local',
											    typeAhead: true,
											    editable: true,
											    listeners:{
											    	beforequery: function (record) {
											    		record.query = new RegExp(record.query, 'i');
											    		record.forceAll = true;
											    	},
											    	select: function(thisCombo, record, eOpts){
											    			Ext.getCmp('ComboZona').setDisabled(false);
											    			Ext.getCmp('btncentrarmun').setDisabled(false);

																cqlfilter = 'CQL_FILTER=departamento=' + "'" + Ext.getCmp('ComboDepartamento').getValue() + "'%20AND%20"+ 'municipio=' + "'" + thisCombo.getValue() + "'";

																typeNameLayer = 'typeName=' + prefijo + ':' + capaTerreno;

																ordenarPor = 'sortBy=zona';

																propertyName = 'propertyName=departamento,municipio,zona';

																Ext.getCmp('ComboZona').getStore().getProxy().url = 'proxy.jsp?' + encodeURIComponent(WFS + request + '&' + service + '&' + version + '&' +  typeNameLayer + '&' + cqlfilter + '&' + format + '&' + ordenarPor + '&' + propertyName);

																var arr = [];
																Ext.getCmp('ComboZona').getStore().load(function(){
															    this.each(function(record){
															        var roles = record.get('idZona');
															        arr.push(record.get('idZona'));
															     });

															    function unique(value, index, self) {
															        return self.indexOf(value) === index;
															    }

																	var iduniq = arr.filter(unique);
																	var nbuniq = arr.filter(unique);
																	var item = [];
																	for (i=0;i<iduniq.length;i++){
																			if (iduniq[i]=="00"){
																				nbuniq[i] = "RURAL";
																				item.push({idZona:iduniq[i], nbZona:nbuniq[i]});
																			}else if(iduniq[i]=="01"){
																				nbuniq[i] = "URBANO";
																				item.push({idZona:iduniq[i], nbZona:nbuniq[i]});
																			}else{
																				nbuniq[i] = "OTROS";
																				item.push({idZona:iduniq[i], nbZona:nbuniq[i]});
																			}
																	}

																	Ext.getCmp('ComboZona').getStore().removeAll();
																	Ext.getCmp('ComboZona').getStore().setData(item);

														 	});
										    	},
													change: function(){

														Ext.getCmp('ComboZona').setValue("");
														Ext.getCmp('ComboSector').setValue("");
														Ext.getCmp('ComboComuna').setValue("");
														Ext.getCmp('ComboBarrio').setValue("");
														Ext.getCmp('ComboManzana').setValue("");
														Ext.getCmp('ComboPredio').setValue("");
													}
									    	}
						           }]
										 },{ 	columnWidth: '0.265',
										 		 	border: false,
													layout: {
													    type: 'vbox',
													    align: 'center'
													},
													items:[{
			            					xtype: 'button',
					    							text: 'Centrar',
					    							id: 'btncentrarmun',
					    							disabled: true,
					    							margin: '26 15 0 0',
				    						    listeners: {
			    						    		click: function(thisbutton, e, eOpts){
			    						    			var featuresDep = sourceLayerDepartamentos.getFeatures();
				    						    		var codDep = Ext.getCmp('ComboDepartamento').getValue();
				    						    		var features = sourceLayerMunicipios.getFeatures();
				    						    		var cod = Ext.getCmp('ComboMunicipio').getValue();
				    						    		for (var i = 0; i < features.length; i++) {
				    						    			if (features[i].getProperties().mpio_ccdgo == cod && features[i].getProperties().dpto_dpto_ == codDep){
				    						    				var extent = features[i].getGeometry();
				    						    				map.getView().fit(extent, {padding: [170, 50, 30, 150], constrainResolution: false});
				    						    			}
				    						    		}
			    										}
		    						    		}
													}]
											}]
					          },{
				            		xtype: 'combobox',
												name: 'ComboZona',
												id: 'ComboZona',
												fieldLabel: 'Selecciona la Zona',
												labelAlign: 'top',
												msgTarget: 'under',
												disabled: true,
												width: '100%',
										    store: Ext.create('Ext.data.Store', {
													id: 'storeLocZona',
													model: 'modelLocZona',
													autoLoad: false,
													proxy: {
														type: 'ajax',
														url: 'proxy.jsp?' + WFS + request + '&' + service + '&' + version + '&' +  typeNameLayer + '&' + cqlfilter + '&' + format + '&' + ordenarPor,
														reader: {
															type: 'json',
															rootProperty: 'features'
														}
													}
												}),
										    displayField: 'nbZona',
										    valueField: 'idZona',
										    triggerAction: "all",
										    queryMode: 'local',
										    typeAhead: true,
										    editable: true,
										    listeners:{
										    	beforequery: function (record) {
										    		record.query = new RegExp(record.query, 'i');
										    		record.forceAll = true;
										    	},
										    	select: function(thisCombo, record, eOpts){
											    	Ext.getCmp('ComboSector').setDisabled(false);

														cqlfilter = 'CQL_FILTER=departamento=' + "'" + Ext.getCmp('ComboDepartamento').getValue() + "'%20AND%20"+ 'municipio=' + "'" + Ext.getCmp('ComboMunicipio').getValue() + "'%20AND%20" + 'zona=' + "'" + thisCombo.getValue() + "'";
														typeNameLayer = 'typeName=' + prefijo + ':' + capaTerreno;
														propertyName = 'propertyName=numero_predial,departamento,municipio,zona,sector';
														ordenarPor = 'sortBy=sector';

														Ext.getCmp('ComboSector').getStore().getProxy().url = 'proxy.jsp?' + encodeURIComponent(WFS + request + '&' + service + '&' + version + '&' +  typeNameLayer + '&' + cqlfilter + '&' + format + '&' + ordenarPor + '&' + propertyName);

														var arr = [];
														Ext.getCmp('ComboSector').getStore().load(function(){
													    this.each(function(record){
													        var roles = record.get('idSector');
													        arr.push(record.get('idSector'));
													     });

													    function unique(value, index, self) {
													        return self.indexOf(value) === index;
													    }

															var iduniq = arr.filter(unique);
															var item = [];
															for (i=0;i<iduniq.length;i++){
																item.push({idSector:iduniq[i]});
															}

															Ext.getCmp('ComboSector').getStore().removeAll();

															Ext.getCmp('ComboSector').getStore().setData(item);

													 });
										    	},
										    	change: function(){

														Ext.getCmp('ComboSector').setValue("");
														Ext.getCmp('ComboComuna').setValue("");
														Ext.getCmp('ComboBarrio').setValue("");
														Ext.getCmp('ComboManzana').setValue("");
														Ext.getCmp('ComboPredio').setValue("");
													}
								    		}
					          },{
					            layout: 'column',
											margin: '10 5 0 5',
											border: false,
											items:[{
												columnWidth: '0.735',
												border: false,
												layout: {
												    type: 'vbox',
												    align: 'center'
												},
												items:[{
					            		xtype: 'combobox',
													name: 'ComboSector',
													id: 'ComboSector',
													fieldLabel: 'Selecciona el Sector',
													labelAlign: 'top',
													msgTarget: 'under',
													disabled: true,
													width: '100%',
											    store: Ext.create('Ext.data.Store', {
												    	id: 'storeLocSector',
												    	model: 'modelLocSector',
												    	autoLoad: false,
												    	proxy: {
												    		type: 'ajax',
												    		url: 'proxy.jsp?' + WFS + request + '&' + service + '&' + version + '&' +  typeNameLayer + '&' + cqlfilter + '&' + format + '&' + ordenarPor,
												    		reader: {
												    			type: 'json',
												    			rootProperty: 'features'
												    		}
												    	}
											    }),
											    displayField: 'idSector',
											    valueField: 'idSector',
											    triggerAction: "all",
											    queryMode: 'local',
											    typeAhead: true,
											    editable: true,
											    listeners:{
											    	beforequery: function (record) {
											    		record.query = new RegExp(record.query, 'i');
											    		record.forceAll = true;
											    	},
											    	select: function(thisCombo, record, eOpts){
												    	Ext.getCmp('ComboComuna').setDisabled(false);
												    	Ext.getCmp('btncentrarsec').setDisabled(false);

															cqlfilter = 'CQL_FILTER=departamento=' + "'" + Ext.getCmp('ComboDepartamento').getValue() + "'%20AND%20"+ 'municipio=' + "'" + Ext.getCmp('ComboMunicipio').getValue() + "'%20AND%20" + 'zona=' + "'" + Ext.getCmp('ComboZona').getValue() + "'%20AND%20" + 'sector=' + "'" + thisCombo.getValue() + "'";
															typeNameLayer = 'typeName=' + prefijo + ':' + capaTerreno;
															ordenarPor = 'sortBy=comuna';
															propertyName = 'propertyName=departamento,municipio,zona,sector,comuna';

															Ext.getCmp('ComboComuna').getStore().getProxy().url = 'proxy.jsp?' + encodeURIComponent(WFS + request + '&' + service + '&' + version + '&' +  typeNameLayer + '&' + cqlfilter + '&' + format + '&' + ordenarPor + '&' + propertyName);

															var arr = [];
															Ext.getCmp('ComboComuna').getStore().load(function(){
														    this.each(function(record){
														        var roles = record.get('idComuna');
														        arr.push(record.get('idComuna'));
														     });

														    function unique(value, index, self) {
														        return self.indexOf(value) === index;
														    }

																var iduniq = arr.filter(unique);
																var item = [];
																for (i=0;i<iduniq.length;i++){
																	item.push({idComuna:iduniq[i]});
																}

																Ext.getCmp('ComboComuna').getStore().removeAll();
																Ext.getCmp('ComboComuna').getStore().setData(item);
														 });
											    	},
											    	change: function(){
															Ext.getCmp('ComboComuna').setValue("");
															Ext.getCmp('ComboBarrio').setValue("");
															Ext.getCmp('ComboManzana').setValue("");
															Ext.getCmp('ComboPredio').setValue("");
														}
									    		}
						            }]
											},{ columnWidth: '0.265',
													border: false,
													layout: {
													    type: 'vbox',
													    align: 'center'
													},
													items:[{
			            					xtype: 'button',
					    							text: 'Centrar',
					    							disabled: true,
					    							id: 'btncentrarsec',
					    							margin: '26 15 0 0',
					    						  listeners: {
				    						    	click: function(thisbutton, e, eOpts){
											    			var features;
											    			var url = Ext.getCmp('ComboComuna').getStore().getProxy().url.replace('propertyName%3Ddepartamento%2Cmunicipio%2Czona%2Csector%2Ccomuna', '');

																Ext.Ajax.request({
																	url: url,
																	async: false,
																	method: 'POST',
																	success: function(response, opts) {
																		features = new ol.format.GeoJSON().readFeatures(response.responseText);
																	}
																});

																var xmin = features[0].getGeometry().getExtent()[0];
				    						    		var ymin = features[0].getGeometry().getExtent()[1];
				    						    		var xmax = features[0].getGeometry().getExtent()[2];
				    						    		var ymax = features[0].getGeometry().getExtent()[3];

				    						    		for (var i = 0; i < features.length; i++) {
				    						    			var extentini = features[i].getGeometry().getExtent();
				    						    			if (extentini[0] < xmin) {
				    						    				xmin = extentini[0];
				    						    			}
				    						    			if (extentini[1] < ymin) {
				    						    				ymin = extentini[1];
				    						    			}
				    						    			if (extentini[2] > xmax) {
				    						    				xmax = extentini[2];
				    						    			}
				    						    			if (extentini[3] > ymax) {
				    						    				ymax = extentini[3];
				    						    			}
				    						    		}

				    						    		var extent = [xmin, ymin, xmax, ymax];
				    						    		map.getView().fit(extent, {padding: [170, 50, 30, 150], constrainResolution: false});
				    									}
			    						    	}
													}]
												}]
				           	 },{
					            	layout: 'column',
												margin: '10 5 0 5',
												border: false,
												items:[{
													columnWidth: '0.735',
													border: false,
													layout: {
													    type: 'vbox',
													    align: 'center'
													},
													items:[{
					            			xtype: 'combobox',
														name: 'ComboComuna',
														id: 'ComboComuna',
														fieldLabel: 'Selecciona la Comuna',
														labelAlign: 'top',
														msgTarget: 'under',
														disabled: true,
														width: '100%',
													  store: Ext.create('Ext.data.Store', {
													    	id: 'storeLocComuna',
													    	model: 'modelLocComuna',
													    	autoLoad: false,
													    	proxy: {
													    		type: 'ajax',
													    		url: 'proxy.jsp?' + WFS + request + '&' + service + '&' + version + '&' +  typeNameLayer + '&' + cqlfilter + '&' + format + '&' + ordenarPor,
													    		reader: {
													    			type: 'json',
													    			rootProperty: 'features'
													    		}
													    	}
												    }),
												    displayField: 'idComuna',
												    valueField: 'idComuna',
												    triggerAction: "all",
												    queryMode: 'local',
												    typeAhead: true,
												    editable: true,
												    listeners:{
												    	beforequery: function (record) {
												    		record.query = new RegExp(record.query, 'i');
												    		record.forceAll = true;
												    	},
												    	select: function(thisCombo, record, eOpts){
													    	Ext.getCmp('ComboBarrio').setDisabled(false);
													    	Ext.getCmp('btncentrarcom').setDisabled(false);

																cqlfilter = 'CQL_FILTER=departamento=' + "'" + Ext.getCmp('ComboDepartamento').getValue() + "'%20AND%20"+ 'municipio=' + "'" + Ext.getCmp('ComboMunicipio').getValue() + "'%20AND%20" + 'zona=' + "'" + Ext.getCmp('ComboZona').getValue() + "'%20AND%20" + 'sector=' + "'" + Ext.getCmp('ComboSector').getValue() + "'%20AND%20" + 'comuna=' + "'" + thisCombo.getValue() + "'";
																typeNameLayer = 'typeName=' + prefijo + ':' + capaTerreno;
																ordenarPor = 'sortBy=barrio';
																propertyName = 'propertyName=departamento,municipio,zona,sector,comuna,barrio';

																Ext.getCmp('ComboBarrio').getStore().getProxy().url = 'proxy.jsp?' + encodeURIComponent(WFS + request + '&' + service + '&' + version + '&' +  typeNameLayer + '&' + cqlfilter + '&' + format + '&' + ordenarPor + '&' + propertyName);

																var arr = [];
																Ext.getCmp('ComboBarrio').getStore().load(function(){
																  this.each(function(record){
																      var roles = record.get('idBarrio');
																      arr.push(record.get('idBarrio'));
																   });

																  function unique(value, index, self) {
																       return self.indexOf(value) === index;
																  }

																  var iduniq = arr.filter(unique);
																  var item = [];
																  for (i=0;i<iduniq.length;i++){
																	  item.push({idBarrio:iduniq[i]});
																  }

																  Ext.getCmp('ComboBarrio').getStore().removeAll();

																  Ext.getCmp('ComboBarrio').getStore().setData(item);

																});
												    	},
												    	change: function(){

																Ext.getCmp('ComboBarrio').setValue("");
																Ext.getCmp('ComboManzana').setValue("");
																Ext.getCmp('ComboPredio').setValue("");
															}
									    			}
						            	}]
												},{ columnWidth: '0.265',
														border: false,
														layout: {
														    type: 'vbox',
														    align: 'center'
														},
														items:[{
				            					xtype: 'button',
						    							text: 'Centrar',
						    							disabled: true,
						    							id: 'btncentrarcom',
						    							margin: '26 15 0 0',
						    						  listeners: {
					    						    	click: function(thisbutton, e, eOpts){
												    			var features;
												    			var url = Ext.getCmp('ComboBarrio').getStore().getProxy().url.replace('propertyName%3Ddepartamento%2Cmunicipio%2Czona%2Csector%2Ccomuna%2Cbarrio', '');

																	Ext.Ajax.request({
																		url: url,
																		async: false,
																		method: 'POST',
																		success: function(response, opts) {
																			features = new ol.format.GeoJSON().readFeatures(response.responseText);
																		}
																	});

																	var xmin = features[0].getGeometry().getExtent()[0];
					    						    		var ymin = features[0].getGeometry().getExtent()[1];
					    						    		var xmax = features[0].getGeometry().getExtent()[2];
					    						    		var ymax = features[0].getGeometry().getExtent()[3];

					    						    		for (var i = 0; i < features.length; i++) {
					    						    			var extentini = features[i].getGeometry().getExtent();

					    						    			if (extentini[0] < xmin) {
					    						    				xmin = extentini[0];
					    						    			}
					    						    			if (extentini[1] < ymin) {
					    						    				ymin = extentini[1];
					    						    			}
					    						    			if (extentini[2] > xmax) {
					    						    				xmax = extentini[2];
					    						    			}
					    						    			if (extentini[3] > ymax) {
					    						    				ymax = extentini[3];
					    						    			}
					    						    		}

					    						    		var extent = [xmin, ymin, xmax, ymax];

					    						    		map.getView().fit(extent, {padding: [170, 50, 30, 150], constrainResolution: false});

			    											}

			    						    		}
														}]
													}]
				           	 },{
					            layout: 'column',
											margin: '10 5 0 5',
											border: false,
											items:[{
												columnWidth: '0.735',
												border: false,
												layout: {
												    type: 'vbox',
												    align: 'center'
												},
												items:[{
					            		xtype: 'combobox',
													name: 'ComboBarrio',
													id: 'ComboBarrio',
													fieldLabel: 'Selecciona el Barrio',
													labelAlign: 'top',
													msgTarget: 'under',
													disabled: true,
													width: '100%',
												  store: Ext.create('Ext.data.Store', {
											    	id: 'storeLocBarrio',
											    	model: 'modelLocBarrio',
											    	autoLoad: false,
											    	proxy: {
											    		type: 'ajax',
											    		url: 'proxy.jsp?' + WFS + request + '&' + service + '&' + version + '&' +  typeNameLayer + '&' + cqlfilter + '&' + format + '&' + ordenarPor,
											    		reader: {
											    			type: 'json',
											    			rootProperty: 'features'
											    		}
											    	}
										    	}),
											    displayField: 'idBarrio',
											    valueField: 'idBarrio',
											    triggerAction: "all",
											    queryMode: 'local',
											    typeAhead: true,
											    editable: true,
											    listeners:{
											    	beforequery: function (record) {
											    		record.query = new RegExp(record.query, 'i');
											    		record.forceAll = true;
											    	},
											    	select: function(thisCombo, record, eOpts){
												    	Ext.getCmp('ComboManzana').setDisabled(false);
												    	Ext.getCmp('btncentrarbarr').setDisabled(false);

															cqlfilter = 'CQL_FILTER=departamento=' + "'" + Ext.getCmp('ComboDepartamento').getValue() + "'%20AND%20"+ 'municipio=' + "'" + Ext.getCmp('ComboMunicipio').getValue() + "'%20AND%20" + 'zona=' + "'" + Ext.getCmp('ComboZona').getValue() + "'%20AND%20" + 'sector=' + "'" + Ext.getCmp('ComboSector').getValue() + "'%20AND%20" + 'comuna=' + "'" + Ext.getCmp('ComboComuna').getValue() + "'%20AND%20" + 'barrio=' + "'" + thisCombo.getValue() + "'";
															typeNameLayer = 'typeName=' + prefijo + ':' + capaTerreno;
															propertyName = 'propertyName=departamento,municipio,zona,sector,comuna,barrio,manzana';
															ordenarPor = 'sortBy=manzana';

															Ext.getCmp('ComboManzana').getStore().getProxy().url = 'proxy.jsp?' + encodeURIComponent(WFS + request + '&' + service + '&' + version + '&' +  typeNameLayer + '&' + cqlfilter + '&' + format + '&' + ordenarPor + '&' + propertyName);

															var arr = [];
															Ext.getCmp('ComboManzana').getStore().load(function(){
																  this.each(function(record){
																      var roles = record.get('idManzana');
																      arr.push(record.get('idManzana'));
																   });

																  function unique(value, index, self) {
																       return self.indexOf(value) === index;
																  }

																  var iduniq = arr.filter(unique);
																  var item = [];
																  for (i=0;i<iduniq.length;i++){
																	  item.push({idManzana:iduniq[i]});
																  }

																  Ext.getCmp('ComboManzana').getStore().removeAll();
																  Ext.getCmp('ComboManzana').getStore().setData(item);

															});
											    	},change: function(){
															Ext.getCmp('ComboManzana').setValue("");
															Ext.getCmp('ComboPredio').setValue("");
														}
									    		}
						            }]
											},{ columnWidth: '0.265',
													border: false,
													layout: {
													    type: 'vbox',
													    align: 'center'
													},
													items:[{
			            					xtype: 'button',
					    							text: 'Centrar',
					    							disabled: true,
					    							id: 'btncentrarbarr',
					    							margin: '26 15 0 0',
			    						    	listeners: {
			    						    		click: function(thisbutton, e, eOpts){
											    			var features;
											    			var url = Ext.getCmp('ComboManzana').getStore().getProxy().url.replace('propertyName%3Ddepartamento%2Cmunicipio%2Czona%2Csector%2Ccomuna%2Cbarrio%2Cmanzana', '');

																Ext.Ajax.request({
																	url: url,
																	async: false,
																	method: 'POST',
																	success: function(response, opts) {
																		features = new ol.format.GeoJSON().readFeatures(response.responseText);

																	}
																});

																var xmin = features[0].getGeometry().getExtent()[0];
				    						    		var ymin = features[0].getGeometry().getExtent()[1];
				    						    		var xmax = features[0].getGeometry().getExtent()[2];
				    						    		var ymax = features[0].getGeometry().getExtent()[3];

				    						    		for (var i = 0; i < features.length; i++) {
				    						    			var extentini = features[i].getGeometry().getExtent();
				    						    			if (extentini[0] < xmin) {
				    						    				xmin = extentini[0];
				    						    			}
				    						    			if (extentini[1] < ymin) {
				    						    				ymin = extentini[1];
				    						    			}
				    						    			if (extentini[2] > xmax) {
				    						    				xmax = extentini[2];
				    						    			}
				    						    			if (extentini[3] > ymax) {
				    						    				ymax = extentini[3];
				    						    			}
				    						    		}

				    						    		var extent = [xmin, ymin, xmax, ymax];

				    						    		map.getView().fit(extent, {padding: [170, 50, 30, 150], constrainResolution: false});
			    										}
			    						    	}
													}]
								 			}]
				           	},{
					            layout: 'column',
											margin: '10 5 0 5',
											border: false,
											items:[{
												columnWidth: '0.735',
												border: false,
												layout: {
												    type: 'vbox',
												    align: 'center'
												},
												items:[{
					            		xtype: 'combobox',
													name: 'ComboManzana',
													id: 'ComboManzana',
													fieldLabel: 'Selecciona la Manzana o Vereda',
													labelAlign: 'top',
													msgTarget: 'under',
													disabled: true,
													width: '100%',
												  store: Ext.create('Ext.data.Store', {
												    	id: 'storeLocManzana',
												    	model: 'modelLocManzana',
												    	autoLoad: false,
												    	proxy: {
												    		type: 'ajax',
												    		url: 'proxy.jsp?' + WFS + request + '&' + service + '&' + version + '&' +  typeNameLayer + '&' + cqlfilter + '&' + format + '&' + ordenarPor,
												    		reader: {
												    			type: 'json',
												    			rootProperty: 'features'
												    		}
												    	}
												  }),
											    displayField: 'idManzana',
											    valueField: 'idManzana',
											    triggerAction: "all",
											    queryMode: 'local',
											    typeAhead: true,
											    editable: true,
											    listeners:{
											    	beforequery: function (record) {
											    		record.query = new RegExp(record.query, 'i');
											    		record.forceAll = true;
											    	},
											    	select: function(thisCombo, record, eOpts){

											    		Ext.getCmp('ComboPredio').setDisabled(false);
											    		Ext.getCmp('btncentrarman').setDisabled(false);

															cqlfilter = 'CQL_FILTER=departamento=' + "'" + Ext.getCmp('ComboDepartamento').getValue() + "'%20AND%20"+ 'municipio=' + "'" + Ext.getCmp('ComboMunicipio').getValue() + "'%20AND%20" + 'zona=' + "'" + Ext.getCmp('ComboZona').getValue() + "'%20AND%20" + 'sector=' + "'" + Ext.getCmp('ComboSector').getValue() + "'%20AND%20" + 'comuna=' + "'" + Ext.getCmp('ComboComuna').getValue() + "'%20AND%20" + 'barrio=' + "'" + Ext.getCmp('ComboBarrio').getValue() + "'%20AND%20" + 'manzana=' + "'" + thisCombo.getValue() + "'";
															typeNameLayer = 'typeName=' + prefijo + ':' + capaTerreno;
															propertyName = 'propertyName=departamento,municipio,zona,sector,comuna,barrio,manzana,predio';

															Ext.getCmp('ComboPredio').getStore().getProxy().url = 'proxy.jsp?' + encodeURIComponent(WFS + request + '&' + service + '&' + version + '&' +  typeNameLayer + '&' + cqlfilter + '&' + format + '&' + ordenarPorNumPredial + '&' + propertyName);

															var arr = [];
															Ext.getCmp('ComboPredio').getStore().load(function(){
																	  this.each(function(record){
																	      var roles = record.get('idPredio');
																	      arr.push(record.get('idPredio'));

																	   });

																	  function unique(value, index, self) {
																	       return self.indexOf(value) === index;
																	  }

																	  var iduniq = arr.filter(unique);
																	  var item = [];
																	  for (i=0;i<iduniq.length;i++){
																		  item.push({idPredio:iduniq[i]});
																	  }

																	  Ext.getCmp('ComboPredio').getStore().removeAll();
																	  Ext.getCmp('ComboPredio').getStore().setData(item);

															});
											    	},change: function(){
															Ext.getCmp('ComboPredio').setValue("");
														}
									    		}
						            }]
											},{ columnWidth: '0.265',
													border: false,
													layout: {
													    type: 'vbox',
													    align: 'center'
													},
													items:[{
			            					xtype: 'button',
					    							text: 'Centrar',
					    							disabled: true,
					    							id: 'btncentrarman',
					    							margin: '26 15 0 0',
					    						  listeners: {
					    						    click: function(thisbutton, e, eOpts){
											    			var features;
											    			var url = Ext.getCmp('ComboPredio').getStore().getProxy().url.replace('propertyName%3Ddepartamento%2Cmunicipio%2Czona%2Csector%2Ccomuna%2Cbarrio%2Cmanzana%2Cpredio', '');;

																Ext.Ajax.request({
																	url: url,
																	async: false,
																	method: 'POST',
																	success: function(response, opts) {
																		features = new ol.format.GeoJSON().readFeatures(response.responseText);
																	}
																});

																var xmin = features[0].getGeometry().getExtent()[0];
				    						    		var ymin = features[0].getGeometry().getExtent()[1];
				    						    		var xmax = features[0].getGeometry().getExtent()[2];
				    						    		var ymax = features[0].getGeometry().getExtent()[3];

				    						    		for (var i = 0; i < features.length; i++) {
				    						    			var extentini = features[i].getGeometry().getExtent();
				    						    			if (extentini[0] < xmin) {
				    						    				xmin = extentini[0];
				    						    			}
				    						    			if (extentini[1] < ymin) {
				    						    				ymin = extentini[1];
				    						    			}
				    						    			if (extentini[2] > xmax) {
				    						    				xmax = extentini[2];
				    						    			}
				    						    			if (extentini[3] > ymax) {
				    						    				ymax = extentini[3];
				    						    			}
				    						    		}

			    						    			var extent = [xmin, ymin, xmax, ymax];

			    						    			map.getView().fit(extent, {padding: [170, 50, 30, 150], constrainResolution: false});
			    										}
			    						    	}
													}]
								 			}]
				           	},{
											xtype: 'combobox',
											name: 'ComboPredio',
											id: 'ComboPredio',
											fieldLabel: 'Selecciona el Predio',
											labelAlign: 'top',
											margin:'0 0 10 0',
											msgTarget: 'under',
											disabled: true,
											width: '100%',
									    store: Ext.create('Ext.data.Store', {
										    	id: 'storeLocPredio',
										    	model: 'modelLocPredio',
										    	autoLoad: false,
										    	proxy: {
										    		type: 'ajax',
										    		url: 'proxy.jsp?' + WFS + request + '&' + service + '&' + version + '&' +  typeNameLayer + '&' + cqlfilter + '&' + format + '&' + ordenarPorNumPredial,
										    		reader: {
										    			type: 'json',
										    			rootProperty: 'features'
										    		}
										    	}
									    }),
									    displayField: 'idPredio',
									    valueField: 'idPredio',
									    triggerAction: "all",
									    queryMode: 'local',
									    typeAhead: true,
									    editable: true,
									    listeners:{
									    	beforequery: function (record) {
									    		record.query = new RegExp(record.query, 'i');
									    		record.forceAll = true;
									    	},
									    	select: function(thisCombo, record, eOpts){
													Ext.getCmp('Buscar').setDisabled(false);
									    	}
								    	}
					          }]
					    },{
            		xtype: 'fieldset',
		            width: '100%',
		            title: 'Búsqueda directa del identificador predial',
		            columnWidth: 0.5,
		            labelWidth: 75,
		            labelAlign: 'top',
								msgTarget: 'under',
					      items: [{
							      xtype: 'textfield',
									  name: 'Identificador',
									  id: 'Identificador',
									  margin:'0 0 10 0',
									  fieldLabel: 'Escribe el identificador',
										labelAlign: 'top',
										msgTarget: 'under',
						        width: '100%',
						        allowBlank: true,
						        listeners:{
						        	change: function(thisField, newValue, oldValue, eOpts ){
						        		Ext.getCmp('ComboDepartamento').setDisabled(true);
						        		Ext.getCmp('Buscar').setDisabled(false);
						        	}
						        }
							   }]
				      },{
					      layout: 'column',
								margin: '10 5 0 5',
								border: false,
								items:[{
										columnWidth: '0.5',
										border: false,
										layout: {
										    type: 'vbox',
										    align: 'center'
										},
										items:[{
				            	xtype: 'button',
											text: 'Buscar',
											id: 'Buscar',
											disabled: true,
									   	listeners: {
										    click: function(thisbutton, e, eOpts){
										    		var features;
										    		if(popup != ""){
															map.removeOverlay(popup);
															popup = "";
														}

														var id = Ext.getCmp('Identificador').getValue();
														var ID = Ext.getCmp('ComboPredio').getValue();

														if ((id == null || id == "") && (ID == null || ID == "")) {
															Ext.Msg.alert('Advertencia', 'Por favor, seleccione o escriba un identificador', Ext.emptyFn);
														}else if (id == null || id == ""){

															cqlfilter = 'CQL_FILTER=departamento=' + "'" + Ext.getCmp('ComboDepartamento').getValue() + "'%20AND%20"+ 'municipio=' + "'" + Ext.getCmp('ComboMunicipio').getValue() + "'%20AND%20" + 'zona=' + "'" + Ext.getCmp('ComboZona').getValue() + "'%20AND%20" + 'sector=' + "'" + Ext.getCmp('ComboSector').getValue() + "'%20AND%20" + 'comuna=' + "'" + Ext.getCmp('ComboComuna').getValue() + "'%20AND%20" + 'barrio=' + "'" + Ext.getCmp('ComboBarrio').getValue() + "'%20AND%20" + 'manzana=' + "'" + Ext.getCmp('ComboManzana').getValue() + "'%20AND%20" + 'predio=' + "'" + Ext.getCmp('ComboPredio').getValue() + "'";
															typeNameLayer = 'typeName=' + prefijo + ':' + capaElPredialesUnion;

															var url = 'proxy.jsp?' + encodeURIComponent(WFS + request + '&' + service + '&' + version + '&' +  typeNameLayer + '&' + cqlfilter + '&' + format + '&' + ordenarPorNumPredial);

															Ext.Ajax.request({
																url: url,
																async: false,
																method: 'POST',
																success: function(response, opts) {
																	features = new ol.format.GeoJSON().readFeatures(response.responseText);

																}
															});

															var xmin = features[0].getGeometry().getExtent()[0];
			    						    		var ymin = features[0].getGeometry().getExtent()[1];
			    						    		var xmax = features[0].getGeometry().getExtent()[2];
			    						    		var ymax = features[0].getGeometry().getExtent()[3];

			    						    		var fase = 0;

			    						    		var arraytipos = [];

			    						    		for (var i = 0; i < features.length; i++) {
																arraytipos.push(features[i].getProperties().tipopredio);
			    						    		}

			    						    		select.getFeatures().clear();
			    						    		map.addInteraction(select);
															FeaturesSelect = select.getFeatures();

			    						    		if (arraytipos.includes(capaTerreno.replace("vw_", ""))){
			    						    				for (var i = 0; i < features.length; i++) {
			    						    					if (arraytipos.includes(capaTerreno.replace("vw_", "")) && features[i].getProperties().tipopredio == capaTerreno.replace("vw_", "")){
					    						    				features[i].setProperties(Object.assign({'Tipo': nbTerreno}, features[i].getProperties()));
																			FeaturesSelect.push(features[i]);
																			var extent = features[i].getGeometry();
																			//map.getView().fit(extent);
																			map.getView().fit(extent, {padding: [170, 50, 30, 150], constrainResolution: false});
																			break;
			    						    					}
																	}
															}else if (arraytipos.includes(capaConstruccion.replace("vw_", ""))){
																	for (var i = 0; i < features.length; i++) {
						    						    		if (arraytipos.includes(capaConstruccion.replace("vw_", "")) && features[i].getProperties().tipopredio == capaConstruccion.replace("vw_", "")){
							    						    		features[i].setProperties(Object.assign({'Tipo': nbConstruccion}, features[i].getProperties()));
																			FeaturesSelect.push(features[i]);
																			var extent = features[i].getGeometry();
																			//map.getView().fit(extent);
																			map.getView().fit(extent, {padding: [170, 50, 30, 150], constrainResolution: false});
																			break;
						    						    		}
																	}
															}else if (arraytipos.includes(capaUnidad.replace("vw_", ""))){
																	for (var i = 0; i < features.length; i++) {
						    						    		if (arraytipos.includes(capaUnidad.replace("vw_", "")) && features[i].getProperties().tipopredio == capaUnidad.replace("vw_", "")){
							    						  			features[i].setProperties(Object.assign({'Tipo': nbUnion}, features[i].getProperties()));
																			FeaturesSelect.push(features[i]);
																			var extent = features[i].getGeometry();
																			//map.getView().fit(extent);
																			map.getView().fit(extent, {padding: [170, 50, 30, 150], constrainResolution: false});
																			break;
						    						    		}
																	}
															}

														}else if(ID == null || ID == ""){
															var message = SelectElements(id);
															if(message == true){
																Ext.Msg.alert('Advertencia', 'El identificador ' + id + ' no existe ', Ext.emptyFn);
															}
														}
												}
									    }
						        }]
						 	  },{ columnWidth: '0.5',
										border: false,
										layout: {
										    type: 'vbox',
										    align: 'center'
										},
										items:[{
						            xtype: 'button',
												text: 'Borrar',
												listeners: {
													click: function(thisbutton, e, eOpts){

														Ext.getCmp('Identificador').setValue("");
														Ext.getCmp('Identificador').setDisabled(false);
														Ext.getCmp('ComboDepartamento').setValue("");
														Ext.getCmp('ComboDepartamento').setDisabled(false);
														Ext.getCmp('btncentrardep').setDisabled(true);
														Ext.getCmp('ComboMunicipio').setValue("");
														Ext.getCmp('ComboMunicipio').setDisabled(true);
														Ext.getCmp('btncentrarmun').setDisabled(true);
														Ext.getCmp('ComboZona').setValue("");
														Ext.getCmp('ComboZona').setDisabled(true);
														Ext.getCmp('ComboSector').setValue("");
														Ext.getCmp('ComboSector').setDisabled(true);
														Ext.getCmp('btncentrarsec').setDisabled(true);
														Ext.getCmp('ComboComuna').setValue("");
														Ext.getCmp('ComboComuna').setDisabled(true);
														Ext.getCmp('btncentrarcom').setDisabled(true);
														Ext.getCmp('ComboBarrio').setValue("");
														Ext.getCmp('ComboBarrio').setDisabled(true);
														Ext.getCmp('btncentrarbarr').setDisabled(true);
														Ext.getCmp('ComboManzana').setValue("");
														Ext.getCmp('ComboManzana').setDisabled(true);
														Ext.getCmp('btncentrarman').setDisabled(true);
														Ext.getCmp('ComboPredio').setValue("");
														Ext.getCmp('ComboPredio').setDisabled(true);
														Ext.getCmp('Buscar').setDisabled(true);

														select.getFeatures().clear();
														map.removeInteraction(select);
														if(popup != ""){
															map.removeOverlay(popup);
															popup = "";
														}
														map.removeInteraction(draw);
														map.removeInteraction(measure);
														layerMeasure.getSource().clear();

													}
									    	}
						        }]
								}]
			         }
		          ]
			  }]
	 	 },{
			title: 'Medición',
			width: '100%',
			border : true,
			items:[{
					xtype: 'form',
					id: 'MedForm',
					border: false,
					items:[{
						layout: 'column',
						margin: '10 5 0 5',
						border: false,
						items:[{
							columnWidth: '0.5',
							border: false,
							layout: {
							    type: 'vbox',
							    align: 'center'
							},
							items:[{
								xtype: 'button',
								text: 'Área',
								iconCls: 'icoMedirArea',
								cls: 'btnAniadirWMS',
								width: 110,
								handler: function() {

									Ext.getBody().setStyle("cursor", "default");
									ol.Observable.unByKey(eventMapSingleClick);

									if (Ext.getStore('storeMeasureUnid').count() > 0)
									{
										Ext.getStore('storeMeasureUnid').removeAll();
									}

									Ext.getCmp('comboMeasureUnid').clearValue();
									Ext.getStore('storeMeasureUnid').filter('tipo', 1);
									Ext.getCmp('comboMeasureUnid').select(Ext.getStore('storeMeasureUnid').getAt(0));

									layerMeasure.getSource().clear();
									ol.Observable.unByKey(eventpointermove);
									if (helpTooltipElement) {
										helpTooltipElement.innerHTML = '';
									}
									Ext.getCmp('lblMeasureResult').setText('', false);

									eventpointermove = map.on('pointermove', pointerMoveHandler);
									map.removeInteraction(draw);
									map.removeInteraction(measure);
									select.getFeatures().clear();
									map.removeInteraction(select);
									if(popup != ""){
										map.removeOverlay(popup);
										popup = "";
									}
									addInteraction('area');
								}

							}]
						},{
							columnWidth: '0.5',
							border: false,
							layout: {
							    type: 'vbox',
							    align: 'center'
							},
							items:[{
								xtype: 'button',
								text: 'Distancia',
								iconCls: 'icoMedirDistancia',
								cls: 'btnAniadirWMS',
								width: 110,
								handler: function() {

									Ext.getBody().setStyle("cursor", "default");
									ol.Observable.unByKey(eventMapSingleClick);

									Ext.getCmp('comboMeasureUnid').clearValue();
									Ext.getStore('storeMeasureUnid').filter('tipo', 2);
									Ext.getCmp('comboMeasureUnid').select(Ext.getStore('storeMeasureUnid').getAt(0));

									layerMeasure.getSource().clear();
									ol.Observable.unByKey(eventpointermove);
									if (helpTooltipElement) {
										helpTooltipElement.innerHTML = '';
									}
									Ext.getCmp('lblMeasureResult').setText('', false);

									eventpointermove = map.on('pointermove', pointerMoveHandler);
									map.removeInteraction(draw);
									map.removeInteraction(measure);
									select.getFeatures().clear();
									map.removeInteraction(select);
									if(popup != ""){
										map.removeOverlay(popup);
										popup = "";
									}
									addInteraction('length');
								}
							}]
						}]
					},{
						layout: 'column',
						margin: '10 5 0 5',
						border: false,
						items:[{
							columnWidth: '1',
							border: false,
							items:[{
								xtype: 'combo',
								id: 'comboMeasureUnid',
								margin: '5 5 0 5',
								fieldLabel: 'Unidades',
								valueField: 'uni',
								displayField: "unidad",
								labelWidth: 60,
								width: 310,
								store: Ext.create('Ext.data.Store', {
									id: 'storeMeasureUnid',
									fields: ['uni', 'unidad', 'tipo'],
								  data : [
										{uni: 'ha', unidad: 'Hectáreas', tipo: 1},
										{uni: 'km2', unidad: 'Kilómetros cuadrados', tipo: 1},
										{uni: 'm2', unidad: 'Metros cuadrados', tipo: 1},
										{uni: 'km', unidad: 'Kilómetros', tipo: 2},
										{uni: 'm', unidad: 'Metros', tipo: 2}
								  ],
							    filters: [{
							    	property: 'tipo',
							    	value: 0
							    }]
								}),
								listeners:{
									select: function (thisCombo, record, eOpts)
									{
										var length;
										var area;

										if (layerMeasure.getSource().getFeatures().length > 0)
										{
											var geom = layerMeasure.getSource().getFeatures()[0].getGeometry();

											if (geom instanceof ol.geom.Polygon) {
												area = geom.getArea();
											} else if (geom instanceof ol.geom.LineString) {
											 	length = Math.round(geom.getLength() * 100) / 100;
											}

											var output;
										  	if (thisCombo.getValue() == 'km2')
										  	{
										  		output = 'Área: ' + (Math.round(area / 1000000 * 100) / 100).toFixed(2) + ' ' + 'Km<sup>2</sup>';
										  	}
										  	else if (thisCombo.getValue() == 'ha')
										  	{
										  		output = 'Área: ' + (Math.round(area * 100) / 100 / 10000).toFixed(2) + ' ' + 'ha';
										  	}
										  	else if (thisCombo.getValue() == 'm2')
										  	{
										  		output = 'Área: ' + (Math.round(area * 100) / 100).toFixed(2) + ' ' + 'm<sup>2</sup>';
										  	}
										  	else if (Ext.getCmp('comboMeasureUnid').getValue() == 'km')
										  	{
										  		output = 'Distancia: ' + (Math.round(length / 1000 * 100) / 100).toFixed(2) + ' ' + 'km';
										  	}
										  	else if (Ext.getCmp('comboMeasureUnid').getValue() == 'm') {
										  		output = 'Distancia: ' + (Math.round(length * 100) / 100).toFixed(2) + ' ' + 'm';
										  	}
										  	Ext.getCmp('lblMeasureResult').setText(output, false);
										 }
									}
								}
							}]
						}]
					},{
						layout: 'column',
						margin: '20 5 0 5',
						border: false,
						items:[{
							columnWidth: '0.8',
							border: false,
							items:[{
		            	xtype: 'label',
		            	id: 'lblMeasureResult',
		            	cls: 'labelMeasureResult',
		            	html: '',
		            	margin: '5 5 0 5'
							}]
						},{
							columnWidth: '0.2',
							border: false,
							items:[{
								xtype: 'button',
				        text: 'Borrar',
								listeners: {
									click: function(thisbutton, e, eOpts) {

											if (helpTooltipElement) {
												helpTooltipElement.innerHTML = '';
											}
											ol.Observable.unByKey(eventpointermove);
											map.removeInteraction(measure);
											layerMeasure.getSource().clear();

											Ext.getCmp('lblMeasureResult').setText('', false);
											Ext.getStore('storeMeasureUnid').filter('tipo', 0);
											Ext.getCmp('comboMeasureUnid').select(null);

											eventpointermove = map.on('pointermove', pointermoveIdentificar);
											eventMapSingleClick = map.on('singleclick', singleclickIdentificar);
											map.removeOverlay(helpTooltip);
											map.removeOverlay(measureTooltip);

									}
							   }
							}]
						}]
					}]
				}]
			},{
				title: 'Impresión',
				width: '100%',
				border : true,
				items:[{
					xtype: 'form',
					id: 'ImpForm',
					border: false,
					items: [{
		        	xtype: 'fieldset',
		          width: '100%',
		          title: 'PDF',
	            columnWidth: 0.5,
	            labelWidth: 75,
							margin: '10 10 0 10',
	            labelAlign: 'top',
							msgTarget: 'under',
	            layout: 'anchor',
	            defaults: {
	                layout: '100%'
	            },
	            defaultType: 'combobox',
	            items: [{
	            		xtype: 'combobox',
	            		id: 'combosize',
	            		fieldLabel: 'Tamaño de página',
									labelAlign: 'top',
									msgTarget: 'under',
									margin: '0 0 10 0',
									width: '100%',
									flex: 1,
							    queryMode: 'local',
							    displayField: 'name',
							    valueField: 'value',
							    store: Ext.create('Ext.data.Store', {
						    		fields: ['name', 'value'],
						    		data : [
						    			{"name":"A3", 'value': 'a3'},
						    			{"name":"A4", 'value': 'a4'}
			            	]
			            })
		            }]
					},{
			      layout: 'column',
						margin: '10 5 0 5',
						border: false,
						items:[{
							columnWidth: '1.755',
							border: false,
							layout: {
							    type: 'vbox',
							    align: 'center'
							},
							items:[{
									xtype: 'button',
		            	text: 'Imprimir',
									id: 'imprimir',
									listeners: {
										click: function(){

											var format = Ext.getCmp('combosize').value;
 											var resolution = '72';

 											var myMask = new Ext.LoadMask({
	 											 msg : "Imprimiendo...",
	 											 target : Ext.getCmp("ImpForm")
 											});

										  if (format == null && resolution == null){
												Ext.Msg.alert('Advertencia', 'Por favor, selecione un tamaño de página y una resolución', Ext.emptyFn);
											}else if (format == null){
												Ext.Msg.alert('Advertencia', 'Por favor, selecione un tamaño de página', Ext.emptyFn);
											}else if (resolution == null){
												Ext.Msg.alert('Advertencia', 'Por favor, selecione una resolución', Ext.emptyFn);
											}else{
												 print(format, resolution, myMask);
											}
										}
									}
				      }]
						}]
					}]
		  	}]
			},{
				title: 'Dibujar',
				width: '100%',
				border : true,
				items:[{
					xtype: 'form',
					id: 'DrawForm',
					border: false,
					items: [{
		        	xtype: 'fieldset',
		          width: '100%',
		          columnWidth: 0.5,
							margin: '10 10 0 10',
		          labelWidth: 75,
		          labelAlign: 'top',
							msgTarget: 'under',
		          items: [{
		            	xtype: 'combobox',
		            	id: 'combodraw',
		            	fieldLabel: 'Tipo de geometría',
									labelAlign: 'top',
									msgTarget: 'under',
									width: '100%',
									margin: '0 0 10 0',
									flex: 1,
								  queryMode: 'local',
								  displayField: 'name',
						    	valueField: 'value',
		           		store: Ext.create('Ext.data.Store', {
		            	    fields: ['name', 'value'],
		            	    data : [
		            	        {"name":"Punto", "value": 'Point'},
		            	        {"name":"Línea", "value": 'LineString'},
		            	        {"name":"Polígono", "value": 'Polygon'},
		            	        {"name":"Círculo", "value": 'Circle'}
		            	    ]
		            	})
		          },{
		            	xtype: 'label',
		            	forId: 'myFieldId',
                  text: 'Selección del color',
                  margin: '10 0 0 0'
					    },{
		            	xtype: 'colorpicker',
		            	id: 'colorpicker',
									width: '100%',
									margin: '5 0 0 0'

					    }]
					},{
		         layout: 'column',
						 margin: '10 5 0 5',
						 border: false,
						 items:[{
									columnWidth: '0.5',
									border: false,
									layout: {
									    type: 'vbox',
									    align: 'center'
									},
									items:[{
	            				xtype: 'button',
	            				text: 'Dibujar',
											id: 'dibujar',
											listeners: {
												click: function(){

													var typeSelect = Ext.getCmp('combodraw').getValue();
													Ext.getBody().setStyle("cursor", "default");
													ol.Observable.unByKey(eventMapSingleClick);

													ol.Observable.unByKey(eventpointermove);

													var value = Ext.getCmp('colorpicker').getValue();

													if (value == null && typeSelect == null){
														Ext.Msg.alert('Advertencia', 'Por favor, selecione un tipo de geometría y un color', Ext.emptyFn);
													}else if (value == null){
														Ext.Msg.alert('Advertencia', 'Por favor, selecione un color', Ext.emptyFn);
													}else if (typeSelect == null){
														Ext.Msg.alert('Advertencia', 'Por favor, selecione un tipo de geometría', Ext.emptyFn);
													}else{
														var a = "#";

														var position = 0;

														color = [value.slice(0, position), a, value.slice(position)].join('');

														map.removeInteraction(draw);
														map.removeInteraction(measure);
														select.getFeatures().clear();
														map.removeInteraction(select);

														if(popup != ""){
															map.removeOverlay(popup);
															popup = "";
														}
														addInteractionDraw(typeSelect);

														layerDraw.setStyle(new ol.style.Style({

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
														}))
													}

												}
											}
					        }]
				  	 },{ columnWidth: '0.5',
								 border: false,
								 layout: {
									    type: 'vbox',
									    align: 'center'
								 },
								 items:[{
			            		xtype: 'button',
			            		text: 'Borrar',
											listeners: {
												click: function(thisbutton, e, eOpts) {

														ol.Observable.unByKey(eventpointermove);
														map.removeInteraction(draw);
														layerDraw.getSource().clear();

														eventpointermove = map.on('pointermove', pointermoveIdentificar);
														eventMapSingleClick = map.on('singleclick', singleclickIdentificar);
														map.removeOverlay(helpTooltip);
														map.removeOverlay(measureTooltip);

												}
										  }
						      }]
						 }]
					}]
				}]
			}]
		}],
		listeners:{
			expand: function (p, eOpts)
			{
				var altoTree = p.getHeight() - 110;
				Ext.getCmp('treepanelLayers').setHeight(altoTree);
				Ext.getCmp('LocForm').setHeight(altoTree);
				Ext.getCmp('MedForm').setHeight(altoTree);
				Ext.getCmp('ImpForm').setHeight(altoTree);
				Ext.getCmp('DrawForm').setHeight(altoTree);

			},
			resize: function (thisPanel, width, height, oldWidth, oldHeight, eOpts)
			{
				var altoTree = thisPanel.getHeight() - 110;
				Ext.getCmp('treepanelLayers').setHeight(altoTree);
				Ext.getCmp('LocForm').setHeight(altoTree);
				Ext.getCmp('MedForm').setHeight(altoTree);
				Ext.getCmp('ImpForm').setHeight(altoTree);
				Ext.getCmp('DrawForm').setHeight(altoTree);
			}
		},
		buttons: ['->',{
			text: "Buscar por topónimos",
			iconCls: 'icoLocalizar',
			cls: 'btnLocalizar',
			listeners: {
				click: function (){

					var controls = map.getControls().getArray();
					if (controls.length > 5){
						map.removeControl(geocoder);
						geocoder.getSource().clear();
						map.removeLayer(layergeocoder);
					}else{
						map.addControl(geocoder);

					}
				}
			}
		},{
			text: "Añadir WMS/WMTS",
			iconCls: 'icoAniadirWMS',
			cls: 'btnAniadirWMS',
			handler: function(){
				createWindowServices();
			}
		}]
	});

	Ext.getCmp('treepanelLayers').getRootNode().getChildAt(1).expand();
	Ext.getCmp('treepanelLayers').getRootNode().getChildAt(3).expand();
	Ext.getCmp('treepanelLayers').getRootNode().getChildAt(6).expand();
	Ext.getCmp('treepanelLayers').getRootNode().getChildAt(4).set('checked',false);
	Ext.getCmp('treepanelLayers').getRootNode().getChildAt(5).set('checked',false);

	return myPanelLeft;
}
