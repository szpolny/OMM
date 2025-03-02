import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Folder, Plus, Save } from 'lucide-react';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';

type CreateProfileDialogProps = {
  onCreateProfile?: (name: string, location: string) => void;
};

const CreateProfileDialog = ({ onCreateProfile }: CreateProfileDialogProps) => {
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileDirectory, setNewProfileDirectory] = useState('');

  const handleCreateProfile = () => {
    if (onCreateProfile && newProfileName && newProfileDirectory) {
      onCreateProfile(newProfileName, newProfileDirectory);
      setNewProfileName('');
      setNewProfileDirectory('');
    }
  };

  return (
    <TooltipProvider>
      <Dialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new profile</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid gap-2">
                <Label htmlFor="profile-name">Profile Name</Label>
                <Input
                  id="profile-name"
                  placeholder="My Awesome Modlist"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="directory">Profile Location</Label>
                <p className="text-sm text-muted-foreground">
                  A new directory will be created for your profile at the
                  location you select.
                </p>
                <div className="flex gap-2">
                  <Input
                    id="directory"
                    placeholder="Select directory..."
                    value={newProfileDirectory}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="shrink-0 gap-2"
                    onClick={() => {
                      // In a real app, this would open a directory picker
                      // For now, let's simulate with a dummy path
                      setNewProfileDirectory('C:/Users/Example/Documents');
                    }}
                  >
                    <Folder className="h-4 w-4" />
                    Browse
                  </Button>
                </div>
                {newProfileDirectory && (
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Selected directory: {newProfileDirectory}</p>
                    <p>Final profile path will be:</p>
                    <p className="rounded-md bg-muted p-2 font-mono">
                      {newProfileDirectory}\{newProfileName || '[Profile Name]'}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                className="gap-2"
                disabled={!newProfileDirectory || !newProfileName}
                onClick={handleCreateProfile}
              >
                <Save className="h-4 w-4" />
                Create Profile
              </Button>
            </DialogFooter>
          </DialogContent>
          <TooltipContent>
            <p>Create new profile</p>
          </TooltipContent>
        </Tooltip>
      </Dialog>
    </TooltipProvider>
  );
};

export default CreateProfileDialog;
