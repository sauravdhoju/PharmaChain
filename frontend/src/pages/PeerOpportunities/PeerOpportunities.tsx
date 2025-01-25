import { useParams } from 'react-router-dom';
const PeerOpportunities = () => {
    const { medicineId } = useParams();
    return <div>{medicineId}</div>;
};

export default PeerOpportunities;
