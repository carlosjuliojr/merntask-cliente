import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import tokenAuth from '../../config/tokenAuth';
import {
	FORMULARIO_PROYECTO,
	OBTENER_PROYECTOS,
	AGREGAR_PROYECTO,
	PROYECTO_ERROR,
	VALIDAR_FORMULARIO,
	PROYECTO_ACTUAL,
	ELIMINAR_PROYECTO
} from '../../types';

const ProyectoState = (props) => {
	const initialState = {
		proyectos: [], //Proyectos en el sistema
		formulario: false, //hace que se muestre o no el formulario de agregar proyecto
		errorformulario: false, // para validar el formulario que no este vacio
		proyecto: null,
		mensaje: null
	};

	//Dispatch para ejecutar las acciones
	const [ state, dispatch ] = useReducer(proyectoReducer, initialState);

	//Serie de funciones para el CRUD
	const mostrarFormulario = () => {
		dispatch({
			type: FORMULARIO_PROYECTO
		});
	};

	//obtener los proyectos
	const obtenerProyectos = async () => {
		try {
			//Solicitamos la lista de proyectos
			// console.log("token: ", clienteAxios.defaults.headers.common['x-auth-token'])
			// clienteAxios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
			const token = localStorage.getItem('token');
			if (token) {
				//Todo : funcion para enviar el token por headers
				tokenAuth(token);
			}
			const resultado = await clienteAxios.get('/api/proyectos');
			dispatch({
				type: OBTENER_PROYECTOS,
				payload: resultado.data
			});
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error'
			};

			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta
			});
		}
	};

	//const agregar nuevo proyecto
	const agregarProyecto = async (proyecto) => {
		try {
			//consultar la base de datos para agregar un proyecto
			const resultado = await clienteAxios.post('/api/proyectos', proyecto);

			//Agregamos el proyecto en el state
			dispatch({
				type: AGREGAR_PROYECTO,
				payload: resultado.data
			});
		} catch (error) {
			const alerta = {
				msg: 'Hubo un error',
				categoria: 'alerta-error'
			};

			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta
			});
		}
	};

	//Valida el formulario por errores
	const mostrarError = () => {
		dispatch({
			type: VALIDAR_FORMULARIO
		});
	};

	//selecciona el proyecto que el usuario dio click
	const proyectoActual = (proyectoid) => {
		dispatch({
			type: PROYECTO_ACTUAL,
			payload: proyectoid
		});
	};

	//eLIMINA UN PROYECTO
	const eliminarProyecto = async (proyectoid) => {
		try {
			await clienteAxios.delete(`/api/proyectos/${proyectoid}`);

			dispatch({
				type: ELIMINAR_PROYECTO,
				payload: proyectoid
			});
		} catch (error) {
			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error'
			};

			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta
			});
		}
	};

	return (
		<proyectoContext.Provider
			value={{
				proyectos: state.proyectos,
				formulario: state.formulario,
				errorformulario: state.errorformulario,
				proyecto: state.proyecto,
				mensaje: state.mensaje,
				mostrarFormulario,
				obtenerProyectos,
				agregarProyecto,
				mostrarError,
				proyectoActual,
				eliminarProyecto
			}}
		>
			{props.children}
		</proyectoContext.Provider>
	);
};

export default ProyectoState;
