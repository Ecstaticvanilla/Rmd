function calc(year){
    // 0 - Monday
    // 1 - Tuesday
    // 2 - Wednesday
    // 3 - Thursday
    // 4 - Friday
    // 5 - Saturday
    // 6 - Sunday
    const year_2025 = 2;
    var numberofleapyears = 0;

    var year_diff = year - 2025; // Will use after 2025 only so no need to calculate before 2025
    if (year > 2028){
        numberofleapyears = Math.floor((year - 2028)/4) + 1; 
    }

    var year_start = (year_2025 + year_diff)%7;
    year_start += numberofleapyears%7;
    
    return year_start
}

function isleap(year){
    if (year%100 == 0){
        return year%400 == 0;
    }
    return year%4 == 0;
}

