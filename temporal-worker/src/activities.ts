import axios from 'axios';

// Update crudcrud.com
export async function updateCrudCrud(profile: any) {
    try {
        console.log('Calling crudcrud.com with profile:', profile);
        const response = await axios.post('https://crudcrud.com/api/a14045b4dbcf4b7cae4e66d82d137167/profile', profile, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('Crudcrud.com response:', response.status);
    } catch (error) {
        console.error('Error calling crudcrud.com:', error);
        throw error;
    }
} 