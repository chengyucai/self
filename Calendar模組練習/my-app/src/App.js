import React from 'react';
import './css/css.css';
var moment= require('moment');

// console.log(moment("2019/07/02").weekday());

class Days extends React.Component {
  state = {
    active: -1,
  }
  componentDidMount() {
    this.setState(this.props);
  }

  clickdate(e,key,data){
    this.props.onClickDate(e.currentTarget,data);
    this.setState({active: key});
  }
  render() {
    let data = this.props.dataSource;
    let targetmonth = this.props.date + "01";
    let totalDays=(moment(targetmonth).endOf('month').format('DD'));
    let none = (moment(targetmonth).weekday() % 7);
    var days=Array.apply(null, Array(parseInt(totalDays))); //empty 無法 map、filter

    if (data !== undefined)
    {
      //將資料填至與日期相應的位置(Array)
      data.forEach((m)=>{
        days[parseInt(m.date.match(/(\d{2})$/g))-1]= m ;
      });

      days = days.map((m,key)=>{
        if (m === undefined){
          return <div className="empty" key={key}>
                  <div className="nmb">{key+1}</div>
                </div>;
        }
        else{
          return <div key={key} className={(this.state.active === key)?"active":""} onClick={(e)=>this.clickdate(e,key,m)}>
            <div className="nmb">{key+1}</div>
            {m.guaranteed ? 
              <div className="tip"><span>成團</span></div> : null 
            }
            <div className={"state " + this.props.statuStyle[m.status]}>{m.status}</div>
            <div className="sell">可賣 : {m.totalVacnacy}</div>
            <div className="group">團位 : {m.availableVancancy}</div>
            <div className="price">${m.price}</div> 
            <div className="week">{this.props.week[moment(m.date).weekday()]}</div> 
          </div>

        }
          
      });
      // console.log(this.state.active);
    }
    
    return (
      <div className="days">
        <div className={"none-"+none}></div>
        {days}
      </div>
    );
  }

}

class MyComponent extends React.Component {
  state = {
    week:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
    statuStyle:{
      "報名": "greed",
      "後補": "greed",
      "預定": "yellow",
      "截止": "white",
      "額滿": "white",
      "關團": "white",
    },
    toggle : false,
    positionMonth : 0,
    switch:{
          blockclass : "calendar calendar_list",
          listclass : "calendar ",
          blockName: "切換列表顯示",
          listName: "切換月曆顯示"
    },
  };
  componentDidMount() {
    let data=this.props.data;
    let setting=this.props.data.dataKeySetting;
    // console.log();
    if(typeof data.dataSource === "string"){
      fetch(data.dataSource)
      .then(response => response.json())
      .then(d => {
        data.dataSource = d;

        Object.keys(setting).forEach((key,index,obj)=>{
          data.dataSource = JSON.parse(JSON.stringify(data.dataSource).split('"'+setting[key]+'":').join('"'+key+'":'));
          // console.log('"'+setting[key]+'":','"'+key+'":',obj);
        });

        // data.dataSource = JSON.parse(JSON.stringify(data.dataSource).split('""_id":"').join('"id":'));
        // data.dataSource = data.dataSource.map((m)=>{
        //   m.date= moment(m.date).format('YYYYMMDD');
        //   return m;
        // });

        // (dataSource.date) => sort(increase)
        data.dataSource = data.dataSource.sort((a,b) =>
          moment(a.date).format('YYYYMMDD') - moment(b.date).format('YYYYMMDD')
        );
        //"201705" => "2017/05"
        data.initYearMonth = data.initYearMonth.replace(/(\d{4})(\d{2})(.*)/g,"$1/$2");

        this.setState(data);
      });
    }
    else{
      data.dataSource = data.dataSource.sort((a,b) =>
        moment(a.date).format('YYYYMMDD') - moment(b.date).format('YYYYMMDD')
      );
      this.setState(data);
    }
      
    
  }

