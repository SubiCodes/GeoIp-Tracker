import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogAction
} from "@/components/ui/alert-dialog"
import { useIPGeoStore } from '@/store/ipgeoStore';
import { ToastContainer, toast } from "react-toastify";

interface AddSaveIPDialogProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    ipId?: string | null;
}


function DeleteIPDialog({ open, onOpenChange, ipId }: AddSaveIPDialogProps) {
    const deleteIPGeoData = useIPGeoStore((state) => state.deleteIPGeoData);

    const handleDelete = async () => {
        if (ipId) {
            await toast.promise(
                deleteIPGeoData(ipId),
                {
                    pending: 'Deleting IP...',
                    success: 'IP deleted 👌',
                    error: 'Failed to delete IP 🤯'
                }
            );
            onOpenChange?.(false);
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-red-500'>Do you want to delete this IP?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. Please confirm if you want to delete this IP address from your records.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className='bg-red-500 text-white hover:bg-red-600'>Delete IP</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            <ToastContainer />
        </AlertDialog>
    )
}

export default DeleteIPDialog
