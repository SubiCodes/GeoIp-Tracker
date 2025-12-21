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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LogOut } from "lucide-react"
import useUserAuthStore from '@/store/user-authStore'
import { useNavigate } from 'react-router-dom';

function LogoutDialog() {
    const navigate = useNavigate();
    const logoutUser = useUserAuthStore((state) => state.signoutUser);
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                        text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors mt-2 w-full"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-red-500'>Do you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will end your current session and you will need to log in again to access your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { logoutUser(navigate) }}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LogoutDialog