import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = (params) => {
	//Obtener el state del formulario
	const proyectosContext = useContext(proyectoContext);
	const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

	//State para Proyeccto
	const [ proyecto, guardarProyecto ] = useState({
		nombre: ''
	});

	//Extraer nombre de proyecto
	const { nombre } = proyecto;

	const onChangeProyecto = (e) => {
		guardarProyecto({
			...proyecto,
			[e.target.name]: e.target.value
		});
	};

	//Cuando el yusurio envia un proyecto
	const onSubmitProyecto = (e) => {
		e.preventDefault();

		// Validar el proyecto
		if (nombre.trim() === '') {
			mostrarError();
			return;
		}

		// Agregar al state
		agregarProyecto(proyecto);

		// reiniciar el form
		guardarProyecto({
            nombre: ''
        });
	};

	//mostrar el formulario
	const onClickFormulario = () => {
		mostrarFormulario();
	};

	return (
		<Fragment>
			<button type="button" className="btn btn-block btn-primario" onClick={onClickFormulario}>
				Nuevo Proyecto
			</button>

			{formulario ? (
				<form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
					<input
						type="text"
						className="input-text"
						placeholder="Nombre Proyecto"
						name="nombre"
						value={nombre || ''}
						onChange={onChangeProyecto}
					/>

					<input type="submit" className="btn btn-primario btn-block" value="Agregar Proyecto" />
				</form>
			) : null}

			{errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
		</Fragment>
	);
};

export default NuevoProyecto;
