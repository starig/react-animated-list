import React, {FC} from 'react';
import { PeopleItem } from "../../redux/slices/people/types";
import styles from './PeopleItem.module.scss';

const PeopleListItem: FC<PeopleItem> = ({name, surname}) => {
    return (
        <div className={styles.wrapper}>
            {name}, {surname}
        </div>
    );
}

export default PeopleListItem;