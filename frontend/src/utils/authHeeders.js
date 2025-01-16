
const getAuthHeaders = () => { 
    
    return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
 }

export default getAuthHeaders