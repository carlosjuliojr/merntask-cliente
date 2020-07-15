import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = (params) => {
	//Extraer si un proyecto esta actiuvo
	const proyectosContext = useContext(proyectoContext);
	const { proyecto } = proyectosContext;

	//obtener la guncion del context de tarea
	const tareasContext = useContext(tareaContext);
	const {
		tareaseleccionada,
		errortarea,
		agregarTarea,
		validarTarea,
		obtenerTareas,
		actualizarTarea,
		limpiarTarea
	} = tareasContext;

	//Efect que detecta una tarea seleccionada

	useEffect(
		() => {
			if (tareaseleccionada !== null) {
				guardarTarea(tareaseleccionada);
			} else {
				guardarTarea({
					nombre: ''
				});
			}
		},
		[ tareaseleccionada ]
	);

	//State del formulario
	const [ tarea, guardarTarea ] = useState({
		nombre: ''
	});

	//Extraer el nombre del proyecto
	const { nombre } = tarea;

	//sino hay proyecto sellecionado
	if (!proyecto) return null;

	//Array destructuring pra extraer el proyecto actyal ya que viene ocmo un array
	const [ proyectoActual ] = proyecto;

	//Leer los valores del formulario

	const handleChage = (e) => {
		guardarTarea({
			...tarea,
			[e.target.name]: e.target.value
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		//Validar
		if (nombre.trim() === '') {
			validarTarea();
			return;
		}
		//si es una edicion o una nueva tarea
		if (tareaseleccionada === null) {
			//agregat una tarea
			//agregar la nueva tarea al state de tareas
			tarea.proyecto = proyectoActual._id;
			agregarTarea(tarea);
		} else {
			//actualizar tarea existente
			actualizarTarea(tarea);
			// elimina tareaseleccionada del estate
			limpiarTarea();
		}

		//Obtener u filtltrar las tareas del proyecto actual
		obtenerTareas(proyectoActual._id);

		// reiniciar el form
		guardarTarea({
			nombre: ''
		});
	};

	return (
		<div className="formulario">
			<form onSubmit={onSubmit}>
				<div className="contenedor-input">
					<input
						type="text"
						className="input-text"
						placeholder="Nombre Tarea.."
						name="nombre"
						onChange={handleChage}
						value={nombre}
					/>
				</div>
				<div className="contenedor-input">
					<input
						type="submit"
						className="btn btn-primario btn-submit btn-black"
						value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
					/>
				</div>
			</form>
			{errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
		</div>
	);
};

export default FormTarea;
