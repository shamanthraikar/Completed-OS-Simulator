import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div style = {{padding:"30px"}}>
        <h1> Operating System Simulator</h1>
        <p>
          This simulator demonstrates important Operating System algorithms and
          concepts.
        </p>

        <h3>Modules</h3>
        <ul>
          <li>CPU Scheduling</li>
          <li>Memory Management</li>
          <li>Deadlock</li>
          <li>Disk Scheduling</li>
          <li>File System</li>
        </ul>

        <hr/>


        <h3>Project Features</h3>
        <ul>
            <li> Interactive Alogorithm</li>
            <li>Step-by-step execution</li>
            <li>Calculation of results</li>
            <li>Simple User Interface</li>
        </ul>

        
      </div>

      
    </>
  );
}

export default Dashboard;