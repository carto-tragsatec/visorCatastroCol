
Ext.Loader.setConfig({
	enabled: true,
	paths: {
		'GeoExt': 'visorcatastrocol/lib/geoext/v3.1.0/src/'
	}
});

Ext.require([
	'GeoExt.component.Map',
	'GeoExt.data.MapfishPrintProvider',
	'GeoExt.data.serializer.Vector'
]);

Ext.application({
    name: 'app',
    launch: function()
    {         		   			      
		layout.init();
    } 
});