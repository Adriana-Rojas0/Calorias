import type { BalanceEnergetico } from "../types";
import { useState } from "react";
import Modal from "./Modal";

type Props = {
    balances: BalanceEnergetico[];
    onUpdate: (updatedBalance: BalanceEnergetico) => void;
    onDelete: (id: number) => void;
};

export default function ActivityList({ balances, onUpdate, onDelete }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [currentBalance, setCurrentBalance] = useState<BalanceEnergetico | null>(null);
    const [editedActivity, setEditedActivity] = useState("");
    const [editedCalories, setEditedCalories] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [activityError, setActivityError] = useState("");
    const [caloriesError, setCaloriesError] = useState("");
    // Mostrar errores solo después de intentar guardar
    const [triedSave, setTriedSave] = useState(false);

    // Reiniciar errores y campos al abrir el modal de edición
    const handleEdit = (balance: BalanceEnergetico) => {
        setCurrentBalance(balance);
        setEditedActivity(balance.actividad);
        setEditedCalories(balance.caloria ? String(balance.caloria) : "");
        setIsEditing(true);
        setActivityError("");
        setCaloriesError("");
    };

    // Limpiar errores y triedSave al cerrar modal
    const handleCloseEditModal = () => {
        setIsEditing(false);
        setActivityError("");
        setCaloriesError("");
        setTriedSave(false);
    };

    const handleDelete = (id: number) => {
        setDeleteId(id);
        setIsConfirming(true);
    };

    // Limpiar error de actividad al escribir y evitar números en tiempo real
    const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Solo permitir letras, espacios, tildes, puntos, comas y guiones
        let value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.,-]/g, "");
        setEditedActivity(value);
        if (activityError && value.trim()) {
            setActivityError("");
        }
    };

    // Limpiar error de calorías al escribir y evitar ceros a la izquierda en tiempo real
    const handleCaloriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        // Permitir solo dígitos
        value = value.replace(/\D/g, "");
        // Eliminar todos los ceros a la izquierda, excepto si el valor es exactamente '0'
        if (value.length > 1) {
            value = value.replace(/^0+/, "");
        }
        // Si el valor es vacío, dejarlo vacío (no mostrar 0)
        setEditedCalories(value);
        // Forzar el valor limpio en el input (para casos de pegado o tipeo rápido)
        if (e.target.value !== value) {
            e.target.value = value;
        }
        if (caloriesError && value !== "" && Number(value) > 0) {
            setCaloriesError("");
        }
    };

    const handleSave = () => {
        setTriedSave(true);
        let valid = true;
        let localActivityError = "";
        let localCaloriesError = "";
        if (!editedActivity.trim()) {
            localActivityError = "La actividad es obligatoria";
            valid = false;
        }
        if (
            editedCalories === undefined ||
            editedCalories === null ||
            editedCalories === "" ||
            Number(editedCalories) === 0 ||
            isNaN(Number(editedCalories)) ||
            Number(editedCalories) <= 0
        ) {
            localCaloriesError = "Las calorías deben ser un número positivo";
            valid = false;
        }
        setActivityError(localActivityError);
        setCaloriesError(localCaloriesError);
        if (!valid) return;
        if (currentBalance) {
            onUpdate({
                ...currentBalance,
                actividad: editedActivity,
                caloria: Number(editedCalories)
            });
            setIsEditing(false);
            setTriedSave(false);
        }
    };
        return (
    <>
        <h2 className="text-4xl text-center font-bold text-orange-400 mb-5">Comida y Actividades</h2>
        <div>
            {balances.map((balance:BalanceEnergetico)=> (
                <div className="flex justify-between items-center mb-4 border-b pb-2" key={balance.id}>
                <div>
                    <span className={`text-white ${balance.categoria.id === 1 ? 'bg-green-400' : 'bg-orange-400'} text-sm px-4 py-1 rounded`}>{balance.categoria.name.toUpperCase()}</span>
                        <div className="ml-2">
                        <p className="font-semibold justify-items-center py-1">{balance.actividad}</p>
                        <p className="text-green-400 font-black text-4xl">{balance.caloria} Calorías</p>                        
                        </div>
                </div>
                <div className="flex space-x-2">
                    <button className="text-blue-600 hover:bg-orange-200 hover:text-blue-700 p-2 rounded-full transition-all transform hover:scale-110 hover:shadow-lg" onClick={() => handleEdit(balance)}>✏️</button>
                    <button className="text-blue-600 hover:bg-orange-200 hover:text-blue-700 p-2 rounded-full transition-all transform hover:scale-110 hover:shadow-lg" onClick={() => handleDelete(balance.id)}>❌</button>
                </div>             
            </div>            
            ))}
        </div>      
        {/* Modal de Edición */}
        <Modal isOpen={isEditing} title="Editar Actividad" onClose={handleCloseEditModal}>
            <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-600">Actividad:</label>
                <input
                    type="text"
                    className={`w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 ${triedSave && activityError ? 'border-red-500' : ''}`}
                    value={editedActivity}
                    onChange={handleActivityChange}
                />
                {triedSave && activityError && <p className="text-red-500 text-sm mt-1">{activityError}</p>}
            </div>
            <div className="mb-6">
                <label className="block mb-1 font-medium text-gray-600">Calorías:</label>
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="^[1-9][0-9]*$|^0$"
                    className={`w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 ${triedSave && caloriesError ? 'border-red-500' : ''}`}
                    value={editedCalories}
                    onChange={handleCaloriesChange}
                />
                {triedSave && caloriesError && <p className="text-red-500 text-sm mt-1">{caloriesError}</p>}
            </div>
            <div className="flex justify-end space-x-3">
                <button
                    className="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition-colors"
                    onClick={handleSave}
                >
                    Guardar
                </button>
                <button
                    className="bg-gray-400 text-white px-5 py-2 rounded-full hover:bg-gray-500 transition-colors"
                    onClick={() => setIsEditing(false)}
                >
                    Cancelar
                </button>
            </div>
        </Modal>
        {/* Modal de Confirmación */}
        <Modal isOpen={isConfirming} title="Confirmar Eliminación" onClose={() => {
            setIsConfirming(false);
            setDeleteId(null);
        }}>
            <p className="text-center mb-6 text-gray-600">¿Estás seguro de que deseas eliminar esta actividad?</p>
            <div className="flex justify-end space-x-3">
                <button
                    className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition-colors"
                    onClick={() => {
                        if (deleteId !== null) {
                            onDelete(deleteId);
                        }
                        setIsConfirming(false);
                        setDeleteId(null);
                    }}
                >
                    Eliminar
                </button>
                <button
                    className="bg-gray-400 text-white px-5 py-2 rounded-full hover:bg-gray-500 transition-colors"
                    onClick={() => {
                        setIsConfirming(false);
                        setDeleteId(null);
                    }}
                >
                    Cancelar
                </button>
            </div>
        </Modal>
    </>
    );
}