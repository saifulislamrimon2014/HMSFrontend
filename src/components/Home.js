import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import reza from './images/reza.jpeg'
import tanvir from './images/tanvir.jpeg'
import health from './images/health.jpg'
import medicine from './images/medicine.jpg'
import urology from './images/urology.jpg'

import './Homepage.css'; // Assuming you'll create a corresponding CSS file

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  return (
    <div className="homepage">
      {/* Top Navigation Bar */}
      <header className="top-header">
                <div className="contact-info">
                    <span>Hotline: 10222</span>
                    <span>Emergency: +8801825674348</span>
                    <span>Appointment Hotline: 2200222</span>
                </div>
                <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
                    <div 
                        className="hamburger" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? '✕' : '☰'}
                    </div>
                    <ul>
                        <li>DEPARTMENTS</li>
                        <li>SERVICES</li>
                        <li>SEARCH</li>
                        <li className="nav-item dropdown">
                          <span className="nav-link dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)} style={{ cursor: 'pointer' }}>
                            LOGIN
                          </span>
                          {dropdownOpen && (
                            <ul className="dropdown-menu show" style={{ display: 'block', position: 'absolute', zIndex: 1000 }}>
                              <li>
                                <Link className="dropdown-item" to="/PatientLogin">Patient Login</Link>
                              </li>
                              <li>
                                <Link className="dropdown-item" to="/DoctorLogin">Doctor Login</Link>
                              </li>
                              <li>
                                <Link className="dropdown-item" to="/TechnologistLogin">Technologist Login</Link>
                              </li>
                              <li>
                                <Link className="dropdown-item" to="/AccountsLogin">Accounts Login</Link>
                              </li>
                              <li>
                                <Link className="dropdown-item" to="/AdminLogin">Admin Login</Link>
                              </li>
                            </ul>
                          )}
                        </li>

                    </ul>
                </nav>
            </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>LOOKING FOR A CONSULTANT</h1>
        <p>NO NEED TO SKIP YOUR WORK FOR MEDICAL SERVICE</p>
        <button className="query-btn">SUBMIT QUERY</button>
        <div className="social-links">
          <p>FOLLOW US</p>
          
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="testimonials">
        <h2>Patient Testimony</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <h3>RIMON KHAN/ BASUNDHARA, DHAKA</h3>
            <p className="date">21 MARCH 2024</p>
            <p className="content">REALLY GREAT SERVICE AND SUPPORT SYSTEM . ITS MY FIRST.....</p>
            <a href="#" className="read-more">READ MORE</a>
          </div>
          <div className="testimonial-card">
            <h3>RIMON KHAN / NIRALA, KHULNA</h3>
            <p className="date">2 FEBRUARY 2024</p>
            <p className="content">ONE OF THE BEST THING I FIND HERE IS THERE MANAGEMENT SYSTEM ITS.....</p>
            <a href="#" className="read-more">READ MORE</a>
          </div>
          <div className="testimonial-card">
            <h3>M KHAN / BOTTLA, BARISAL</h3>
            <p className="date">26 JANUARY 2024</p>
            <p className="content">THIS SERVICE IS FAR BETTER THAN PHYSICAL SERVICE I WOULD.....</p>
            <a href="#" className="read-more">READ MORE</a>
          </div>
        </div>
      </section>

      {/* Consultants Section */}
      <section className="consultants">
        <h2>OVER 100 MULTI-DISCIPLINARY SPECIALISTS</h2>
        <p className="description">
          State of the art technology and expertise combined with the support of our friendly staff,
          we strive each day to be the top healthcare provider, not only in Bangladesh but within
          the Asia-Pacific region.
        </p>
        <div className="meet">MEET OUR CONSULTANTS</div>
        <div className="consultant-profiles">
        
          <div className="consultant-card">
            <h3>DR. TANVEER BIN LATIF</h3>
            <div><img src={tanvir} /></div>
            <p>MBBS, MRCP (UK), Specialty Certified in Nephrology (UK) Senior Consultant</p>
            
          </div>
          <div className="consultant-card">
            <h3>PROF. DR. GEN. MD. REZA-UL KARIM</h3>
            <div><img src={reza} /></div>
            
            <p>MBBS, MS (Orthopedics) Senior Consultant</p>
            
          </div>
          
        </div>
        
        <a href="#" className="show-more">SHOW MORE</a>
      </section>

      <section className="ambulance-section">
        <h2>AMBULANCE FOR URGENT</h2>
        <p className="ambulance-number">017-00-000-000</p>
        <button className="booking-btn">BOOKING HERE</button>
      </section>

      {/* News Updates */}
      <section className="news-updates">
        <div className="news"><h2>NEWS UPDATES</h2></div>
        <div className="news-cards">
          <div className="news-card">
            <h3>REHABILITATION CARE USING A PATIENT-CENTRED APPROACH</h3>
            <div ><img src={medicine} className="imgc" /></div>
            
            <p>
              Physical medicine and rehabilitation also known as "physiatry" or rehabilitation medicine
              is a medical specialty that helps people regain...
            </p>
            <a href="#" className="read-more">READ MORE</a>
          </div>
          <div className="news-card">
            
            <h3>SCREENING AT DOORSTEP: A SMART STEP FOR YOUR HEALTH</h3>
            <div ><img src={health} className="imgc" /></div>

            <p>
              The prospect of spending hours in a queue at the diagnostic lab or the hospital deters
              many or at least prompts them to defer stepping o....
            </p>
            <a href="#" className="read-more">READ MORE</a>
            </div>
            
          
          <div className="news-card">
            <h3>GETTING IT RIGHT FIRST TIME IN UROLOGY</h3>
            <div ><img src={urology} className="imgc" /></div>
            <h4>Urology: Towards better care for patients with kidney cancer</h4>
          
            <p>
              Urology can be broadly defined as the specialty that manages patients with diseases of
              the male and female urinary tract, and of the male....
            </p>
            <a href="#" className="read-more">READ MORE</a>
          </div>
        </div>
      </section>

      {/* Footer with Contact Information */}
      <footer className="footer">
        <div className="location-cards">
          <div className="location-card">
            <h3>Bali</h3>
            <p>Bahkan Samat,</p>
            <p>Gang Bekul Canggu – Kuta,</p>
            <p>Indonesia</p>
            <ul>
              <li>Berryk: +12 (3)456 7890 1234</li>
              <li>Office: +12 (3)456 7890 1234</li>
            </ul>
          </div>
          <div className="location-card">
            <h3>Morocco</h3>
            <p>Bahkan Samat,</p>
            <p>Rd Essaouira Taghazout Bay</p>
            <p>Morocco</p>
            <ul>
              <li>Ayoub: +12 (3)456 7890 1234</li>
              <li>Office: +12 (3)456 7890 1234</li>
            </ul>
          </div>
          <div className="location-card">
            <h3>Sri Lanka</h3>
            <p>Bahkan Samat,</p>
            <p>Sri Lanka</p>
            <ul>
              <li>Jordy: +12 (3)456 7890 1234</li>
              <li>Office: +12 (3)456 7890 1234</li>
            </ul>
          </div>
        </div>
        <div className="newsletter">
          <h3>Newsletter Sign Up</h3>
          <input type="email" placeholder="Enter your email here..." />
          <button>Submit</button>
        </div>
      </footer>
    </div>
  );
};


export default Home;