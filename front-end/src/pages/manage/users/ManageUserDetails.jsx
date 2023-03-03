import { useParams, useLoaderData } from 'react-router-dom';

export const ManageUserDetails = () => {

    const { id } = useParams();
    const userDetails = useLoaderData();

    return (
        <div className="manage-user-details">
            <h1>Manage User Details</h1>
            <p>id: {id}</p>
            <p>userDetails: {JSON.stringify(userDetails)}</p>
        </div>
    );
};

export default ManageUserDetails;