//function to constantly check for password or can be any other checker like twitter do disarm the payload
//need to make check func chained with the sendemail function
// 1) grab all the input fields and info
// 2)run function the keep checking for password
// 3) last function for actual payload to send email out
//saveinfo func chains to the checker function
//if time runs out send email or if exceeds tries
//if password entered disarm everything and reset values
//maybe show some message on dom
//send email func with all the fields and info
//need to flesh everything out
//maybe make multiple recipients maybe do images have to check

//need to do some word parsing the date and time stuff for later
//have to figure out the tolocalestring thing or maybe not

//need to make login page later
//can do backend in node maybe
//need to encrypt login password with crypt not base64 code
//can also encrypt disarm password if want to get fancy? https://www.labnol.org/code/encrypt-decrypt-javascript-200307

//need to clear all the fields after saving the info

let userEmail = document.getElementById('userEmail') 
let toEmail = document.getElementById('toEmail') 
let subject = document.getElementById('subject') 
let password = document.getElementById('password') 
let date = document.getElementById('date') 
let time = document.getElementById('time') 
let disarmPass = document.getElementById('disarmPass') 
let check = document.getElementById('check')
let send = document.getElementById('send')
let body = document.getElementById('body')
let form = document.getElementById('deadMan')

//testing stuff
let checker = document.getElementById('checker');
let testing = document.getElementById('testing');
let fill = document.getElementById('fill');


let userPass = '';
let userTime = '';
let userDate = '';
let userSubject = '';
let userBody = '';
let userToEmail = '';
let triggerDate;

let tries = 0;

function checkPass() {
    if(disarmPass.value == userPass){
        console.log('correct password, everything stopped');
        tries = 0;
        clearInterval(checkingStuff)
    } else {
        tries++
        console.log(`wrong password, you have ${3 - tries} tries left`);
    }
    if(tries >= 3){
        document.getElementById('deadMan').reset();
        sendEmail()
        tries = 0;
        clearInterval(checkingStuff)
    }
    form.reset();

}

function runChecks(triggerDate) {
    // console.log(`password: ${userPass}`);
    // console.log(`date: ${userDate}`);
    // console.log(`time: ${userTime}`);
    
    let timeDate = new Date();
    // console.log(triggerDate);
    // console.log(timeDate);

    // let timeMonth = timeDate.getMonth()
    // let timeYear = timeDate.getFullYear()
    // let timeDay = timeDate.getDate()
    // let timeHour = timeDate.getHours()
    // let timeMinutes = timeDate.getMinutes()

    // clearInterval(checkingStuff)

    if(timeDate >= triggerDate) {
        console.log('time is up send email');
        sendEmail();
        clearInterval(checkingStuff);

    } else {
        console.log('not time yet');
        // setTimeout(runChecks(triggerDate), 5000)
        
    }
    
   
    
    
    
    // document.getElementById('deadMan').reset();

}

function saveInfo() {
    userPass = password.value;
    userTime = time.value;
    userDate = date.value;
    userSubject = subject.value;
    userBody = body.value;
    userToEmail = toEmail.value;

    userTime = userTime.split(':')
    userHours = Number(userTime[0])
    userMinutes = Number(userTime[1])

    userDate = userDate.split('-')
    //month index need to subtract one
    userYear = Number(userDate[0])
    userMonth = Number(userDate[1] - 1)
    userDay = Number(userDate[2])

    triggerDate =
    new Date(userYear, userMonth, userDay, userHours, userMinutes);
    console.log(triggerDate);

    //teseting stuff
    form.style.display = 'none';
    checker.style.display = 'inline';
    testing.style.display = 'inline';
    fill.style.display = 'none';




    // running every 5000 ms
    checkingStuff = setInterval(runChecks, 5000, triggerDate);

    // resets the form fields
    form.reset();
    
}

//payload function
function sendEmail() {  
    console.log('sending');
    
    //send email function using smtp elastic email
    //using secure token instead of user:pass
    //secure server token from smtp server
    Email.send({
        // Host: "smtp.elasticemail.com",
        // Username: "kailam633@gmail.com",
        // Password: "7F1E3EC4497078AB0BD3D6D5343BF3776EE1",
        SecureToken: 'c3539f5c-a0f9-40d1-8fb8-c72c81ed0fcb',
        To: `${userToEmail}`,
        From: "kailam633@gmail.com",
        Subject: `${userSubject}`,
        Body: `${userBody}`,
    })
        //alerting the response meessage
        .then(
            message => alert(message)
        );
}

//stop function for testing
function stopNow() {
    form.style.display = 'inline';
    checker.style.display = 'none';
    testing.style.display = 'none';
    fill.style.display = 'inline';

    clearInterval(checkingStuff)
    console.log('everything stopped');
    
}

//function to randomly generate the form fields for testing purposes
function fillForm() {
    toEmail.value = 'test@example.com'
    subject.value = 'this is a test'
    body.value = 'hello cozy'
    password.value = 'asap'

    time.value = '04:20'
    date.value = '2030-12-25'
}

// let timeDate = new Date();
// let timeString = timeDate.toLocaleString('en-US', {
//     timeStyle: 'short',
//     dateStyle: 'medium',
//     hourCycle: 'h24',
// })

// let timeMonth = timeDate.getMonth()
// let timeYear = timeDate.getFullYear()
// let timeDay = timeDate.getDate()
// let timeHour = timeDate.getHours()
// let timeMinutes = timeDate.getMinutes()

// if(timeHour < 10) {
//     timeHour = '0' + timeHour;
// }


// console.log('year: ', timeYear);
// console.log('month: ', timeMonth);
// console.log('day: ', timeDay);
// console.log('hour: ', timeHour);
// console.log('minutes: ', timeMinutes);


//node stuff for twitter
// T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
//     console.log(data)
//   })