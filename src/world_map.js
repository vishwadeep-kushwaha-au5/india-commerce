import React, { Component } from "react";
import { VectorMap } from "react-jvectormap";

class WorldMap extends Component {
  //   const [n, setN] = useState(0);
  constructor(props) {
    super(props);
    this.state = {
      map: [
        { code: "IN", value: 100 },
        { code: "US", value: 800 },
        { code: "CN", value: 900 },
        { code: "CA", value: 500 },
      ],
      year: 2019,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/world/" + this.state.year)
      .then((res) => res.json())
      .then((body) => {
        this.setState({ map: body });
      });
  }

  componentDidUpdate(prevProps, pervState) {
    if (pervState.year !== this.state.year) {
      fetch("http://localhost:8080/world/" + this.state.year)
        .then((res) => res.json())
        .then((body) => {
          this.setState({ map: body });
        });
    }
  }

  getdata(key) {
    var countryData = [];
    this.state.map.forEach((obj) => {
      countryData[obj.Code] = obj[this.state.year];
    });
    return countryData[key];
  }

  getalldata() {
    var countryData = {};
    this.state.map.forEach((obj) => {
      countryData[obj.Code] = obj[this.state.year];
    });
    return countryData;
  }

  //getdata(key) is function that maps code to the value of array (JSON)and it return only value specific state code
  handleshow2 = (e, el, code) => {
    el.html(el.html() + "<br> Statics: " + this.getdata(code));
  };
  //on hover on state, it call getdata(with state code) and display it on screen
  handleYearSelect = (event) => {
    this.setState({ year: event.target.value });
  };

  render() {
    return (
      <div>
        <select value={this.state.year} onChange={this.handleYearSelect}>
          {[
            1997,
            1998,
            1999,
            2001,
            2002,
            2003,
            2004,
            2005,
            2006,
            2007,
            2008,
            2009,
            2010,
            2011,
            2012,
            2013,
            2014,
            2015,
            2016,
            2017,
            2018,
            2019,
          ].map((year, index) => (
            <option value={year} key={year + index}>
              {year}
            </option>
          ))}
        </select>
        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent"
          focusOn={{
            x: 0.5,
            y: 0.5,
            scale: 0,
            animate: false,
          }}
          zoomOnScroll={true}
          containerStyle={{
            width: "100%",
            height: "600px",
          }}
          //onRegionClick={console.log(code)} //gets the country                         code
          onRegionTipShow={this.handleshow2}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#e4e4e4",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0,
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "pointer",
            },
            selected: {
              fill: "#2938bc", // onclick colour of state
            },
          }}
          regionsSelectable={false}
          series={{
            regions: [
              {
                values: this.getalldata(), //can be directly served //with api response or any data
                scale: ["#DEEBF7", "#08519C"], //color range
                normalizeFunction: "polynomial",
              },
            ],
          }}
        />
      </div>
    );
  }
}

export default WorldMap;
