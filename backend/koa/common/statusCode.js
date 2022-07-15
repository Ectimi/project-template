module.exports = {
  100: {
    name: "Continue",
    description: "继续。客户端应继续其请求",
  },
  101: {
    name: "Switching Protocols",
    description:
      "切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议",
  },
  200: {
    name: "OK",
    description: "请求成功。一般用于GET与POST请求",
  },
  201: {
    name: "Created",
    description: "已创建。成功请求并创建了新的资源",
  },
  202: {
    name: "Accepted",
    description: "已接受。已经接受请求，但未处理完成",
  },
  203: {
    name: "Non-Authoritative Information",
    description:
      "非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本",
  },
  204: {
    name: "No Content",
    description:
      "无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档",
  },
  205: {
    name: "Reset Content",
    description:
      "重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域",
  },
  206: {
    name: "Partial Content",
    description: "部分内容。服务器成功处理了部分GET请求",
  },
  300: {
    name: "Multiple Choices",
    description:
      "多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择",
  },
  301: {
    name: "Moved Permanently",
    description:
      "永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替",
  },
  302: {
    name: "Found",
    description:
      "临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI",
  },
  303: {
    name: "See Other",
    description: "查看其它地址。与301类似。使用GET和POST请求查看",
  },
  304: {
    name: "Not Modified",
    description:
      "未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源",
  },
  305: {
    name: "Use Proxy",
    description: "使用代理。所请求的资源必须通过代理访问",
  },
  306: {
    name: "Unused",
    description: "已经被废弃的HTTP状态码",
  },
  307: {
    name: "Temporary Redirect",
    description: "临时重定向。与302类似。使用GET请求重定向",
  },
  400: {
    name: "Bad Request",
    description: "客户端请求的语法错误，服务器无法理解",
  },
  401: {
    name: "Unauthorized",
    description: "请求要求用户的身份认证",
  },
  402: {
    name: "Payment Required",
    description: "保留，将来使用",
  },
  403: {
    name: "Forbidden",
    description: "服务器理解请求客户端的请求，但是拒绝执行此请求",
  },
  404: {
    name: "Not Found",
    description: "服务器无法根据客户端的请求找到资源（网页）",
  },
  405: {
    name: "Method Not Allowed",
    description: "客户端请求中的方法被禁止",
  },
  406: {
    name: "Not Acceptable",
    description: "服务器无法根据客户端请求的内容特性完成请求",
  },
  407: {
    name: "Proxy Authentication Required",
    description:
      "请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权",
  },
  408: {
    name: "Request Time-out",
    description: "服务器等待客户端发送的请求时间过长，超时",
  },
  409: {
    name: "Conflict",
    description:
      "服务器完成客户端的 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突",
  },
  410: {
    name: "Length Required",
    description:
      "客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置",
  },
  411: {
    name: "Not Found",
    description: "服务器无法处理客户端发送的不带Content-Length的请求信息",
  },
  412: {
    name: "Precondition Failed",
    description: "客户端请求信息的先决条件错误",
  },
  413: {
    name: "Request Entity Too Large",
    description:
      "由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息",
  },
  414: {
    name: "Request-URI Too Large",
    description: "请求的URI过长（URI通常为网址），服务器无法处理",
  },
  415: {
    name: "Unsupported Media Type",
    description: "服务器无法处理请求附带的媒体格式",
  },
  416: {
    name: "Requested range not satisfiable",
    description: "客户端请求的范围无效",
  },
  417: {
    name: "Expectation Failed",
    description: "服务器无法满足Expect的请求头信息",
  },
  500: {
    name: "Internal Server Error",
    description: "服务器内部错误，无法完成请求",
  },
  501: {
    name: "Not Implemented",
    description: "服务器不支持请求的功能，无法完成请求",
  },
  502: {
    name: "Bad Gateway",
    description:
      "作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应",
  },
  503: {
    name: "Service Unavailable",
    description:
      "由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中",
  },
  504: {
    name: "Gateway Time-out",
    description: "充当网关或代理的服务器，未及时从远端服务器获取请求",
  },
  505: {
    name: "HTTP Version not supported",
    description: "服务器不支持请求的HTTP协议的版本，无法完成处理",
  },
};
