import '../Homepage.css';
import './Doctor.css';

const DoctorFooter = () => {
  return (
    <div className="DoctorFooter">
        <footer className="doctor-footer">
            <div className="footer-content">
                <p>© {new Date().getFullYear()} HealthCare Portal | Support: help@healthcare.com | +880-1234-567890</p>
            </div>
        </footer>
    </div>

    );
};

export default DoctorFooter;