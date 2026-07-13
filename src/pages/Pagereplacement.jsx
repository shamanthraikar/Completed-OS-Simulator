import { useState } from "react";
import NavBar from "../components/NavBar";

function PageReplacement() {

    const [referenceString, setReferenceString] = useState("");
    const [frames, setFrames] = useState("");

    const [algorithm, setAlgorithm] = useState("FIFO");

    const [pageFaults, setPageFaults] = useState(0);
    const [pageHits, setPageHits] = useState(0);

    const [steps, setSteps] = useState([]);
    const calculateFIFO = () => {
        if (!referenceString || !frames) {
            alert("please fill all the fields");
            return;
        }
        const pages = referenceString.split(",").map(Number);
        const frameSize = Number(frames);
        let frame = [];
        let faults = 0;
        let hits = 0;
        let pointer = 0;
        let table = [];

        for (let i = 0; i < pages.length; i++) {
            let status = "Fault";

            let page = pages[i];

            // Page Hit
            if (frame.includes(page)) {

                hits++;
                status = "Hit";

            }

            // Page Fault
            else {

                faults++;

                if (frame.length < frameSize) {

                    frame.push(page);

                }

                else {

                    frame[pointer] = page;

                    pointer = (pointer + 1) % frameSize;
                }

            }

            table.push({
                page: page,
                frames: [...frame],
                status: status
            });
        }
        setPageFaults(faults);
        setPageHits(hits);
        setSteps(table);
    }
    const calculateLRU = () => {
        if (!referenceString || !frames) {
            alert("please fill all the fields");
            return;
        }
        const pages = referenceString.split(",").map(Number);
        const frameSize = map(Number);
        let frame = [];
        let recent = [];
        let faults = 0;
        let hits = 0;

        let table = [];

        for (let i = 0; i < pages.length; i++) {
            let status = "Fault";

            let page = pages[i];

            // Page Hit
            if (frame.includes(page)) {

                hits++;
                status = "Hit";
                recent[page] = i;

            }

            // Page Fault
            else {

                faults++;

                if (frame.length < frameSize) {

                    frame.push(page);
                    recent[page] = i;

                }
                else {
                    let lruIndex = 0;

                    for (let j = 1; j < frame.length; j++) {

                        if (recent[frame[j]] < recent[frame[lruIndex]]) {

                            lruIndex = j;

                        }

                    }

                    frame[lruIndex] = page;

                    recent[page] = i;
                }


            }

            table.push({
                page: page,
                frames: [...frame],
                status: status
            });
        }
        setPageFaults(faults);
        setPageHits(hits);
        setSteps(table);


    }

    const calculateOptimal = () => {
        if (!referenceString || !frames) {
            alert("Please fill all fields");
            return;
        }
        const pages = referenceString.split(",").map(Number);
        const frameSize = Number(frames);

        let frame = [];
        let faults = 0;
        let hits = 0;

        let table = [];

        for (let i = 0; i < pages.length; i++) {

            let page = pages[i];
            let status = "Fault";
            if (frame.includes(page)) {
                hits++;
                status = "Hit";
            }
            else {
                faults++;
                if (frame.length < frameSize) {
                    frame.push(page);
                }
                else {
                    let replaceIndex = 0;
                    let farthest = -1;
                    for (let j = 0; j < frame.length; j++) {

                        let nextUse = Infinity;

                        for (let k = i + 1; k < pages.length; k++) {

                            if (pages[k] === frame[j]) {
                                nextUse = k;
                                break;
                            }

                        }

                        if (nextUse > farthest) {

                            farthest = nextUse;
                            replaceIndex = j;

                        }

                    }

                    frame[replaceIndex] = page;

                }
            }
            table.push({
                page: page,
                frames: [...frame],
                status: status
            });
        }
        setPageFaults(faults);
        setPageHits(hits);
        setSteps(table);


    };
    const calculateLFU = () => {

        if (!referenceString || !frames) {
            alert("Please fill all fields");
            return;
        }

        const pages = referenceString.split(",").map(Number);
        const frameSize = Number(frames);

        let frame = [];
        let frequency = {};

        let faults = 0;
        let hits = 0;

        let table = [];

        for (let i = 0; i < pages.length; i++) {

            let page = pages[i];
            let status = "Fault";

            // Page Hit
            if (frame.includes(page)) {

                hits++;
                status = "Hit";

                frequency[page]++;

            }

            // Page Fault
            else {

                faults++;

                if (frame.length < frameSize) {

                    frame.push(page);
                    frequency[page] = 1;

                }

                else {

                    let replaceIndex = 0;
                    let minFreq = frequency[frame[0]];

                    for (let j = 1; j < frame.length; j++) {

                        if (frequency[frame[j]] < minFreq) {

                            minFreq = frequency[frame[j]];
                            replaceIndex = j;

                        }

                    }

                    delete frequency[frame[replaceIndex]];

                    frame[replaceIndex] = page;

                    frequency[page] = 1;

                }

            }

            table.push({

                page: page,
                frames: [...frame],
                status: status

            });

        }

        setPageFaults(faults);
        setPageHits(hits);
        setSteps(table);

    };
    return (
        <>
            <NavBar />

            <div style={{ padding: "30px" }}>

                <h1>Page Replacement</h1>

                <h3>Select Algorithm</h3>

                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    style={{
                        width: "300px",
                        padding: "10px",
                        fontSize: "16px"
                    }}
                >
                    <option value="FIFO">FIFO</option>
                    <option value="LRU">LRU</option>
                    <option value="Optimal">Optimal</option>
                    <option value="LFU">LFU</option>
                    <option value="SecondChance">Second Chance</option>
                </select>

                <br /><br />

                <input
                    placeholder="Reference String (e.g. 7,0,1,2,0,3,0,4)"
                    value={referenceString}
                    onChange={(e) => setReferenceString(e.target.value)}
                    style={{
                        width: "400px",
                        padding: "10px",
                        fontSize: "16px"
                    }}
                />

                <br /><br />

                <input
                    placeholder="Number of Frames"
                    value={frames}
                    onChange={(e) => setFrames(e.target.value)}
                    style={{
                        width: "200px",
                        padding: "10px",
                        fontSize: "16px"
                    }}
                />

                <br /><br />

                <button
                    onClick={() => {

                        if (algorithm === "FIFO") {

                            calculateFIFO();

                        }

                        else if (algorithm === "LRU") {

                            calculateLRU();

                        }

                        else if (algorithm === "Optimal") {

                            calculateOptimal();

                        }

                        else {

                            calculateLFU();

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

                <hr />

                <h3>Page Faults : {pageFaults}</h3>

                <h3>Page Hits : {pageHits}</h3>
                <hr />

                <h2>Simulation</h2>

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

                            <th>Page</th>

                            {Array.from({ length: Number(frames) }, (_, i) => (

                                <th key={i}>Frame {i + 1}</th>

                            ))}

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {steps.map((step, index) => (

                            <tr key={index}>

                                <td>{step.page}</td>

                                {Array.from({ length: Number(frames) }, (_, i) => (

                                    <td key={i}>

                                        {step.frames[i] !== undefined
                                            ? step.frames[i]
                                            : "-"}

                                    </td>

                                ))}

                                <td>{step.status}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </>
    );
}
export default PageReplacement;