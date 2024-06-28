let capletter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let smalletter = "abcdefghijklmnopqrstuvwxyz";
let specchar = `!@#$%^&*()/.,;:'"{[]}|\+=-_`;
let numchar = `0123456789`;

function generatepassword(a, b, c, d, len) 
{
    let working_characters = "";
    let ans = "";
    if (a == 1) 
    {
        working_characters = working_characters + capletter;
    }
    if (b == 1) 
    {
        working_characters = working_characters + smalletter;
    }
    if (c == 1) 
    {
        working_characters = working_characters + specchar;
    }
    if (d == 1) 
    {
        working_characters = working_characters + numchar;
    }
    let i = 0;
    for (; i < len; i++) 
    {
        ch = working_characters.charAt(Math.floor(Math.random() * working_characters.length))
        ans = ans + ch;
    }
    return ans;
}

function checkcriterea(ans, a, b, c, d, len) {
    check = 0;
    if (a == 1) 
    {
        for (i = 0; i < ans.length; i++) 
        {
            if (capletter.indexOf(ans.charAt(i)) > -1) 
            {
                check++;
                break;
            }
        }
    }
    if (b == 1) 
    {
        for (i = 0; i < ans.length; i++) 
        {
            if (smalletter.indexOf(ans.charAt(i)) > -1) 
            {
                check++;
                break;
            }
        }
    }
    if (c == 1) 
    {
        for (i = 0; i < ans.length; i++) 
        {
            if (specchar.indexOf(ans.charAt(i)) > -1) {
                check++;
                break;
            }
        }
    }
    if (d == 1) 
    {
        for (i = 0; i < ans.length; i++) 
        {
            if (numchar.indexOf(ans.charAt(i)) > -1) 
            {
                check++;
                break;
            }
        }
    }
    if (check == (a + b + c + d) || (check != (a + b + c + d) && (a + b + c + d) > len)) 
    {
        return 1;
    }
    else 
    {
        return -1;
    }
}

const copyPassword = () => {
    if (outbox.value !== "" || outbox.value.length >= 1) {
        navigator.clipboard.writeText(outbox.value)
            .then(() => {
                alert("Password is copied");
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy password');
            });
    }
};

const outbox = document.getElementById("outputbox_1");
const length = document.getElementById("input1_1");
const capiletter = document.getElementById("capitalletters");
const smaletter = document.getElementById("smallletters");
const spletter = document.getElementById("specialcharacters");
const digitchar = document.getElementById("digits");
const genbtn = document.getElementById("generatebutton");
const copy=document.getElementById('copyicon');

genbtn.addEventListener('click', () => {
    let pass = "";
    let len = length.value;
    console.log(len);

    let a = 0, b = 0, c = 0, d = 0;
    if (capiletter.checked)
        a = 1;
    if (smaletter.checked)
        b = 1;
    if (spletter.checked)
        c = 1;
    if (digitchar.checked)
        d = 1;
    console.log(a, b, c, d);
    if (len == '') 
    {
        alert("Please input length of your password")
    }
    else if (len > 30 || len < 1) 
    {
        alert("Size entered is out of range")
    }
    else if(a==0 && b==0 && c==0 && d==0)
    {
        alert("Password parameters not selected");
    }
    else 
    {
        while (true) 
        {
            pass = generatepassword(a, b, c, d, len);
            if (checkcriterea(pass, a, b, c, d, len) == 1) 
            {
                break;
            }
        }
        outbox.value = pass;

    }
});

copy.addEventListener('click', copyPassword);

