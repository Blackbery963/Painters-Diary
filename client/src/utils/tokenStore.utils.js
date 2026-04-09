let _accessToken = null;

export const accessTokenStore = {
  get: () => _accessToken,
  set: (token) => { _accessToken = token; },
  clear: () => { _accessToken = null; },
  isExpired: () => {
    if (!_accessToken) return true;

    try {
      // Decode the JWT payload to check expiration
      const payload = JSON.parse(atob(_accessToken.split(".")[1]));
      return (payload.exp * 1000) < Date.now(); 
    } catch {
      return true;
    };
  },
  getUser: () => {
     if(!accessTokenStore || accessTokenStore.isExpired()) return null;
      try {
        const payload = JSON.parse(atob(_accessToken.split(".")[1]))
        return payload
      } catch {
        return null
      }
    }
};