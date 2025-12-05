export function formatDateToDMY(date?: string | Date | null): string {
    if (!date) return '';
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    if (Number.isNaN(parsedDate.getTime())) return '';
    const day = parsedDate.getDate();
    const month = parsedDate.getMonth() + 1;
    const year = parsedDate.getFullYear();
    return `${day}.${month}.${year}`;
}
