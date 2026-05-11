'use client';
import { FormData } from '@/app/page';

interface Props { data: FormData; update: (p: Partial<FormData>) => void; onNext: () => void; onBack: () => void; }

const TRIGGERS = [
  'El cliente pide hablar con una persona',
  'Hay una queja o problema',
  'El agente no sabe responder algo',
  'Para cerrar ventas grandes',
  'Para confirmar disponibilidad',
];

const DATOS = ['Nombre completo', 'Número de teléfono', 'Email', 'Ciudad / Ubicación', 'Tipo de servicio de interés', 'Presupuesto aproximado', 'Fecha preferida'];

const CheckCard = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <div className={`option-card ${selected ? 'selected' : ''}`} onClick={onClick}>
    <div className="option-check">
      {selected && <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>}
    </div>
    <span style={{ fontSize: 13 }}>{label}</span>
  </div>
);

export default function Step7Escalacion({ data, update, onNext, onBack }: Props) {
  const toggleTrigger = (t: string) => {
    const curr = data.triggers_escalacion;
    update({ triggers_escalacion: curr.includes(t) ? curr.filter(x => x !== t) : [...curr, t] });
  };
  const toggleDato = (d: string) => {
    const curr = data.datos_capturar;
    update({ datos_capturar: curr.includes(d) ? curr.filter(x => x !== d) : [...curr, d] });
  };

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Paso 7 de 8
        </p>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>Escalación y datos</h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 8 }}>
          Cuándo el agente pasa el lead a un humano y qué datos debe recopilar.
        </p>
      </div>

      <div className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            ¿Cuándo escala a humano?
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {TRIGGERS.map(t => <CheckCard key={t} label={t} selected={data.triggers_escalacion.includes(t)} onClick={() => toggleTrigger(t)} />)}
          </div>
        </div>

        {/* PREGUNTA CRÍTICA: publicidad en el mismo número */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            ¿Desde el número de WhatsApp del negocio envían mensajes masivos o publicidad? *
          </label>
          <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12 }}>
            (ej. promos del día, ofertas, mensajes a grupos de clientes)
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { val: 'no', label: 'No, solo recibimos mensajes de clientes' },
              { val: 'si', label: 'Sí, enviamos promos o publicidad desde ese número' },
              { val: 'no_se', label: 'No estoy seguro / a veces' },
            ].map(({ val, label }) => (
              <div key={val} className={`option-card ${data.usa_whatsapp_publicidad === val ? 'selected' : ''}`}
                onClick={() => update({ usa_whatsapp_publicidad: val })}>
                <div className="option-dot">
                  {data.usa_whatsapp_publicidad === val && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#000' }} />}
                </div>
                <span style={{ fontSize: 14 }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Warning si usa publicidad */}
          {(data.usa_whatsapp_publicidad === 'si' || data.usa_whatsapp_publicidad === 'no_se') && (
            <div style={{ marginTop: 12, background: 'rgba(255,180,0,0.07)', border: '1px solid rgba(255,180,0,0.25)', borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12 }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#FFB400', marginBottom: 4 }}>
                  Importante: necesitaremos un número separado
                </p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  WhatsApp puede bloquear números que mezclan atención al cliente con envíos masivos. 
                  Te explicamos cómo separarlo sin perder tu número actual — nuestro equipo te guía en el proceso.
                </p>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              WhatsApp para alertas *
            </label>
            <input className="form-input" placeholder="+52 998 123 4567" value={data.whatsapp_escalacion}
              onChange={e => update({ whatsapp_escalacion: e.target.value })} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Link de agenda (Calendly, etc.)
            </label>
            <input className="form-input" placeholder="https://calendly.com/..." value={data.link_agenda}
              onChange={e => update({ link_agenda: e.target.value })} />
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Datos que debe capturar el agente
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {DATOS.map(d => <CheckCard key={d} label={d} selected={data.datos_capturar.includes(d)} onClick={() => toggleDato(d)} />)}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
        <button className="btn-back" onClick={onBack}>← Atrás</button>
        <button className="btn-primary" onClick={onNext} disabled={!data.whatsapp_escalacion.trim()}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}
