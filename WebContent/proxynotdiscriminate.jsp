<%@page session="false"%>
<%@page import="java.net.*,java.io.*, org.apache.log4j.Logger" %>
<%@page import="es.tragsatec.catastrocol.configuracion.GestorConfiguracion" %>
<%@page trimDirectiveWhitespaces="true"%> 
<%
Logger log = Logger.getLogger("proxynotdiscriminate.jsp");

HttpURLConnection con = null;
try {
	String reqUrl = request.getQueryString();
	reqUrl = reqUrl.replaceAll(" ", "+"); 
	String decodedUrl = "";
	if (reqUrl != null) {
		reqUrl = URLDecoder.decode(reqUrl, "UTF-8");
	}
	else {
		response.setStatus(400);
		out.println("ERROR 400: No target specified for proxy.");
	}

	// replace the white spaces with plus in URL
	reqUrl = reqUrl.replaceAll(" ", "+"); 	
	String strProxy = (String)GestorConfiguracion.getInstancia().getPropiedad("proxyHost");
	if (!strProxy.equalsIgnoreCase(""))
	{
		//Configuracion de proyx
		System.setProperty("http.proxyHost", strProxy); 
		System.setProperty("http.proxyPort", (String)GestorConfiguracion.getInstancia().getPropiedad("proxyPort"));
		System.setProperty("http.proxyUser", (String)GestorConfiguracion.getInstancia().getPropiedad("proxyUser"));
		System.setProperty("http.proxyPassword", (String)GestorConfiguracion.getInstancia().getPropiedad("proxyPassword"));
		System.setProperty("http.nonProxyHosts", (String)GestorConfiguracion.getInstancia().getPropiedad("proxyIpExcluded"));
	}	
	
	// call the requested ressource		
	URL url = new URL(reqUrl);
	con = (HttpURLConnection)url.openConnection();
	con.setDoOutput(true);
	con.setRequestMethod(request.getMethod());
	String reqContenType = request.getContentType();
	if(reqContenType != null) {
		con.setRequestProperty("Content-Type", reqContenType);
	}
	else {
		con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	}
	int clength = request.getContentLength();	
	if(clength > 0) {		
		con.setDoInput(true);
		byte[] idata = new byte[clength];
		request.getInputStream().read(idata, 0, clength);
		con.getOutputStream().write(idata, 0, clength);	
	}
	
	// respond to client
	response.setContentType(con.getContentType());
	BufferedReader rd = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
	final int length = 5000;
	int charsIn = -1;
	char[] buffer = new char[length];
	while ((charsIn = rd.read(buffer)) > -1) {	
		out.write(buffer, 0, charsIn);
	}
	rd.close();
	
} catch(Exception e) {
	log.error("Error en el paso por proxy" , e);	
}
%>
