import '../app/globals.css';

function CircularProgress({ progress }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-circle">
      <svg className="progress-svg" width="120" height="120">
        <circle className="progress-circle-bg" stroke="#e6e6e6" strokeWidth="10" fill="transparent" r="50" cx="60" cy="60"/>
        <circle className="progress-circle-fg" stroke="#4caf50" strokeWidth="10" fill="transparent" r="50" cx="60" cy="60" style={{ strokeDasharray: circumference, strokeDashoffset: offset }}/>
      </svg>
      <div className="progress-circle-text">
        {Math.round(progress)}%
      </div>
    </div>
  );
}

export default CircularProgress;
