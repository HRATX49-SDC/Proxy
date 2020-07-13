import http from 'k6/http';
import { check, sleep } from 'k6';
import data from './stressDataPostgress.js';

export let options = {
  stages: [
    { duration: '10s', target: 500 },
    { duration: '120s', target: 1000 },
    { duration: '180s', target: 1500 },
    // { duration: '1200s', target: 2000 },
  ],
  thresholds: {
    errors: ['rate<0.01'], // <10% errors
  }
};

export default function() {
  let randIndex = Math.floor(Math.random() * 1000);
  let catName = data[randIndex].catName;
  let res = http.get(`http://localhost:5000/reviews?catName=${encodeURIComponent(catName)}`);
  check(res, {
    'status was 200': r => r.status == 200,
    'return array exists': r => {
      return Array.isArray(r.json())},
    'title is a string': r => {
      let data = r.json();
      if(data.length) {
        return data[0].hasOwnProperty('title') && (typeof data[0].title === 'string')
      }
      return true;
    }
    });
  sleep(1);
}

//    console.log(r.json("catName"))