  addData(data){
    this.setState(prevState => ({
      dataSource: [data, ...prevState.dataSource].sort((a,b) =>
        moment(a.date).format('YYYYMMDD') - moment(b.date).format('YYYYMMDD'))
    }))
  }
  NextMonth(){
    this.setState({initYearMonth: moment(this.state.initYearMonth).add(1, 'M').format('YYYYMMM')})
  }
  PrevMonth(){
    this.setState({initYearMonth: moment(this.state.initYearMonth).add(-1, 'M').format('YYYYMMM')})
  }
  changeMonth(e,value,data){
    if (typeof value === "string"){
      this.setState({initYearMonth: value});
    }
    else{
      let newdate = moment(this.state.initYearMonth).add(value, 'M').format('YYYYMMM');
   
      this.setState({initYearMonth: newdate})
    }
      
    if (value===-1)
      this.state.onClickPrev(e.currentTarget,data,this);
    else if (value===1)
      this.state.onClickPrev(e.currentTarget,data,this);
  }

  render() {
    
      var State = this.state; 
      var monthSwitch =[];

      if (typeof State.dataSource !== "undefined"){
        
        let newdate = State.dataSource.filter((m)=>{
          if (moment(m.date).format('YYYYMMM')===moment(State.initYearMonth).format('YYYYMMM'))
            return m;
          return null;
        });

        var dataresult = [];
        let repeat = new Set();
        newdate.forEach(item => {
            if (!repeat.has(item.date)){
              dataresult.push(item);
              repeat.add(item.date);
            }
        })

        var Weekday = State.week.map((day,index) => {return <div key={index}>{day}</div>});
        var switchclass = State.toggle ? State.switch.blockclass : State.switch.listclass;
        var switchName = State.toggle ? State.switch.blockName : State.switch.listName;
        
        let startTime = moment(State.dataSource[0].date).add(-1,'M').format('YYYYMMM');
        var switchleft=0;
        var max=0;
        for(let i=0;!!(moment(State.dataSource[State.dataSource.length - 1].date).add(2,'M').format('YYYYMM')-moment(startTime).format('YYYYMM'));i++){
          
          let go = startTime;
          let nodays=State.dataSource.find((m)=>{
            if (moment(m.date).format('YYYYMMM')===moment(startTime).format('YYYYMMM'))
              return m;
            return null;
          }) 
          monthSwitch.push(
            <div  key={i} 
                  onClick={(e) => this.changeMonth(e,go,null)} 
                  className={moment(State.initYearMonth).format('YYYYMMM')===moment(startTime).format('YYYYMMM') ?"select":""}
                  >
              {moment(startTime).format('YYYY M月')}
              {nodays ? null : <div>無出發日</div> }
            </div>
          );
          startTime=moment(startTime).add(1,'M').format('YYYYMMM');
          if (moment(State.initYearMonth).format('YYYYMMM')===moment(startTime).format('YYYYMMM')){
            switchleft = i;
          }
          max=i;
        }
      }
      // console.log(JSON.stringify(dataresult) === '[]');
      // console.log(dataresult);

      return (
        <div className= {switchclass}>
            <div className="switch">
              <span onClick={() => this.setState({toggle: !this.state.toggle})}>{switchName}</span>
            </div>

            <div className="month">
              <button onClick={(e) => this.changeMonth(e,((switchleft)? -1 : 0),dataresult)}></button>
              <div className={"left-"+(switchleft===max-1 ? switchleft-1 :switchleft)}>
                {monthSwitch}
              </div>
              <button onClick={(e) => this.changeMonth(e,((switchleft >= max-2)? 0 : 1),dataresult)}></button>
            </div>
            
            <div className="week">
              {Weekday}
            </div>

            <Days dataSource={dataresult} week={State.week} date={moment(State.initYearMonth).add(State.positionMonth,'M').format('YYYYMM')} statuStyle={this.state.statuStyle} onClickDate={this.state.onClickDate}></Days>
        </div>
      );
  }
}


export default MyComponent;