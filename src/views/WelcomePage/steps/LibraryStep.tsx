import { Label } from '@/components/ui/label';
import { CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Folder, Library } from 'lucide-react';
import { NavigationButtons } from '@/components/welcome/NavigationButtons';
import { ErrorAlert } from '@/components/welcome/ErrorAlert';

type LibraryStepProps = {
  libraryPath: string;
  setLibraryPath: (value: string) => void;
  onLibrarySelect: () => void;
  onBack: () => void;
  onContinue: () => void;
  error?: string;
};

export const LibraryStep = ({
  libraryPath,
  setLibraryPath,
  onLibrarySelect,
  onBack,
  onContinue,
  error,
}: LibraryStepProps) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label className="text-base text-white">Profiles Library Location</Label>
      <CardDescription className="pb-1 text-sm text-slate-400">
        Choose where to store your mod profiles and mods
      </CardDescription>
      <div className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900/50 p-2">
        <Library className="h-4 w-4 shrink-0 text-blue-500" />
        <div className="text-sm text-white">
          Your profiles library will be default place to store your mod profiles
        </div>
      </div>
      <div className="grid gap-2 px-2 text-xs text-slate-400">
        <div className="flex items-start gap-1">
          <span className="select-none">•</span>
          <span>
            Each profile can have different mods, configurations and saves
          </span>
        </div>
        <div className="flex items-start gap-1">
          <span className="select-none">•</span>
          <span>
            Your mod profiles can consume significant disk space, so while
            choosing location, keep it in mind
          </span>
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <Input
          id="library-path"
          value={libraryPath}
          onChange={(e) => setLibraryPath(e.target.value)}
          placeholder="Select profiles library folder"
          className="h-9 border-slate-800 bg-slate-900 text-sm text-white"
          readOnly
        />
        <Button
          type="button"
          onClick={onLibrarySelect}
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
