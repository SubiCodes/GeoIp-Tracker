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
import {toast} from "sonner"

interface AddSaveIPDialogProps {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    ipId: string;
    setIpToNull: () => void;
}


function DeleteIPDialog({ open, onOpenChange, ipId, setIpToNull }: AddSaveIPDialogProps) {
    const deleteIPGeoData = useIPGeoStore((state) => state.deleteIPGeoData);

    const handleDelete = async () => {
        toast.loading("Deleting IP address...");
        const res = await deleteIPGeoData(ipId);
        toast.dismiss();

        if (res) {
            toast.success("IP address deleted successfully!");
        } else {
            toast.error("Failed to delete IP address. Please try again.");
        }

        onOpenChange?.(false);
        setIpToNull();
    };

    const cancelDeletion = () => {
        onOpenChange?.(false);
        setIpToNull();
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
                    <AlertDialogCancel onClick={cancelDeletion}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className='bg-red-500 text-white hover:bg-red-600'>Delete IP</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteIPDialog
