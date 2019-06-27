import React from 'react';
import './css/css.css';


class Tablelion extends React.Component {
  state = {
    Block: 7,

    PC: true,
    showBlock: null,
    turnBlock: null,
    blockContent: null,
    col: -1,
    row: -1,
    indexpage: 0,

  };
  componentWillReceiveProps(){
    if (this.state.blockContent !== this.props.blockContent)
      this.setState(this.props);
  }
  componentWillUnmount() {
    // this.setState(this.props);
    window.removeEventListener('resize', () => this.updateSize());
  }

  componentDidMount() {
    // this.setState(this.props);
    this.updateSize();
    window.addEventListener('resize', () => this.updateSize());
  }


  indexpage(data){
    const pageMax = this.state.Block - this.props.showBlock;
    let Indexpage= this.state.indexpage + (this.props.turnBlock*data);

    if (Indexpage < 0)
      Indexpage = 0;
    else if (Indexpage > pageMax)
      Indexpage = pageMax

    this.setState({indexpage : Indexpage});
  }

  updateSize() {
      this.setState(this.props);
      this.setState({PC: !!(window.innerWidth>=980)});
  }

  changecolor=(col,row)=>{
    this.setState({col: col,row: row});
  }
  

  render() {
    // console.log(this.setState)
    // console.log(this.state);
    // console.log(this.props.speed);
    let style= {width: 100 / (this.state.PC ? this.state.Block : this.props.showBlock) + "%"};
    let lists;
    if (!!this.props.blockContent){
      lists = Object.keys(this.props.blockContent).map((list,key) => {
        let Objec = this.props.blockContent[list];
        let row=key;

        let content = Object.keys(Objec).map((list,key)=>{
          let Class= (key === this.state.col && row === this.state.row) ? 'select' : ((key === this.state.col || row === this.state.row) ? 'col_row' :'');
          Class+=(Objec[list]<15000) ? " sale" : "";
          return <div key={key} className={Class} style={style} onClick={() => this.changecolor(key,row)} data-title={(Objec[list]<15000) ? "特價" : ""}><Thousands value={Objec[list]} Fword={"$"} Rword={"起"}></Thousands></div>
        });
       
        if (key === 0)
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
                      <div className={"Listblock row"+key} >
                        {content}
                      </div>
                    </td>
                  </tr>
        }
      );
    }
      const leftB="＜";
      const rightB="＞";
      let Style={ left : (this.state.PC ? 0 : -((this.state.indexpage)/this.props.showBlock)*100) +"%",
                  transition: this.state.PC ? "0s" : this.props.speed+"s"
      }
      
      return (
        <div className="table">
          <table style={Style}>
            <tbody>
              {lists}
            </tbody>
          </table>
          
          {(this.state.indexpage !== 0) && <button className="TB L_B" onClick={() => this.indexpage(-1)}>{leftB}</button>}
          {(this.state.indexpage <(this.state.Block - this.props.showBlock)) && <button className="TB R_B" onClick={() => this.indexpage(1)}>{rightB}</button>}
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
    if (!!this.props.blockContent){
      title = Object.keys(this.props.blockContent).map((list,key) => {
        if (!key){
          list=list.split(" ");
          return  <div key={key}><span>{list[0]}</span><span>{list[1]}</span></div>
        }
        else{
          const regexp = new RegExp('(\\d*)\\/(\\d*)\\/(\\d*)(.*)', "g");

          let date = list.toString().replace(regexp, '$2/$3$4');
          let yer;
          if (list.toString().match(regexp)){
            let year = list.toString().replace(regexp, '$2/$3');
            yer = list.toString().replace(regexp, '$1');
            if (year !== "01/01")
              yer = "";
            return  <div key={key}><span><b>{yer}</b><p>{date}</p></span></div>
          }
        }
          
      });
    }
    

      return (
        <div className='title'>{title}</div>
      );
  }

}

class Thousands extends React.Component {
  state = {
    Fword: null,
    Rword: null,
    value: 0,
    year: '2017'
  };
  componentDidMount() {
    this.setState(this.props);
  }

  
  render() {
    // let Tnumber = this.state.value.toString().split('.');
    // Tnumber[0] = Tnumber[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    const regexp = new RegExp('(\\d*)\\/(\\d*)\\/(\\d*)(.*)', "g");

    let date = this.state.value.toString().replace(regexp, '$2/$3$4');
    let yer;
    if (this.state.value.toString().match(regexp)){
      let year = this.state.value.toString().replace(regexp, '$2/$3');
      yer = this.state.value.toString().replace(regexp, '$1');
      if (year !== "01/01")
        yer = "";
    }

    return (
      (typeof this.state.value==="number") ? 
      <span>{this.state.Fword+this.state.value.toLocaleString()+" "}<p>{this.state.Rword}</p></span> :
      <span><b>{yer}</b><p>{date}</p></span>
    );
  }

}

class MyComponent extends React.Component {
  state = {
    calendar: null,
    showBlock: null,
    turnBlock: null,
    speed: null
  };

  
  componentDidMount() {
    
    }

  
  seting(parameter){
    // console.log(parameter);
    this.setState(parameter)
  }
  render() {

    let showBlock,turnBlock;
    if (this.state.showBlock<= 2)
      showBlock=2;
    else 
      showBlock= (this.state.showBlock>4) ? 4 : this.state.showBlock;
    if (this.state.turnBlock <= 0)
      turnBlock = 1;
    else 
      turnBlock= (this.state.turnBlock>this.state.showBlock) ? this.state.showBlock : this.state.turnBlock;
      // console.log(this.state);
      // console.log(erw);
      
      return (
        <div className= "pclist">
          <Tabletitle blockContent= {this.state.calendar} />
          <Tablelion showBlock={showBlock} turnBlock={turnBlock} blockContent= {this.state.calendar} speed={this.state.speed}/>
        </div>
          
          
      );
  }
}


export default MyComponent;
