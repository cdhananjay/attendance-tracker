import { useEffect, useState } from 'react';
import axios from 'axios';
const DashboardPage = () => {
    const [subjects, setSubjects] = useState({});
    useEffect(() => {
        const getSubjectData = async () => {
            try {
                const { data } = await axios.get('/api/sub/');
                if (data.ok) setSubjects(data.subjects);
                else {
                    alert(data.message);
                }
            } catch (e) {
                alert(e);
            }
        };
        getSubjectData();
    }, []);
    return <div>data : {subjects.toString()}</div>;
};

export default DashboardPage;
