import { open } from '@tauri-apps/plugin-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaSteam } from 'react-icons/fa';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import {
  Rocket,
  Folder,
  Clock,
  Activity,
  ArrowLeft,
  Info,
  Library,
} from 'lucide-react';
import { useState } from 'react';
import { exists } from '@tauri-apps/plugin-fs';
import { platform } from '@tauri-apps/plugin-os';
import { getDataStore } from '@/utils/store';
import useInitializedStore from '@/stores/useInitializedStore';
import { commands } from '@/bindings';

const currentPlatform = platform();

type Step = 'version' | 'steam-api' | 'directory' | 'library';

const WelcomePage = () => {
  const [step, setStep] = useState<Step>('version');
  const [gameType, setGameType] = useState<'steam' | 'other'>('steam');
  const [useSteamApi, setUseSteamApi] = useState(true);
  const [gamePath, setGamePath] = useState('');
  const [error, setError] = useState('');
  const { setInitialized } = useInitializedStore();
  const [libraryPath, setLibraryPath] = useState('');

  const handleDirectorySelect = async () => {
    const file = await open({
      directory: true,
      multiple: false,
      canCreateDirectories: false,
      title: 'Select your Kerbal Space Program installation folder',
      defaultPath: gamePath,
    });

    if (file) {
      setGamePath(file);
    }

    setError('');
  };

  const handleLibrarySelect = async () => {
    const file = await open({
      directory: true,
      multiple: false,
      canCreateDirectories: true,
      title: 'Select your profiles library folder',
      defaultPath: libraryPath,
    });

    if (file) {
      setLibraryPath(file);
    }

    setError('');
  };

  const handleVersionContinue = () => {
    if (gameType === 'steam') {
      setStep('steam-api');
    } else {
      setStep('directory');
    }
  };

  const handleSteamApiContinue = () => {
    commands.determineSteamGameLocation().then((gamePath) => {
      if (gamePath) {
        setGamePath(gamePath);
      }

      setStep('directory');
    });
  };

  const handleDirectoryContinue = async () => {
    if (!gamePath) {
      setError('Please select your game directory');
      return;
    }

    // Check if there is KSP_x64.exe in the selected directory (windows)
    if (currentPlatform === 'windows') {
      const kspExecutable = await exists(`${gamePath}\\KSP_x64.exe`);
      if (!kspExecutable) {
        setError('KSP_x64.exe not found in the selected directory');
        return;
      }
    }

    // Check if there is KSP.app in the selected directory (macos)
    if (currentPlatform === 'macos') {
      const kspExecutable = await exists(`${gamePath}/KSP.app`);
      if (!kspExecutable) {
        setError('KSP.app not found in the selected directory');
        return;
      }
    }

    // Check if there is KSP.x86_64 in the selected directory (linux)
    if (currentPlatform === 'linux') {
      const kspExecutable = await exists(`${gamePath}/KSP.x86_64`);
      if (!kspExecutable) {
        setError('KSP.x86_64 not found in the selected directory');
        return;
      }
    }

    setError('');

    setStep('library');
  };

  const handleLibraryContinue = async () => {
    if (!libraryPath) {
      setError('Please select your profiles library folder');
      return;
    }

    setError('');

    // Save all data to the store
    const store = await getDataStore();
    await store.set('gameType', gameType);
    if (gameType === 'steam') {
      await store.set('useSteamApi', useSteamApi);
    }
    await store.set('gamePath', gamePath);
    await store.set('initialized', true);
    await store.set('defaultLibraryPath', libraryPath);

    await store.save();

    setInitialized(true);
  };

  const handleBack = () => {
    if (step === 'steam-api') {
      setStep('version');
    } else if (step === 'directory') {
      setStep(gameType === 'steam' ? 'steam-api' : 'version');
    } else if (step === 'library') {
      setStep('directory');
    }

    setError('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-xl border-slate-800 bg-slate-950/50">
        <CardHeader className="space-y-3 pb-3 text-center">
          <div className="flex justify-center">
            <Rocket className="h-8 w-8 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Welcome to Orbital Mod Manager
          </CardTitle>
          <CardDescription className="text-base">
            Let&apos;s set up your Kerbal Space Program installation
          </CardDescription>

          {/* Steps indicator */}
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
                step === 'version' ||
                  step === 'steam-api' ||
                  step === 'directory'
                  ? 'bg-slate-600'
                  : 'bg-blue-500',
              )}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'version' ? (
            <div className="space-y-4">
              <Label className="text-sm">Select your game version</Label>
              <RadioGroup
                defaultValue="steam"
                value={gameType}
                onValueChange={(value: 'steam' | 'other') => {
                  setGameType(value);
                }}
                className="grid grid-cols-2 gap-3"
              >
                <div>
                  <RadioGroupItem
                    value="steam"
                    id="steam"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="steam"
                    className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-slate-800 bg-slate-900/50 p-3 hover:border-blue-600 hover:bg-slate-900 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                  >
                    <FaSteam className="mb-1 h-5 w-5 text-blue-500" />
                    <span className="text-sm">Steam Version</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="other"
                    id="other"
                    className="peer sr-only"
                  />
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
                onClick={handleVersionContinue}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                size="sm"
              >
                Continue
                <Rocket className="ml-2 h-3.5 w-3.5" />
              </Button>
            </div>
          ) : step === 'steam-api' ? (
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-base text-white">
                  Steam API Integration
                </Label>
                <CardDescription className="text-sm text-slate-400">
                  Would you like to enable Steam overlay features? This allows:
                </CardDescription>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900/50 p-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <div className="text-sm text-white">
                      Track your playtime in Steam
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900/50 p-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <div className="text-sm text-white">
                      Show your game activity to friends
                    </div>
                  </div>
                </div>
                <RadioGroup
                  defaultValue="yes"
                  value={useSteamApi ? 'yes' : 'no'}
                  onValueChange={(value) => {
                    setUseSteamApi(value === 'yes');
                  }}
                  className="grid grid-cols-2 gap-3 pt-1"
                >
                  <div>
                    <RadioGroupItem
                      value="yes"
                      id="api-yes"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="api-yes"
                      className="flex cursor-pointer items-center justify-center rounded-md border-2 border-slate-800 bg-slate-900/50 p-2 hover:border-blue-600 hover:bg-slate-900 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                    >
                      <span className="text-sm text-white">
                        Yes, enable Steam features
                      </span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="no"
                      id="api-no"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="api-no"
                      className="flex cursor-pointer items-center justify-center rounded-md border-2 border-slate-800 bg-slate-900/50 p-2 hover:border-blue-600 hover:bg-slate-900 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                    >
                      <span className="text-sm text-white">
                        No, skip Steam features
                      </span>
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

              <div className="flex gap-2">
                <Button
                  onClick={handleBack}
                  className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                  size="sm"
                >
                  <ArrowLeft className="mr-2 h-3.5 w-3.5" />
                  Back
                </Button>
                <Button
                  onClick={handleSteamApiContinue}
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                  size="sm"
                >
                  Continue
                  <Rocket className="ml-2 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ) : step === 'directory' ? (
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
                    Make sure your game is a clean installation without any mods
                    installed
                  </AlertDescription>
                </Alert>
                <div className="grid gap-2 px-2 text-xs text-slate-400">
                  <div className="flex items-start gap-1">
                    <span className="select-none">•</span>
                    <span>
                      If you have mods installed, please verify game files
                      through Steam or reinstall the game
                    </span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="select-none">•</span>
                    <span>
                      Orbital Mod Manager will handle all mod installations for
                      you
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Input
                    id="game-path"
                    value={gamePath}
                    onChange={(e) => {
                      setGamePath(e.target.value);
                    }}
                    placeholder="Select your KSP installation folder"
                    className="h-9 border-slate-800 bg-slate-900 text-sm text-white"
                    readOnly
                  />
                  <Button
                    type="button"
                    onClick={() => handleDirectorySelect()}
                    className="h-9 border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                    size="sm"
                  >
                    <Folder className="mr-2 h-3.5 w-3.5" />
                    Browse
                  </Button>
                </div>
              </div>

              {error && (
                <Alert
                  variant="destructive"
                  className="border-red-800 bg-red-900/50 py-1.5"
                >
                  <AlertDescription className="text-xs">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleBack}
                  className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                  size="sm"
                >
                  <ArrowLeft className="mr-2 h-3.5 w-3.5" />
                  Back
                </Button>
                <Button
                  onClick={handleDirectoryContinue}
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                  size="sm"
                >
                  Continue
                  <Rocket className="ml-2 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-base text-white">
                  Profiles Library Location
                </Label>
                <CardDescription className="pb-1 text-sm text-slate-400">
                  Choose where to store your mod profiles and mods
                </CardDescription>
                <div className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900/50 p-2">
                  <Library className="h-4 w-4 shrink-0 text-blue-500" />
                  <div className="text-sm text-white">
                    Your profiles library will be default place to store your
                    mod profiles
                  </div>
                </div>
                <div className="grid gap-2 px-2 text-xs text-slate-400">
                  <div className="flex items-start gap-1">
                    <span className="select-none">•</span>
                    <span>
                      Each profile can have different mods, configurations and
                      saves
                    </span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="select-none">•</span>
                    <span>
                      Your mod profiles can consume significant disk space, so
                      while choosing location, keep it in mind
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Input
                    id="library-path"
                    value={libraryPath}
                    onChange={(e) => {
                      setLibraryPath(e.target.value);
                    }}
                    placeholder="Select profiles library folder"
                    className="h-9 border-slate-800 bg-slate-900 text-sm text-white"
                    readOnly
                  />
                  <Button
                    type="button"
                    onClick={handleLibrarySelect}
                    className="h-9 border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                    size="sm"
                  >
                    <Folder className="mr-2 h-3.5 w-3.5" />
                    Browse
                  </Button>
                </div>
              </div>

              {error && (
                <Alert
                  variant="destructive"
                  className="border-red-800 bg-red-900/50 py-1.5"
                >
                  <AlertDescription className="text-xs">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleBack}
                  className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                  size="sm"
                >
                  <ArrowLeft className="mr-2 h-3.5 w-3.5" />
                  Back
                </Button>
                <Button
                  onClick={handleLibraryContinue}
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                  size="sm"
                >
                  Continue
                  <Rocket className="ml-2 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomePage;
