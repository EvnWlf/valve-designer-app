import { useState } from 'react'
import { useModels } from './hooks/useModels'
import WelcomeScreen from './components/WelcomeScreen'
import ValveDesigner from './components/ValveDesigner'

function App() {
  const [screen, setScreen] = useState('welcome')
  const { data: models, isLoading, error } = useModels() // Componente de sincronización lógico

  return (
    <>
      {screen === 'welcome' && (
        <WelcomeScreen 
          onDesign={() => setScreen('designer')} 
          isLoading={isLoading}
          error={error}
          modelsCount={models.length}
        />
      )}

      {screen === 'designer' && (
        <ValveDesigner 
          models={models} 
          onBack={() => setScreen('welcome')} 
        />
      )}
    </>
  )
}

export default App