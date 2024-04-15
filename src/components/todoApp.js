import { useState } from "react"; // Importamos la funcion useState
import Todo from "./todo";

import "./todoApp.css"; //Importamos todoApp.css para aplicar los estilos
export default function TodoApp() {  // Componente Padre del Proyecto
    
    const[title, setTitle] = useState("Hola"); //Valor inicial string vacio para useState
    const[todos, setTodos] = useState([]) // Inicializamos con un arreglo vacio ya que sera un arreglo de toDos(tareas)

    function handleChange(event) {
        const value = event.target.value; //Accedemos a la propiedad de value

        setTitle(value); // Mandamos llamar a nuestra variable para ir actualizando el valor actual
    }

    function handleSubmit(e) {
        e.preventDefault(); // Anulamos en esta linea el comportamiento de envio del formulario
       
        const newTodo = { // Objeto tarea
            id: crypto.randomUUID(), //generamos un id aleatorio
            title: title,
            completed : false,
        };

        const temp = [...todos]; // Creamos una copia superficial de la matriz
        temp.unshift(newTodo); // Agregamos un nuevo elemento al principio de la matriz, en este caso agregamos el valor de newTodo

        setTodos(temp); // Esta función se utiliza para actualizar el estado de todos con el nuevo valor de temp, que ahora contiene la lista original de tareas más la nueva tarea agregada al principio.
        
        setTitle(""); // Llamamos esta funcion para poder eliminar el texto del input al presionar el boton CrearTodo
    }

    function handleUpdate(id, value) {
        const temp = [...todos]; // Creamos una copia del array "todos" usando el operador spread (...) para no modificar el original
        // Buscamos el elemento en el array "temp" cuyo ID coincida con el ID proporcionado
        const item = temp.find((item) => item.id === id); // Buscamos el elemento en donde el elemento sea item.id igual al id de la funcion
        item.title = value; // Actualizamos el titulo del elemento encontrado, si la encuentra item.tittle sera igual a value
        setTodos(temp);  // Actualizamos el estado "todos" con la nueva versión del array que contiene el elemento modificado
    }

    function handleDelete(id) {
        const temp = todos.filter(item => item.id !== id);

        setTodos(temp);

    }

    return (
        // Este es nuestro Contenedor principal de la aplicación de lista de tareas
        
    <div className="todoContainer"> 
        <h1>Lista de Tareas</h1>
        <form className="todoCreateForm" onSubmit={handleSubmit}>    {/* Formulario para crear una nueva tarea */}
            <input onChange={handleChange} className="todoInput" value={title}/> {/* Entrada de texto para ingresar el título de la tarea */}
           {/* Botón para enviar el formulario y crear la tarea */}
            <input  
            onClick={handleSubmit}
            type="submit" 
            value="Create todo" 
            className="buttonCreate" 
            />
    {/* Muestra el título actual, nada mas para ver si va cambiando los estados en tiempo real, luego debo borrarlo */}
        </form>
        
        <div className="todosContainer"> {/* Contenedor para mostrar todas las tareas */}
        {/* Mapeo de todas las tareas para mostrarlas */}
            {todos.map( item => ( // Iteramos en nuestro arreglo de tareas
                <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />  // Componente "Todo" que representa una tarea individual
            ))} 
        </div>
    </div>
    );
}