import * as fs from 'fs';
import fetch from 'node-fetch';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

const path = './memes';
fs.access(path, (error) => {
    if (error) {
        fs.mkdir(path, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('New Directory created ');
            }
        });
    } else {
        console.log('Directory exsist');
    }
});

const response = await fetch(url, { redirect: 'manual' });
const body = await response.text();

// checking if there is an memes folder, if there is not create one;

const src = [];
const pic = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
const str = body;
let i;
while ((i = pic.exec(str))) {
    src.push(i[1]);
}

const tensrc = [];
tensrc.push(src.slice(0, 10));

//getting the URLs of the images from the HTML side and put them in array tensrc;

const img = tensrc;
//put tensrc in const img ;