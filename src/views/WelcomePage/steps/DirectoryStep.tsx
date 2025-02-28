import { Label } from '@/components/ui/label';
import { CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Folder, Info } from 'lucide-react';
import { NavigationButtons } from '@/components/welcome/NavigationButtons';
import { ErrorAlert } from '@/components/welcome/ErrorAlert';

type GameType = 'steam' | 'other';

type DirectoryStepProps = {
  gameType: GameType;
  gamePath: string;
  setGamePath: (value: string) => void;
  onDirectorySelect: () => void;
  onBack: () => void;
  onContinue: () => void;
  error?: string;
};

export const DirectoryStep = ({
  gameType,
  gamePath,
  setGamePath,
  onDirectorySelect,
  onBack,
  onContinue,
  error,
}: DirectoryStepProps) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label className="text-base text-white">
        {gameType === 'steam'
          ? 'Steam Installation Directory'
          : 'Game Installation Directory'}
      </Label>
      <CardDescription className="pb-1 text-sm text-slate-400">
        {gameType === 'steam'
          ? 'Select your Steam KSP installation folder'
          : 'Select the folder where KSP is installed'}
      </CardDescription>
      <Alert className="mb-2 flex items-center gap-2 border-blue-800/60 bg-blue-900/30 py-1.5 text-blue-100">
        <div>
          <Info className="h-3.5 w-3.5 text-blue-400" />
        </div>
        <AlertDescription className="text-xs">
          Make sure your game is a clean installation without any mods installed
        </AlertDescription>
      </Alert>
      <div className="grid gap-2 px-2 text-xs text-slate-400">
        <div className="flex items-start gap-1">
          <span className="select-none">•</span>
          <span>
            If you have mods installed, please verify game files through Steam
            or reinstall the game
          </span>
        </div>
        <div className="flex items-start gap-1">
          <span className="select-none">•</span>
          <span>
            Orbital Mod Manager will handle all mod installations for you
          </span>
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <Input
          id="game-path"
          value={gamePath}
          onChange={(e) => setGamePath(e.target.value)}
          placeholder="Select your KSP installation folder"
          className="h-9 border-slate-800 bg-slate-900 text-sm text-white"
          readOnly
        />
        <Button
          type="button"
          onClick={onDirectorySelect}
          className="h-9 border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
          size="sm"
        >
          <Folder className="mr-2 h-3.5 w-3.5" />
          Browse
        </Button>
      </div>
    </div>

    {error && <ErrorAlert message={error} />}

    <NavigationButtons onBack={onBack} onContinue={onContinue} />
  </div>
);
