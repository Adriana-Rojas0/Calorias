import { useState } from 'react';
import type { BalanceEnergetico } from '../types';
import { createInitialBalance } from './initialBalance';

export default function UseBalanceEnergetico() {
    const [balance, setBalance] = useState<BalanceEnergetico>(createInitialBalance());
    const [balances, setBalances] = useState<BalanceEnergetico[]>([]);

    const addBalance = (balanc: BalanceEnergetico) => {
        console.log("Actividad agregada:", balanc);
        // Asignar un ID único al balance agregado
        setBalances([...balances, { ...balanc, id: Date.now() }]);
        // Reiniciar el formulario
        setBalance(createInitialBalance());
    };

    const caloriasConsumidas = balances
        .filter((a) => a.categoria.id === 1)
        .reduce((acc, a) => acc + a.caloria, 0);

    const caloriasQuemadas = balances
        .filter((a) => a.categoria.id === 2)
        .reduce((acc, a) => acc + a.caloria, 0);

    const caloriasNetas = caloriasConsumidas - caloriasQuemadas;

    const updateBalance = (updatedBalance: BalanceEnergetico) => {
        setBalances(balances.map(b => b.id === updatedBalance.id ? updatedBalance : b));
    };

    const deleteBalance = (id: number) => {
        setBalances(balances.filter(b => b.id !== id));
    };

    return {
        balance,
        setBalance,
        balances,
        setBalances,
        addBalance,
        caloriasConsumidas,
        caloriasQuemadas,
        caloriasNetas,
        updateBalance,
        deleteBalance
    };
}
