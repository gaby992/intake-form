'use client';
import { FormData } from '@/app/page';

interface Props { data: FormData; update: (p: Partial<FormData>) => void; onNext: () => void; onBack: () => void; }

const TIMEZONES = ['America/Mexico_City', 'America/Cancun', 'America/Bogota', 'America/Lima', 'America/Santiago', 'America/New_York', 'America/Los_Angeles'];

export default function Step6Horarios({ data, update, onNext, onBack }: Props) {
  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Paso 6 de 8
        </p>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>Horarios</h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 8 }}>
          El agente responde 24/7, pero esto define cuándo está disponible el equipo humano.
        </p>
      </div>

      <div className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {[
            { label: 'Lun — Vie', key: 'horario_lv' as const, placeholder: '9am - 6pm' },
            { label: 'Sábado', key: 'horario_sab' as const, placeholder: '10am - 2pm / Cerrado' },
            { label: 'Domingo', key: 'horario_dom' as const, placeholder: 'Cerrado' },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {label}
              </label>
              <input className="form-input" placeholder={placeholder} value={data[key]} onChange={e => update({ [key]: e.target.value })} />
            </div>
          ))}
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Zona horaria
          </label>
          <select className="form-input" value={data.timezone} onChange={e => update({ timezone: e.target.value })}
            style={{ cursor: 'pointer' }}>
            {TIMEZONES.map(tz => (
              <option key={tz} value={tz} style={{ background: '#111' }}>{tz}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            ¿El agente responde fuera de horario?
          </label>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { val: true, label: 'Sí, responde 24/7 (aclara que humano responde en horario)' },
              { val: false, label: 'No, solo responde en horario de atención' },
            ].map(({ val, label }) => (
              <div key={String(val)} className={`option-card ${data.atiende_fuera_horario === val ? 'selected' : ''}`}
                style={{ flex: 1 }} onClick={() => update({ atiende_fuera_horario: val })}>
                <div className="option-dot">
                  {data.atiende_fuera_horario === val && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#000' }} />}
                </div>
                <span style={{ fontSize: 13 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
        <button className="btn-back" onClick={onBack}>← Atrás</button>
        <button className="btn-primary" onClick={onNext}>Siguiente →</button>
      </div>
    </div>
  );
}
