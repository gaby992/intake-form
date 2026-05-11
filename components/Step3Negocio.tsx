'use client';
import { FormData } from '@/app/page';

interface Props { data: FormData; update: (p: Partial<FormData>) => void; onNext: () => void; onBack: () => void; }

export default function Step3Negocio({ data, update, onNext, onBack }: Props) {
  const addServicio = () => update({ servicios: [...data.servicios, { servicio: '', precio: '' }] });
  const removeServicio = (i: number) => update({ servicios: data.servicios.filter((_, idx) => idx !== i) });
  const updateServicio = (i: number, field: 'servicio' | 'precio', val: string) => {
    const s = [...data.servicios];
    s[i] = { ...s[i], [field]: val };
    update({ servicios: s });
  };

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Paso 3 de 8
        </p>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>Tu negocio</h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 8 }}>
          Qué ofreces y a qué precio — la base del conocimiento del agente.
        </p>
      </div>

      <div className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Descripción del negocio (2-3 oraciones)
          </label>
          <textarea className="form-input" rows={3}
            placeholder="ej. Somos una renta de autos en Cancún con flota de 50 vehículos. Atendemos turistas y locales con servicio 24/7 y entrega en aeropuerto."
            value={data.descripcion_negocio}
            onChange={e => update({ descripcion_negocio: e.target.value })} />
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Servicios / Productos y precios
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {data.servicios.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input className="form-input" style={{ flex: 2 }}
                  placeholder={`Servicio ${i + 1} (ej. Auto Compacto)`}
                  value={s.servicio} onChange={e => updateServicio(i, 'servicio', e.target.value)} />
                <input className="form-input" style={{ flex: 1 }}
                  placeholder="Precio (ej. $500/día)"
                  value={s.precio} onChange={e => updateServicio(i, 'precio', e.target.value)} />
                {data.servicios.length > 1 && (
                  <button onClick={() => removeServicio(i)}
                    style={{ background: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.2)', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', color: '#ff6464', fontSize: 16, flexShrink: 0 }}>
                    ×
                  </button>
                )}
              </div>
            ))}
            <button onClick={addServicio}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: 'rgba(0,242,234,0.05)', border: '1px dashed rgba(0,242,234,0.3)', borderRadius: 10, cursor: 'pointer', color: 'var(--accent)', fontSize: 13, fontWeight: 600 }}>
              + Agregar servicio
            </button>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Promociones o paquetes especiales (opcional)
          </label>
          <textarea className="form-input" rows={2}
            placeholder="ej. Renta de 7 días = 6 días pagados. Descuento del 15% para reservas con más de 1 semana de anticipación."
            value={data.promociones}
            onChange={e => update({ promociones: e.target.value })} />
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
        <button className="btn-back" onClick={onBack}>← Atrás</button>
        <button className="btn-primary" onClick={onNext} disabled={!data.descripcion_negocio.trim()}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}
