import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

import {
	TAREAS_PROYECTO,
	AGREGAR_TAREA,
	VALIDAR_FORMULARIO_ADD_TAREA,
	ELIMINAR_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
	LIMPIAR_TAREA
} from '../../types';

const TareaState = (props) => {
	const initialState = {
		tareasproyecto: [],
		errortarea: false,
		tareaseleccionada: null
	};

	//crear dispatch y state
	const [ state, dispatch ] = useReducer(TareaReducer, initialState);

	//Crear las funcionoes

	//obtener las tareas de un proyecto
	const obtenerTareas = async (proyecto) => {
		try {
			const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } });
			dispatch({
				type: TAREAS_PROYECTO,
				payload: resultado.data.tareas
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	//AGREGAR UNA TAREA AL PROYECTO SELECCIONADO
	const agregarTarea = async (tarea) => {
		try {
			const resultado = await clienteAxios.post('/api/tareas', tarea);

			dispatch({
				type: AGREGAR_TAREA,
				payload: resultado.data
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	//Valida y muestra un error en caso de que sea necesario
	const validarTarea = () => {
		dispatch({
			type: VALIDAR_FORMULARIO_ADD_TAREA
		});
	};
	//ELIMINAR TAREA POR ID
	const eliminarTarea = async (id, proyecto) => {
		try {
			await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });

			dispatch({
				type: ELIMINAR_TAREA,
				payload: id
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	//eDITA MODIFICA UNA TAREA
	const actualizarTarea = async (tarea) => {
		try {
			const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);

			dispatch({
				type: ACTUALIZAR_TAREA,
				payload: resultado.data
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	//Extrae una tarea para edicion
	const guardarTareaActual = (tarea) => {
		dispatch({
			type: TAREA_ACTUAL,
			payload: tarea
		});
	};

	//ELIMINA LA TAREA SELECCIONADA tareaseleccionada

	const limpiarTarea = () => {
		dispatch({
			type: LIMPIAR_TAREA
		});
	};

	return (
		<TareaContext.Provider
			value={{
				tareasproyecto: state.tareasproyecto,
				errortarea: state.errortarea,
				tareaseleccionada: state.tareaseleccionada,
				obtenerTareas,
				agregarTarea,
				validarTarea,
				eliminarTarea,
				guardarTareaActual,
				actualizarTarea,
				limpiarTarea
			}}
		>
			{props.children}
		</TareaContext.Provider>
	);
};

export default TareaState;
