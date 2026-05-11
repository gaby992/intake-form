'use client';
import { FormData } from '@/app/page';

interface Props { data: FormData; }

export default function StepSuccess({ data }: Props) {
  return (
    <div className="fade-up flex flex-col items-center text-center gap-8" style={{ paddingTop: 60 }}>
      <div className="success-ring">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M8 18l7 7 13-13" stroke="#00F2EA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div>
        <h2 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2 }}>
          ¡Recibido{data.nombre_dueno ? `, ${data.nombre_dueno.split(' ')[0]}` : ''}!
        </h2>
        <p style={{ fontSize: 17, color: 'var(--text-muted)', marginTop: 12, lineHeight: 1.6 }}>
          Ya tenemos todo lo que necesitamos para construir el agente de{' '}
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{data.nombre_negocio}</span>.
        </p>
      </div>

      <div className="glass-card" style={{ width: '100%', maxWidth: 480, padding: '28px 32px', textAlign: 'left' }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 16, textTransform: 'uppercase' }}>
          ¿Qué sigue?
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { step: '01', text: 'Nuestro equipo revisa tu información en las próximas horas', time: 'Hoy' },
            { step: '02', text: 'Te contactamos por WhatsApp para confirmar detalles', time: '< 24 hrs' },
            { step: '03', text: 'Construimos y probamos tu agente personalizado', time: '2-3 días' },
            { step: '04', text: 'Tu agente entra en producción en WhatsApp', time: '< 5 días' },
          ].map(({ step, text, time }) => (
            <div key={step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,242,234,0.1)', border: '1px solid rgba(0,242,234,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 800, color: 'var(--accent)' }}>
                {step}
              </div>
              <div>
                <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{text}</p>
                <p style={{ fontSize: 12, color: 'var(--accent)', marginTop: 2 }}>{time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {data.whatsapp_dueno && (
        <div style={{ background: 'rgba(0,242,234,0.06)', border: '1px solid rgba(0,242,234,0.2)', borderRadius: 14, padding: '16px 24px', maxWidth: 480, width: '100%' }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Te contactaremos al{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{data.whatsapp_dueno}</span>
          </p>
        </div>
      )}

      <a href="https://adolfoarroyo.com" 
        style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 2 }}>
        ← Volver a adolfoarroyo.com
      </a>
    </div>
  );
}
