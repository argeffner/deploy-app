import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const NewScoreForm = ({ add, score, forAPI }) => {
	
	const INITIAL_STATE = {
		name  : '',
		score : `${score}`
	};
	const [ formData, setFormData ] = useState(INITIAL_STATE);
	const [show, setShow] = useState(true);
	const history = useHistory();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(formData => (
            {...formData, [name] : value}
        ));
	};

	// prevent default, get type, use the add function adding state or db, setForm to InitialState and redirect depending on type
	const dataSubmit = (e) => {
		e.preventDefault();
		add(formData);
		setFormData(INITIAL_STATE);
		history.push('/snake');
		setShow(false);
	};

	return (
	  <div className='Form'>
	   {show ?
		<form onSubmit={dataSubmit}>
		  <label htmlFor="name">Name: </label> 
		  <input 
			 id="name"
			 type="text"
			 name="name"
			 value={formData.name}
			 onChange={handleChange} />
		  <button className='btn' onClick={forAPI}> Add Name to HighScore </button>
		</form>
		: <h3> You already submitted your score</h3>}
	  </div>
	);
};

export default NewScoreForm;