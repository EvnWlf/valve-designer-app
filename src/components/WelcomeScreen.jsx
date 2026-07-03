import { useEffect, useState } from 'react'

export default function WelcomeScreen({ onDesign, isLoading, error, modelsCount }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Retraso milimétrico para activar el fade-in de la pantalla al montar
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const progress = (!isLoading && !error) || error ? 100 : 0
  const canProceed = !isLoading && !error && modelsCount > 0

  return (
    <div style={styles.root}>
      <div style={{ 
        ...styles.content, 
        opacity: visible ? 1 : 0, 
        transform: visible ? 'none' : 'translateY(16px)', 
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' 
      }}>
        
        <img 
          src="https://raw.githubusercontent.com/EvnWlf/SUBWAYECO80/912f88f8e7e5a054cb6dd34d0d3bbdd83ea07997/src/assets/LionStoreLogo.svg" 
          alt="Lion Store Hydraulic Parts" 
          style={styles.logo} 
        />

        {!canProceed && (
          <div style={styles.loaderArea}>
            <p style={styles.label}>
              {error ? 'Error de conexión' : 'Sincronizando catálogo...'}
            </p>
            
            <div style={styles.track}>
              <div style={{ 
                ...styles.fill, 
                width: `${progress}%`,
                background: error ? '#e74c3c' : '#ef7b1b'
              }} />
            </div>

            {error && (
              <p style={styles.errorLabel}>{error}</p>
            )}
          </div>
        )}

        {canProceed && (
          <div style={styles.actionArea}>
            <p style={styles.successLabel}>
               Ready to Design
            </p>
            <button style={styles.btn} onClick={onDesign}>
              Ingresar al Diseñador
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

const styles = {
  root: {
    minHeight: '100vh',
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Montserrat', sans-serif",
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 32,
    width: '100%',
    maxWidth: 320,
    textAlign: 'center',
  },
  logo: { 
    width: 180,
    height: 'auto',
    marginBottom: 8
  },
  loaderArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 14,
    width: '100%'
  },
  actionArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  label: {
    fontSize: 10,
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    color: '#888888',
    fontWeight: 500,
    margin: 0,
  },
  errorLabel: {
    fontSize: 11,
    color: '#e74c3c',
    margin: 0,
    fontWeight: 500,
  },
  successLabel: {
    fontSize: 11,
    letterSpacing: '1px',
    color: '#27ae60',
    fontWeight: 500,
    textTransform: 'uppercase',
    margin: 0
  },
  track: {
    width: 180,
    height: 3,
    background: '#f5f5f5',
    borderRadius: 99,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 99,
    transition: 'width 0.5s cubic-bezier(.4,0,.2,1), background-color 0.3s ease',
  },
  btn: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    color: '#ffffff',
    background: '#ef7b1b',
    border: 'none',
    padding: '14px 36px',
    borderRadius: 4,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(239, 123, 27, 0.2)',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
}