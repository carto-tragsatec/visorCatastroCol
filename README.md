# Visor del Catastro Multipropósito de Colombia

Este visualizador cartográfico se desarrolla en el contexto del ***Proyecto Piloto del Catastro Multipropósito de Colombia***, cuyo objetivo fundamental es establecer la metodología de la operación catastral rural y urbana con enfoque multipropósito.

El visualizador permitirá socializar los resultados del proyecto piloto, poniendo al alcance de todas las personas e instituciones interesadas a través de internet el avance de los trabajos de instauración del Catastro en la Nación. Además de cumplir el objetivo de dar visibilidad a los trabajos ejecutados, lo que redundará en la asimilación del proceso por parte de la sociedad, a nivel particular permite a cada uno de los interesados acceder a la información gráfica y alfanumérica de sus predios, conocer la localización exacta y los atributos registrados para los mismos, y proceder a solicitar las correcciones que considere pertinentes a la vista de la información publicada.

La cartografía que se muestra está referida al sistema de coordenadas EPSG: 3116 MAGNA-SIRGAS / Zona Colombia Central Bogotá, en proyección Trasversa Mercator, y las coordenadas que se muestran al desplazar el cursor sobre el mapa están expresadas en metros.

Este visor se ha desarrollado mediante las librerías JavaScript *OpenLayers 4*, *ExtJS 6.2.0* y *GeoExt 3.1*. Utiliza *GeoServer 2.11* como servidor de mapas, *PostgreSQL/PostGIS* como servidor de base de datos espacial, *Apache TomCat 9* como servidor de aplicaciones JAVA.

Además de la cartografía que el propio visor proporciona, procedente del servidor GeoServer, de *Open Street Map* y de servicios WMS externos de organismos públicos colombianos (IGAC e IDEAM), el visor permite añadir dinámicamente cualquier capa WMS o WMTS.

## Functionalities

* Visualización de cartografía de base y elementos prediales
*	Adición capas WMS/WMTS externos
*	Localización y búsqueda guiada de predios
*	Búsqueda de topónimos
*	Herramientas de medición de longitud y área
*	Herramientas de dibujo
*	Impresión


## Built With

* [OpenLayers 4](https://openlayers.org/)
* [Ext JS 6.2.0](https://www.sencha.com/products/extjs/)
* [GeoExt 3.1.0](http://geoext.org/)

## License

Este proyecto está licenciado bajo la licencia [MIT](https://opensource.org/licenses/MIT)

![alt text](WebContent/visorcatastrocol/app/img/PND.jpg "Logo PND")
![alt text](WebContent/visorcatastrocol/app/img/DNP.png "Logo DNP")
![alt text](WebContent/visorcatastrocol/app/img/IGAC.png "Logo IGAC")
![alt text](WebContent/visorcatastrocol/app/img/SNR.png "Logo SNR")
![alt text](WebContent/visorcatastrocol/app/img/ANT.png "Logo ANT")
