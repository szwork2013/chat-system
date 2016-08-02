/**
 * jiangyukun on 2016/07/28 10:10
 */
import React, {Component} from 'react'
import {routerShape} from 'react-router'

class Header extends Component {
    exit() {
        this.context.router.push('/signin');
    }

    render() {
        return (
            <div className="container-fluid">
                <header className="row">
                    <div className="col-xs-4">
                        <span className="chat-system-text">小贝壳聊天系统</span>
                    </div>
                    <div className="col-xs-4 text-center">
                        <span className="login-user">贝壳客服</span>
                    </div>
                    <div className="col-xs-4">
                        <div className="pull-right exit">
                            <button className="btn" onClick={()=>{this.exit()}}>退出登录</button>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

Header.contextTypes = {
    router: routerShape
}

module.exports = Header
