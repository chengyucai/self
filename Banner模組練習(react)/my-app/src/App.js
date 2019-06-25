import React from 'react';
// import logo from './logo.svg';
import img from './imgs/1200x380.png';
// import './App.css';
import './css/css.css';
/*
function App() {

const clickHandler = (title) => {
    alert(title);
 }

  return (
  <div className="banner" onClick={()=>clickHandler(123)}>
    <a className="wrap" href="#">
      <img className="img" src={img} title="輸入廣告促銷說明文字" alt="輸入廣告促銷說明文字"/>
    </a>
  </div>
  );
}*/
class MyComponent extends React.Component {
    state = {
        title: 'World',
        // 設定一開始是否為開或合
        openAtStart: true, // [boolean] true | false
        // 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
        autoToggle: true, // [boolean|number] true | false | 3000
        // 設定收合展開按鈕
        button: {
            closeText: '收合', // [string]
            openText: '展開', // [string]
            class: 'btn' // [string]
        },
        // 設定模組在各狀態時的class
        
        class: {
            closed: 'closed', // [string]
            closing: 'closing', // [string]
            opened: 'opened', // [string]
            opening: 'opening' // [string]
        },
        // 是否要有transition效果
        transition: true,
        transit: false,

        // 當有transition時，要執行的callback function
        callbackTime: 30,
        whenTransition: function() {
            console.log('whenTransition');
        }
    };

    componentDidMount() {
    }

    
    toggle(){
        if (!!this.state.openAtStart)
            this.close();
        else
            this.open();
    }
    open(){
        this.setState({transit: true,openAtStart:true });
        this.transition();
    }
    close(){
        this.setState({transit: true,openAtStart:false });
        this.transition();
    }
    transition(){
        setTimeout(() => { 
            this.setState({transit: false});
        },this.state.transition);
        for (let i=1;i<this.state.transition;i+=this.state.transition/this.state.callbackTime)
            setTimeout(() => { this.state.whenTransition() },i);
    }
    seting(parameter){
        
        this.setState(parameter);
        
        if (typeof this.state.autoToggle === 'boolean' && (this.state.autoToggle === true))
            setTimeout(() => { 
                this.toggle();
            },3000);
        else if (typeof this.state.autoToggle === 'number')
            setTimeout(() => { 
                this.toggle();
            },this.state.autoToggle);

        setTimeout(() => { 
            this.state.transition = (this.state.transition ? (typeof this.state.transition === 'number' ? this.state.transition : 600) : 0);
        },1);
    }

    render() {
        let buttonClass =this.state.button.class+' '+(this.state.openAtStart ? '' : 'show')
        let buttonName = this.state.openAtStart ? this.state.button.closeText : this.state.button.openText
        let bannerstatename;
        if(this.state.openAtStart)
            if(this.state.transit)
                bannerstatename = "opening " + this.state.class.opening
            else
                bannerstatename = "opened " + this.state.class.opened
        else
            if(this.state.transit)
                bannerstatename = "closing " + this.state.class.closing
            else
                bannerstatename = "closed " + this.state.class.closed
        
        // console.log(erw);
        return (
            <div className={"banner "+bannerstatename} style={{transition: this.state.transition + "ms"}}>
                <a className="wrap" href="#">
                    <img className="img" src={img} style={{transition: this.state.transition + "ms"}} title="輸入廣告促銷說明文字" alt="輸入廣告促銷說明文字"/>
                </a>
                <button className={"btn "+buttonClass} onClick={()=>this.toggle()}>{buttonName}</button>
            </div>
        );
    }
}


export default MyComponent;
