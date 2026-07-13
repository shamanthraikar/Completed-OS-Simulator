import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav
            style={{
                background: "#2563eb",
                padding: "15px",
                display: "flex",
                gap: "20px",
            }}
        >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Dashboard
            </Link>
            <Link to="/cpu" style={{ color: "white", textDecoration: "none" }}>
                CPU Scheduling
            </Link>

            <Link to="/memory" style={{ color: "white", textDecoration: "none" }}>
                Memory
            </Link>

            <Link to="/deadlock" style={{ color: "white", textDecoration: "none" }}>
                Deadlock
            </Link>

            <Link to="/disk" style={{ color: "white", textDecoration: "none" }}>
                Disk
            </Link>

            <Link to="/filesystem" style={{ color: "white", textDecoration: "none" }}>
                File System
            </Link>
            
            <Link to="/pagereplacement" style={{ color: "white", textDecoration: "none" }}>
            Page Replacement
            </Link>
            <Link to="/Bankers" style={{ color: "white", textDecoration: "none" }}>
            Banker's Algorithm
            </Link>
            
        </nav>
    );
}
export default NavBar;