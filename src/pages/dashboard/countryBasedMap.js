import { Card } from "@material-ui/core";
import React, { Component } from "react";
import { WorldMap } from "react-svg-worldmap"
import { CardContent} from "@material-ui/core";




class CountryBasedMap extends Component {
  

    constructor(props) {
        super(props);
        this.state = {
            mapData:[]
        }
    }

    async componentDidMount() {
        this.mapCountryBasedProcess(this.props.tenantDetails);
      }
      componentDidUpdate(prevProps, prevState) {
        if (prevProps.tenantDetails !== this.props.tenantDetails) {
            this.mapCountryBasedProcess(this.props.tenantDetails);

        }
      }

      mapCountryBasedProcess=(data)=>{
          const uniqueArrayWithCounts = data.reduce((accum, val) => {
            const dupeIndex = accum.findIndex(arrayItem => arrayItem.country&&arrayItem.country.code === val.country&&val.country.code);
            if (dupeIndex === -1) {
              accum.push({
                qty: 1,
                ...val
              });
            } else {
              accum[dupeIndex].qty++;
            }
            return accum;
        }, []);

        var mapData=[]

        for(var j=0;j<uniqueArrayWithCounts.length;j++){
          if(uniqueArrayWithCounts[j].country){
            mapData.push({ country: uniqueArrayWithCounts[j].country.code, value: uniqueArrayWithCounts[j].qty })

          }
        }
        this.setState({
            mapData:mapData
        })
        }


      render(){
          return(
            <Card className="projectPulseCard">
            <CardContent>
              <div className="country-based-world-map">
                <WorldMap color="#29a6ff" title="Country Based User Count" size="xxl" data={this.state.mapData} />
              </div>
              </CardContent>
              </Card>
          )
      }
}
export default CountryBasedMap