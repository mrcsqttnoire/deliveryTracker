import logo  from "../../assets/img/logo.png"

export function Loading () {
  return <>
    <img src={logo} alt="delivery tracker" className="w-12 animate-bounce"/>
    <div className="flex gap-1 font-heading animate-pulse md:text-xl">
        <p>Bienvenue sur</p>
        <p className="font-bold">Delivery</p>
        <p className="text-primary">Tracker</p>
    </div>
  </>
}
