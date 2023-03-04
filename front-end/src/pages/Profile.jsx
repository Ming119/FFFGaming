import { useLoaderData } from "react-router-dom";

export const Profile = () => {

    const user = useLoaderData();

    return (
        <div className="profile">
            <h1>Profile</h1>
            Comming soon...
        </div>
    );
};

export default Profile;
