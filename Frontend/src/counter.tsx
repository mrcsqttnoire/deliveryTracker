import { useState } from "react"

type props = {
    start: number
}

export function Counter({start} : props){
    const [i, setI] = useState(start)
    const incr = () => setI(i => i + 1)

    const [name, setName] = useState<string>(" ")
    return <div>
        <h1>Bonjour {name}</h1>
        <p>number : {i}</p>
        <input type="text" name="" id="name" onChange={(e) => setName(e.target.value)}/>
        <button onClick={incr}>incrémenter</button>
    </div>
}
