import React, {Component} from 'react';


class DecisionsList extends Component {
    render() {
        return (
            <div className="footer mb-4 shadow-sm">
                {this.props.decisions.map(c =>
                    <div className="decision-item mb-4 shadow-sm" key={c.decision_id}>
                        <div className="card-body">
                            <h3 className="card-title pricing-card-title">Границы <small
                                className="text-muted"> </small>
                            </h3>
                            <ul className="mt-3 mb-4">
                                <li>Левая: {c.left_function}</li>
                                <li>Правая: {c.right_function}</li>
                                <li>Нижняя: {c.down_function}</li>
                                <li>Верхняя: {c.up_function}</li>
                                <li>Время: {c.req_time}</li>
                            </ul>
                            <button onClick={() => {
                                this.props.graphUpdate(c.decision_id)
                            }} className="button" ><span>Показать</span></button>
                        </div>
                    </div>
                )}
            </div>

        );
    }
}

export default DecisionsList;