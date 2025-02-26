import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaSteam } from "react-icons/fa";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Rocket, Folder, Clock, Activity, ArrowLeft, Info } from 'lucide-react';
import { useState } from "react";

type Step = "version" | "steam-api" | "directory";


const WelcomePage = () => {
    const [step, setStep] = useState<Step>("version")
    const [gameType, setGameType] = useState<"steam" | "other">("steam")
    const [useSteamApi, setUseSteamApi] = useState(true)
    const [gamePath, setGamePath] = useState("")
    const [error, setError] = useState("")

    const handleDirectorySelect = async () => {
        try {
            const mockPath =
                gameType === "steam"
                    ? "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Kerbal Space Program"
                    : "C:\\Games\\Kerbal Space Program"
            setGamePath(mockPath)
            setError("")
        } catch (err) {
            setError("Failed to select directory")
        }
    }

    const handleVersionContinue = () => {
        if (gameType === "steam") {
            setStep("steam-api")
        } else {
            setStep("directory")
        }
    }

    const handleSteamApiContinue = () => {
        setStep("directory")
    }

    const handleDirectoryContinue = async () => {
        if (!gamePath) {
            setError("Please select your game directory")
            return
        }
        // Here you would validate the game directory and proceed to the next step
    }

    const handleBack = () => {
        if (step === "steam-api") {
            setStep("version")
        } else if (step === "directory") {
            setStep(gameType === "steam" ? "steam-api" : "version")
        }
        setError("")
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
            <Card className="w-full max-w-xl bg-slate-950/50 border-slate-800">
                <CardHeader className="text-center space-y-3 pb-3">
                    <div className="flex justify-center">
                        <Rocket className="h-8 w-8 text-blue-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Welcome to Orbital Mod Manager</CardTitle>
                    <CardDescription className="text-base">
                        Let&apos;s set up your Kerbal Space Program installation
                    </CardDescription>

                    {/* Steps indicator */}
                    <div className="flex items-center justify-center gap-2 pt-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <div
                            className={cn(
                                "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                                step === "version" ? "bg-slate-600" : "bg-blue-500",
                            )}
                        />
                        {gameType === "steam" && (
                            <div
                                className={cn(
                                    "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                                    step === "version" || step === "steam-api" ? "bg-slate-600" : "bg-blue-500",
                                )}
                            />
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {step === "version" ? (
                        <div className="space-y-4">
                            <Label className="text-sm">Select your game version</Label>
                            <RadioGroup
                                defaultValue="steam"
                                value={gameType}
                                onValueChange={(value: "steam" | "other") => setGameType(value)}
                                className="grid grid-cols-2 gap-3"
                            >
                                <div>
                                    <RadioGroupItem value="steam" id="steam" className="peer sr-only" />
                                    <Label
                                        htmlFor="steam"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-slate-800 bg-slate-900/50 p-3 hover:bg-slate-900 hover:border-blue-600 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer"
                                    >
                                        <FaSteam className="mb-1 h-5 w-5 text-blue-500" />
                                        <span className="text-sm">Steam Version</span>
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="other" id="other" className="peer sr-only" />
                                    <Label
                                        htmlFor="other"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-slate-800 bg-slate-900/50 p-3 hover:bg-slate-900 hover:border-blue-600 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer"
                                    >
                                        <Folder className="mb-1 h-5 w-5 text-blue-500" />
                                        <span className="text-sm">Other Version</span>
                                    </Label>
                                </div>
                            </RadioGroup>

                            <Button
                                onClick={handleVersionContinue}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                size="sm"
                            >
                                Continue
                                <Rocket className="ml-2 h-3.5 w-3.5" />
                            </Button>
                        </div>
                    ) : step === "steam-api" ? (
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <Label className="text-white text-base">Steam API Integration</Label>
                                <CardDescription className="text-slate-400 text-sm">
                                    Would you like to enable Steam overlay features? This allows:
                                </CardDescription>
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-2 p-2 rounded-md bg-slate-900/50 border border-slate-800">
                                        <Clock className="h-4 w-4 text-blue-500" />
                                        <div className="text-white text-sm">Track your playtime in Steam</div>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 rounded-md bg-slate-900/50 border border-slate-800">
                                        <Activity className="h-4 w-4 text-blue-500" />
                                        <div className="text-white text-sm">Show your game activity to friends</div>
                                    </div>
                                </div>
                                <RadioGroup
                                    defaultValue="yes"
                                    value={useSteamApi ? "yes" : "no"}
                                    onValueChange={(value) => setUseSteamApi(value === "yes")}
                                    className="grid grid-cols-2 gap-3 pt-1"
                                >
                                    <div>
                                        <RadioGroupItem value="yes" id="api-yes" className="peer sr-only" />
                                        <Label
                                            htmlFor="api-yes"
                                            className="flex items-center justify-center rounded-md border-2 border-slate-800 bg-slate-900/50 p-2 hover:bg-slate-900 hover:border-blue-600 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer"
                                        >
                                            <span className="text-white text-sm">Yes, enable Steam features</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="no" id="api-no" className="peer sr-only" />
                                        <Label
                                            htmlFor="api-no"
                                            className="flex items-center justify-center rounded-md border-2 border-slate-800 bg-slate-900/50 p-2 hover:bg-slate-900 hover:border-blue-600 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer"
                                        >
                                            <span className="text-white text-sm">No, skip Steam features</span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                                <CardDescription className="text-blue-400 text-xs pt-1">
                                    Recommended: Enable Steam features for the best experience
                                </CardDescription>
                                {useSteamApi && (
                                    <Alert className="bg-yellow-900/30 border-yellow-800/60 text-yellow-200 flex items-center gap-2">
                                        <div><Info className="h-3.5 w-3.5 text-yellow-400" /></div>
                                        <AlertDescription className="text-xs text-yellow-100">
                                            Steam must be running and logged in to use these features
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    onClick={handleBack}
                                    className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
                                    size="sm"
                                >
                                    <ArrowLeft className="mr-2 h-3.5 w-3.5" />
                                    Back
                                </Button>
                                <Button
                                    onClick={handleSteamApiContinue}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
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
                                <Label className="text-white text-base">
                                    {gameType === "steam" ? "Steam Installation Directory" : "Game Installation Directory"}
                                </Label>
                                <CardDescription className="text-slate-400 text-sm pb-1">
                                    {gameType === "steam"
                                        ? "Select your Steam KSP installation folder"
                                        : "Select the folder where KSP is installed"}
                                </CardDescription>
                                <Alert className="bg-blue-900/30 border-blue-800/60 text-blue-100 py-1.5 mb-2 flex items-center gap-2">
                                    <div><Info className="h-3.5 w-3.5 text-blue-400" /></div>
                                    <AlertDescription className="text-xs">
                                        Make sure your game is a clean installation without any mods installed
                                    </AlertDescription>
                                </Alert>
                                <div className="grid gap-2 text-xs text-slate-400 px-2">
                                    <div className="flex items-start gap-1">
                                        <span className="select-none">•</span>
                                        <span>
                                            If you have mods installed, please verify game files through Steam or reinstall the game
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-1">
                                        <span className="select-none">•</span>
                                        <span>Orbital Mod Manager will handle all mod installations for you</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-1">
                                    <Input
                                        id="game-path"
                                        value={gamePath}
                                        onChange={(e) => setGamePath(e.target.value)}
                                        placeholder="Select your KSP installation folder"
                                        className="bg-slate-900 border-slate-800 text-white text-sm h-9"
                                        readOnly
                                    />
                                    <Button
                                        type="button"
                                        onClick={handleDirectorySelect}
                                        className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700 h-9"
                                        size="sm"
                                    >
                                        <Folder className="mr-2 h-3.5 w-3.5" />
                                        Browse
                                    </Button>
                                </div>
                            </div>

                            {error && (
                                <Alert variant="destructive" className="bg-red-900/50 border-red-800 py-1.5">
                                    <AlertDescription className="text-xs">{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="flex gap-2">
                                <Button
                                    onClick={handleBack}
                                    className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
                                    size="sm"
                                >
                                    <ArrowLeft className="mr-2 h-3.5 w-3.5" />
                                    Back
                                </Button>
                                <Button
                                    onClick={handleDirectoryContinue}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
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
    )
};

export default WelcomePage;