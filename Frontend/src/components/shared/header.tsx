import logo from '../../assets/img/logo.png'
import billi from '../../assets/img/test/billie-3.png'

interface Props {
    title?: "Dashboard" | "Livraison" | "Client" | "Livreur"
}

export function Header ({title}: Props) {
  return (
    <header className="container-custom sticky top-0 backdrop-blur-md w-full shadow-2xl rounded-xl z-90">
      <div className='grid grid-cols-2 p-3 items-center w-full'>
        <div className='h-14 flex items-center gap-4 '>
            <img src={logo} alt="delivery tracker" className='w-11' />
            <h3 className='font-heading font-bold text-3xl text-neutral'>{title}</h3>
        </div>
        <img src={billi} alt="" className='w-11 rounded-full justify-self-end self-center' />
      </div>
    </header>
  );
}
