'use client';
import { FormData } from '@/app/page';

interface Props { data: FormData; update: (p: Partial<FormData>) => void; onNext: () => void; onBack: () => void; }

const OBJETIVOS = [
  'Responder preguntas frecuentes',
  'Agendar citas / consultas',
  'Capturar leads (nombre, tel, email)',
  'Tomar pedidos',
  'Dar cotizaciones / precios',
  'Calificar prospectos',
  'Cobrar / enviar link de pago',
  'Soporte post-venta',
];

export default function Step4Objetivo({ data, update, onNext, onBack }: Props) {
  const toggle = (obj: string) => {
    const curr = data.objetivos;
    update({ objetivos: curr.includes(obj) ? curr.filter(o => o !== obj) : [...curr, obj] });
  };

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Paso 4 de 8
        </p>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>Objetivo del agente</h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 8 }}>
          ¿Para qué va a usar el agente? Selecciona todo lo que aplica.
        </p>
      </div>

      <div className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {OBJETIVOS.map(obj => {
            const sel = data.objetivos.includes(obj);
            return (
              <div key={obj} className={`option-card ${sel ? 'selected' : ''}`} onClick={() => toggle(obj)}>
                <div className="option-check">
                  {sel && <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>}
                </div>
                <span style={{ fontSize: 13 }}>{obj}</span>
              </div>
            );
          })}
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            ¿Cuál es la acción principal que buscamos? *
          </label>
          <input className="form-input"
            placeholder='ej. "Que el cliente reserve un auto" / "Que el cliente agende una consulta"'
            value={data.accion_deseada}
            onChange={e => update({ accion_deseada: e.target.value })} />
          <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 6 }}>
            Esta será la misión principal del agente en cada conversación.
          </p>
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
        <button className="btn-back" onClick={onBack}>← Atrás</button>
        <button className="btn-primary" onClick={onNext} disabled={!data.accion_deseada.trim() || data.objetivos.length === 0}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}
