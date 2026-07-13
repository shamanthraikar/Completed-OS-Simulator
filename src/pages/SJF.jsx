import NavBar from "../components/NavBar";
import { useState } from "react";




function SJF() {
    const [processes, setProcesses] = useState("");
    const [arrivalTimes, setArrivalTimes] = useState("");
    const [burstTimes, setBurstTimes] = useState("");

    const [result, setResult] = useState([]);
    const [waitingTime, setWaitingTime] = useState([]);
    const [avgWaiting, setAvgWaiting] = useState(0);
    const [avgTurnaround, setAvgTurnaround] = useState(0);
    const [gantt, setGantt] = useState([]);

    const calculateSJF = () => {
        if (!processes || !arrivalTimes || !burstTimes) {
            alert("Please fill all fields!");
            return;
        }
        const p = processes.split(",");
        const at = arrivalTimes.split(",").map(Number);
        const bt = burstTimes.split(",").map(Number);

        let jobs = [];
        for (let i = 0; i < p.length; i++) {
            jobs.push({
                process: p[i],
                arrival: at[i],
                burst: bt[i]
            })
        }
        jobs.sort((a, b) => a.burst - b.burst)

        const newP = jobs.map(job => job.process);
        const newAT = jobs.map(job => job.arrival);
        const newBT = jobs.map(job => job.burst);

        if (newP.length !== newAT.length || p.length !== newBT.length) {
            alert("Number of Processes, Arrival Times and Burst Times must be equal.");
            return;
        }
        for (let i = 0; i < newBT.length; i++) {
            if (newBT[i] <= 0) {
                alert("Burst Time must be greater than 0.");
                return;
            }

            if (newAT[i] < 0) {
                alert("Arrival Time cannot be negative.");
                return;
            }
        }

        let completion = [];
        let waiting = [];
        let turnaround = [];

        let currentTime = 0;
        for (let i = 0; i < newP.length; i++) {
            if (currentTime < newAT[i]) {
                currentTime = newAT[i];
            }
            currentTime += newBT[i];
            completion[i] = currentTime;
            turnaround[i] = completion[i] - newAT[i];
            waiting[i] = turnaround[i] - newBT[i];
        }

        let finalResult = [];
        for (let i = 0; i < newP.length; i++) {
            finalResult.push({
                process: newP[i],
                arrival: newAT[i],
                burst: newBT[i],
                completion: completion[i],
                turnaround: turnaround[i],
                waiting: waiting[i]
            });
        }

        setWaitingTime(waiting);

        console.log(newP);
        console.log(newAT);
        console.log(newBT);


        setGantt(finalResult);
        console.log(finalResult);
        setResult(finalResult);
        let totalTAT = 0;
        let totalWT = 0;
        for (let i = 0; i < newP.length; i++) {
            totalTAT += turnaround[i];
            totalWT += waiting[i];
        }
        setAvgTurnaround((totalTAT / newP.length).toFixed(2));
        setAvgWaiting((totalWT / newP.length).toFixed(2));
    }
    return (
        <>
            <NavBar />
            <div style={{ padding: "30px" }}>
                <h1>CPU Scheduling</h1>

                <h2>Shortest Job First (Non-Preemptive)</h2>

                <input
                    placeholder="Enter Process IDs (comma separated)"
                    value={processes}
                    onChange={(e) => setProcesses(e.target.value)}
                    style={{
                        width: "300px",
                        padding: "10px",
                        fontSize: "16px"
                    }}
                />

                <br /><br />

                <input
                    placeholder="Enter Arrival Times (e.g. 2,5,9)"
                    value={arrivalTimes}
                    onChange={(e) => setArrivalTimes(e.target.value)}
                    style={{
                        width: "300px",
                        padding: "10px",
                        fontSize: "16px"
                    }}
                />

                <br /><br />

                <input
                    placeholder="Enter Burst Times (e.g. 8,3,4)"
                    value={burstTimes}
                    onChange={(e) => setBurstTimes(e.target.value)}
                    style={{
                        width: "300px",
                        padding: "10px",
                        fontSize: "16px"
                    }}
                />

                <br /><br />

                <button onClick={calculateSJF}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#1976d2",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}
                >
                    Calculate
                </button>
                <h3>Waiting Time</h3>

                {waitingTime.map((time, index) => (
                    <p key={index}>
                        P{index + 1} : {time}
                    </p>
                ))}

                <hr />

                <h2>SJF result</h2>
                <table border="1" cellPadding="10"
                    style={{
                        borderCollapse: "collapse",
                        marginTop: "20px",
                        width: "100%",
                        textAlign: "center"
                    }}

                >
                    <thead>
                        <tr>
                            <th>Process</th>
                            <th>Arrival</th>
                            <th>Burst</th>
                            <th>Completion</th>
                            <th>Turnaround</th>
                            <th>Waiting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((r, index) => (
                            <tr key={index}>
                                <td>{r.process}</td>

                                <td>{r.arrival}</td>

                                <td>{r.burst}</td>

                                <td>{r.completion}</td>

                                <td>{r.turnaround}</td>

                                <td>{r.waiting}</td>

                            </tr>

                        ))}


                    </tbody>
                </table>
                <hr />

                <h3>Average waiting time : {avgWaiting}</h3>
                <h3>Average turnaround time : {avgTurnaround}</h3>
                <hr />
                <h3>Gantt Chart</h3>

                <div style={{ marginTop: "20px" }}>

                    <div style={{ display: "flex" }}>
                        {gantt.map((g, index) => (
                            <div
                                key={index}
                                style={{
                                    border: "2px solid black",
                                    width: "100px",
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontWeight: "bold"
                                }}
                            >
                                {g.process}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex" }}>
                        <span>0</span>

                        {gantt.map((g, index) => (
                            <span
                                key={index}
                                style={{
                                    width: "100px",
                                    textAlign: "right"
                                }}
                            >
                                {g.completion}
                            </span>
                        ))}
                    </div>

                </div>

            </div>
        </>
    );
}

export default SJF;