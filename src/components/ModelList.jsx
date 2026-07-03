export default function ModelList({ models }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Modelos Compatibles ({models.length})</h3>
      
      {models.length === 0 ? (
        <p style={styles.empty}>Ningún modelo cumple con las especificaciones seleccionadas.</p>
      ) : (
        <div style={styles.grid}>
          {models.map((m) => (
            <div key={m.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.modelName}>{m.Model}</span>
                <span style={styles.tag}>{m.LoadSensing ? 'LS' : 'Open Center'}</span>
              </div>
              <div style={styles.specs}>
                <div style={styles.specRow}>
                  <span>Flujo Máx:</span>
                  <strong>{m.GPM} GPM / {m.Liters} LPM</strong>
                </div>
                <div style={styles.specRow}>
                  <span>Presión Máx:</span>
                  <strong>{m.Bar} Bar / {Math.round(m.Bar * 14.5038)} PSI</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: { flex: 1, display: 'flex', flexDirection: 'column', gap: 16 },
  title: { fontSize: 14, letterSpacing: 1, textTransform: 'uppercase', color: '#333', margin: 0, fontWeight: 600 },
  empty: { fontSize: 13, color: '#999', fontStyle: 'italic', marginTop: 20 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 },
  card: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, padding: 20, transition: 'all 0.2s ease' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modelName: { fontSize: 16, fontWeight: 700, color: '#0f172a' },
  tag: { fontSize: 10, background: '#f1f5f9', color: '#475569', padding: '4px 8px', borderRadius: 4, fontWeight: 600, letterSpacing: 0.5 },
  specs: { display: 'flex', flexDirection: 'column', gap: 8 },
  specRow: { display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b' }
}