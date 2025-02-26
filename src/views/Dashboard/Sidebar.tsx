import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Rocket } from "lucide-react";

const Sidebar = () => {
    return (
        <div className="flex flex-col w-52 border-r">
            <div className="h-16 border-b flex items-center justify-center gap-2">
                <div>
                    <Rocket className="h-4 w-4 text-blue-500" />
                </div>
                <h1 className="text-base font-bold">Orbital Mod Manager</h1>
            </div>
            <div>
                <div className="w-full flex justify-between items-center h-10 px-2">
                    <h2 className="text-sm font-semibold text-muted-foreground ">PROFILES</h2>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-white">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Create new profile</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;