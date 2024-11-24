import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [loginData, setLoginData] = useState(null);
  let getToken = () => {
    let tokenDecode = localStorage.getItem("token");
    let tokenEncode = jwtDecode(tokenDecode);
    setLoginData(tokenEncode);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) getToken();
  }, []);
  return (
    <AuthContext.Provider value={{loginData, setLoginData , getToken}}>
      {props.children}
    </AuthContext.Provider>
  );
}
