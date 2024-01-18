import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({gastos,presupuesto, setPresupuesto, isValidpresupuesto, setIsPresupuesto,setGastos}) => {
  return (
    <header>
        <h1>Planificador de gastos.</h1>

          {isValidpresupuesto ?(
              <ControlPresupuesto
              gastos={gastos}
              setGastos={setGastos}
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              setIsPresupuesto={setIsPresupuesto}

              />
          ):(
            <NuevoPresupuesto
        
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsPresupuesto={setIsPresupuesto}
            
            />
          )}

        
      
    </header>
  )
}

export default Header
