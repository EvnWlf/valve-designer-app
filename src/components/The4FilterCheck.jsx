import { useState } from 'react'

export default function The4FilterCheck({
  currentStep,
  setCurrentStep,
  simultaneous,
  setSimultaneous,
  maxFlow,
  setMaxFlow,
  maxPressure,
  setMaxPressure,
  controlType,
  setControlType,
  showLoadSensingQuestion // Bandera lógica para saber si aplica la pregunta 4
}) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Configurador Secuencial</h3>
      <p style={styles.subtitle}>Responde las preguntas técnicas para definir el bloque de válvulas.</p>

      {/* FILTRO #1: SIMULTANEIDAD */}
      <div style={{ ...styles.card, opacity: currentStep >= 1 ? 1 : 0.4 }}>
        <div style={styles.header}>
          <span style={styles.badge}>01</span>
          <span style={styles.q}>¿Requiere accionamiento de funciones al mismo tiempo?</span>
        </div>
        {currentStep === 1 && (
          <div style={styles.body}>
            <div style={styles.btnGroup}>
              <button 
                style={{ ...styles.choiceBtn, borderColor: simultaneous === 'SI' ? '#ef7b1b' : '#e2e8f0', background: simultaneous === 'SI' ? '#fdf8f4' : '#fff' }}
                onClick={() => setSimultaneous('SI')}
              >
                Sí (Simultáneo)
              </button>
              <button 
                style={{ ...styles.choiceBtn, borderColor: simultaneous === 'NO' ? '#ef7b1b' : '#e2e8f0', background: simultaneous === 'NO' ? '#fdf8f4' : '#fff' }}
                onClick={() => setSimultaneous('NO')}
              >
                No (Funciones individuales)
              </button>
            </div>
            {simultaneous && (
              <button style={styles.nextBtn} onClick={() => setCurrentStep(2)}>Continuar →</button>
            )}
          </div>
        )}
        {currentStep > 1 && <p style={styles.summary}>Selección: <strong>{simultaneous}</strong></p>}
      </div>

      {/* FILTRO #2: CAUDAL (GPM) */}
      <div style={{ ...styles.card, opacity: currentStep >= 2 ? 1 : 0.4 }}>
        <div style={styles.header}>
          <span style={styles.badge}>02</span>
          <span style={styles.q}>¿Cuál es el flujo requerido en GPM?</span>
        </div>
        {currentStep === 2 && (
          <div style={styles.body}>
            <input 
              type="range" min="0" max="120" value={maxFlow} 
              onChange={(e) => setMaxFlow(Number(e.target.value))}
              style={styles.slider}
            />
            <div style={styles.valueDisplay}>
              <span style={styles.hugeValue}>{maxFlow}</span> <span style={styles.unit}>GPM</span>
            </div>
            <div style={styles.row}>
              <button style={styles.backBtn} onClick={() => setCurrentStep(1)}>← Atrás</button>
              {maxFlow > 0 && <button style={styles.nextBtn} onClick={() => setCurrentStep(3)}>Continuar →</button>}
            </div>
          </div>
        )}
        {currentStep > 2 && <p style={styles.summary}>Caudal: <strong>{maxFlow} GPM</strong></p>}
      </div>

      {/* FILTRO #3: PRESIÓN (BAR) */}
      <div style={{ ...styles.card, opacity: currentStep >= 3 ? 1 : 0.4 }}>
        <div style={styles.header}>
          <span style={styles.badge}>03</span>
          <span style={styles.q}>¿A qué presión máxima va a trabajar el sistema?</span>
        </div>
        {currentStep === 3 && (
          <div style={styles.body}>
            <input 
              type="range" min="0" max="400" step="10" value={maxPressure} 
              onChange={(e) => setMaxPressure(Number(e.target.value))}
              style={styles.slider}
            />
            <div style={styles.valueDisplay}>
              <span style={styles.hugeValue}>{maxPressure}</span> <span style={styles.unit}>Bar</span>
            </div>
            <div style={styles.row}>
              <button style={styles.backBtn} onClick={() => setCurrentStep(2)}>← Atrás</button>
              {maxPressure > 0 && (
                <button 
                  style={styles.nextBtn} 
                  onClick={() => {
                    if (showLoadSensingQuestion) {
                      setCurrentStep(4)
                    } else {
                      alert('¡Diseño completado con éxito!')
                    }
                  }}
                >
                  {showLoadSensingQuestion ? 'Continuar →' : 'Finalizar ✓'}
                </button>
              )}
            </div>
          </div>
        )}
        {currentStep > 3 && <p style={styles.summary}>Presión: <strong>{maxPressure} Bar</strong></p>}
      </div>

      {/* FILTRO #4: ACCIONAMIENTO MANUAL O ELÉCTRICO / LOAD SENSING (Especial ECO80) */}
      {showLoadSensingQuestion && (
        <div style={{ ...styles.card, opacity: currentStep >= 4 ? 1 : 0.4 }}>
          <div style={styles.header}>
            <span style={styles.badge}>04</span>
            <span style={styles.q}>¿Requiere Opción Load Sensing / Tipo Control?</span>
          </div>
          {currentStep === 4 && (
            <div style={styles.body}>
              <div style={styles.btnGroup}>
                <button 
                  style={{ ...styles.choiceBtn, borderColor: controlType === 'LS' ? '#ef7b1b' : '#e2e8f0', background: controlType === 'LS' ? '#fdf8f4' : '#fff' }}
                  onClick={() => setControlType('LS')}
                >
                  Load Sensing Proporcional
                </button>
                <button 
                  style={{ ...styles.choiceBtn, borderColor: controlType === 'MANUAL' ? '#ef7b1b' : '#e2e8f0', background: controlType === 'MANUAL' ? '#fdf8f4' : '#fff' }}
                  onClick={() => setControlType('MANUAL')}
                >
                  Manual / Centro Abierto Estándar
                </button>
              </div>
              <div style={styles.row}>
                <button style={styles.backBtn} onClick={() => setCurrentStep(3)}>← Atrás</button>
                {controlType && (
                  <button style={{ ...styles.nextBtn, background: '#27ae60' }} onClick={() => alert('¡Diseño de Válvula Completado!')}>
                    Finalizar ✓
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

const styles = {
  container: { width: '100%', display: 'flex', flexDirection: 'column', gap: 16 },
  title: { fontSize: 14, letterSpacing: 1, textTransform: 'uppercase', color: '#0f172a', margin: 0, fontWeight: 700 },
  subtitle: { fontSize: 11, color: '#64748b', margin: 0, marginBottom: 10 },
  card: { background: '#f8fafc', borderRadius: 6, border: '1px solid #e2e8f0', padding: 16, transition: 'all 0.3s ease' },
  header: { display: 'flex', alignItems: 'center', gap: 10 },
  badge: { fontSize: 10, fontWeight: 700, background: '#0f172a', color: '#fff', padding: '2px 6px', borderRadius: 4 },
  q: { fontSize: 12, fontWeight: 600, color: '#0f172a' },
  body: { display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 },
  btnGroup: { display: 'flex', gap: 10 },
  choiceBtn: { flex: 1, padding: '12px', border: '1px solid #e2e8f0', borderRadius: 4, cursor: 'pointer', fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600 },
  slider: { width: '100%', accentColor: '#ef7b1b', cursor: 'pointer' },
  valueDisplay: { marginTop: 4 },
  hugeValue: { fontSize: 24, fontWeight: 700, color: '#ef7b1b' },
  unit: { fontSize: 12, fontWeight: 600, color: '#0f172a' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  nextBtn: { fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, color: '#fff', background: '#ef7b1b', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' },
  backBtn: { fontSize: 11, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' },
  summary: { fontSize: 11, color: '#334155', margin: '6px 0 0 28px' }
}