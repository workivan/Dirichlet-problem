import React, {Component} from "react";

import '../styles/App.css';
import DecisionsList from "./DecisionsList";
import DecisionGraph from "./DecisionGraph"
import CreateDecision from "./CreateDecision";
import Header from "./Header"
import axios from "axios";
import DecisionServices from "./DecisionServices";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decisions: [DecisionServices.returnInitialData()],
            graph: DecisionServices.returnInitialData()
        };
        this.updateDecisions = this.updateDecisions.bind(this);
        this.updateGraph = this.updateGraph.bind(this);
    }

    updateGraph(decision_id){
        this.setState({
            graph: this.state.decisions.find(c =>{
                if(c.decision_id === decision_id){
                    console.log(decision_id, c.decision_id);
                    return c
                }}
            )
        })
        console.log(this.state);
    }

    updateDecisions(){
        axios.get(DecisionServices.getDecisions())
            .then(res => {
                this.setState({decisions: res.data, graph: res.data[0]});
            })
        console.log("ok")
    }

    componentDidMount() {
        this.updateDecisions()
    }

    render() {
        return (
                <div className="page">
                    <div className="header">
                        <Header/>
                    </div>
                    <div className="content ">
                        <div className="left">
                            <CreateDecision  updateDecisions={this.updateDecisions}/>
                        </div>
                        <div className="right">
                            <DecisionGraph graph={this.state.graph}/>
                        </div>
                    </div>
                    <h3> Прошлые решения</h3>
                    <DecisionsList decisions={this.state.decisions}  graphUpdate={this.updateGraph}/>
                </div>
        );
    }
}

export default App;