import TeamV2Data from '../../assets/jsonData/team/TeamV2Data.json';
import SingleTeamV2 from './SingleTeamV2';

const TeamV3 = () => {
    return (
        <>
            {/* Google Map Section */}
            <div className="map-area" style={{ width: '100%', height: '500px' }}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.1331038793087!2d73.14881617526429!3d21.305756280413778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be06b8c8bfbfd2b%3A0x8b49d9285eefb63d!2sDhaduk%20%26%20Sons%20Farmer%20LLP!5e0!3m2!1sen!2sin!4v1775885121576!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            {/* Team Section */}

        </>
    );
};

export default TeamV3;
