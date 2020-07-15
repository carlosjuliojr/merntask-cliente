import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import Tarea from './Tarea';

const ListadoTareas = (params) => {
	//Extraer proyectos del state inicial
	const proyectosContext = useContext(proyectoContext);
	const { proyecto, eliminarProyecto } = proyectosContext;
	//Extraer tareas del state inicial
	const tareasContext = useContext(tareaContext);
	const { tareasproyecto } = tareasContext;

	//sino hay proyecto sellecionado
	if (!proyecto) return <h2>Selecciona un proyecto</h2>;

	//Array destructuring pra extraer el proyecto actyal ya que viene ocmo un array
	const [ proyectoActual ] = proyecto;

	//Eliminar un proyecto
	const onClickEliminar = () => {
		eliminarProyecto(proyectoActual._id);
	};

	return (
		<Fragment>
			<h2>Proyecto: {proyectoActual.nombre}</h2>

			<ul className="listado-tareas">
				{tareasproyecto.length === 0 ? (
					<li className="tarea">
						<p>No hay tareas</p>
					</li>
				) : (
					<TransitionGroup>
						{tareasproyecto.map((tarea) => {
							return (
								<CSSTransition key={tarea._id} timeout={500} classNames="tarea">
									<Tarea tarea={tarea} />
								</CSSTransition>
							);
						})}
					</TransitionGroup>
				)}
			</ul>

			<button type="button" className="btn btn-eliminar" onClick={onClickEliminar}>
				Eliminar Proyecto &times;
			</button>
		</Fragment>
	);
};

export default ListadoTareas;
