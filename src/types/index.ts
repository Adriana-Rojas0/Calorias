export type Categoria = {
    id:number,
    name:string,    
}

export type BalanceEnergetico = {
    id:number,
    categoria:Categoria,
    actividad:string,
    caloria: number,    
}

export type BalanceEnergeticoProps = {
    balance: BalanceEnergetico;
    addBalance:(balance: BalanceEnergetico)=> void;
    setBalance:(balance: BalanceEnergetico)=> void;
}

