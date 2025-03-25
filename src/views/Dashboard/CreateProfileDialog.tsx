import type React from 'react';
import { useState } from 'react';
import { Plus, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function CreateProfileDialog() {
  const [open, setOpen] = useState(false);
  const [profileName, setProfileName] = useState('');

  // Predefined main directory where profiles are stored
  const mainDirectory =
    'C:\\Users\\Username\\Documents\\Orbital Mod Manager\\Profiles';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile creation logic here
    console.log({
      profileName,
      fullPath: `${mainDirectory}\\${profileName}`,
    });
    setOpen(false);
    // Reset form
    setProfileName('');
  };

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground h-7 w-7 hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            Create a new profile to manage a separate set of mods
          </TooltipContent>
        </Tooltip>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Create New Mod Profile
              </DialogTitle>
              <DialogDescription>
                Configure a new profile for managing your game mods.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid gap-2">
                <Label htmlFor="profile-name">Profile Name</Label>
                <Input
                  id="profile-name"
                  placeholder="My Awesome Modlist"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  required
                />
                <p className="text-muted-foreground text-sm">
                  {profileName
                    ? `Profile will be created at: ${mainDirectory}\\${profileName}`
                    : `Profile will be created at: ${mainDirectory}\\[Profile Name]`}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="gap-2" disabled={!profileName}>
                <Save className="h-4 w-4" />
                Create Profile
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
