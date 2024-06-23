export default (context, inject) => {
  function parseUserAgent(userAgent) {
    const osMatch = userAgent.match(/\(([^)]+)\)/);
    const browserMatch = userAgent.match(/(Chrome\/[^\s]+)/);
    const safariMatch = userAgent.match(/(Safari\/[^\s]+)/);

    const osInfo = osMatch ? osMatch[1] : "OS information not found";
    const browserInfo = browserMatch ? browserMatch[1] : "Browser information not found";
    const safariInfo = safariMatch ? safariMatch[1] : "Safari information not found";

    return {
      operatingSystem: osInfo,
      browser: browserInfo,
      safari: safariInfo,
    };
  }

  inject("parseuseragent", parseUserAgent);
};
