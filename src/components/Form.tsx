import { useState } from "react";
import { categories } from "../data/db";
import type { BalanceEnergeticoProps } from "../types";
import { createInitialBalance } from "../hooks/initialBalance";

export default function Form({ balance, addBalance, setBalance }: BalanceEnergeticoProps) {
    const [errors, setErrors] = useState<{ actividad?: string; caloria?: string }>({});
    const [touched, setTouched] = useState<{ actividad?: boolean; caloria?: boolean }>({});
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;

        if (id === "caloria") {
            let cleanValue = value.replace(/\D/g, "");
            if (cleanValue.length > 1) {
                cleanValue = cleanValue.replace(/^0+/, "");
            }
            if (value !== cleanValue) {
                e.target.value = cleanValue;
            }
            setBalance({ ...balance, [id]: cleanValue === "" ? 0 : Number(cleanValue) });
            setTouched({ ...touched, [id]: true });
            validateFields({ ...balance, [id]: cleanValue === "" ? 0 : Number(cleanValue) });
            return;
        } else if (id === "actividad") {
            let cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.,-]/g, "");
            setBalance({ ...balance, [id]: cleanValue });
            setTouched({ ...touched, [id]: true });
            validateFields({ ...balance, [id]: cleanValue });
            return;
        } else if (id === "categoria") {
            const selectedCategory = categories.find(cat => cat.id === +value);
            if (selectedCategory) {
                setBalance({ ...balance, categoria: selectedCategory });
            }
        } else {
            setBalance({ ...balance, [id]: value });
        }

        setTouched({ ...touched, [id]: true });
        validateFields({ ...balance, [id]: id === "caloria" ? Number(value) : value });
    };

    const validateFields = (data: typeof balance) => {
        const newErrors: { actividad?: string; caloria?: string } = {};

        if (data.actividad.trim() === "") {
            newErrors.actividad = "La actividad es obligatoria.";
        } else if (/\d/.test(data.actividad)) {
            newErrors.actividad = "La actividad no puede contener números.";
        } else if (/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.,-]/.test(data.actividad)) {
            newErrors.actividad = "La actividad no puede contener caracteres especiales.";
        }

        if (typeof data.caloria !== "number" || isNaN(data.caloria) || data.caloria <= 0) {
            newErrors.caloria = "Las calorías deben ser un número positivo.";
        }

        setErrors(newErrors);
        return newErrors;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { id } = e.target;
        setTouched({ ...touched, [id]: true });
        validateFields(balance);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitAttempted(true);
        const newErrors = validateFields(balance);
        if (Object.keys(newErrors).length > 0) return;

        addBalance(balance);

        // ✅ Reset seguro usando createInitialBalance
        setBalance(createInitialBalance());

        setTouched({});
        setSubmitAttempted(false);
    };

    const isValidActivity = () => {
        return balance.actividad.trim() !== '' && balance.caloria > 0;
    };

    return (
        <form className="max-w-4xl mx-auto bg-white p-10 shadow-lg rounded-lg" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="categoria" className="block text-gray-700 font-bold mb-2">Categoría</label>
                <select
                    id="categoria"
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    value={balance.categoria.id}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-5">
                <label htmlFor="actividad" className="block text-gray-700 font-bold mb-2">Actividad</label>
                <input
                    type="text"
                    id="actividad"
                    className={`w-full p-2 border ${(errors.actividad && (touched.actividad || submitAttempted)) ? 'border-red-500' : 'border-gray-300'} rounded`}
                    placeholder="Ej. Comida, Jugo de Naranja, Ejercicio, etc."
                    value={balance.actividad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.actividad && (touched.actividad || submitAttempted) && <p className="text-red-500 text-sm mt-1">{errors.actividad}</p>}
            </div>

            <div className="mb-5">
                <label htmlFor="caloria" className="block text-gray-700 font-bold mb-2">Calorías</label>
                <input
                    type="number"
                    id="caloria"
                    className={`w-full p-2 border ${(errors.caloria && (touched.caloria || submitAttempted)) ? 'border-red-500' : 'border-gray-300'} rounded`}
                    placeholder="Ej. 300, 500"
                    min={0}
                    value={balance.caloria}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.caloria && (touched.caloria || submitAttempted) && <p className="text-red-500 text-sm mt-1">{errors.caloria}</p>}
            </div>

            <input
                type="submit"
                className="bg-black text-white font-bold py-2 px-4 rounded w-full hover:bg-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                value="Agregar"
                disabled={!isValidActivity()}
            />
        </form>
    );
}