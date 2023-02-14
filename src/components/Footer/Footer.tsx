import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Status} from "../../redux/slices/people/types";
import styles from './Footer.module.css';

const Footer: FC = () => {
    const {status, isFinished} = useSelector((state: RootState) => state.people);
    let footerText: string;

    switch (status) {
        case (Status.ERROR):
            footerText = 'Error';
            break;
        case (Status.LOADING):
            footerText = 'Loading...';
            break;
        default:
            footerText = '';
    }

    if (isFinished) {
        footerText = 'That`s all people!'
    }

    return (
        <div className={status === Status.ERROR ? styles.error : ''}>
            {
                footerText
            }
        </div>
    );
}

export default Footer;