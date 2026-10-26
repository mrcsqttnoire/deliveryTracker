
import { Button } from "../shared/button";
import { LogIn, Store } from "lucide-react";
// import { LoginProvider } from "../provider/LoginProvider";
// import { useLogin } from "../provider/useLogin";
import { useNavigate } from "react-router-dom";

function changeStateBtn(btnActive:HTMLElement, btnInActive:HTMLElement){
    btnActive?.classList.add("active")
    btnActive?.classList.remove("inActive")

    btnInActive?.classList.add("inActive")
    btnInActive?.classList.remove("active")
}

export function SwitchMode () {
  // const {switchToLogin, switchToSignin} = useLogin()
  const navigate = useNavigate()
  
  function switchToLogin() {
    const btnLogin = document.getElementById('login')
    const btnSignin = document.getElementById('signin')
    if (btnLogin && btnSignin ) changeStateBtn(btnLogin, btnSignin)

    navigate("login")
  }
  function switchToSignin() {
    const btnLogin = document.getElementById('login')
    const btnSignin = document.getElementById('signin')
    if (btnLogin && btnSignin ) changeStateBtn(btnSignin, btnLogin)
    navigate("signin")  
  }

  return (
    <div className="flex p-2 gap-2 w-full bg-input h-18 rounded-xl text-sm shadow-xl">
      <Button fn={() => switchToLogin()} type="submit" className="active" id="login">
        <LogIn />
        Connexion
      </Button>
      <Button fn={()=> switchToSignin()} type="submit" className="inActive" id="signin">
        <Store/>
        Créer boutique
      </Button>
    </div>
  );
}
