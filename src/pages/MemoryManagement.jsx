import NavBar from "../components/NavBar";
import { useState } from "react";





function MemoryManagement() {
    const [algorithm, setAlgorithm] = useState("Firstfit");

    const [blocks, setBlocks] = useState("");
    const [processes, setProcesses] = useState("");

    const [result, setResult] = useState([]);

    const calculateFirstFit = () => {
        if (!blocks || !processes) {
            alert("Please fill all fields");
            return;
        }
        let proc = processes.split(",").map(Number);
        let memory = blocks.split(",").map(Number);
        let tempmemory = [...memory];
        let allocation = [];
        for (let i = 0; i < proc.length; i++) {
            let allocated = false;
            for (let j = 0; j < tempmemory.length; j++) {
                if (tempmemory[j] >= proc[i]) {
                    allocation.push({
                        process: `P${i + 1}`,
                        size: proc[i],
                        block: j + 1,
                        blockSize: memory[j]
                    });
                    tempmemory[j] -= proc[i];
                    allocated = true;
                    break;
                }
            }

            if (!allocated) {

                allocation.push({
                    process: `P${i + 1}`,
                    size: proc[i],
                    block: "Not Allocated",
                    blockSize: "-"
                });

            }

        }
        setResult(allocation);

    };
    const calculateBestFit = () => {
        console.log("BEST TIME");

        if (!blocks || !processes) {
            alert("Please fill all fields");
            return;
        }

        const memory = blocks.split(",").map(Number);
        const proc = processes.split(",").map(Number);

        let tempMemory = [...memory];

        let allocation = [];

        for (let i = 0; i < proc.length; i++) {

            let bestIndex = -1;

            for (let j = 0; j < tempMemory.length; j++) {

                if (tempMemory[j] >= proc[i]) {

                    if (
                        bestIndex === -1 ||
                        tempMemory[j] < tempMemory[bestIndex]
                    ) {

                        bestIndex = j;
                        console.log(
                            "Process:", proc[i],
                            "Best Index:", bestIndex,
                            "Block:", tempMemory[bestIndex]
                        );

                    }

                }

            }

            if (bestIndex != -1) {

                allocation.push({

                    process: `P${i + 1}`,
                    size: proc[i],
                    block: bestIndex + 1,
                    blockSize: memory[bestIndex]

                });

                tempMemory[bestIndex] -= proc[i];

            }

            else {

                allocation.push({

                    process: `P${i + 1}`,
                    size: proc[i],
                    block: "Not Allocated",
                    blockSize: "-"

                });

            }

        }

        setResult(allocation);

    };



    const calculateWorstFit = () => {
        console.log("WORST TIME");

        if (!blocks || !processes) {
            alert("Please fill all fields");
            return;
        }

        const memory = blocks.split(",").map(Number);
        const proc = processes.split(",").map(Number);

        let tempMemory = [...memory];

        let allocation = [];

        for (let i = 0; i < proc.length; i++) {

            let worstIndex = -1;

            for (let j = 0; j < tempMemory.length; j++) {

                if (tempMemory[j] >= proc[i]) {

                    if (
                        worstIndex === -1 ||
                        tempMemory[j] > tempMemory[worstIndex]
                    ) {

                        worstIndex = j;

                    }

                }

            }

            if (worstIndex !== -1) {

                allocation.push({

                    process: `P${i + 1}`,
                    size: proc[i],
                    block: worstIndex + 1,
                    blockSize: memory[worstIndex]

                });

                tempMemory[worstIndex] -= proc[i];

            }

            else {

                allocation.push({

                    process: `P${i + 1}`,
                    size: proc[i],
                    block: "Not Allocated",
                    blockSize: "-"

                });

            }

        }

        setResult(allocation);

    };
    return (
        <>
            <NavBar />
            <h1>Memory Management</h1>
            <h3> Select Algorithm</h3>
            <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
            >
                <option value="Firstfit">First Fit</option>
                <option value="Bestfit">Best Fit</option>
                <option value="Worstfit">Worst Fit</option>

            </select>
            <br /><br />

            <input
                placeholder="Memory Blocks (e.g. 100,500,200,300,600)"
                value={blocks}
                onChange={(e) => setBlocks(e.target.value)}
                style={{ width: "400px" }}
            />

            <br /><br />

            <input
                placeholder="Process Sizes (e.g. 212,417,112,426)"
                value={processes}
                onChange={(e) => setProcesses(e.target.value)}
                style={{ width: "400px" }}
            />

            <br /><br />
            <button
                onClick={() => {

                    if (algorithm === "Firstfit") {

                        calculateFirstFit();

                    }

                    else if (algorithm === "Bestfit") {

                        calculateBestFit();

                    }

                    else {

                        calculateWorstFit();

                    }

                }}
            >
                Calculate
            </button>

            <hr />
            <h2>Allocation result</h2>
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
                        <th>Process</th>
                        <th>Process Size</th>
                        <th>Allocated block</th>
                        <th>Block Size</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((r, index) => (
                        <tr key={index}>
                            <td>{r.process}</td>
                            <td>{r.size}</td>
                            <td>{r.block}</td>
                            <td>{r.blockSize}</td>
                        </tr>

                    ))}
                </tbody>
            </table>

        </>
    )
}
export default MemoryManagement;