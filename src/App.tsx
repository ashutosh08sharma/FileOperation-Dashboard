import './index.css';
import { sampleData } from './data';
import { FileDashboard } from './Features/FileDashboard';


export default function App() {
  return (
    <div className="app">
      <header className="appHeader">
        <h1>File Operation Dashboard</h1>
      </header>
      <FileDashboard data={sampleData} />
    </div>
  )
}
