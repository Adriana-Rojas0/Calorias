import type { BalanceEnergetico } from '../types';

export const createInitialBalance = (): BalanceEnergetico => ({
    id: 0, // ID temporal, lo asignaremos al guardar
    categoria: { id: 1, name: 'Comida' },
    actividad: '',
    caloria: 0
});