'use client';

interface Props {
  progress: number;
  totalSteps: number;
  currentStep: number;
}

export default function ProgressBar({ progress, totalSteps, currentStep }: Props) {
  return (
    <div style={{ padding: '20px 0 4px' }}>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-center gap-2 mt-3">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`step-dot ${i + 1 === currentStep ? 'active' : i + 1 < currentStep ? 'done' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
