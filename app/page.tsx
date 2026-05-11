'use client';
import { useState } from 'react';
import StepIntro from '@/components/StepIntro';
import Step1Datos from '@/components/Step1Datos';
import Step2Agente from '@/components/Step2Agente';
import Step3Negocio from '@/components/Step3Negocio';
import Step4Objetivo from '@/components/Step4Objetivo';
import Step5FAQ from '@/components/Step5FAQ';
import Step6Horarios from '@/components/Step6Horarios';
import Step7Escalacion from '@/components/Step7Escalacion';
import Step8Extra from '@/components/Step8Extra';
import StepSuccess from '@/components/StepSuccess';
import ProgressBar from '@/components/ProgressBar';

export type FormData = {
  // 1
  nombre_negocio: string;
  tipo_negocio: string;
  ciudad_pais: string;
  nombre_dueno: string;
  whatsapp_dueno: string;
  // 2
  nombre_agente: string;
  genero_agente: string;
  tono: string;
  idioma: string;
  // 3
  descripcion_negocio: string;
  servicios: { servicio: string; precio: string }[];
  promociones: string;
  // 4
  objetivos: string[];
  accion_deseada: string;
  // 5
  faq: { pregunta: string; respuesta: string }[];
  // 6
  horario_lv: string;
  horario_sab: string;
  horario_dom: string;
  timezone: string;
  atiende_fuera_horario: boolean;
  // 7
  triggers_escalacion: string[];
  whatsapp_escalacion: string;
  telegram_escalacion: string;
  email_escalacion: string;
  datos_capturar: string[];
  usa_whatsapp_publicidad: string; // 'si' | 'no' | 'no_se'
  link_agenda: string;
  // 8
  sitio_web: string;
  instagram: string;
  instrucciones_extra: string;
};

const TOTAL_STEPS = 8;

const initialData: FormData = {
  nombre_negocio: '', tipo_negocio: '', ciudad_pais: '', nombre_dueno: '', whatsapp_dueno: '',
  nombre_agente: '', genero_agente: 'Femenino', tono: 'Amigable y casual', idioma: 'Español',
  descripcion_negocio: '', servicios: [{ servicio: '', precio: '' }], promociones: '',
  objetivos: [], accion_deseada: '',
  faq: [
    { pregunta: '', respuesta: '' },
    { pregunta: '', respuesta: '' },
    { pregunta: '', respuesta: '' },
  ],
  horario_lv: '9:00 AM - 6:00 PM', horario_sab: 'Cerrado', horario_dom: 'Cerrado',
  timezone: 'America/Mexico_City', atiende_fuera_horario: true,
  triggers_escalacion: ['El cliente pide hablar con una persona'],
  whatsapp_escalacion: '', telegram_escalacion: '', email_escalacion: '',
  datos_capturar: ['Nombre completo', 'Número de teléfono'],
  usa_whatsapp_publicidad: 'no_se',
  link_agenda: '',
  sitio_web: '', instagram: '', instrucciones_extra: '',
};

export default function Home() {
  const [step, setStep] = useState(0); // 0 = intro
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (patch: Partial<FormData>) => setData(d => ({ ...d, ...patch }));
  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS + 1));
  const back = () => setStep(s => Math.max(s - 1, 1));

  const submit = async () => {
    setSubmitting(true);
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
      setStep(TOTAL_STEPS + 1);
    } catch (e) {
      alert('Error al enviar. Por favor intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const progress = step === 0 ? 0 : Math.round((step / TOTAL_STEPS) * 100);

  if (submitted || step === TOTAL_STEPS + 1) {
    return <StepSuccess data={data} />;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--border)', padding: '16px 24px' }}
        className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-transparent.png" alt="Adolfo Arroyo" style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
            Configuración de Agente IA
          </span>
        </div>
        {step > 0 && step <= TOTAL_STEPS && (
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Paso <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{step}</span> de {TOTAL_STEPS}
          </span>
        )}
      </header>

      {/* Progress */}
      {step > 0 && step <= TOTAL_STEPS && (
        <div style={{ padding: '0 24px' }}>
          <ProgressBar progress={progress} totalSteps={TOTAL_STEPS} currentStep={step} />
        </div>
      )}

      {/* Content */}
      <main className="flex-1 flex items-start justify-center" style={{ padding: '32px 16px 64px' }}>
        <div style={{ width: '100%', maxWidth: 680 }}>
          {step === 0 && <StepIntro onStart={() => setStep(1)} />}
          {step === 1 && <Step1Datos data={data} update={update} onNext={next} />}
          {step === 2 && <Step2Agente data={data} update={update} onNext={next} onBack={back} />}
          {step === 3 && <Step3Negocio data={data} update={update} onNext={next} onBack={back} />}
          {step === 4 && <Step4Objetivo data={data} update={update} onNext={next} onBack={back} />}
          {step === 5 && <Step5FAQ data={data} update={update} onNext={next} onBack={back} />}
          {step === 6 && <Step6Horarios data={data} update={update} onNext={next} onBack={back} />}
          {step === 7 && <Step7Escalacion data={data} update={update} onNext={next} onBack={back} />}
          {step === 8 && <Step8Extra data={data} update={update} onSubmit={submit} onBack={back} submitting={submitting} />}
        </div>
      </main>
    </div>
  );
}
