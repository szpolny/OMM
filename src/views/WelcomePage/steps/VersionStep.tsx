import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { FaSteam } from 'react-icons/fa';
import { Folder, Rocket } from 'lucide-react';

type GameType = 'steam' | 'other';

type VersionStepProps = {
  gameType: GameType;
  setGameType: (value: GameType) => void;
  onContinue: () => void;
};

export const VersionStep = ({
  gameType,
  setGameType,
  onContinue,
}: VersionStepProps) => (
  <div className="space-y-4">
    <Label className="text-sm">Select your game version</Label>
    <RadioGroup
      value={gameType}
      onValueChange={(value: GameType) => setGameType(value)}
      className="grid grid-cols-2 gap-3"
    >
      <div>
        <RadioGroupItem value="steam" id="steam" className="peer sr-only" />
        <Label
          htmlFor="steam"
          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-slate-800 bg-slate-900/50 p-3 hover:border-blue-600 hover:bg-slate-900 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
        >
          <FaSteam className="mb-1 h-5 w-5 text-blue-500" />
          <span className="text-sm">Steam Version</span>
        </Label>
      </div>
      <div>
        <RadioGroupItem value="other" id="other" className="peer sr-only" />
        <Label
          htmlFor="other"
          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-slate-800 bg-slate-900/50 p-3 hover:border-blue-600 hover:bg-slate-900 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
        >
          <Folder className="mb-1 h-5 w-5 text-blue-500" />
          <span className="text-sm">Other Version</span>
        </Label>
      </div>
    </RadioGroup>

    <Button
      onClick={onContinue}
      className="w-full bg-blue-600 text-white hover:bg-blue-700"
      size="sm"
    >
      Continue
      <Rocket className="ml-2 h-3.5 w-3.5" />
    </Button>
  </div>
);
