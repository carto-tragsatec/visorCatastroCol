<%@page session="true"%>
<%@page import="java.net.*,java.io.*, java.util.ArrayList, javax.servlet.http.HttpSession, java.util.Enumeration"%>
<%@page import="es.tragsatec.catastrocol.configuracion.GestorConfiguracion" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<% 		
	
		String WMS = (String)GestorConfiguracion.getInstancia().getPropiedad("WMS");
		String WFS = (String)GestorConfiguracion.getInstancia().getPropiedad("WFS");		
	
		String prefijo = (String)GestorConfiguracion.getInstancia().getPropiedad("prefijo");

		
		String grupoBase = (String)GestorConfiguracion.getInstancia().getPropiedad("grupoBase");
		
		String nbBaseOSM = (String)GestorConfiguracion.getInstancia().getPropiedad("nbBaseOSM");
		String urlBaseOSM = (String)GestorConfiguracion.getInstancia().getPropiedad("urlBaseOSM");
		
		String nbOrtofoto = (String)GestorConfiguracion.getInstancia().getPropiedad("nbOrtofoto");
		String capaOrtofoto = (String)GestorConfiguracion.getInstancia().getPropiedad("capaOrtofoto");

		
		String grupoPredial = (String)GestorConfiguracion.getInstancia().getPropiedad("grupoPredial");
		
		String nbTerreno = (String)GestorConfiguracion.getInstancia().getPropiedad("nbTerreno");
		String capaTerreno = (String)GestorConfiguracion.getInstancia().getPropiedad("capaTerreno");
		
		String nbConstruccion = (String)GestorConfiguracion.getInstancia().getPropiedad("nbConstruccion");
		String capaConstruccion = (String)GestorConfiguracion.getInstancia().getPropiedad("capaConstruccion");
		
		String nbCobertura = (String)GestorConfiguracion.getInstancia().getPropiedad("nbCobertura");
		String capaCobertura = (String)GestorConfiguracion.getInstancia().getPropiedad("capaCobertura");
		
		String nbUnidad = (String)GestorConfiguracion.getInstancia().getPropiedad("nbUnidad");
		String capaUnidad = (String)GestorConfiguracion.getInstancia().getPropiedad("capaUnidad");
		
		String grupoServiciosIGAC = (String)GestorConfiguracion.getInstancia().getPropiedad("grupoServiciosIGAC");
		
		String WMSCartoBasica500 = (String)GestorConfiguracion.getInstancia().getPropiedad("WMSCartoBasica500");
		String nbCartoBasica500 = (String)GestorConfiguracion.getInstancia().getPropiedad("nbCartoBasica500");
		String capaCartoBasica500 = (String)GestorConfiguracion.getInstancia().getPropiedad("capaCartoBasica500");
		
		String WMSCartoBasica100 = (String)GestorConfiguracion.getInstancia().getPropiedad("WMSCartoBasica100");
		String nbCartoBasica100 = (String)GestorConfiguracion.getInstancia().getPropiedad("nbCartoBasica100");
		String capaCartoBasica100 = (String)GestorConfiguracion.getInstancia().getPropiedad("capaCartoBasica100");
		
		String WMSCartoBasica10 = (String)GestorConfiguracion.getInstancia().getPropiedad("WMSCartoBasica10");
		String nbCartoBasica10 = (String)GestorConfiguracion.getInstancia().getPropiedad("nbCartoBasica10");
		String capaCartoBasica10 = (String)GestorConfiguracion.getInstancia().getPropiedad("capaCartoBasica10");
		
		String WMSAreasReglaEsp = (String)GestorConfiguracion.getInstancia().getPropiedad("WMSAreasReglaEsp");
		
		String nbResguardosIndigenas = (String)GestorConfiguracion.getInstancia().getPropiedad("nbResguardosIndigenas");
		String capaResguardosIndigenas = (String)GestorConfiguracion.getInstancia().getPropiedad("capaResguardosIndigenas");
		
		String nbComunidadesNegras = (String)GestorConfiguracion.getInstancia().getPropiedad("nbComunidadesNegras");
		String capaComunidadesNegras = (String)GestorConfiguracion.getInstancia().getPropiedad("capaComunidadesNegras");
		
 		String grupoServiciosIDEAM = (String)GestorConfiguracion.getInstancia().getPropiedad("grupoServiciosIDEAM");
		
 		String WMSCoberturasTierra = (String)GestorConfiguracion.getInstancia().getPropiedad("WMSCoberturasTierra");
		
 		String nbCoberTierra2000_2002 = (String)GestorConfiguracion.getInstancia().getPropiedad("nbCoberTierra2000_2002");
		String capaCoberTierra2000_2002 = (String)GestorConfiguracion.getInstancia().getPropiedad("capaCoberTierra2000_2002");
		
		String nbCoberTierra2005_2009 = (String)GestorConfiguracion.getInstancia().getPropiedad("nbCoberTierra2005_2009");
		String capaCoberTierra2005_2009 = (String)GestorConfiguracion.getInstancia().getPropiedad("capaCoberTierra2005_2009");
		
		String nbCoberTierra2010_2012 = (String)GestorConfiguracion.getInstancia().getPropiedad("nbCoberTierra2010_2012");
		String capaCoberTierra2010_2012 = (String)GestorConfiguracion.getInstancia().getPropiedad("capaCoberTierra2010_2012");
		
		String nbCoberParamos = (String)GestorConfiguracion.getInstancia().getPropiedad("nbCoberParamos");
		String capaCoberParamos = (String)GestorConfiguracion.getInstancia().getPropiedad("capaCoberParamos");
		
		String nameUsuario = (String)GestorConfiguracion.getInstancia().getPropiedad("nameUsuario");
		
		String urlGeocoderOSM = (String)GestorConfiguracion.getInstancia().getPropiedad("urlGeocoderOSM");
		
		String grupoLimites = (String)GestorConfiguracion.getInstancia().getPropiedad("grupoLimites");
		
		String nbDepartamentos = (String)GestorConfiguracion.getInstancia().getPropiedad("nbDepartamentos");
		String capaDepartamentos = (String)GestorConfiguracion.getInstancia().getPropiedad("capaDepartamentos");
		
		String nbMunicipios = (String)GestorConfiguracion.getInstancia().getPropiedad("nbMunicipios");
		String capaMunicipios = (String)GestorConfiguracion.getInstancia().getPropiedad("capaMunicipios");
		
		String nbColombia = (String)GestorConfiguracion.getInstancia().getPropiedad("nbColombia");
		String capaColombia = (String)GestorConfiguracion.getInstancia().getPropiedad("capaColombia");
		
		String nbElPredialesUnion = (String)GestorConfiguracion.getInstancia().getPropiedad("nbElPredialesUnion");
		String capaElPredialesUnion = (String)GestorConfiguracion.getInstancia().getPropiedad("capaElPredialesUnion");
		 
	%>	
