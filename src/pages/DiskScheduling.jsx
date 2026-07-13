import { useState } from "react";
import NavBar from "../components/NavBar";

function DiskScheduling() {
    const [algorithm, setAlgorithm] = useState("FCFS");

    const [requests, setRequests] = useState("");
    const [head, setHead] = useState("");

    const [result, setResult] = useState([]);
    const [totalSeek, setTotalSeek] = useState(0);
    const calculateFCFS = () => {

        if (!requests || !head) {
            alert("Please fill all fields");
            return;
        }

        const req = requests.split(",").map(Number);

        let current = Number(head);

        let seek = 0;

        let order = [];

        for (let i = 0; i < req.length; i++) {

            seek += Math.abs(current - req[i]);

            order.push({
                from: current,
                to: req[i],
                seek: Math.abs(current - req[i])
            });

            current = req[i];

        }

        setResult(order);

        setTotalSeek(seek);

    };
    const calculateSSTF = () => {

        if (!requests || !head) {
            alert("Please fill all fields");
            return;
        }

        const req = requests.split(",").map(Number);

        let pending = [...req];

        let current = Number(head);

        let seek = 0;

        let order = [];

        while (pending.length > 0) {

            let minIndex = 0;

            let minDistance = Math.abs(current - pending[0]);

            for (let i = 1; i < pending.length; i++) {

                let distance = Math.abs(current - pending[i]);

                if (distance < minDistance) {

                    minDistance = distance;

                    minIndex = i;

                }

            }

            seek += minDistance;

            order.push({

                from: current,

                to: pending[minIndex],

                seek: minDistance

            });

            current = pending[minIndex];

            pending.splice(minIndex, 1);

        }

        setResult(order);

        setTotalSeek(seek);

    };
    const calculateSCAN = () => {

        if (!requests || !head) {
            alert("Please fill all fields");
            return;
        }

        const req = requests.split(",").map(Number);

        let current = Number(head);

        let seek = 0;

        let order = [];

        let left = [];
        let right = [];

        for (let i = 0; i < req.length; i++) {

            if (req[i] < current)
                left.push(req[i]);
            else
                right.push(req[i]);

        }

        left.sort((a, b) => b - a);

        right.sort((a, b) => a - b);

        for (let i = 0; i < right.length; i++) {

            seek += Math.abs(current - right[i]);

            order.push({
                from: current,
                to: right[i],
                seek: Math.abs(current - right[i])
            });

            current = right[i];

        }

        for (let i = 0; i < left.length; i++) {

            seek += Math.abs(current - left[i]);

            order.push({
                from: current,
                to: left[i],
                seek: Math.abs(current - left[i])
            });

            current = left[i];

        }

        setResult(order);

        setTotalSeek(seek);

    };
    return (
        <>
            <NavBar />
            <h1>Disk Scheduling</h1>
            <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}>
                <option value="FCFS">FCFS</option>
                <option value="SSTF">SSTF</option>
                <option value="SCAN">SCAN</option>
            </select>
            <input
                placeholder="Request Sequence (e.g. 98,183,37,122,14,124,65,67)"
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                style={{
                    width: "400px",
                    padding: "10px",
                    fontSize: "16px"
                }}
            />
            <input
                placeholder="Initial Head Position (e.g. 53)"
                value={head}
                onChange={(e) => setHead(e.target.value)}
                style={{
                    width: "250px",
                    padding: "10px",
                    fontSize: "16px"
                }}
            />

            <br /><br />

            <br /><br />
            <button
                onClick={() => {

                    if (algorithm === "FCFS") {

                        calculateFCFS();

                    }

                    else if (algorithm === "SSTF") {

                        calculateSSTF();

                    }

                    else {

                        calculateSCAN();

                    }

                }}
            >
                Calculate
            </button>
            <hr />

            <h2>Disk Movements</h2>

            <table
                border="1"
                cellPadding="10"
                style={{
                    borderCollapse: "collapse",
                    textAlign: "center"
                }}
            >

                <thead>

                    <tr>

                        <th>From</th>

                        <th>To</th>

                        <th>Seek</th>

                    </tr>

                </thead>

                <tbody>

                    {result.map((r, index) => (

                        <tr key={index}>

                            <td>{r.from}</td>

                            <td>{r.to}</td>

                            <td>{r.seek}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <hr />

            <h2>Total Seek Time : {totalSeek}</h2>

        </>
    )
}
export default DiskScheduling;