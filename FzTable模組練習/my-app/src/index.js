import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var style={
    calendar: {
        "回程 去程": [
          "2017/12/27(一)",
          "2017/12/28(二)",
          "2017/12/29(三)",
          "2017/12/30(四)",
          "2017/12/31(五)",
          "2018/01/01(六)",
          "2018/01/02(日)"
        ],
        "2017/12/27(一)":[
          "— —",
          1222268,
          15568,
          15568,
          13568,
          15333,
          15568
        ],
        "2017/12/28(二)":[
          15568,
          15568,
          15568,
          15568,
          13568,
          15568,
          15568
        ],
        "2017/12/29(三)":[
          "查看",
          15568,
          13568,
          15568,
          15568,
          15568,
          15568
        ],
        "2017/12/30(四)":[
          "查看",
          "查看",
          15568,
          15568,
          15568,
          13568,
          15568
        ],
        "2017/12/31(五)":[
          "查看",
          "查看",
          "查看",
          15568,
          15568,
          13568,
          15568
        ],
        "2018/01/01(六)":[
          "查看",
          "查看",
          "查看",
          "查看",
          15568,
          13568,
          15568
        ],
        "2018/01/02(日)":[
          "查看",
          "查看",
          "查看",
          "查看",
          "查看",
          15568,
          13568
        ]
    },
    count: {
        show: 4,
        slide: 2,
    },
    speed: 5,
    whenClick: function($element) {
        console.log($element);
    }
}

window.frtable = ReactDOM.render(<App style={style} />, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
