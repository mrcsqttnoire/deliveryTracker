import logo from '../assets/img/logo.png'

interface Props {
    title?: string
}

export function Header ({title}: Props) {
  return (
    <header className="px-1">
        <div>
            <img src={logo} alt="delivery tracker" />
            <h3>{title}</h3>
        </div>
        
    </header>
  );
}
