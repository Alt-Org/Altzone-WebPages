declare type MetaData = {
    dataKey: string;
    modelName: string;
    dataType: "Array";
    dataCount: number;
};

declare type PaginationData = {
    currentPage: number;
    limit: number;
    offset: number;
    itemCount: number;
    pageCount: number;
};

// type SingleData<T> = {
//     [key: string]: T
// }
//
// type ArrayData<T> = {
//     [key: string]: T[];
// }
//
// declare type ResponseShapeOne<T> = {
//     data: SingleData<T>
//     metaData: MetaData;
//     paginationData: PaginationData;
// };
//
// declare type ResponseShapeArray<T> = {
//     data: ArrayData<T>
//     metaData: MetaData;
//     paginationData: PaginationData;
// };
type SingleData<K extends string, T> = {
    [key in K]: T
}

type ArrayData<K extends string, T> = {
    [key in K]: T[];
}

declare type ResponseShapeOne<K extends string, T> = {
    data: SingleData<K, T>
    metaData: MetaData;
    paginationData: PaginationData;
};

declare type ResponseShapeArray<K extends string, T> = {
    data: ArrayData<K, T>
    metaData: MetaData;
    paginationData: PaginationData;
};
