import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface IPHistoryDialogProps {
    triggerButton: React.ReactNode;
}

function IPHistoryDialog({ triggerButton }: IPHistoryDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger >{triggerButton}</AlertDialogTrigger>
            <AlertDialogContent className="max-w-2xl max-h-[80vh] lg:max-w-3xl 2xl:max-w-4xl flex flex-col p-0">
                <AlertDialogHeader className="px-6 pt-6 pb-4 border-b">
                    <AlertDialogTitle className="text-xl font-semibold">IP Addresses History</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default IPHistoryDialog
