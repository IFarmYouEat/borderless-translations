import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Settings/Settings.css';

function SettingsExpertise() {
    const dispatch = useDispatch();
    const expertises = useSelector(store => store.allExpertise);
    const [editExpertiseId, setEditExpertiseId] = useState(null);
    const [editExpertiseType, setEditExpertiseType] = useState('');
    const [expertiseType, setExpertiseType] = useState('');

    useEffect(() => {
        dispatch({ type: 'GET_ALL_EXPERTISE' });
    }, []);

    const handleEdit = (expertise) => {
        setEditExpertiseId(expertise.id);
        setEditExpertiseType(expertise.type);
    };

    const handleDelete = (id) => {
        dispatch({
            type: 'DELETE_EXPERTISE',
            payload: { id }
        });
    };

    const handleSave = (expertiseId) => {
        dispatch({
            type: 'UPDATE_EXPERTISE',
            payload: { type: editExpertiseType, id: expertiseId }
        });
        setEditExpertiseId(null);
        setEditExpertiseType('');
    };

    const handleCancel = () => {
        setEditExpertiseId(null);
        setEditExpertiseType('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'CREATE_NEW_EXPERTISE',
            payload: { type: expertiseType }
        });
        setExpertiseType("");
        };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={expertiseType}
                    onChange={(e) => setExpertiseType(e.target.value)}
                />
            <button button className='btn btn_sizeSm' type="submit">Add Expertise</button>
            </form>
            
            <table>
                <thead>
                    <tr>
                        <th>Expertise</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expertises.map(expertise => (
                        <tr key={expertise.id}>
                            {editExpertiseId === expertise.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            value={editExpertiseType}
                                            onChange={(e) => setEditExpertiseType(e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <button button className='btn btn_sizeSm' onClick={() => handleSave(expertise.id)}>Save</button>
                                        <button button className='btn btn_sizeSm' onClick={() => handleCancel()}>Cancel</button>
                                    </td>

                                </>
                            ) : (
                                <>
                                    <td>
                                        {expertise.type}
                                    </td>
                                    <td>
                                        <button button className='btn btn_sizeSm' onClick={() => handleEdit(expertise)}>Edit</button>
                                        <button button className='btn btn_sizeSm' onClick={() => handleDelete(expertise.id)}>Delete</button>
                                    </td>

                                </>
                            )}
                        </tr>
                    ))}
                </tbody>

            </table>


        </div>


    );
}

export default SettingsExpertise;
