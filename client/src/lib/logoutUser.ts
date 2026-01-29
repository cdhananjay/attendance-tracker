import axios from 'axios';
import { useNavigate } from 'react-router-dom';

async function logoutUser() {
    const navigate = useNavigate();
    try {
        const { data } = await axios.post('/api/auth/logout');
        if (data.ok) alert('logged out');
        else alert(data.message);
        navigate('/');
    } catch (e) {
        alert(e);
    }
}
export default logoutUser;
