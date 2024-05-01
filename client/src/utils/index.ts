export function formatDate(dateString: string ) {
    const date = new Date(dateString);
    
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const dayOfWeek = date.getDay();
  
    const month = date.getMonth();
  
    const day = date.getDate();
  
    const year = date.getFullYear();
  
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    return `${dayNames ? dayNames[dayOfWeek] + ' ' : ''}${monthNames[month]} ${day} ${year}`;
}


export function extractQuery(queryKey: string) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const param  = urlParams.get(queryKey);

  return param;
}
  