import { Alert, AlertDescription } from '@/components/ui/alert';

type ErrorAlertProps = {
  message: string;
};

export const ErrorAlert = ({ message }: ErrorAlertProps) => (
  <Alert variant="destructive" className="border-red-800 bg-red-900/50 py-1.5">
    <AlertDescription className="text-xs">{message}</AlertDescription>
  </Alert>
);
