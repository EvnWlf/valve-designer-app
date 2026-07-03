import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useModels() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchValves() {
      try {
        setIsLoading(true)
        setError(null)
        //Consulta a la tabla 'valvesGenericSpecs' en Supabase para obtener todos los registros
        const { data: valves, error: supabaseError } = await supabase
          .from('valvesGenericSpecs')
          .select('*') 
        if (supabaseError) {
          throw supabaseError
        }

        setData(valves)
      } catch (err) {
        console.error('Error cargando datos de Supabase:', err)
        setError(err.message || 'Error desconocido al conectar con la base de datos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchValves()
  }, [])
  return { data, isLoading, error }
}