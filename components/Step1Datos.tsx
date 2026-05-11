'use client';
import { FormData } from '@/app/page';

interface Props { data: FormData; update: (p: Partial<FormData>) => void; onNext: () => void; onBack?: () => void; }

const Label = ({ children }: { children: React.ReactNode }) => (
  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
    {children}
  </label>
);

const Field = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
);

export default function Step1Datos({ data, update, onNext }: Props) {
  const valid = data.nombre_negocio.trim() && data.nombre_dueno.trim() && data.whatsapp_dueno.trim();

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Paso 1 de 8
        </p>
        <h2 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.2 }}>Datos del negocio</h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 8 }}>
          Información básica para personalizar tu agente.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '28px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Field>
          <Label>Nombre del negocio *</Label>
          <input className="form-input" placeholder="ej. Dr. García Urología / Rent Cars Cancún" value={data.nombre_negocio}
            onChange={e => update({ nombre_negocio: e.target.value })} />
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field>
            <Label>Tipo de negocio</Label>
            <input className="form-input" placeholder="ej. Clínica, Restaurante, Rent a Car" value={data.tipo_negocio}
              onChange={e => update({ tipo_negocio: e.target.value })} />
          </Field>
          <Field>
            <Label>Ciudad / País</Label>
            <input className="form-input" placeholder="ej. Cancún, México" value={data.ciudad_pais}
              onChange={e => update({ ciudad_pais: e.target.value })} />
          </Field>
        </div>

        <Field>
          <Label>Tu nombre (dueño / contacto) *</Label>
          <input className="form-input" placeholder="Nombre completo" value={data.nombre_dueno}
            onChange={e => update({ nombre_dueno: e.target.value })} />
        </Field>

        <Field>
          <Label>WhatsApp (para escalaciones urgentes) *</Label>
          <input className="form-input" placeholder="+52 998 123 4567" value={data.whatsapp_dueno}
            onChange={e => update({ whatsapp_dueno: e.target.value })} />
        </Field>
      </div>

      <div style={{ marginTop: 20 }}>
        <button className="btn-primary" onClick={onNext} disabled={!valid}>
          Siguiente
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
