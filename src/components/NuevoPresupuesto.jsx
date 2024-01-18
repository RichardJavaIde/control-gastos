import { useState } from "react"; 
import Mensajes from "./Mensajes";

const NuevoPresupuesto = ({presupuesto, setPresupuesto,setIsPresupuesto}) => {

  const [mensaje, setMensaje] = useState('')

  const handlePresupuesto = (e) => {

    event.preventDefault();

    if(!presupuesto || presupuesto < 0){
   
      setMensaje("No es un presupuesto valido")
      setIsPresupuesto(false)

      return

    }else{
      setMensaje("")
      setIsPresupuesto(true)
      
    }

  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handlePresupuesto} className='formulario'>

            <div className='campo'>
                <label>Definir presupuesto</label>

                    <input 
                        className='nuevo-presupuesto'
                        type='number'
                        placeholder='Añade tu presupuesto'
                        value={presupuesto}
                        onChange={ e => setPresupuesto(e.target.value)}
                    />

            </div>

            <input type='submit' value='Añadir' />

            {mensaje && <Mensajes tipo="error">{mensaje}</Mensajes>}

        </form>
      
    </div>
  )
}

export default NuevoPresupuesto
