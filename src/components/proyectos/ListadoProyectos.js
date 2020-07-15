import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import AlertaContext from '../../context/alertas/alertaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = (params) => {
	//Extraer proyectos del state inicial
	const proyectosContext = useContext(proyectoContext);
	const { proyectos, mensaje, obtenerProyectos } = proyectosContext;

	//Alerta context
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;
	//obtener proyectos cuando carga el componente
	useEffect(
		() => {
			//Si hubo algun error
			if (mensaje) {
				mostrarAlerta(mensaje.msg, mensaje.categoria);
			}

			obtenerProyectos();
			
		},
		// eslint-disable-next-line
		[ mensaje ]
	);

	//revisar si proyectos tiene contenido
	if (proyectos.length === 0) return <p>No hay proyectos comienza creando uno</p>;

	return (
		<ul className="listado-proyectos">
			{alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
			<TransitionGroup>
				{proyectos.map((proyecto) => {
					return (
						<CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
							<Proyecto proyecto={proyecto} />
						</CSSTransition>
					);
				})}
			</TransitionGroup>
		</ul>
	);
};

export default ListadoProyectos;
