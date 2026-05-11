'use client';
import { FormData } from '@/app/page';

interface Props { data: FormData; update: (p: Partial<FormData>) => void; onNext: () => void; onBack: () => void; }

export default function Step5FAQ({ data, update, onNext, onBack }: Props) {
  const addFAQ = () => update({ faq: [...data.faq, { pregunta: '', respuesta: '' }] });
  const removeFAQ = (i: number) => data.faq.length > 3 && update({ faq: data.faq.filter((_, idx) => idx !== i) });
  const updateFAQ = (i: number, field: 'pregunta' | 'respuesta', val: string) => {
    const f = [...data.faq];
    f[i] = { ...f[i], [field]: val };
    update({ faq: f });
  };

  const filled = data.faq.filter(f => f.pregunta.trim() && f.respuesta.trim()).length;

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Paso 5 de 8
        </p>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>Preguntas frecuentes</h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 8 }}>
          Estas son las respuestas reales que usará el agente. <span style={{ color: 'var(--accent)' }}>Mínimo 3 completas.</span>
        </p>
      </div>

      {/* Progress indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
          <div style={{ height: '100%', width: `${Math.min((filled / 5) * 100, 100)}%`, background: 'var(--accent)', borderRadius: 2, transition: 'width 0.3s ease' }} />
        </div>
        <span style={{ fontSize: 12, color: filled >= 3 ? 'var(--accent)' : 'var(--text-muted)' }}>
          {filled} / 5 recomendadas
        </span>
      </div>

      <div className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {data.faq.map((faq, i) => (
          <div key={i} className="faq-pair">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.06em' }}>
                PREGUNTA {i + 1}
              </span>
              {data.faq.length > 3 && (
                <button onClick={() => removeFAQ(i)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>
                  ×
                </button>
              )}
            </div>
            <input className="form-input"
              placeholder={`ej. "¿Cuánto cuesta rentar un auto compacto?"`}
              value={faq.pregunta}
              onChange={e => updateFAQ(i, 'pregunta', e.target.value)} />
            <textarea className="form-input" rows={2}
              placeholder="Escribe aquí la respuesta exacta que daría el agente..."
              value={faq.respuesta}
              onChange={e => updateFAQ(i, 'respuesta', e.target.value)} />
          </div>
        ))}

        <button onClick={addFAQ}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', background: 'rgba(0,242,234,0.05)', border: '1px dashed rgba(0,242,234,0.3)', borderRadius: 12, cursor: 'pointer', color: 'var(--accent)', fontSize: 13, fontWeight: 600 }}>
          + Agregar pregunta frecuente
        </button>
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
        <button className="btn-back" onClick={onBack}>← Atrás</button>
        <button className="btn-primary" onClick={onNext} disabled={filled < 3}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}
