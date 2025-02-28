import { cn } from '@/lib/utils';

type Step = 'version' | 'steam-api' | 'directory' | 'library';
type GameType = 'steam' | 'other';

type StepIndicatorProps = {
  step: Step;
  gameType: GameType;
};

export const StepIndicator = ({ step, gameType }: StepIndicatorProps) => (
  <div className="flex items-center justify-center gap-2 pt-2">
    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
    <div
      className={cn(
        'h-1.5 w-1.5 rounded-full transition-colors duration-300',
        step === 'version' ? 'bg-slate-600' : 'bg-blue-500',
      )}
    />
    {gameType === 'steam' && (
      <div
        className={cn(
          'h-1.5 w-1.5 rounded-full transition-colors duration-300',
          step === 'version' || step === 'steam-api'
            ? 'bg-slate-600'
            : 'bg-blue-500',
        )}
      />
    )}
    <div
      className={cn(
        'h-1.5 w-1.5 rounded-full transition-colors duration-300',
        step === 'version' || step === 'steam-api' || step === 'directory'
          ? 'bg-slate-600'
          : 'bg-blue-500',
      )}
    />
  </div>
);