</head>

<body>
	<input type="hidden" name="WMS" id="WMS" value="<%=WMS%>"> 
	<input type="hidden" name="WFS" id="WFS" value="<%=WFS%>">	
	
	<input type="hidden" name="prefijo" id="prefijo" value="<%=prefijo%>">

	<input type="hidden" name="grupoBase" id="grupoBase" value="<%=grupoBase%>">
	
	<input type="hidden" name="nbBaseOSM" id="nbBaseOSM" value="<%=nbBaseOSM%>">
	<input type="hidden" name="urlBaseOSM" id="urlBaseOSM" value="<%=urlBaseOSM%>">

	<input type="hidden" name="nbOrtofoto" id="nbOrtofoto" value="<%=nbOrtofoto%>">
	<input type="hidden" name="capaOrtofoto" id="capaOrtofoto" value="<%=capaOrtofoto%>">
	
	<input type="hidden" name="grupoPredial" id="grupoPredial" value="<%=grupoPredial%>">
	
	<input type="hidden" name="nbTerreno" id="nbTerreno" value="<%=nbTerreno%>">
	<input type="hidden" name="capaTerreno" id="capaTerreno" value="<%=capaTerreno%>">
	
	<input type="hidden" name="nbConstruccion" id="nbConstruccion" value="<%=nbConstruccion%>">
	<input type="hidden" name="capaConstruccion" id="capaConstruccion" value="<%=capaConstruccion%>">
	
	<input type="hidden" name="nbCobertura" id="nbCobertura" value="<%=nbCobertura%>">
	<input type="hidden" name="capaCobertura" id="capaCobertura" value="<%=capaCobertura%>">
	
	<input type="hidden" name="nbUnidad" id="nbUnidad" value="<%=nbUnidad%>">
	<input type="hidden" name="capaUnidad" id="capaUnidad" value="<%=capaUnidad%>">
	
	<input type="hidden" name="grupoServiciosIGAC" id="grupoServiciosIGAC" value="<%=grupoServiciosIGAC%>">
	
	<input type="hidden" name="WMSCartoBasica500" id="WMSCartoBasica500" value="<%=WMSCartoBasica500%>">
	<input type="hidden" name="nbCartoBasica500" id="nbCartoBasica500" value="<%=nbCartoBasica500%>">
	<input type="hidden" name="capaCartoBasica500" id="capaCartoBasica500" value="<%=capaCartoBasica500%>">
	
	<input type="hidden" name="WMSCartoBasica100" id="WMSCartoBasica100" value="<%=WMSCartoBasica100%>">
	<input type="hidden" name="nbCartoBasica100" id="nbCartoBasica100" value="<%=nbCartoBasica100%>">
	<input type="hidden" name="capaCartoBasica100" id="capaCartoBasica100" value="<%=capaCartoBasica100%>">
	
	<input type="hidden" name="WMSCartoBasica10" id="WMSCartoBasica10" value="<%=WMSCartoBasica10%>">
	<input type="hidden" name="nbCartoBasica10" id="nbCartoBasica10" value="<%=nbCartoBasica10%>">
	<input type="hidden" name="capaCartoBasica10" id="capaCartoBasica10" value="<%=capaCartoBasica10%>">
	
	<input type="hidden" name="WMSAreasReglaEsp" id="WMSAreasReglaEsp" value="<%=WMSAreasReglaEsp%>">
	
	<input type="hidden" name="nbResguardosIndigenas" id="nbResguardosIndigenas" value="<%=nbResguardosIndigenas%>">
	<input type="hidden" name="capaResguardosIndigenas" id="capaResguardosIndigenas" value="<%=capaResguardosIndigenas%>">
	
	<input type="hidden" name="nbComunidadesNegras" id="nbComunidadesNegras" value="<%=nbComunidadesNegras%>">
	<input type="hidden" name="capaComunidadesNegras" id="capaComunidadesNegras" value="<%=capaComunidadesNegras%>">
	
	<input type="hidden" name="grupoServiciosIDEAM" id="grupoServiciosIDEAM" value="<%=grupoServiciosIDEAM%>">
	
 	<input type="hidden" name="WMSCoberturasTierra" id="WMSCoberturasTierra" value="<%=WMSCoberturasTierra%>">
	
	<input type="hidden" name="nbCoberTierra2000_2002" id="nbCoberTierra2000_2002" value="<%=nbCoberTierra2000_2002%>">
	<input type="hidden" name="capaCoberTierra2000_2002" id="capaCoberTierra2000_2002" value="<%=capaCoberTierra2000_2002%>">
	
	<input type="hidden" name="nbCoberTierra2005_2009" id="nbCoberTierra2005_2009" value="<%=nbCoberTierra2005_2009%>">
	<input type="hidden" name="capaCoberTierra2005_2009" id="capaCoberTierra2005_2009" value="<%=capaCoberTierra2005_2009%>">
	
	<input type="hidden" name="nbCoberTierra2010_2012" id="nbCoberTierra2010_2012" value="<%=nbCoberTierra2010_2012%>">
	<input type="hidden" name="capaCoberTierra2010_2012" id="capaCoberTierra2010_2012" value="<%=capaCoberTierra2010_2012%>">
	
	<input type="hidden" name="nbCoberParamos" id="nbCoberParamos" value="<%=nbCoberParamos%>">
	<input type="hidden" name="capaCoberParamos" id="capaCoberParamos" value="<%=capaCoberParamos%>"> 
	
	<input type="hidden" name="nameUsuario" id="nameUsuario" value="<%=nameUsuario%>"> 
	
	<input type="hidden" name="urlGeocoderOSM" id="urlGeocoderOSM" value="<%=urlGeocoderOSM%>"> 
	
	<input type="hidden" name="grupoLimites" id="grupoLimites" value="<%=grupoLimites%>">
	
	<input type="hidden" name="nbDepartamentos" id="nbDepartamentos" value="<%=nbDepartamentos%>">
	<input type="hidden" name="capaDepartamentos" id="capaDepartamentos" value="<%=capaDepartamentos%>">

	<input type="hidden" name="nbMunicipios" id="nbMunicipios" value="<%=nbMunicipios%>">
	<input type="hidden" name="capaMunicipios" id="capaMunicipios" value="<%=capaMunicipios%>">
	
	<input type="hidden" name="nbColombia" id="nbColombia" value="<%=nbColombia%>">
	<input type="hidden" name="capaColombia" id="capaColombia" value="<%=capaColombia%>">
	
	<input type="hidden" name="nbElPredialesUnion" id="nbElPredialesUnion" value="<%=nbElPredialesUnion%>">
	<input type="hidden" name="capaElPredialesUnion" id="capaElPredialesUnion" value="<%=capaElPredialesUnion%>">

</body>

</html>