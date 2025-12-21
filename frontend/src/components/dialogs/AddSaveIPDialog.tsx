import React from 'react'
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


interface AddSaveIPDialogProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
}

const AddSaveIPDialog: React.FC<AddSaveIPDialogProps> = ({ open, onOpenChange }) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-foreground font-bold'>Save a new IP Address</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter the IP address you want to save to your list.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AddSaveIPDialog