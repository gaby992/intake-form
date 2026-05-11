'use client';
import { FormData } from '@/app/page';

interface Props { data: FormData; update: (p: Partial<FormData>) => void; onSubmit: () => void; onBack: () => void; submitting: boolean; }

export default function Step8Extra({ data, update, onSubmit, onBack, submitting }: Props) {
  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Paso 8 de 8 — ¡Último!
        </p>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>Links e instrucciones</h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 8 }}>
          Información adicional y cualquier instrucción especial para tu agente.
        </p>
      </div>

      <div className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Sitio web
            </label>
            <input className="form-input" placeholder="https://..." value={data.sitio_web} onChange={e => update({ sitio_web: e.target.value })} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Instagram
            </label>
            <input className="form-input" placeholder="@usuario" value={data.instagram} onChange={e => update({ instagram: e.target.value })} />
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Instrucciones especiales para el agente
          </label>
          <textarea className="form-input" rows={5}
            placeholder={`Cosas que el agente DEBE saber, restricciones, o cómo manejar situaciones específicas.\n\nEj: "Nunca des precios por WhatsApp, siempre invita a llamar" / "Los lunes están llenos, no ofrecer ese día" / "El agente debe siempre mencionar que tenemos seguro incluido"`}
            value={data.instrucciones_extra}
            onChange={e => update({ instrucciones_extra: e.target.value })} />
          <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 6 }}>
            Estas instrucciones van directo al cerebro del agente.
          </p>
        </div>

        {/* Summary preview */}
        <div style={{ background: 'rgba(0,242,234,0.04)', border: '1px solid rgba(0,242,234,0.15)', borderRadius: 14, padding: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: 14, textTransform: 'uppercase' }}>
            ✓ Resumen de tu configuración
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['Negocio', data.nombre_negocio],
              ['Agente', data.nombre_agente || 'Sin nombre aún'],
              ['Objetivo', data.accion_deseada],
              ['FAQ completadas', `${data.faq.filter(f => f.pregunta && f.respuesta).length} preguntas`],
              ['Alertas a', data.whatsapp_escalacion],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 12, fontSize: 13 }}>
                <span style={{ color: 'var(--text-dim)', minWidth: 120 }}>{k}</span>
                <span style={{ color: 'var(--text)', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
        <button className="btn-back" onClick={onBack} disabled={submitting}>← Atrás</button>
        <button className="btn-primary" onClick={onSubmit} disabled={submitting}>
          {submitting ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
              Enviando...
            </span>
          ) : (
            <>🚀 Enviar y crear mi agente</>
          )}
        </button>
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-dim)', marginTop: 12 }}>
        En menos de 24 horas te contactamos con los próximos pasos.
      </p>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
