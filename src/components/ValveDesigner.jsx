import { useState, useEffect } from 'react'
import The4FilterCheck from './The4FilterCheck'
import ModelList from './ModelList'

export default function ValveDesigner({ models, onBack }) {
  const [currentStep, setCurrentStep] = useState(1)
  
  // Estados capturados por las preguntas
  const [simultaneous, setSimultaneous] = useState('')
  const [maxFlow, setMaxFlow] = useState(0)
  const [maxPressure, setMaxPressure] = useState(0)
  const [controlType, setControlType] = useState('')

  // =========================================================
  // LIMPIEZA DE FILTROS AL REGRESAR PASOS (RESET DE UX)
  // =========================================================
  useEffect(() => {
    // Si regresa al paso 1, limpiamos todo lo demás
    if (currentStep === 1) {
      setSimultaneous('')
      setMaxFlow(0)
      setMaxPressure(0)
      setControlType('')
    }
    // Si regresa al paso 2, limpiamos del paso 2 en adelante
    if (currentStep === 2) {
      setMaxFlow(0)
      setMaxPressure(0)
      setControlType('')
    }
    // Si regresa al paso 3, limpiamos presiones y controles posteriores
    if (currentStep === 3) {
      setMaxPressure(0)
      setControlType('')
    }
    // Si regresa al paso 4, limpiamos el tipo de control seleccionado
    if (currentStep === 4) {
      setControlType('')
    }
  }, [currentStep])

  // =========================================================
  // EJECUCIÓN EN CADENA SECUENCIAL CON LOGICA COMERCIAL
  // =========================================================

  // FILTRO 1: ¿Requiere accionamiento de funciones al mismo tiempo?
  // ENTRADA: models (11 modelos) -> SALIDA: listaFiltrada1
  const listaFiltrada1 = models.filter(m => {
    if (!simultaneous) return true
    if (simultaneous === 'SI') {
      return m.Simultaneous === true
    }
    // Si elige 'NO', pasan los convencionales y también la ECO80 (Simultaneous: FALSE)
    return m.Simultaneous === false
  })

  // FILTRO 2: ¿Cuál es el flujo requerido en GPM?
  // ENTRADA: listaFiltrada1 -> SALIDA: listaFiltrada2 (Optimizada)
  const listaFiltrada2 = (() => {
    if (!maxFlow) return listaFiltrada1

    // 1. Primero nos quedamos solo con los que soportan igual o más del caudal pedido
    const aptosPorGPM = listaFiltrada1.filter(m => m.GPM >= maxFlow)

    // 2. Los ordenamos de menor a mayor capacidad técnica para evaluar el tamaño óptimo
    const ordenados = [...aptosPorGPM].sort((a, b) => a.GPM - b.GPM)

    if (ordenados.length === 0) return []

    // 3. Tomamos el GPM del modelo más pequeño que cubre la necesidad
    const gpmMinimoOptimo = ordenados[0].GPM

    // 4. LÓGICA COMERCIAL CORRECTA: Evita el sobreajuste (over-engineering)
    // Si la válvula ideal es pequeña (ej. PVG16), no dejamos pasar a los monstruos (PVG128, PVG256)
    return ordenados.filter(m => m.GPM <= gpmMinimoOptimo * 2)
  })()

  // FILTRO 3: ¿A qué presión máxima va a trabajar el sistema?
  // ENTRADA: listaFiltrada2 -> SALIDA: listaFiltrada3
  const listaFiltrada3 = listaFiltrada2.filter(m => {
    if (!maxPressure) return true
    return m.Bar >= maxPressure
  })

  // FILTRO 4: Discriminación por opción Load Sensing (Pregunta 04)
  // ENTRADA: listaFiltrada3 -> SALIDA: listaFinalFiltrada
  const listaFinalFiltrada = listaFiltrada3.filter(m => {
    if (!controlType) return true
    
    // EXCEPCIÓN TÉCNICA: La ECO80 es compatible con circuitos LS y Manual/Centro Abierto indistintamente
    if (m.Model?.toUpperCase().includes('ECO80')) return true

    if (controlType === 'LS') {
      return m.LoadSense === true
    }
    // Si quiere Manual/Centro Abierto estándar
    return m.LoadSense === false
  })

  // =========================================================
  // REGLA DE NEGOCIO EN TIEMPO REAL PARA LA PREGUNTA 4
  // =========================================================
  // SÓLO se pregunta si el sistema NO es simultáneo Y además quedan opciones híbridas como la ECO80 (LoadSense: true)
  const requierePreguntaLoadSensing = simultaneous === 'NO' && listaFiltrada3.some(m => m.LoadSense === true)

  return (
    <div style={styles.designerLayout}>
      <header style={styles.header}>
        <div style={styles.brandArea}>
          <img src="https://raw.githubusercontent.com/EvnWlf/SUBWAYECO80/912f88f8e7e5a054cb6dd34d0d3bbdd83ea07997/src/assets/LionStoreLogo.svg" alt="Lion Store" style={styles.headerLogo} />
          <span style={styles.divider}>|</span>
          <h1 style={styles.headerTitle}>Valve Designer App</h1>
        </div>
        <button onClick={onBack} style={styles.backBtn}>← Volver al inicio</button>
      </header>

      <main style={styles.workspace}>
        <The4FilterCheck 
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          simultaneous={simultaneous}
          setSimultaneous={setSimultaneous}
          maxFlow={maxFlow}
          setMaxFlow={setMaxFlow}
          maxPressure={maxPressure}
          setMaxPressure={setMaxPressure}
          controlType={controlType}
          setControlType={setControlType}
          showLoadSensingQuestion={requierePreguntaLoadSensing}
        />
        
        <ModelList models={listaFinalFiltrada} />
      </main>
    </div>
  )
}

const styles = {
  designerLayout: { minHeight: '100vh', background: '#ffffff', display: 'flex', flexDirection: 'column', fontFamily: "'Montserrat', sans-serif" },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #e2e8f0', background: '#fff' },
  brandArea: { display: 'flex', alignItems: 'center', gap: 16 },
  headerLogo: { width: 100, height: 'auto' },
  divider: { color: '#cbd5e1', fontSize: 18, fontWeight: 300 },
  headerTitle: { fontSize: 14, fontWeight: 600, color: '#0f172a', margin: 0, letterSpacing: 0.5, textTransform: 'uppercase' },
  backBtn: { fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 500, color: '#64748b', background: 'none', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' },
  workspace: { flex: 1, display: 'grid', gridTemplateColumns: '62% 1fr', padding: '40px', gap: '40px', maxWidth: 1400, width: '100%', margin: '0 auto', boxSizing: 'border-box' }
}