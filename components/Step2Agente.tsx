'use client';
import { FormData } from '@/app/page';

interface Props { data: FormData; update: (p: Partial<FormData>) => void; onNext: () => void; onBack: () => void; }

const TONOS = ['Formal y profesional', 'Amigable y casual', 'Muy cálido y cercano', 'Directo y conciso'];
const IDIOMAS = ['Español', 'Inglés', 'Español e Inglés'];

const OptionCard = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <div className={`option-card ${selected ? 'selected' : ''}`} onClick={onClick}>
    <div className="option-dot">
      {selected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#000' }} />}
    </div>
    <span style={{ fontSize: 14 }}>{label}</span>
  </div>
);

export default function Step2Agente({ data, update, onNext, onBack }: Props) {
  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Paso 2 de 8
        </p>
        <h2 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.2 }}>El agente</h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 8 }}>
          Así va a presentarse tu agente con los clientes.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Nombre del agente
            </label>
            <input className="form-input" placeholder='ej. "Ana", "Max", "Valentina"' value={data.nombre_agente}
              onChange={e => update({ nombre_agente: e.target.value })} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Género
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              {['Femenino', 'Masculino'].map(g => (
                <OptionCard key={g} label={g} selected={data.genero_agente === g} onClick={() => update({ genero_agente: g })} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Tono de comunicación
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {TONOS.map(t => (
              <OptionCard key={t} label={t} selected={data.tono === t} onClick={() => update({ tono: t })} />
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Idioma principal
          </label>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {IDIOMAS.map(i => (
              <OptionCard key={i} label={i} selected={data.idioma === i} onClick={() => update({ idioma: i })} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
        <button className="btn-back" onClick={onBack}>← Atrás</button>
        <button className="btn-primary" onClick={onNext}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}
