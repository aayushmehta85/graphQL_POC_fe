import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_PROJECTS } from '../../api/queries/projectQueries';
import Spinner from '../Common/Spinner';
import ProjectCard from './dependencies/ProjectCard';

const Projects = () => {
	const { loading, error, data } = useQuery(GET_PROJECTS);

	if (loading) return <Spinner />;
	if (error) return <p>Something Went Wrong!</p>;

	console.log('data', data);
	return (
		<>
			{data.projects.length > 0 ? (
				<div className="row mt-4">
					{data.projects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			) : (
				<p>No Projects</p>
			)}
		</>
	);
};

export default Projects;
