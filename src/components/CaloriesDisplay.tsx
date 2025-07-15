
type caloriasProps= {
    caloriasConsumidas: number;
    caloriasQuemadas: number;
    caloriasNetas: number;   
}
    
    export default function CaloriesDisplay({caloriasConsumidas, caloriasQuemadas, caloriasNetas}: caloriasProps) {


        return (
    <>
        <h2 className="text-2xl text-center font-bold text-orange-400 mb-5">
        Resumen de Calorías
        </h2>

        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <div className="text-orange-400 text-center font-bold grid grid-cols-1 gap-3 mx-auto">
            <span className="text-white font-black text-6xl"> {caloriasConsumidas}</span>Consumidas
            <span className="text-white">---------------------------------------</span>
        </div>

        <div className="text-orange-400 text-center font-bold grid grid-cols-1 gap-3 mx-auto">
            <span className="text-white font-black text-6xl">{caloriasQuemadas} </span>Ejercicio
            <span className="text-white">---------------------------------------</span>
        </div>

        <div className="text-orange-400 text-center font-bold grid grid-cols-1 gap-3 mx-auto">
            <span className="text-white font-black text-6xl">{caloriasNetas} </span>Diferencia
            <span className="text-white">---------------------------------------</span>
        </div>
        </div>
    </>
    );
    }