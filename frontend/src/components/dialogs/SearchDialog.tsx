/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Search, Clock, X, Loader2, AlertCircle } from "lucide-react";
import { useSearchStore } from "@/store/searchStore";
import AddedIPCard from "../cards/AddedIPCard";

interface SearchDialogProps {
    triggerButton: React.ReactNode;
}

function SearchDialog({ triggerButton }: SearchDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [validationError, setValidationError] = useState("");

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

    // Fetch recent searches when modal opens
    useEffect(() => {
        if (isOpen && recentSearches.length === 0) {
            fetchRecentSearches();
        }
    }, [isOpen]);

    // Debounced suggestions fetch
    useEffect(() => {
        if (!query.trim()) {
            setValidationError("");
            return;
        }

        const timer = setTimeout(() => {
            fetchSuggestions(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query, fetchSuggestions]);

    const validateIP = (ip: string): boolean => {
        const trimmedIP = ip.trim();
        
        // IPv4 pattern: 0-255.0-255.0-255.0-255
        const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        
        // IPv6 pattern: supports full, compressed, and mixed notation
        const ipv6Pattern = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
        
        return ipv4Pattern.test(trimmedIP) || ipv6Pattern.test(trimmedIP);
    };

    const validatePartialIP = (ip: string): boolean => {
        const trimmedIP = ip.trim();
        
        // Allow partial IPv4 (e.g., "12", "12.34", "12.34.56")
        const partialIPv4Pattern = /^(\d{1,3})(\.(\d{1,3})?)?(\.(\d{1,3})?)?(\.(\d{1,3})?)?$/;
        
        // Allow partial IPv6 (e.g., "2001:", "2001:db8:")
        const partialIPv6Pattern = /^([0-9a-fA-F]{0,4}:){0,7}[0-9a-fA-F]{0,4}$/;
        
        if (partialIPv4Pattern.test(trimmedIP)) {
            // Validate each part doesn't exceed 255
            const parts = trimmedIP.split('.');
            return parts.every(part => {
                if (part === '') return true;
                const num = parseInt(part);
                return !isNaN(num) && num >= 0 && num <= 255;
            });
        }
        
        return partialIPv6Pattern.test(trimmedIP);
    };

    const handleSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setValidationError("Please enter an IP address");
            return;
        }

        if (!validateIP(searchQuery)) {
            setValidationError("Please enter a complete and valid IPv4 or IPv6 address");
            return;
        }

        setValidationError("");
        setHasSearched(true);
        const results = await search(searchQuery);
        if (results) {
            setSearchResults(results);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch(query);
        }
    };

    const handleSuggestionClick = (suggestion: any) => {
        const suggestionQuery = suggestion.ip || '';
        setQuery(suggestionQuery);
        handleSearch(suggestionQuery);
    };

    const handleRecentSearchClick = (recentQuery: string) => {
        setQuery(recentQuery);
        handleSearch(recentQuery);
    };

    const handleDeleteRecent = async (e: React.MouseEvent, recentQuery: string) => {
        e.stopPropagation();
        await deleteSearchHistoryItem(recentQuery);
    };

    const handleClearInput = () => {
        setQuery("");
        setHasSearched(false);
        setSearchResults([]);
        setValidationError("");
    };

    const resetDialog = () => {
        setQuery("");
        setHasSearched(false);
        setSearchResults([]);
        setValidationError("");
    };

    // Determine current view state
    const showRecentSearches = !query && !hasSearched && recentSearches.length > 0;
    const showSuggestions = query && !hasSearched && suggestions.length > 0;
    const showResults = hasSearched && searchResults.length > 0;
    const showNoResults = hasSearched && searchResults.length === 0 && !searching && !searchError;

    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetDialog();
        }}>
            <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
            <AlertDialogContent className="max-w-2xl max-h-[80vh] lg:max-w-3xl 2xl:max-w-4xl flex flex-col p-0">
                <AlertDialogHeader className="px-6 pt-6 pb-4 border-b">
                    <AlertDialogTitle className="text-xl font-semibold">Search IP Addresses</AlertDialogTitle>
                </AlertDialogHeader>

                {/* Search Input */}
                <div className="px-6 pt-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search by IP address (IPv4 or IPv6)..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={`pl-10 pr-10 h-12 ${validationError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            autoFocus
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={handleClearInput}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    {validationError && (
                        <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {validationError}
                        </p>
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Loading State */}
                    {(searching || fetchingRecentSearches || fetchingSuggestions) && (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        </div>
                    )}

                    {/* Error States */}
                    {(searchError || fetchingRecentSearchesError) && (
                        <div className="flex items-start gap-3 p-4 mt-4 bg-red-50 border border-red-200 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                            <div>
                                <h4 className="font-medium text-red-900">Error</h4>
                                <p className="text-sm text-red-700 mt-1">
                                    {searchError || fetchingRecentSearchesError}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Recent Searches */}
                    {showRecentSearches && !searching && !fetchingRecentSearches && (
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Recent Searches
                            </h3>
                            <div className="space-y-2">
                                {recentSearches.map((recentQuery, index) => (
                                    <div
                                        key={index}
                                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors group cursor-pointer"
                                        onClick={() => handleRecentSearchClick(recentQuery)}
                                    >
                                        <span className="text-gray-700">{recentQuery}</span>
                                        <button
                                            onClick={(e) => handleDeleteRecent(e, recentQuery)}
                                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
                                            aria-label="Delete search"
                                        >
                                            <X className="h-4 w-4 text-gray-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Suggestions */}
                    {showSuggestions && !fetchingSuggestions && (
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-500 mb-3">Suggestions</h3>
                            <div className="space-y-2">
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="w-full p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                                    >
                                        <div className="font-medium text-gray-900">
                                            {suggestion.ip}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Search Results */}
                    {showResults && !searching && (
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-500 mb-3">
                                Results ({searchResults.length})
                            </h3>
                            <div className="space-y-3">
                                {searchResults.map((result, index) => (
                                    <AddedIPCard key={index} data={result} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Results */}
                    {showNoResults && (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Search className="h-12 w-12 text-gray-300 mb-3" />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
                            <p className="text-gray-500">
                                Try searching with a different IP address or location
                            </p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!query && !hasSearched && recentSearches.length === 0 && !fetchingRecentSearches && !fetchingRecentSearchesError && (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Search className="h-12 w-12 text-gray-300 mb-3" />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">Start searching</h3>
                            <p className="text-gray-500">
                                Enter an IP address, domain, or location to begin
                            </p>
                        </div>
                    )}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default SearchDialog;