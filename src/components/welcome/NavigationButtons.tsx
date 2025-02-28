import { Button } from '@/components/ui/button';
import { ArrowLeft, Rocket } from 'lucide-react';

type NavigationButtonsProps = {
  onBack: () => void;
  onContinue: () => void;
};

export const NavigationButtons = ({
  onBack,
  onContinue,
}: NavigationButtonsProps) => (
  <div className="flex gap-2">
    <Button
      onClick={onBack}
      className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
      size="sm"
    >
      <ArrowLeft className="mr-2 h-3.5 w-3.5" />
      Back
    </Button>
    <Button
      onClick={onContinue}
      className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
      size="sm"
    >
      Continue
      <Rocket className="ml-2 h-3.5 w-3.5" />
    </Button>
  </div>
);
