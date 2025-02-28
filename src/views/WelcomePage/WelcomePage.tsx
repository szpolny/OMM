import { useState } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { Rocket } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getDataStore } from '@/utils/store';
import useInitializedStore from '@/stores/useInitializedStore';
import { commands } from '@/bindings';
import {
  getKspExecutablePath,
  getKspExecutableError,
} from '@/utils/platformUtils';
import { VersionStep } from './steps/VersionStep';
import { SteamApiStep } from './steps/SteamApiStep';
import { DirectoryStep } from './steps/DirectoryStep';
import { LibraryStep } from './steps/LibraryStep';
import { StepIndicator } from '@/components/welcome/StepIndicator';

type Step = 'version' | 'steam-api' | 'directory' | 'library';
type GameType = 'steam' | 'other';

const WelcomePage = () => {
  const [step, setStep] = useState<Step>('version');
  const [gameType, setGameType] = useState<GameType>('steam');
  const [useSteamApi, setUseSteamApi] = useState(true);
  const [gamePath, setGamePath] = useState('');
  const [libraryPath, setLibraryPath] = useState('');
  const [error, setError] = useState('');
  const { setInitialized } = useInitializedStore();

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
      setError('');
    }
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
      setError('');
    }
  };

  const goBack = () => {
    const prevSteps: Record<Step, Step | null> = {
      version: null,
      'steam-api': 'version',
      directory: gameType === 'steam' ? 'steam-api' : 'version',
      library: 'directory',
    };

    const prevStep = prevSteps[step];
    if (prevStep) {
      setStep(prevStep);
      setError('');
    }
  };

  const handleVersionContinue = () => {
    if (gameType === 'steam') {
      setStep('steam-api');
    } else {
      setStep('directory');
    }
  };

  const handleSteamApiContinue = () => {
    commands.determineSteamGameLocation().then((path) => {
      if (path) {
        setGamePath(path);
      }
      setStep('directory');
    });
  };

  const handleDirectoryContinue = async () => {
    if (!gamePath) {
      setError('Please select your game directory');
      return;
    }

    try {
      const kspExecutablePath = getKspExecutablePath(gamePath);
      const kspExecutableExists = await commands.exists(kspExecutablePath);

      if (!kspExecutableExists) {
        setError(getKspExecutableError());
        return;
      }

      setError('');
      setStep('library');
    } catch (error) {
      setError('Failed to check directory');
      commands.logMessage(error as string);
    }
  };

  const handleLibraryContinue = async () => {
    if (!libraryPath) {
      setError('Please select your profiles library folder');
      return;
    }

    try {
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
    } catch (error) {
      setError('Failed to save configuration');
      commands.logMessage(error as string);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'version':
        return (
          <VersionStep
            gameType={gameType}
            setGameType={setGameType}
            onContinue={handleVersionContinue}
          />
        );
      case 'steam-api':
        return (
          <SteamApiStep
            useSteamApi={useSteamApi}
            setUseSteamApi={setUseSteamApi}
            onBack={goBack}
            onContinue={handleSteamApiContinue}
          />
        );
      case 'directory':
        return (
          <DirectoryStep
            gameType={gameType}
            gamePath={gamePath}
            setGamePath={setGamePath}
            onDirectorySelect={handleDirectorySelect}
            onBack={goBack}
            onContinue={handleDirectoryContinue}
            error={error}
          />
        );
      case 'library':
        return (
          <LibraryStep
            libraryPath={libraryPath}
            setLibraryPath={setLibraryPath}
            onLibrarySelect={handleLibrarySelect}
            onBack={goBack}
            onContinue={handleLibraryContinue}
            error={error}
          />
        );
    }
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

          <StepIndicator step={step} gameType={gameType} />
        </CardHeader>
        <CardContent className="space-y-4">{renderStepContent()}</CardContent>
      </Card>
    </div>
  );
};

export default WelcomePage;
