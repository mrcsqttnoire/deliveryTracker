import { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.png'
import billi from '../../assets/img/test/billie-3.png'
import { useLocation } from 'react-router-dom';
import { useUtilities } from '../../provider/CustomizedHooks';
import { twMerge } from 'tailwind-merge';

const exclude = ["/", "create", "next"]

export function Header () {
  const location = useLocation()
  const [page, setPage] = useState<string>("")
  const {isOpen, setIsOpen} = useUtilities()

  useEffect(()=>{
    const p: string = location.pathname
    if (p === "/"){
      setPage("Acceuil")
    } else {
      let title = exclude.reduce((p, ex)=>p.replaceAll(ex, ""), p)
      setPage(title)
    }
  }, [location])

  const openMenu = () => {
    setIsOpen(!isOpen); 
  }

  return (
    <header className=" bg-white-500 container-custom sticky top-0 backdrop-blur-md w-full shadow-2xl rounded-xl z-50">
      <div className='grid grid-cols-2 py-3 items-center w-full'>
        <div className='h-14 flex items-center gap-4 '>
            <img src={logo} alt="delivery tracker" className='w-11' />
            <h3 className='font-heading font-bold text-3xl text-neutral capitalize'>{page.trim() ?? "Dashboard"}</h3>
        </div>
        <div className='relative'>
          <img src={billi} alt="" className={twMerge('w-11 rounded-full justify-self-end self-center active:scale-95')} onClick={()=>openMenu()}/>
        </div>
      </div>
    </header>
  );
}
