function reverseStr(str){
  var listOfChars = str.split('');
  var reverselistOfChars = listOfChars.reverse();
  var reversedStr = reverselistOfChars.join('');
  return reversedStr;
  // return str.split('').reverse().join('');
}

function isPalindrome(str){
  var reverse = reverseStr(str);
  return reverse === str;
}

function convertDateToStr(date){
  var dateStr = {day:'',month:'',year:''};
  if(date.day<10){
    dateStr.day = "0" + date.day;
  }else{
    dateStr.day = date.day.toString();
  }
  if(date.month<10){
    dateStr.month = "0" + date.month;
  }else{
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormats(date){
  var dateStr = convertDateToStr(date);

  var ddmmyyyy= dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy= dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd= dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy=  dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy=  dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd=  dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPalindromeForAllDateFormats(date){
  var listOfPalindromes = getAllDateFormats(date)
  var flag = false;
  for(var i=0;i<listOfPalindromes.length;i++){
    if(isPalindrome(listOfPalindromes[i])){
      flag=true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year){
  if(year%400 === 0){
    return true;
  }
  if(year%100 === 0){
    return false;
  }
  if(year%4 === 0){
    return true;
  }
  return false;
}

function getNextDate(date){
  var day = date.day + 1; //Increment the date
  var month = date.month; 
  var year = date.year;

  var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

  if(month === 2){ //Check for February
    if(isLeapYear(year)){
      if(day > 29){
        day=1;
        month++;
      }
    }else{
      if(day>28){
        day=1;
        month++;
      }
    }
  }else{ //Check if date exceeds maximum days in a month
    if(day > daysInMonth[month-1]){
      day=1;
      month++;
    }
  }

  if(month>12){ //Check if month exceeds 12
    month=1;
    year++;
  }

  return{
    day: day,
    month: month,
    year: year
  };
}

function getNextPalindromeDate(date){
  var ctr = 0;
  var nextDate = getNextDate(date);

  while(1){
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if(isPalindrome){
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [ctr,nextDate];
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) { //for last date of year
      month = 12;
      day = 31;
      year--;
    }
    else if (month === 2) {  //for February
      if (isLeapYear(year)) {
        day = 29;
      }
      else {
        day = 28;
      }
    }
    else {   //for other months
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

function getPreviousPalindromeDate(date){
  var ctr = 0;
  var previousDate = getPreviousDate(date);

  while(1){
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
    if(isPalindrome){
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }

  return [ctr,previousDate];
}

var dataInputRef = document.querySelector("#bday-input");
var showBtnRef = document.querySelector("#show-btn");
var resultRef = document.querySelector("#result");

function clickHandler(){
  var bdayStr = dataInputRef.value;

  if(bdayStr != ""){
    var listOfDate = bdayStr.split('-');
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])
    }

    var isPalindrome = checkPalindromeForAllDateFormats(date);

    if(isPalindrome){
      resultRef.innerText = "Yay!! Your birthday is a palindrome🥳";
    }else{
      var [ctrNext, nextDate] = getNextPalindromeDate(date);
      var [ctrPrevious, previousDate] = getPreviousPalindromeDate(date);
      if(ctrNext<=ctrPrevious){
        resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctrNext} days😌`;
      }else{
        resultRef.innerText = `The previous palindrome date was ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed it by ${ctrPrevious} days😌`;
      }
    }
  }
}

showBtnRef.addEventListener("click",clickHandler);



