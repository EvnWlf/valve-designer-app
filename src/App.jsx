import { useState, useEffect } from 'react'
import { useModels } from './hooks/useModels'

function App() {
  // Estado para controlar la pantalla actual (bienvenida -> diseñador)
  const [screen, setScreen] = useState('welcome')
  
  // Disparar la consulta a Supabase en paralelo inmediatamente al montar la app
  const { data: models, isLoading, error } = useModels()

  // Monitorear en la consola del navegador que los datos lleguen correctamente desde Supabase
  useEffect(() => {
    if (!isLoading && models.length > 0) {
      console.log('Conexión Correcta, Modelos detectados en Supabase:', models)
    }
  }, [models, isLoading])

  return (
    <div className="App">
      {screen === 'welcome' && (
        <div className="welcome-screen">

        </div>
      )}
    </div>
  )
}

export default App