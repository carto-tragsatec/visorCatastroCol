<%@page session="false"%>
<%@page import="java.net.*,java.io.*, java.util.ArrayList, java.util.Enumeration, javax.net.ssl.HttpsURLConnection, java.util.zip.GZIPInputStream, org.apache.log4j.Logger" %>
<%@page import="es.tragsatec.catastrocol.configuracion.GestorConfiguracion" %>
<%
Logger log = Logger.getLogger("proxy.jsp");
String[] serverUrls = {
	(String)GestorConfiguracion.getInstancia().getPropiedad("WMS"),
	(String)GestorConfiguracion.getInstancia().getPropiedad("WFS"),	
  "localhost",  
  "localhost:8080",
  "localhost:8443"
};

%>
<%
try {		
	String reqUrl = URLDecoder.decode(request.getQueryString());	
	boolean allowed = false;
	String token = null;

	for(int i= 0; i < serverUrls.length; i++) 
	{
		String url = (String)serverUrls[i];
		String[] stokens = url.split("\\s*,\\s*");
		if(reqUrl.toLowerCase().contains(url.toLowerCase())) {
			allowed = true;
			if(stokens.length >= 2 && stokens[1].length() > 0)
				token = stokens[1];				
			break;
		}
	}

	
	if(!allowed) {
		log.error("Error en el paso por proxy: url no autorizada");
		response.setStatus(403);
		return;
	}
	if(token != null) {			
		reqUrl = reqUrl + (reqUrl.indexOf("?") > -1 ? "&" : "?") + "token=" + token;			
	}		
	
	URL url = new URL(reqUrl);			
	//si una url viene http establecemos conexion por http, si vienen por https lo hacemos por https		
	if(url.getProtocol().equalsIgnoreCase("http"))
	{			
		HttpURLConnection con = (HttpURLConnection)url.openConnection();
		con.setDoOutput(true);
		con.setRequestMethod(request.getMethod());	
		con.setRequestProperty("Accept-Encoding", "gzip");
					
		int clength = request.getContentLength();
		if(request.getContentType() != null) 
		{
			con.setRequestProperty("Content-Type", request.getContentType());
		}
		
		if(clength > 0) {
			con.setDoInput(true);
			InputStream istream = request.getInputStream();
			OutputStream os = con.getOutputStream();
			final int length = 5000;
			byte[] bytes = new byte[length];
			int bytesRead = 0;
			while ((bytesRead = istream.read(bytes, 0, length)) > 0) {
				os.write(bytes, 0, bytesRead);
			}
		}
		out.clear();
		out = pageContext.pushBody();
		
		OutputStream ostream = response.getOutputStream();
		response.setContentType(con.getContentType());
		if (con.getHeaderField("Content-Encoding")!=null && con.getHeaderField("Content-Encoding").equals("gzip"))
		{
			response.setHeader("Content-Encoding", "gzip");
		}
		
		InputStream in =con.getInputStream();	
					
		final int length = 5000;
		byte[] bytes = new byte[length];
		int bytesRead = 0;			
		while ((bytesRead = in.read(bytes, 0, length)) > 0) {				
	  		ostream.write(bytes, 0, bytesRead);
		}				
		
	}
	else{			
		HttpsURLConnection con = (HttpsURLConnection)url.openConnection();
		con.setDoOutput(true);
		con.setRequestMethod(request.getMethod());		
		con.setRequestProperty("Accept-Encoding", "gzip");
			
		int clength = request.getContentLength();
		if(request.getContentType() != null) 
		{
			con.setRequestProperty("Content-Type", request.getContentType());
		}	
		if(clength > 0) {
			con.setDoInput(true);
			InputStream istream = request.getInputStream();
			OutputStream os = con.getOutputStream();
			final int length = 5000;
			byte[] bytes = new byte[length];
			int bytesRead = 0;
			while ((bytesRead = istream.read(bytes, 0, length)) > 0) {
				os.write(bytes, 0, bytesRead);
			}
		}
		out.clear();
		out = pageContext.pushBody();
		
		OutputStream ostream = response.getOutputStream();
		response.setContentType(con.getContentType());
		if (con.getHeaderField("Content-Encoding")!=null && con.getHeaderField("Content-Encoding").equals("gzip"))
		{
			response.setHeader("Content-Encoding", "gzip");
		}
		
		InputStream in = con.getInputStream();
		
		final int length = 5000;
		byte[] bytes = new byte[length];
		int bytesRead = 0;			
		while ((bytesRead = in.read(bytes, 0, length)) > 0) {				
	  		ostream.write(bytes, 0, bytesRead);
		}				
	}	
} catch(Exception e) {
	log.error("Error en el paso por proxy" , e);
}

%>
