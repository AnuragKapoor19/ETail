import React from 'react';
import './Footer.css'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    {/* About Us Section */}
                    <div className="footer-section">
                        <h2>About Us</h2>
                        <p>
                            We provide a seamless online shopping experience with high-quality
                            products and exceptional customer service. Thank you for choosing us!
                        </p>
                    </div>

                    {/* Customer Service Section */}
                    <div className="footer-section">
                        <h2>Customer Service</h2>
                        <p>For any inquiries, please contact our support team. We're here to help!</p>
                    </div>

                    {/* Contact Info Section */}
                    <div className="footer-section">
                        <h2>Contact Us</h2>
                        <p>Email: support@etail.com</p>
                        <p>Phone: +1 234 567 890</p>
                        <p>Address: 123 Market Street, City, Country</p>
                    </div>

                    {/* Social Media Section */}
                    <div className="footer-section social-media">
                        <h2 className='follow'>Follow Us</h2>
                        <div className="social-icons">
                            <Link aria-label="Facebook">
                                <i><FaFacebook size={30} /></i>
                            </Link>
                            <Link aria-label="Twitter">
                                <i><FaXTwitter size={30} /></i>
                            </Link>
                            <Link aria-label="Instagram">
                                <i><FaInstagram size={30} /></i>
                            </Link>
                            <Link aria-label="LinkedIn">
                                <i><FaLinkedin size={30} /></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 ETail. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}