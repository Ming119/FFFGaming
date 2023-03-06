
export const editProfileAction = async ({ request }) => {

    const data = await request.formData();
    const displayName = data.get('displayName');
    const email = data.get('email');
    const phoneNumber = data.get('phoneNumber');

    
    
};

export default editProfileAction;