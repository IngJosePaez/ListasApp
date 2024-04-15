import { useState } from "react"; // Aqui importe useState de React
export default function Todo({ item, onUpdate, onDelete }){ // Este es mi componente funcional Todo que recibe props "item" y "onUpdate"
    const [isEdit, setIsEdit] = useState(false); // Estado local para controlar si se está editando el Todo
    // Componente interno para el formulario de edición
    function FormEdit() {

        const [newValue, setNewValue] = useState(item.title); // Estado local para el nuevo valor del Todo
        function handleSubmit(e) {
            e.preventDefault();
        }

        // Función para manejar el cambio de valor en el input
        function handleChange(e) {
            const value = e.target.value;
            setNewValue(value);
        }

        // Función para manejar la actualización del Todo
        function handleClickUpdateTodo() { 
            onUpdate(item.id, newValue);   // Llama a la función onUpdate con el ID del Todo y el nuevo valor
            setIsEdit(false); // Cambia el estado de edición a falso para ocultar el formulario de edición
        }


        // Aqui renderizamos el formulario de edición
        return (
        <form className="todoUpdateForm" onSubmit={handleSubmit}>
            <input type="text" className="todoInput" onChange={handleChange} value={newValue}/>
            <button className="button" onClick={handleClickUpdateTodo}>
                Update
            </button>
        </form>
        );
    }

    // Componente interno para mostrar la información del Todo
    function TodoElement() {

        return <div className={'todoInfo ' + (item.completed ? 'completed' : '')}>
        {/* Muestra el título del Todo */}
        <span className="todoTitle">{item.title} </span>
        <button className="button" onClick={() => setIsEdit(true)}>Edit</button> {/* Botón para cambiar a modo de edición */}
        <button className="buttonDelete" onClick={() => onDelete(item.id)}>Delete</button>  {/* Botón para eliminar el Todo */}
    </div>   
    }
    // Renderizamos el componente Todo
    return (
        <div className="todo">
            {isEdit ? <FormEdit /> : <TodoElement />}  {/* Renderizamos el formulario de edición si isEdit es true, de lo contrario, renderiza la información del Todo */}
        </div>
    );
}