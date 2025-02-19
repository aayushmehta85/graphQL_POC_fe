import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { GET_PROJECT } from '../../api/queries/projectQueries';
import { UPDATE_PROJECT } from '../../api/mutation/projectMutation';
import { FaEdit } from 'react-icons/fa';

const EditProjectForm = ({ project }) => {
	const [name, setName] = useState(project.name);
	const [description, setDescription] = useState(project.description);
	const [editBtn, setEditBtn] = useState(true);
	const [status, setStatus] = useState(() => {
		switch (project.status) {
			case 'Not Started':
				return 'new';
			case 'In Progress':
				return 'progress';
			case 'Completed':
				return 'completed';
			default:
				throw new Error(`Unknown status: ${project.status}`);
		}
	});

	const [updateProject] = useMutation(UPDATE_PROJECT, {
		variables: { id: project.id, name, description, status },
		refetchQueries: { query: GET_PROJECT, variables: { id: project.id } },
	});

	const onSubmit = (e) => {
		e.preventDefault();

		if (!name || !description || !status) {
			return alert('Please fill out all fields');
		}

		updateProject(name, description, status);
	};

	return (
		<div className="mt-5">
			<h3>
				Update Project Details
				<FaEdit onClick={() => setEditBtn(false)} />
			</h3>
			<form onSubmit={onSubmit}>
				<div className="mb-3">
					<label className="form-label">Name</label>
					<input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={editBtn} />
				</div>
				<div className="mb-3">
					<label className="form-label">Description</label>
					<textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={editBtn}></textarea>
				</div>
				<div className="mb-3">
					<label className="form-label">Status</label>
					<select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} disabled={editBtn}>
						<option value="new">Not Started</option>
						<option value="progress">In Progress</option>
						<option value="completed">Completed</option>
					</select>
				</div>

				<button type="submit" className="btn btn-primary" disabled={editBtn}>
					Update Details
				</button>
				{/* {!editBtn && (
					<button type="submit" className="btn btn-danger ml-10" disabled={editBtn}>
						Update Details
					</button>
				)} */}
			</form>
		</div>
	);
};

export default EditProjectForm;
