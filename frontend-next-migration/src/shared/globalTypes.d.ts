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

type SingleData<K extends string, T> = {
    [key in K]: T
}

type ArrayData<K extends string, T> = {
    [key in K]: T[];
}

declare type ResponseShapeOne<K extends string, T> = {
    data: SingleData<K, T>
    metaData: MetaData;
};

declare type ResponseShapeArray<K extends string, T> = {
    data: ArrayData<K, T>
    metaData: MetaData;
    paginationData: PaginationData;
};


declare interface DefaultAppRouterProps {
    params: { lng: string }
}

declare interface DefaultSeo {
    title: string,
    description: string
}
