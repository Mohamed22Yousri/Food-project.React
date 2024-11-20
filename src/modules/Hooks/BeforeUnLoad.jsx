import  { useEffect } from 'react'


const BeforeUnLoad = (callback) => {
    useEffect(() => {
        const beforeUnloadHandler = (e) => {
          e.preventDefault();
            callback && callback()
        };
    
        window.addEventListener("beforeunload", beforeUnloadHandler);
    
        return () => {
          window.removeEventListener("beforeunload", beforeUnloadHandler);
        };
      }, []);
  
}

export default BeforeUnLoad