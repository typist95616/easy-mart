import "./footer.css";
import logo from "../images/footer_Logo.png";
import Image from "next/image";

export default function Footer() {
    return (
        <div className="whole-footer">
            <div className="footer-items">
                <Image src={logo} alt="footer-logo" className="footer-logo"></Image>
                <div className="footer-about footer-contents">
                    <div className="footer-subHeader">About</div>
                    <a href="/" className="footer-links">About Us</a>
                    <a href="/" className="footer-links">Our Branches</a>
                    <a href="/" className="footer-links">Changelog</a>
                </div>
                <div className="footer-links footer-contents">
                    <div className="footer-subHeader">Quick Links</div>
                    <a href="/" className="footer-links">FAQs</a>
                    <a href="/" className="footer-links">Recipes</a>
                    <a href="/" className="footer-links">Contact Us</a>
                </div>
                <div className="footer-help footer-contents">
                    <div className="footer-subHeader">Help & Support</div>
                    <a href="/" className="footer-links">Terms of Privacy</a>
                    <a href="/" className="footer-links">Privacy Policy</a>
                    <a href="/" className="footer-links">Security</a>
                </div>
                <div className="footer-company footer-contents">
                    <div className="footer-subHeader">About</div>
                    <a href="/" className="footer-links">Blog</a>
                    <a href="/" className="footer-links">Contact</a>
                </div>
                <div className="footer-social footer-contents">
                    <div className="footer-subHeader">About</div>
                    <a href="/" className="footer-links">Facebook</a>
                    <a href="/" className="footer-links">Instagram</a>
                    <a href="/" className="footer-links">Twitter</a>
                </div>
                <div className="footer-spacer"></div>
            </div>
            <div className="footer-copyright">All rights reserved.© 2024 EmaStudio</div>
        </div>
    )
}