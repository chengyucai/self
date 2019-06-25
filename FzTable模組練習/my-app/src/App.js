import React from 'react';
import './css/css.css';


class Header extends React.Component {
  state = { 
    title: "前後3天最低票價",
    togglebtn: "低價日曆",
  }
  componentDidMount() {
    this.setState(this.props);
  }

  render() {
    console.log(this.state);

      return (
          <div className={this.state.className}>
            <p>{this.state.title}</p>
            <button>{this.state.togglebtn}</button>
          </div>
      );
  }
}

const ob = {
  "回程去程": [
    "12/27(一)",
    "12/28(二)",
    "12/29(三)",
    "12/30(四)",
    "12/31(五)",
    "01/01(六)",
    "01/02(日)"
  ],
  "12/27(一)":[
    "— —",
    "$15,568起",
    "$15,568起",
    "$15,568起",
    "$15,568起",
    "$15,568起",
    "$15,568起"
  ],
  "12/28(二)":[
    "$15,568起",
    "$15,568起",
    "$15,568起",
    "$15,568起",
    "$15,568起",
    "$15,568起",
    "$15,568起"
  ],
  "12/29(三)":[
    "查看",
    "$15,568起",
    "$15,568起",
    "$15,568起",
    "$15,568起",
    "$15,568起",
    "$15,568起"
  ],
  "12/30(四)":[
    "查看",
    "查看",
    "$15,568起",
    "$15,568起",
    "$15,568起",
    "$15,568起",
    "$15,568起"
  ],
  "12/31(五)":[
    "查看",
    "查看",
    "查看",
    "$15,568起",
    "$15,568起",
    "$15,568起",
    "$15,568起"
  ],
  "01/01(六)":[
    "查看",
    "查看",
    "查看",
    "查看",
    "$15,568起",
    "$15,568起",
    "$15,568起"
  ],
  "01/02(日)":[
    "查看",
    "查看",
    "查看",
    "查看",
    "查看",
    "$15,568起",
    "$15,568起"
  ]
};

class Tablelion extends React.Component {
  state = {
    showBlock: 7,
    blockContent: null,
  };
  componentDidMount() {
    this.setState(this.props);
  }

  
  render() {
    
    let width= {width: 100 / this.state.showBlock + "%"};
    // let lists = this.state.blockContent.map((list,key)=>{return <div key={key} style={width}>{list}</div>})
    let lists,title;

    if (!!this.state.blockContent){
      lists = Object.keys(this.state.blockContent).map((list,key) => {
        let Objec = this.state.blockContent[list];

        let content = Object.keys(Objec).map((list,key)=>{
          return <div key={key} style={width}>{Objec[list]}</div>
        });
       
        if (key==0)
          return <tr key={key}>
                  <th>
                    <div className="Listblock" >
                      {content}
                    </div>
                  </th>
                </tr>
        else
          return <tr key={key}>
                    <td>
                      <div className="Listblock" >
                        {content}
                      </div>
                    </td>
                  </tr>
        }
      );
    }
    

      return (
        <div className="table">
          <table>
            <tbody>
              {lists}
            </tbody>
          </table>
        </div>
      );
  }

}
class Tabletitle extends React.Component {
  state = {
    blockContent: null,
  };
  componentDidMount() {
    this.setState(this.props);
  }

  
  render() {
    
    let title;

    if (!!this.state.blockContent){
      title = Object.keys(this.state.blockContent).map((list,key) => {
        return  <div key={key}>{list}</div>
      });
    }
    

      return (
        <div className='title'>{title}</div>
      );
  }

}
class MyComponent extends React.Component {

  state = {
    Calendar: ob
  };

  componentDidMount() {
  }


  render() {
    
      // console.log(erw);
      return (
        <div className="pclist">
          <Tabletitle blockContent= {this.state.Calendar} />
          <Tablelion showBlock={7} blockContent= {this.state.Calendar} />
        </div>
          
          
      );
  }
}


export default MyComponent;
