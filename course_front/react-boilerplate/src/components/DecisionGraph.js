import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';


class DecisionGraph extends Component {
    render() {
        return (
            <Fragment>
                <h3 className="mb-3">График решения</h3>
                <div className="graph-block">
                    <Plot className="graph"
                        data={[
                            {
                                z: this.props.graph.z_array,
                                type: 'surface'
                            },
                        ]}
                        displayModeBar={false}
                        layout={{width: 600, height: 400, title: 'Решение'}}
                    />
                    <div className="graph-description">
                        <div className="col-md-3 mb-3">
                            <div className="item-name col-md-6 mb-3">
                                <label htmlFor="firstName">Левая</label>
                            </div>
                            <div className="item-name col-md-6 mb-3">
                                <label htmlFor="firstName">Правая</label>
                            </div>
                            <div className="item-name col-md-6 mb-3">
                                <label htmlFor="firstName">Нижняя</label>
                            </div>
                            <div className="item-name col-md-6 mb-3">
                                <label htmlFor="lastName">Верхняя</label>
                            </div>
                            <div className="item-name col-md-6 mb-3">
                                <label htmlFor="lastName">Время</label>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="col-md-6 mb-3">
                                <div className="item-name col-md-6 mb-3">
                                    {this.props.graph.left_function}
                                </div>
                                <div className="item-name col-md-6 mb-3">
                                    {this.props.graph.right_function}
                                </div>
                                <div className="item-name col-md-6 mb-3">
                                    {this.props.graph.down_function}
                                </div>
                                <div className="item-name col-md-6 mb-3">
                                    {this.props.graph.up_function}
                                </div>
                                <div className="item-name col-md-6 mb-3">
                                    {this.props.graph.req_time}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

DecisionGraph.propTypes = {
    graph: PropTypes.object.isRequired,
}
export default DecisionGraph;