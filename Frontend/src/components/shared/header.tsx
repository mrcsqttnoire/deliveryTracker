import { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.png'
import billi from '../../assets/img/test/billie-3.png'
import { useLocation, useParams } from 'react-router-dom';
import { useUser, useUtilities } from '../../provider/CustomizedHooks';
import { twMerge } from 'tailwind-merge';


const exclude = ["/", "create", "next"]
export function Header () {
  const location = useLocation()
  const [page, setPage] = useState<string>("")
  const {isOpen, setIsOpen} = useUtilities()
  const {userLogedIn} = useUser()
  const {id} = useParams()
  if (id) exclude.push(id)
  
  const initials = `${userLogedIn.nom.charAt(0)}${userLogedIn.prenom.charAt(0)}`
  useEffect(()=>{
    const p: string = location.pathname
    if (p === "/"){
      setPage("Acceuil")
    } else {
      const title = exclude.reduce((p, ex)=>p.replaceAll(ex, ""), p)
      setPage(title)
    }
  }, [location])

  const openMenu = () => {
    setIsOpen(!isOpen); 
  }

  return (
    <header className=" bg-white-500 container-custom md:w-full sticky top-0 backdrop-blur-md w-full shadow-2xl rounded-xl z-50">
      <div className='grid grid-cols-2 justify-between py-3 items-center w-full'>
        <div className='h-14 flex items-center gap-2 sm:gap-4 '>
            <img src={logo} alt="delivery tracker" className='w-11' />
            <h3 className='font-heading font-bold text-2xl sm:text-3xl text-neutral capitalize'>{page.trim() ?? "Dashboard"}</h3>
        </div>
        <div onClick={()=>openMenu()} className='relative flex items-center justify-center justify-self-end rounded-full bg-livree-bg w-11 h-11 active:scale-95'>
          {userLogedIn.photo && <img src={userLogedIn.photo} alt="" className={twMerge('w-11 h-11 object-cover rounded-full justify-self-end self-center ')} />}
          {!userLogedIn.photo && <h5 className=' text-livree text-lg font-heading font-semibold cursor-pointer'>{initials}</h5>}
        </div>
      </div>
    </header>
  );
}
