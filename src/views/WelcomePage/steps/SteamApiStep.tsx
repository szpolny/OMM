import { Label } from '@/components/ui/label';
import { CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, Activity, Info } from 'lucide-react';
import { NavigationButtons } from '@/components/welcome/NavigationButtons';

type SteamApiStepProps = {
  useSteamApi: boolean;
  setUseSteamApi: (value: boolean) => void;
  onBack: () => void;
  onContinue: () => void;
};

export const SteamApiStep = ({
  useSteamApi,
  setUseSteamApi,
  onBack,
  onContinue,
}: SteamApiStepProps) => (
  <div className="space-y-4">
    <div className="space-y-3">
      <Label className="text-base text-white">Steam API Integration</Label>
      <CardDescription className="text-sm text-slate-400">
        Would you like to enable Steam overlay features? This allows:
      </CardDescription>
      <div className="grid gap-2">
        <div className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900/50 p-2">
          <Clock className="h-4 w-4 text-blue-500" />
          <div className="text-sm text-white">Track your playtime in Steam</div>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900/50 p-2">
          <Activity className="h-4 w-4 text-blue-500" />
          <div className="text-sm text-white">
            Show your game activity to friends
          </div>
        </div>
      </div>
      <RadioGroup
        value={useSteamApi ? 'yes' : 'no'}
        onValueChange={(value) => setUseSteamApi(value === 'yes')}
        className="grid grid-cols-2 gap-3 pt-1"
      >
        <div>
          <RadioGroupItem value="yes" id="api-yes" className="peer sr-only" />
          <Label
            htmlFor="api-yes"
            className="flex cursor-pointer items-center justify-center rounded-md border-2 border-slate-800 bg-slate-900/50 p-2 peer-data-[state=checked]:border-blue-500 hover:border-blue-600 hover:bg-slate-900 [&:has([data-state=checked])]:border-blue-500"
          >
            <span className="text-sm text-white">
              Yes, enable Steam features
            </span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="no" id="api-no" className="peer sr-only" />
          <Label
            htmlFor="api-no"
            className="flex cursor-pointer items-center justify-center rounded-md border-2 border-slate-800 bg-slate-900/50 p-2 peer-data-[state=checked]:border-blue-500 hover:border-blue-600 hover:bg-slate-900 [&:has([data-state=checked])]:border-blue-500"
          >
            <span className="text-sm text-white">No, skip Steam features</span>
          </Label>
        </div>
      </RadioGroup>
      <CardDescription className="pt-1 text-xs text-blue-400">
        Recommended: Enable Steam features for the best experience
      </CardDescription>
      {useSteamApi && (
        <Alert className="flex items-center gap-2 border-yellow-800/60 bg-yellow-900/30 text-yellow-200">
          <div>
            <Info className="h-3.5 w-3.5 text-yellow-400" />
          </div>
          <AlertDescription className="text-xs text-yellow-100">
            Steam must be running and logged in to use these features
          </AlertDescription>
        </Alert>
      )}
    </div>

    <NavigationButtons onBack={onBack} onContinue={onContinue} />
  </div>
);
