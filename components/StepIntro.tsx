'use client';

interface Props { onStart: () => void; }

export default function StepIntro({ onStart }: Props) {
  return (
    <div className="fade-up flex flex-col items-center text-center gap-8" style={{ paddingTop: 40 }}>
      {/* Badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '8px 16px', borderRadius: 100,
        background: 'rgba(0,242,234,0.08)', border: '1px solid rgba(0,242,234,0.2)',
        fontSize: 13, color: 'var(--accent)', fontWeight: 600
      }}>
        <span>⚡</span> Solo toma 5 minutos
      </div>

      {/* Headline */}
      <div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          Cuéntanos sobre<br />
          <span style={{ background: 'linear-gradient(135deg, #00F2EA, #7B61FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            tu negocio
          </span>
        </h1>
        <p style={{ marginTop: 16, fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 480, margin: '16px auto 0' }}>
          Responde estas preguntas y te construimos un agente de IA personalizado para WhatsApp — listo en menos de 5 días.
        </p>
      </div>

      {/* What we build */}
      <div className="glass-card" style={{ width: '100%', padding: '28px 32px', textAlign: 'left' }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 16, textTransform: 'uppercase' }}>
          Con tu información construimos
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            ['🤖', 'Agente con la personalidad exacta de tu negocio'],
            ['💬', 'Respuestas entrenadas con tus preguntas frecuentes reales'],
            ['📅', 'Flujo de calificación y escalación a humano configurado'],
            ['⚡', 'Activo en WhatsApp en menos de 5 días hábiles'],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="btn-primary" style={{ maxWidth: 360 }} onClick={onStart}>
        Empezar ahora
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>
        Tus datos son 100% confidenciales y nunca se comparten con terceros.
      </p>
    </div>
  );
}
