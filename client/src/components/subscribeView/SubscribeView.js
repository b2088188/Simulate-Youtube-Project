import './subscribeview.scss';
import React, { useEffect, useContext } from 'react';
import {useAuthState} from '../../stores/auth/authStateContext';
import SubscribeContext from '../../stores/subscriptions/subscribeContext';
import SubscribeItem from './SubscribeItem';
import Spinner from '../../utils/spinner/Spinner';
const SubscribeView = () => {
    const { subscriptions, loading, getSubscribes } = useContext(SubscribeContext);
    const {user} = useAuthState();
    useEffect(() => {
        getSubscribes();
    }, [])
    function renderSubscriptions(list) {
        return list.map(function generateItem(subscribe) {
            return (
                <SubscribeItem key = {subscribe._id} subscribe = {subscribe} />
            )
        })
    }

    if (!user)
        return null;
    if (loading)
        return (
            <Spinner classStyle = "center" />
        )
    return (
        <div className = "subscription">
            <h2 className = "subscription__infotitle">Subscriptions</h2>
                <nav className = "subscription__nav ">
                    <ul className = "subscription__list">
                         {renderSubscriptions(subscriptions)}               
                    </ul>
                </nav>
        </div>
    )
}

export default SubscribeView;