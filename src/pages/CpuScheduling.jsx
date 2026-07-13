import NavBar from "../components/NavBar";
import { useState } from "react";




function CpuScheduling() {
    const [processes, setProcesses] = useState("");
    const [arrivalTimes, setArrivalTimes] = useState("");
    const [burstTimes, setBurstTimes] = useState("");

    const [result, setResult] = useState([]);
    const [waitingTime, setWaitingTime] = useState([]);
    const [avgWaiting, setAvgWaiting] = useState(0);
    const [avgTurnaround, setAvgTurnaround] = useState(0);
    const [gantt, setGantt] = useState([]);
    const [algorithm, setAlgorithm] = useState("FCFS");
    const [timeQuantum, setTimeQuantum] = useState("");
    const [priorities, setPriorities] = useState("");

    const calculateFCFS = () => {
        if (!processes || !arrivalTimes || !burstTimes) {
            alert("Please fill all fields!");
            return;
        }
        const p = processes.split(",");
        const at = arrivalTimes.split(",").map(Number);
        const bt = burstTimes.split(",").map(Number);

        if (p.length !== at.length || p.length !== bt.length) {
            alert("Number of Processes, Arrival Times and Burst Times must be equal.");
            return;
        }
        for (let i = 0; i < bt.length; i++) {
            if (bt[i] <= 0) {
                alert("Burst Time must be greater than 0.");
                return;
            }

            if (at[i] < 0) {
                alert("Arrival Time cannot be negative.");
                return;
            }
        }

        let completion = [];
        let waiting = [];
        let turnaround = [];

        let currentTime = 0;
        for (let i = 0; i < p.length; i++) {
            if (currentTime < at[i]) {
                currentTime = at[i];
            }
            currentTime += bt[i];
            completion[i] = currentTime;
            turnaround[i] = completion[i] - at[i];
            waiting[i] = turnaround[i] - bt[i];
        }

        let finalResult = [];
        for (let i = 0; i < p.length; i++) {
            finalResult.push({
                process: p[i],
                arrival: at[i],
                burst: bt[i],
                completion: completion[i],
                turnaround: turnaround[i],
                waiting: waiting[i]
            });
        }

        setWaitingTime(waiting);

        console.log(p);
        console.log(at);
        console.log(bt);


        setGantt(finalResult);
        console.log(finalResult);
        setResult(finalResult);
        let totalTAT = 0;
        let totalWT = 0;
        for (let i = 0; i < p.length; i++) {
            totalTAT += turnaround[i];
            totalWT += waiting[i];
        }
        setAvgTurnaround((totalTAT / p.length).toFixed(2));
        setAvgWaiting((totalWT / p.length).toFixed(2));
    }
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

    const calculateRR = () => {
        if (!processes || !arrivalTimes || !burstTimes || !timeQuantum) {
            alert("Please fill all fields!");
            return;
        }

        const p = processes.split(",");
        const at = arrivalTimes.split(",").map(Number);
        const bt = burstTimes.split(",").map(Number);
        const tq = Number(timeQuantum);

        if (p.length !== at.length || p.length !== bt.length) {
            alert("Number of Processes, Arrival Times and Burst Times must be equal.");
            return;
        }

        if (tq <= 0) {
            alert("Time Quantum must be greater than 0.");
            return;
        }

        let remaining = [...bt];
        let completion = new Array(p.length).fill(0);
        let turnaround = new Array(p.length).fill(0);
        let waiting = new Array(p.length).fill(0);

        let visited = new Array(p.length).fill(false);
        let queue = [];
        let ganttData = [];

        let completed = 0;
        let currentTime = Math.min(...at);

        // Add processes that arrive first
        for (let i = 0; i < p.length; i++) {
            if (at[i] === currentTime) {
                queue.push(i);
                visited[i] = true;
            }
        }

        while (completed < p.length) {

            if (queue.length === 0) {
                currentTime++;

                for (let i = 0; i < p.length; i++) {
                    if (!visited[i] && at[i] <= currentTime) {
                        queue.push(i);
                        visited[i] = true;
                    }
                }

                continue;
            }

            let idx = queue.shift();

            let executeTime = Math.min(remaining[idx], tq);

            let startTime = currentTime;

            remaining[idx] -= executeTime;
            currentTime += executeTime;

            ganttData.push({
                process: p[idx],
                start: startTime,
                completion: currentTime
            });
            // Add newly arrived processes
            for (let i = 0; i < p.length; i++) {
                if (!visited[i] && at[i] <= currentTime) {
                    queue.push(i);
                    visited[i] = true;
                }
            }

            if (remaining[idx] > 0) {
                queue.push(idx);
            } else {
                completion[idx] = currentTime;
                turnaround[idx] = completion[idx] - at[idx];
                waiting[idx] = turnaround[idx] - bt[idx];
                completed++;
            }
        }

        let finalResult = [];

        for (let i = 0; i < p.length; i++) {
            finalResult.push({
                process: p[i],
                arrival: at[i],
                burst: bt[i],
                completion: completion[i],
                turnaround: turnaround[i],
                waiting: waiting[i]
            });
        }

        setResult(finalResult);
        setWaitingTime(waiting);
        setGantt(ganttData);

        let totalWT = waiting.reduce((a, b) => a + b, 0);
        let totalTAT = turnaround.reduce((a, b) => a + b, 0);

        setAvgWaiting((totalWT / p.length).toFixed(2));
        setAvgTurnaround((totalTAT / p.length).toFixed(2));
    };
    const calculatePriority = () => {

        if (!processes || !arrivalTimes || !burstTimes || !priorities) {
            alert("Please fill all fields!");
            return;
        }

        const p = processes.split(",");
        const at = arrivalTimes.split(",").map(Number);
        const bt = burstTimes.split(",").map(Number);
        const pr = priorities.split(",").map(Number);

        if (p.length !== at.length || p.length !== bt.length || p.length !== pr.length) {
            alert("All inputs must have same length.");
            return;
        }

        let completed = new Array(p.length).fill(false);

        let completion = new Array(p.length).fill(0);
        let turnaround = new Array(p.length).fill(0);
        let waiting = new Array(p.length).fill(0);

        let ganttData = [];

        let currentTime = Math.min(...at);
        let done = 0;

        while (done < p.length) {

            let idx = -1;

            // Find highest priority among arrived processes
            for (let i = 0; i < p.length; i++) {

                if (!completed[i] && at[i] <= currentTime) {

                    if (idx === -1 || pr[i] < pr[idx]) {
                        idx = i;
                    }

                }

            }

            // No process has arrived yet
            if (idx === -1) {
                currentTime++;
                continue;
            }

            let startTime = currentTime;

            currentTime += bt[idx];

            completion[idx] = currentTime;
            turnaround[idx] = completion[idx] - at[idx];
            waiting[idx] = turnaround[idx] - bt[idx];

            completed[idx] = true;
            done++;

            ganttData.push({
                process: p[idx],
                start: startTime,
                completion: currentTime
            });

        }

        let finalResult = [];

        for (let i = 0; i < p.length; i++) {

            finalResult.push({
                process: p[i],
                arrival: at[i],
                burst: bt[i],
                priority: pr[i],
                completion: completion[i],
                turnaround: turnaround[i],
                waiting: waiting[i]
            });

        }

        setResult(finalResult);
        setWaitingTime(waiting);
        setGantt(ganttData);

        let totalWT = waiting.reduce((a, b) => a + b, 0);
        let totalTAT = turnaround.reduce((a, b) => a + b, 0);

        setAvgWaiting((totalWT / p.length).toFixed(2));
        setAvgTurnaround((totalTAT / p.length).toFixed(2));
    };
    const calculateSRTF = () => {
        if (!processes || !arrivalTimes || !burstTimes) {
            alert("Please fill all fields!");
            return;
        }

        const p = processes.split(",");
        const at = arrivalTimes.split(",").map(Number);
        const bt = burstTimes.split(",").map(Number);

        let remaining = [...bt];

        let completion = new Array(p.length).fill(0);
        let turnaround = new Array(p.length).fill(0);
        let waiting = new Array(p.length).fill(0);

        let currentTime = Math.min(...at);
        let completed = 0;

        let ganttData = [];

        while (completed < p.length) {

            let idx = -1;

            for (let i = 0; i < p.length; i++) {

                if (
                    at[i] <= currentTime &&
                    remaining[i] > 0 &&
                    (
                        idx === -1 ||
                        remaining[i] < remaining[idx]
                    )
                ) {
                    idx = i;
                }

            }

            if (idx === -1) {
                currentTime++;
                continue;
            }

            remaining[idx]--;

            if (
                ganttData.length === 0 ||
                ganttData[ganttData.length - 1].process !== p[idx]
            ) {

                ganttData.push({
                    process: p[idx],
                    start: currentTime,
                    completion: currentTime + 1
                });

            } else {

                ganttData[ganttData.length - 1].completion++;

            }

            currentTime++;

            if (remaining[idx] === 0) {

                completion[idx] = currentTime;

                turnaround[idx] = completion[idx] - at[idx];

                waiting[idx] = turnaround[idx] - bt[idx];

                completed++;
            }

        }

        let finalResult = [];

        for (let i = 0; i < p.length; i++) {

            finalResult.push({
                process: p[i],
                arrival: at[i],
                burst: bt[i],
                completion: completion[i],
                turnaround: turnaround[i],
                waiting: waiting[i]
            });

        }

        setResult(finalResult);
        setWaitingTime(waiting);
        setGantt(ganttData);

        let totalWT = waiting.reduce((a, b) => a + b, 0);
        let totalTAT = turnaround.reduce((a, b) => a + b, 0);

        setAvgWaiting((totalWT / p.length).toFixed(2));
        setAvgTurnaround((totalTAT / p.length).toFixed(2));
    };
    const calculatePP = () => {
        if (!processes || !arrivalTimes || !burstTimes) {
            alert("Please fill all fields!");
            return;
        }

        const p = processes.split(",");
        const at = arrivalTimes.split(",").map(Number);
        const bt = burstTimes.split(",").map(Number);
        const pr = priorities.split(",").map(Number);

        let remaining = [...bt];

        let completion = new Array(p.length).fill(0);
        let turnaround = new Array(p.length).fill(0);
        let waiting = new Array(p.length).fill(0);

        let currentTime = Math.min(...at);
        let completed = 0;

        let ganttData = [];

        while (completed < p.length) {

            let idx = -1;

            for (let i = 0; i < p.length; i++) {

                if (
                    at[i] <= currentTime &&
                    remaining[i] > 0 &&
                    (
                        idx === -1 ||
                        pr[i] < pr[idx]
                    )
                ) {
                    idx = i;
                }

            }

            if (idx === -1) {
                currentTime++;
                continue;
            }

            remaining[idx]--;

            if (
                ganttData.length === 0 ||
                ganttData[ganttData.length - 1].process !== p[idx]
            ) {

                ganttData.push({
                    process: p[idx],
                    start: currentTime,
                    completion: currentTime + 1
                });

            } else {

                ganttData[ganttData.length - 1].completion++;

            }

            currentTime++;

            if (remaining[idx] === 0) {

                completion[idx] = currentTime;

                turnaround[idx] = completion[idx] - at[idx];

                waiting[idx] = turnaround[idx] - bt[idx];

                completed++;
            }

        }

        let finalResult = [];

        for (let i = 0; i < p.length; i++) {

            finalResult.push({
                process: p[i],
                arrival: at[i],
                burst: bt[i],
                completion: completion[i],
                turnaround: turnaround[i],
                waiting: waiting[i]
            });

        }

        setResult(finalResult);
        setWaitingTime(waiting);
        setGantt(ganttData);

        let totalWT = waiting.reduce((a, b) => a + b, 0);
        let totalTAT = turnaround.reduce((a, b) => a + b, 0);

        setAvgWaiting((totalWT / p.length).toFixed(2));
        setAvgTurnaround((totalTAT / p.length).toFixed(2));
     

    };

    const calculateLJF = () => {

    if (!processes || !arrivalTimes || !burstTimes) {
        alert("Please fill all fields!");
        return;
    }

    const p = processes.split(",");
    const at = arrivalTimes.split(",").map(Number);
    const bt = burstTimes.split(",").map(Number);

    let completed = new Array(p.length).fill(false);

    let completion = new Array(p.length).fill(0);
    let turnaround = new Array(p.length).fill(0);
    let waiting = new Array(p.length).fill(0);

    let ganttData = [];

    let currentTime = Math.min(...at);
    let done = 0;

    while (done < p.length) {

        let idx = -1;
        let maxBurst = -1;

        // Find arrived process having maximum burst
        for (let i = 0; i < p.length; i++) {

            if (!completed[i] &&
                at[i] <= currentTime &&
                bt[i] > maxBurst) {

                maxBurst = bt[i];
                idx = i;
            }
        }

        // CPU Idle
        if (idx === -1) {
            currentTime++;
            continue;
        }

        let start = currentTime;

        currentTime += bt[idx];

        completion[idx] = currentTime;
        turnaround[idx] = completion[idx] - at[idx];
        waiting[idx] = turnaround[idx] - bt[idx];

        completed[idx] = true;
        done++;

        ganttData.push({
            process: p[idx],
            start: start,
            completion: currentTime
        });
    }

    let finalResult = [];

    for (let i = 0; i < p.length; i++) {
        finalResult.push({
            process: p[i],
            arrival: at[i],
            burst: bt[i],
            completion: completion[i],
            turnaround: turnaround[i],
            waiting: waiting[i]
        });
    }

    setResult(finalResult);
    setWaitingTime(waiting);
    setGantt(ganttData);

    let totalWT = waiting.reduce((a,b)=>a+b,0);
    let totalTAT = turnaround.reduce((a,b)=>a+b,0);

    setAvgWaiting((totalWT/p.length).toFixed(2));
    setAvgTurnaround((totalTAT/p.length).toFixed(2));
};
   
    return (
        <>
            <NavBar />
            <div style={{ padding: "30px" }}>
                <h1>CPU Scheduling</h1>

                <h3>Select Algorithm</h3>

                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    style={{
                        width: "320px",
                        padding: "10px",
                        fontSize: "16px",
                        marginBottom: "20px"
                    }}
                >
                    <option value="FCFS">FCFS</option>
                    <option value="SJF">SJF</option>
                    <option value="SRTF">Shortest Remaining time first</option>
                    <option value="RR">Round Robin</option>
                    <option value="Priority">Priority</option>
                    <option value="PP">Preemptive Priority</option>
                    <option value="LJF">Longest Job First</option>
                </select>

                <h2>
                    {algorithm === "FCFS"
                        ? "First Come First Serve (FCFS)"
                        : algorithm === "SJF"
                            ? "Shortest Job First (SJF)"
                            : algorithm === "SRTF"
                                ? "Shortest Remaining Time First (SRTF)"
                                : algorithm === "RR"
                                    ? "Round Robin (RR)"
                                    : algorithm === "LJF"
                                        ? "Longest Job first"
                                        : algorithm === "PP"
                                            ? "Priority Scheduling (Preemptive)"
                                            : "Priority Scheduling(Non Preemptive)"}
                </h2>


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

                {(algorithm === "Priority" || algorithm === "PP") && (
                    <>
                        <br /><br />
                        <input
                            placeholder="Enter Priorities (e.g. 2,1,3)"
                            value={priorities}
                            onChange={(e) => setPriorities(e.target.value)}
                            style={{
                                width: "300px",
                                padding: "10px",
                                fontSize: "16px"
                            }}
                        />
                    </>
                )}


                {algorithm === "RR" && (
                    <>
                        <br></br>
                        <input
                            placeholder="Enter Time Quantum"
                            value={timeQuantum}
                            onChange={(e) => setTimeQuantum(e.target.value)}
                            style={{
                                width: "300px",
                                padding: "10px",
                                fontSize: "16px"
                            }}
                        />

                    </>
                )}

                <br /><br />

                <button
                    onClick={() => {

                        if (algorithm === "FCFS") {
                            calculateFCFS();
                        }
                        else if (algorithm === "SJF") {
                            calculateSJF();
                        }
                        else if (algorithm === "SRTF") {
                            calculateSRTF();
                        }
                        else if (algorithm === "RR") {
                            calculateRR();
                        }
                        else if (algorithm === "PP") {
                            calculatePP();
                        }
                        else if (algorithm === "LJF") {
                            calculateLJF();
                        }
                        else {
                            calculatePriority();
                        }

                    }}

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

                <h2>{algorithm} Result</h2>
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

                    {/* Boxes */}
                    <div style={{ display: "flex" }}>
                        {gantt.map((g, index) => (
                            <div
                                key={index}
                                style={{
                                    width: "100px",
                                    height: "50px",
                                    border: "2px solid black",
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

                    {/* Timeline */}
                    <div style={{ display: "flex" }}>
                        {gantt.map((g, index) => (
                            <div
                                key={index}
                                style={{
                                    width: "100px"
                                }}
                            >
                                {index === 0 && (
                                    <div style={{ textAlign: "left" }}>
                                        {g.start}
                                    </div>
                                )}

                                <div style={{ textAlign: "right" }}>
                                    {g.completion}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div >


        </>
    );
}

export default CpuScheduling;