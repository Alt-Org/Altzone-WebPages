import dynamic from "next/dynamic";

export const AuthSubRegisterPageAsync = dynamic(()=> import('./AuthSubRegisterPage'));