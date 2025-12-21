import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useIPHistoryStore } from "@/store/ipHistoryStore";
import AddedIPCard from "../cards/AddedIPCard";

interface IPHistoryDialogProps {
    triggerButton: React.ReactNode;
}

function IPHistoryDialog({ triggerButton }: IPHistoryDialogProps) {

    const ipHistory = useIPHistoryStore((state) => state.ipHistory);

    return (
        <AlertDialog>
            <AlertDialogTrigger >{triggerButton}</AlertDialogTrigger>
            <AlertDialogContent className="max-w-2xl max-h-[80vh] lg:max-w-3xl 2xl:max-w-4xl flex flex-col p-0">
                <AlertDialogHeader className="px-6 pt-6 pb-4 border-b">
                    <AlertDialogTitle className="text-xl font-semibold">IP Addresses History</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="flex-1 flex flex-col">
                    {/* HEADER */}
                    <div>

                    </div>
                    <div className="flex flex-col">
                        {ipHistory.length === 0 && (
                            <div className="p-6 text-center text-muted-foreground">
                                No IP history available. Displaying current your IP geolocation.
                            </div>
                        )}
                        {ipHistory.length > 0 && (
                            ipHistory.map((ipgeo) => (
                                <Label id={`label-${ipgeo._id}`} className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                    <Checkbox
                                        id={`toggle-${ipgeo._id}`}
                                        defaultChecked
                                        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    />
                                    <AddedIPCard key={ipgeo._id} data={ipgeo} />
                                </Label>
                            ))
                        )}
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default IPHistoryDialog
