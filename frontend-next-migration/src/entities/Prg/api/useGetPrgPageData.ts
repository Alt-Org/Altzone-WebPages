import {
    useGetPrgPageQuery,
    useGetPrgDocumentsQuery,
    useGetPrgBoardMembersQuery,
} from './prgPageApi';
import { mapPrgPageData } from './mappers';
import { useMemo } from 'react';

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
        return mapPrgPageData(prgPageData?.[0], prgDocumentsData, prgBoardMembersData, lng);
    }, [prgPageData, prgDocumentsData, prgBoardMembersData, lng]);

    return { fullPrgPageData, isLoading, error };
};
