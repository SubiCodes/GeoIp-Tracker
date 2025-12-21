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
import { useSearchStore } from "@/store/searchStore";


interface SearchDialogProps {
    triggerButton: React.ReactNode;
}

function SearchDialog({ triggerButton }: SearchDialogProps) {
    const recentSearches = useSearchStore((state) => state.recentSearches);
    const fetchingRecentSearches = useSearchStore((state) => state.fetchingRecentSearches);
    const fetchingRecentSearchesError = useSearchStore((state) => state.fetchingRecentSearchesError);
    const fetchRecentSearches = useSearchStore((state) => state.fetchRecentSearches);
    const searching = useSearchStore((state) => state.searching);
    const searchError = useSearchStore((state) => state.searchError);
    const search = useSearchStore((state) => state.search);
    const suggestions = useSearchStore((state) => state.suggestions);
    const fetchingSuggestions = useSearchStore((state) => state.fetchingSuggestions);
    const fetchSuggestions = useSearchStore((state) => state.fetchSuggestions);
    const deleteSearchHistoryItem = useSearchStore((state) => state.deleteSearchHistoryItem);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SearchDialog
