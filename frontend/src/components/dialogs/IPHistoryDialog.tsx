/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useIPHistoryStore } from "@/store/ipHistoryStore";
import AddedIPCard from "../cards/AddedIPCard";

interface IPHistoryDialogProps {
    triggerButton: React.ReactNode;
}

function IPHistoryDialog({ triggerButton }: IPHistoryDialogProps) {
    const ipHistory = useIPHistoryStore((state) => state.ipHistory);
    const deletingIPHistory = useIPHistoryStore((state) => state.deletingIPHistory);
    const deleteHistoryItem = useIPHistoryStore((state) => state.deleteHistoryItem);

    const [selectedIPs, setSelectedIPs] = useState<Set<string>>(new Set());
    const [isAllSelected, setIsAllSelected] = useState(false);


    // Reset selection when dialog opens
    useEffect(() => {
        setSelectedIPs(new Set());
        setIsAllSelected(false);
    }, [ipHistory]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = new Set(ipHistory.map(ip => ip._id).filter((id): id is string => id !== undefined));
            setSelectedIPs(allIds);
            setIsAllSelected(true);
        } else {
            setSelectedIPs(new Set());
            setIsAllSelected(false);
        }
    };

    const handleToggleIP = (id: string, checked: boolean) => {
        const newSelected = new Set(selectedIPs);
        if (checked) {
            newSelected.add(id);
        } else {
            newSelected.delete(id);
        }
        setSelectedIPs(newSelected);
        setIsAllSelected(newSelected.size === ipHistory.length);
    };

    const handleDeleteSelected = () => {
        deleteHistoryItem(Array.from(selectedIPs));
        setSelectedIPs(new Set());
        setIsAllSelected(false);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
            <AlertDialogContent className="max-w-2xl max-h-[80vh] lg:max-w-3xl 2xl:max-w-4xl flex flex-col p-0">
                <AlertDialogHeader className="px-6 pt-6 pb-4 border-b">
                    <AlertDialogTitle className="text-xl font-semibold">IP Address History</AlertDialogTitle>
                </AlertDialogHeader>
                
                {ipHistory.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center p-12">
                        <div className="text-center space-y-2">
                            <p className="text-muted-foreground">No IP history available.</p>
                            <p className="text-sm text-muted-foreground">Your saved IP addresses will appear here.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Selection Header */}
                        <div className="px-6 py-3 border-b bg-muted/30 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="select-all"
                                    checked={isAllSelected}
                                    onCheckedChange={handleSelectAll}
                                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                                />
                                <Label 
                                    htmlFor="select-all" 
                                    className="text-sm font-medium cursor-pointer select-none"
                                >
                                    Select All ({ipHistory.length})
                                </Label>
                            </div>
                            
                            {selectedIPs.size > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        {selectedIPs.size} selected
                                    </span>
                                    <Button 
                                        variant="destructive" 
                                        size="sm"
                                        onClick={handleDeleteSelected}
                                        className="h-8"
                                        disabled={deletingIPHistory}
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* IP List */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                            {ipHistory.map((ipgeo) => {
                                if (!ipgeo._id) return null;
                                
                                return (
                                    <Label 
                                        key={ipgeo._id}
                                        htmlFor={`toggle-${ipgeo._id}`}
                                        className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer transition-all hover:bg-accent/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                                    >
                                        <div className="flex items-center h-full pt-6">
                                            <Checkbox
                                                id={`toggle-${ipgeo._id}`}
                                                checked={selectedIPs.has(ipgeo._id)}
                                                onCheckedChange={(checked) => handleToggleIP(ipgeo._id!, checked as boolean)}
                                                className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <AddedIPCard data={ipgeo} />
                                        </div>
                                    </Label>
                                );
                            })}
                        </div>
                    </div>
                )}
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default IPHistoryDialog