import {Routes,Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Bankers from "./pages/Bankers"
import MemoryManagement from "./pages/MemoryManagement"
import Deadlock from "./pages/Deadlock"
import DiskScheduling from "./pages/DiskScheduling"
import FileSystem from "./pages/FileSystem"
import CpuScheduling from "./pages/CpuScheduling"
import PageReplacement from "./pages/Pagereplacement"

function App() {
  return(
    <Routes>
      <Route path="/" element = {<Dashboard/>}/>
      
      
      <Route path="/cpu" element={<CpuScheduling />} />
      <Route path="/memory" element = {<MemoryManagement/>}/>
      <Route path="/deadlock" element = {<Deadlock/>}/>
      <Route path="/disk" element = {<DiskScheduling />}/>
      <Route path="/filesystem" element = {<FileSystem />}/>
      <Route path= "/pagereplacement" element={<PageReplacement />} />
      <Route path = "/bankers" element = {<Bankers/>} />
    </Routes>
  );
}
export default App;