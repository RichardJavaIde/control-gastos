
import { useState,useEffect } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensajes from './Mensajes'

const Modal = ({setModal, animarmodal,setAnimarModal, guardarGasto,setGastoEditar,gastoEditar}) => {

    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect(() => {
        if( Object.keys(gastoEditar).length > 0){
         setNombre( gastoEditar.nombre)
         setCantidad( gastoEditar.cantidad)
         setCategoria( gastoEditar.categoria)
         setId(gastoEditar.id)
         setFecha(gastoEditar.fecha)
        }
        
    },[])

    const ocultandoModal = () =>{
        
        setAnimarModal(false)
        setTimeout(() =>{
            setModal(false)
            
          },1000)  
          if( Object.keys(gastoEditar).length > 0){
            setGastoEditar({})
          }
              
    }

    const handleSubmit = e =>{
        e.preventDefault();

        if([nombre, cantidad, categoria].includes('')){
            setMensaje("Todos los campos son obligatorios.")

            setTimeout(() =>{
                setMensaje('')
                
              },4000) 
              return
        }
        guardarGasto({nombre,cantidad,categoria,id,fecha})
    }

  return (
    <div className="modal">
      <div className='cerrar-modal'>
        <img 
        src={CerrarBtn}
        alt='Cerrar modal'
        onClick={ocultandoModal}
        />

      </div>
        
        <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarmodal ? "animar": 'cerrar'}`}>
            <legend>{gastoEditar.nombre ?'Editar Gasto':'Nuevo Gasto'}</legend>

            {mensaje && <Mensajes tipo="error">{mensaje}</Mensajes>}

            <div className='campo'>
                <label htmlFor='nombre'>Nombre Del Gasto</label>

                <input
                    id='nombre'
                    type='text'
                    placeholder='Añade el nombre del gasto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />

            </div>

            <div className='campo'>
                <label htmlFor='cantidad'>Cantidad</label>

                <input
                    id='cantidad'
                    type='number'
                    placeholder='Añade la cantidad del gasto'
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                />

            </div>

            <div className='campo'>
                <label htmlFor='categoria'>Categoria</label>
                
                <select 
                id='categoria'
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>

                </select>

            </div>

            <input
                type='submit'
                value={gastoEditar.nombre ?'Guardar cambios':'Añadir Gasto'}
            />
        </form>


    </div>
  )
}

export default Modal
