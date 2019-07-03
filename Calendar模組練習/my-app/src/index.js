import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
var calendar={
    dataSource: "./json/data2.json",
	// dataSource: [  // 資料來源的輸入接口 [ array | string ] 如果是 string的話，請輸入網址
	// 	{
	// 	    "guaranteed": true, // {boolean}
	// 	    "date": "2016/12/15", // {string} YYYY/MM/DD
	// 	    "price": "234567", // {string|number} XXXXXX | 近期上架
	// 	    "availableVancancy": 0, // {number}
	// 	    "totalVacnacy": 20, // {number}
	// 	    "status": "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
        // },{
		//     "guaranteed": true, 
		//     "date": "2016/11/15", 
		//     "price": "234567", 
		//     "availableVancancy": 0, 
		//     "totalVacnacy": 20, 
		//     "status": "報名" 
        // },
    //     {
	// 	    "guaranteed": true, 
	// 	    "date": "2017/11/15", 
	// 	    "price": "234567", 
	// 	    "availableVancancy": 0, 
	// 	    "totalVacnacy": 20, 
	// 	    "status": "報名" 
	// 	},
	// 	// ...
	// ],
	// 輸入一開始要在哪一個月份 [string] YYYYMM，若輸入的年月沒有資料，
	// 就要找相近的年月，若前一個月後一個月都有資料，就顯示資料比數比較多的那一個月
	initYearMonth: '201705',
	// 設定各資料的key
	dataKeySetting: {
		// 保證出團
        'guaranteed': 'certain',
        // 狀態
        'status': 'state',
        // 可賣團位
        'availableVancancy': 'onsell',
        // 團位
        'totalVacnacy': 'total',
        // 價格
        'price': 'price'
    },
    // 點上一個月時
    // @param $btn {$object} jquery 物件
    // @param $data {array} 上一個月的資料
    // @param module {object} 此模組實例物件
    onClickPrev: function( $btn, data, module ) {
    	console.log($btn, data, module);
    },
    // 點下一個月時
    onClickNext: function( $btn, data, module ) {
    	console.log($btn, data, module);
    },
    // 點日期時
    onClickDate: function( $date, data ){
        console.log($date, data);
    }
}
window.Calendar = ReactDOM.render(<App data={calendar} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
