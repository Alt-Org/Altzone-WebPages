import {
    useGetPrgPageQuery,
    useGetPrgDocumentsQuery,
    useGetPrgBoardMembersQuery,
} from './prgPageApi';
import { mapPrgPageData } from './mappers';
import { useMemo } from 'react';

/**
 * Custom hook to fetch and combine PRG page data, documents, and board members.
 *
 * @param lng - The language code ('fi' or 'en') for localization. Defaults to 'en'.
 * @returns An object containing the combined PRG page data, loading state, and any error that occurred during the fetch.
 */
export const useGetPrgPageData = (lng: 'fi' | 'en' = 'en') => {
    const {
        data: prgPageData,
        error: prgPageError,
        isLoading: prgPageIsLoading,
    } = useGetPrgPageQuery();
    const {
        data: prgDocumentsData,
        error: prgDocumentsError,
        isLoading: prgDocumentsIsLoading,
    } = useGetPrgDocumentsQuery();
    const {
        data: prgBoardMembersData,
        error: prgBoardMembersError,
        isLoading: prgBoardMembersIsLoading,
    } = useGetPrgBoardMembersQuery();

    const isLoading = prgPageIsLoading || prgDocumentsIsLoading || prgBoardMembersIsLoading;
    const error = prgPageError || prgDocumentsError || prgBoardMembersError;

    const fullPrgPageData = useMemo(() => {
        return mapPrgPageData(prgPageData, prgDocumentsData, prgBoardMembersData, lng);
    }, [prgPageData, prgDocumentsData, prgBoardMembersData, lng]);

    return { fullPrgPageData, isLoading, error };
};
