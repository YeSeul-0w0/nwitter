import AppRouter from "./Router";
import {useEffect, useState} from "react";
import { authService } from "../firebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
      authService.onAuthStateChanged((user) => {
          if (user) {
              setIsLoggedIn(user);
          } else {
              setIsLoggedIn(false);
          }
          setInit(true);
      })
  }, [])

  return (
      <>
        {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..."}
        <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
      </>
  );
}

export default App;
