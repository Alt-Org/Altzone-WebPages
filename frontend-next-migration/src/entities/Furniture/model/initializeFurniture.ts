import { FurnitureSet, SetInfo } from '../types/furniture';
import { neuroSet, taakkaSet, rakkausSet, muistojaSet } from './data/sets';

export const initializeFurnitureSets = (): Record<FurnitureSet, SetInfo> => ({
    [FurnitureSet.NEURO]: neuroSet,
    [FurnitureSet.TAAKKA]: taakkaSet,
    [FurnitureSet.RAKKAUS]: rakkausSet,
    [FurnitureSet.MUISTOJA]: muistojaSet,
});
