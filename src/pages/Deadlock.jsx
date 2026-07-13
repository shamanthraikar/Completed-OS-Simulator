import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

function Deadlock() {

    return (
        <>
            <NavBar />

            <div style={{ padding: "30px" }}>

                <h1>Deadlock</h1>

                <hr />

                <h2>What is Deadlock?</h2>

                <p>
                    Deadlock is a situation in which two or more processes wait
                    indefinitely for resources held by one another.
                </p>

                <hr />

                <h2>Necessary Conditions</h2>

                <ul>
                    <li><b>Mutual Exclusion</b> – Only one process can use a resource at a time.</li>

                    <li><b>Hold and Wait</b> – A process holds one resource while waiting for another.</li>

                    <li><b>No Preemption</b> – Resources cannot be taken away forcefully.</li>

                    <li><b>Circular Wait</b> – Processes form a circular chain waiting for each other.</li>
                </ul>

                <hr />

                <h2>Deadlock Prevention</h2>

                <ul>

                    <li>Remove Mutual Exclusion whenever possible.</li>

                    <li>Do not allow Hold and Wait.</li>

                    <li>Allow Resource Preemption.</li>

                    <li>Prevent Circular Waiting by assigning resource order.</li>

                </ul>

                <hr />

                <h2>Deadlock Avoidance</h2>

                <p>

                    Banker's Algorithm checks whether allocating a resource keeps
                    the system in a safe state.

                </p>

                <Link to="/bankers">

                    <button>

                        Open Banker's Algorithm

                    </button>

                </Link>

            </div>

        </>
    );
}

export default Deadlock;