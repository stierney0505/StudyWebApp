import Link from "../links/link"
import './footer.css'

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="copyright-container">
                <Link href="/" underline={false}>© 2024 StudyWebApp</Link>
            </div>
            <div className="links-container">      
                <Link href="/" underline={true}>Terms</Link>
                <Link href="/" underline={true}>Service</Link>
                <Link href="/" underline={true}>Privacy</Link>
                <Link href="/" underline={true}>Dashboard</Link>
                <Link href="/" underline={true}>Flashcards</Link>
                <Link href="/" underline={true}>Create</Link>
                <Link href="/" underline={true}>Profile</Link>
                <Link href="/" underline={true}>Settings</Link>
            </div>
        </div>
    );
}

export default Footer;