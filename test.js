function timeConvertor(time) {
    const years = Math.floor(time / (3600 * 24 * 365));
    time %= 3600 * 24 * 365;
    
    const months = Math.floor(time / (3600 * 24 * 30));
    time %= 3600 * 24 * 30;
    
    const days = Math.floor(time / (3600 * 24));
    time %= 3600 * 24;
    
    const hours = Math.floor(time / 3600);
    time %= 3600;
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
  
    console.log( `${years} years ${months} months ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds ago`);
  }

timeConvertor(42000003);