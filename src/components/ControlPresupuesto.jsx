import {useState,useEffect} from 'react'
import { CircularProgressbar, CircularProgressbarWithChildren,
    buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({gastos ,presupuesto,setGastos,setPresupuesto,setIsPresupuesto}) => {

    const [disponible, setDiponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado

        //Calcular el porcentaje gastado
        const nuevoporcentaje = ( ((presupuesto - totalDisponible) / presupuesto * 100)).toFixed(1)

        
        setGastado(totalGastado)
        setDiponible(totalDisponible)

        setTimeout(() => {
            setPorcentaje(nuevoporcentaje)
        }, 1500);
    },[gastos])

    const formatearCantidad = (cantidad) => {
        return new Intl.NumberFormat().format(cantidad)+".00"
    }

    const handleResetApp = () => {
        
        const resultado = confirm("¿Deseas reiniciar presupoesto y gastos?")
        
        if (resultado){
            setGastos([])
            setPresupuesto([])
            setIsPresupuesto(false)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
        <CircularProgressbar
       
    value={porcentaje} 
    text={`${porcentaje}% Gastado`}   
    background
    backgroundPadding={6}
    styles={buildStyles({
      backgroundColor: porcentaje > 100 ? "red" : "#3B82F6",
      textColor: "#fff",
      pathColor: "#fff",
      trailColor: "transparent"
    })}
    
      />
                
           
        </div>

        <div className='contenido-presupuesto'>
            <button
            className='reset-app'
            type='button'
            onClick={handleResetApp}
            >Reserear app</button>
            <p>
                <span>Presupuesto:</span> ${formatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible:</span> ${formatearCantidad(disponible)}
            </p>

            <p>
                <span>Gastado:</span> ${formatearCantidad(gastado)}
            </p>
        </div>
      
    </div>
  )
}

export default ControlPresupuesto
