import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <header className="header mt-auto py-3">
                <div className="container">
                    <h2>Курсовая работа</h2>
                    <h3>Решение задачи Дирихле для уравнения Лапласа</h3>
                </div>
            </header>
        );
    }
}
export default Header;