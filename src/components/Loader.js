import { useState, CSSProperties } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";





function Loader() {
    let [loading, setLoading] = useState(true);
    

  return (
    <div style={{ marginTop:'150px' }}>
           <div className="sweet-loading text-center">
     

      <PacmanLoader
        color='#000'
        loading={loading}
        cssOverride=''
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </div>
  )
}

export default Loader