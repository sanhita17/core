<%
  response.setContentType( "application/json" );
%>
{
  "jsonrpc": "2.0",
  "id": "${requestId}",
  "result": {
    "messages": [
      {
        "code": ${jsonCode},
        "success": false,
        "message": "${errorMessage}"
      }
    ]
  },
  "error": {
    "code": ${jsonCode},
    "message": "${errorMessage}",
    "data": {
      "exceptionTypeName": "${exceptionName}",
      "message": "${errorMessage}"
    }
  }
}