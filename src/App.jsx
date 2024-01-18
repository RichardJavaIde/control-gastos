import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import {generarId} from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Filtros from './components/Filtros';

function App() {
 
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidpresupuesto, setIsPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarmodal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
   
    )

  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastoFiltrados, setGastoFiltrados] = useState([])

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0){
      handleNuevoGasto()
    }
    
},[gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
    
},[presupuesto])

useEffect(() => {
  localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  
},[gastos])

useEffect(() => {
  if(filtro){
    const gastoFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
    setGastoFiltrados(gastoFiltrados)
  }
},[filtro])

useEffect(() => {
  const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

  if(presupuestoLS > 0 ){
    setIsPresupuesto(true)
  }
  
},[])

  const handleNuevoGasto = () =>{
    setModal(true)
    
    setTimeout(() =>{
      setAnimarModal(true)
    },1000)
   
  } 

  const guardarGasto = gasto =>{

    if(gasto.id){
      gasto.fecha = Date.now();
      const gastoActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto :gastoState)
      setGastos(gastoActualizados)
      setGastoEditar({})

    }else{
        // Nuevo Gasto
      gasto.id =generarId();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto])

    }

    

    setAnimarModal(false)
    setTimeout(() =>{
        setModal(false)
        
      },1000)  
  }
const eliminarGasto = id =>{
  const gastosActualizados = gastos.filter( gasto => gasto.id != id)
  setGastos(gastosActualizados)
}
  return (
    <>
        <div className={modal ? 'fijar' : ''}>
          <Header 
          gastos={gastos}
          setGastos={setGastos}            
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidpresupuesto={isValidpresupuesto}
          setIsPresupuesto={setIsPresupuesto}
          />

          {isValidpresupuesto && (
            <>
                <main>
                  <Filtros 
                  filtro={filtro}
                  setFiltro={setFiltro}
                  />
                    <ListadoGastos 
                      
                      gastos={gastos}
                      setGastoEditar={setGastoEditar}
                      eliminarGasto={eliminarGasto}
                      gastoFiltrados={gastoFiltrados}
                      filtro={filtro}
                    
                    />
                </main>
                <div className='nuevo-gasto'>
                  <img
                    src={IconoNuevoGasto}
                    alt='icono de nuevo gasto'
                    onClick={handleNuevoGasto}
                  />

                </div>
            </>
          )}

            {modal && <Modal
            setModal={setModal}            
            animarmodal={animarmodal}
            setAnimarModal={setAnimarModal}
            guardarGasto={guardarGasto}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
            />}

        </div>
    </>
  )
}

export default App
