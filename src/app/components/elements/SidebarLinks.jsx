import React from 'react';
import Icon from 'app/components/elements/Icon';
import { repLog10 } from 'app/utils/ParsersAndFormatters.js';
import {
    numberWithCommas,
    vestingSteem,
    delegatedSteem,
} from 'app/utils/StateFunctions';

const SidebarLinks = ({ username, account, follow_count, gprops }) => {
    let followerCount = 0;
    let followingCount = 0;

    console.log(account);
    if (follow_count) {
        followerCount = follow_count.follower_count;
        followingCount = follow_count.following_count;
    }

    let power_balance_str = '';
    let received_power_balance_str = '';
    if (gprops) {
        const vesting_steem = vestingSteem(account, gprops.toJS());
        const delegated_steem = delegatedSteem(account, gprops.toJS());
        power_balance_str = numberWithCommas(vesting_steem.toFixed(3));
        received_power_balance_str =
            (delegated_steem < 0 ? '+' : '') +
            numberWithCommas((-delegated_steem).toFixed(3));
    }

    const secondsago =
        (new Date() - new Date(account.last_vote_time + 'Z')) / 1000;
    const currentPower = account.voting_power + 10000 * secondsago / 432000;
    const votingPower = Math.min(currentPower / 100, 100).toFixed(2);

    return (
        <div className="c-sidebar__module">
            <div className="c-sidebar__content">
                <ul className="c-sidebar__list">
                    <li className="c-sidebar__list-item">
                        <div className="c-sidebar__list-menu-point">
                            <Icon name="profile" className="small-size" /> Blog({repLog10(
                                account.reputation
                            )})
                        </div>
                        <div className="hollow tiny button slim no-margin float-right">
                            <a
                                className="c-sidebar__link"
                                href={'/@' + username}
                            >
                                Open
                            </a>
                        </div>
                    </li>
                    <li className="c-sidebar__list-item small-text">
                        <div style={{ display: 'inline-block' }}>Follower</div>
                        <div className="float-right">{followerCount}</div>
                    </li>
                    <li className="c-sidebar__list-item small-text">
                        <div style={{ display: 'inline-block' }}>Following</div>
                        <div className="float-right">{followingCount}</div>
                    </li>
                    <hr />
                    <li className="c-sidebar__list-item">
                        <div className="c-sidebar__list-menu-point">
                            <Icon name="wallet" className="small-size" /> Wallet
                        </div>
                        <div className="hollow tiny button slim no-margin float-right">
                            <a
                                className="c-sidebar__link"
                                href={'/@' + username + '/transfers'}
                            >
                                Open
                            </a>
                        </div>
                    </li>
                    <li className="c-sidebar__list-item small-text">
                        <div style={{ display: 'inline-block' }}>STEEM</div>
                        <div className="float-right">{account.balance}</div>
                    </li>
                    <li className="c-sidebar__list-item small-text">
                        <div style={{ display: 'inline-block' }}>SBD</div>
                        <div className="float-right">{account.sbd_balance}</div>
                    </li>
                    <li className="c-sidebar__list-item small-text">
                        <div style={{ display: 'inline-block' }}>POWER</div>
                        <div className="float-right">
                            <div style={{ 'text-align': 'right' }}>
                                {power_balance_str} STEEM
                            </div>
                            <div style={{ 'text-align': 'right' }}>
                                ({received_power_balance_str}) STEEM
                            </div>
                        </div>
                    </li>
                    <br />
                    <hr />
                    <li className="c-sidebar__list-item">
                        <progress
                            className="custom-progressbar"
                            value={votingPower}
                            max="100"
                        />
                        <div style={{ 'font-size': '12px' }}>
                            <div style={{ display: 'inline-block' }}>
                                Voting Power
                            </div>
                            <div className="float-right">
                                <div style={{ 'text-align': 'right' }}>
                                    {votingPower}%
                                </div>
                            </div>
                        </div>
                    </li>
                    {/*   <li className="c-sidebar__list-item"><a className="c-sidebar__link" href={username + ''}>Pay someone</a></li> */}
                    {/* <li className="c-sidebar__list-item"><a className="c-sidebar__link" href="/market">Token market</a></li>  */}
                </ul>
            </div>
        </div>
    );
};

export default SidebarLinks;
