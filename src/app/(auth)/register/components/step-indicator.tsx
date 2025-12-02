
import { cn } from '@/lib/utils';
import { User, Building, Lock, CheckCircle } from 'lucide-react';

const steps = [
  { name: 'Personal', icon: User },
  { name: 'Organisation', icon: Building },
  { name: 'Account', icon: Lock },
  { name: 'Verify', icon: CheckCircle },
];

export function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="border-b p-6">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center justify-center">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={cn('relative', stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '')}>
              {stepIdx < currentStep ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-primary" />
                  </div>
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                    <step.icon className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                  </div>
                  <span className="absolute -bottom-6 text-center w-full text-xs text-primary font-semibold">{step.name}</span>
                </>
              ) : stepIdx === currentStep ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-border" />
                  </div>
                  <div
                    className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-background"
                    aria-current="step"
                  >
                    <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                   <span className="absolute -bottom-6 text-center w-full text-xs text-primary font-semibold">{step.name}</span>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-border" />
                  </div>
                  <div className="group relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-border bg-background">
                    <step.icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </div>
                   <span className="absolute -bottom-6 text-center w-full text-xs text-muted-foreground">{step.name}</span>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
