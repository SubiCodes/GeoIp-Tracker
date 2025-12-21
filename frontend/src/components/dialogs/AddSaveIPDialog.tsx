import React from 'react'
import { isIP } from 'is-ip';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from '../ui/button';


interface AddSaveIPDialogProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
}


const AddSaveIPDialog: React.FC<AddSaveIPDialogProps> = ({ open, onOpenChange }) => {
    const [ip, setIp] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [ipError, setIpError] = React.useState<string | null>(null);


    // Only allow valid IPv4/IPv6 characters on input
    const allowedIpPattern = /^[0-9a-fA-F:.]*$/;
    const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIp(e.target.value);
        setIpError(null);
    };
    const validateIp = (ip: string) => isIP(ip);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateIp(ip)) {
            setIpError("Please enter a valid IPv4 or IPv6 address.");
            return;
        }
        // Proceed with save logic here
    };
    const handleIpBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
        const inputEvent = e.nativeEvent as InputEvent;
        const nextValue = e.currentTarget.value + (inputEvent.data || "");
        if (!allowedIpPattern.test(nextValue)) {
            e.preventDefault();
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-foreground font-bold'>Save a new IP Address</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter the IP address you want to save to your list.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="ip-address">IP Address</Label>
                        <Input
                            id="ip-address"
                            name="ip-address"
                            type="text"
                            autoComplete="off"
                            placeholder="e.g. 8.8.8.8"
                            value={ip}
                            onChange={handleIpChange}
                            onBeforeInput={handleIpBeforeInput}
                        />
                        {ipError && <p className="text-xs text-red-500 mt-1">{ipError}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            name="description"
                            type="text"
                            autoComplete="off"
                            placeholder="Optional description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                </form>
                <AlertDialogFooter>
                    <div className='w-full flex flex-row items-end justify-end gap-2'>
                        <Button variant="outline" onClick={() => onOpenChange?.(false)}>Cancel</Button>
                        <Button onClick={handleSubmit} disabled={!validateIp(ip) || !ip.trim()}>Save IP</Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AddSaveIPDialog