import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setGastoEditar,eliminarGasto,filtro,gastoFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>
      


            {filtro ?(
              <>
              <h2>{gastoFiltrados.length ? 'Gasto' : 'No hay gastos.'}</h2>
                                    {
                        gastoFiltrados.map(gasto => (
                          <Gasto
                              key={gasto.id}
                              gasto={gasto}
                              setGastoEditar = {setGastoEditar}
                              eliminarGasto={eliminarGasto}
                          />
                        ))}
                        </>
            ):(
            <>
              <h2>{gastos.length ? 'Gasto' : 'No hay gastos.'}</h2>
                {gastos.map(gasto => (
                  <Gasto
                      key={gasto.id}
                      gasto={gasto}
                      setGastoEditar = {setGastoEditar}
                      eliminarGasto={eliminarGasto}
                  />
              ))}
            </>
            
            )}
        

    </div>
  )
}

export default ListadoGastos
