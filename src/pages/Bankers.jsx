import { useState } from "react";
import NavBar from "../components/NavBar";

function Bankers() {
    const [processes, setProcesses] = useState("");
    const [allocation, setAllocation] = useState("");
    const [maximum, setMaximum] = useState("");
    const [available, setAvailable] = useState("");

    const [safeSequence, setSafeSequence] = useState([]);
    const [message, setMessage] = useState("");

    const calculateBanker = () => {
        if (!processes || !allocation || !maximum || !available) {
            alert("Please fill all fields");
            return;
        }
        const p = processes.split(",");

        const alloc = allocation.split(",").map(row =>
            row.trim().split(" ").map(Number)
        );
        const max = maximum.split(",").map(row => row.trim().split(" ").map(Number));
        const avail = available.trim().split(" ").map(Number);

        let need = [];
        for (let i = 0; i < p.length; i++) {
            need[i] = [];
            for (let j = 0; j < avail.length; j++) {
                need[i][j] = max[i][j] - alloc[i][j];
            }
        }

        let work = [...avail];

        let finish = new Array(p.length).fill(false);

        let safe = [];

        let count = 0;
        while (count < p.length) {
            let found = false;
            for (let i = 0; i < p.length; i++) {
                if (!finish[i]) {
                    let possible = true;

                    for (let j = 0; j < avail.length; j++) {

                        if (need[i][j] > work[j]) {

                            possible = false;
                            break;

                        }

                    }

                    if (possible) {

                        for (let j = 0; j < avail.length; j++) {

                            work[j] += alloc[i][j];

                        }

                        finish[i] = true;

                        safe.push(p[i]);

                        count++;

                        found = true;

                    }
                }
            }
            if (!found) {
                break;
            }

        }
        if (count == p.length) {
            setMessage("System is in safe state");
            setSafeSequence(safe);
        }
        else {
            setMessage("System is not in safe state");
            setSafeSequence([]);

        }
    };

    return (
        <>
            <NavBar />

            <div style={{ padding: "30px" }}>
                <h1> Banker's Algorithm</h1>
                <input
                    placeholder="Processes (P0,P1,P2)"
                    value={processes}
                    onChange={(e) => setProcesses(e.target.value)}
                />

                <br /><br />

                <input
                    placeholder="Allocation Matrix"
                    value={allocation}
                    onChange={(e) => setAllocation(e.target.value)}
                    style={{ width: "500px" }}
                />

                <br /><br />

                <input
                    placeholder="Maximum Matrix"
                    value={maximum}
                    onChange={(e) => setMaximum(e.target.value)}
                    style={{ width: "500px" }}
                />

                <br /><br />

                <input
                    placeholder="Available Vector"
                    value={available}
                    onChange={(e) => setAvailable(e.target.value)}
                />

                <br /><br />

                <button onClick={calculateBanker}>
                    Calculate
                </button>

                <hr />

                <h2>{message}</h2>

                <h3>
                    Safe Sequence : {safeSequence.join(" → ")}
                </h3>

            </div>
        </>
    )

}
export default Bankers;