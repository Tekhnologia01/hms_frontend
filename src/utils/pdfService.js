import axios from 'axios';

const GenerateDischargePDF = async (details, prescriptionData) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/pdf/generate_discharge_pdf`,
            {
                details,
                prescriptionData
            },
            {
                responseType: 'blob',
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};
export default GenerateDischargePDF;