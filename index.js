import fs from 'node:fs';
import https from 'node:https';
import fetch from 'node-fetch';

// get all the packacges i need for task ;

const side = 'https://memegen-link-examples-upleveled.netlify.app/';

//  target https-side to get the memes as const ;
const response = await fetch(side, { redirect: 'manual' });
const body = await response.text();
// after get a response of the side i get the the HTML document of side

const src = [];
const pic = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
const str = body;
let i;
while ((i = pic.exec(str))) {
    src.push(i[1]);
}

// get the image urls

const dir = './memes';

// create a const for the memes folder

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

for (let i = 0; i < 10; i++) {
    const img = src[i];
    https.get(img, (res) => {
        const path = `memes/0${i + 1}.jpg`;
        const write = fs.createWriteStream(path);

        res.pipe(write);

        write.on('finish', () => {
            write.close();
        });
    });
}
console.log('images are in memes folder');

// slice ten image urls and put them in a folder