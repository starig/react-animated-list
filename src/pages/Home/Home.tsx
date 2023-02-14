import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {fetchPeopleData} from "../../redux/actions";
import PeopleListItem from "../../components/PeopleItem/PeopleListItem";
import styles from './Home.module.css';
import {increasePage, setStatus} from "../../redux/slices/people/peopleSlice";
import {Status} from "../../redux/slices/people/types";
import Loader from "../../components/Loader/Loader";
// @ts-ignore
import Fade from 'react-reveal/Fade';

const Home: FC = () => {
    const {status, people, isFinished, page, limit} = useSelector((state: RootState) => state.people);
    const dispatch = useDispatch<AppDispatch>();

    const scrollHandler = (e: any) => {
        let scrollHeight = e.target.documentElement.scrollHeight;
        let scrollTop = e.target.documentElement.scrollTop;
        let innerHeight = window.innerHeight;
        if (scrollHeight - (scrollTop + innerHeight) < 100) {
            dispatch(setStatus(Status.LOADING));
        }
    };

    useEffect(() => {
        if (status === Status.LOADING && !isFinished) {
            dispatch(increasePage());
            (async () => {
                await dispatch(fetchPeopleData({
                    page,
                    limit
                }));
            })();
        }
    }, [status]);


    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    });

    return (
        <div className={styles.wrapper}>
            {
                people.map((item, id) => {
                    return <Fade bottom cascade opposite collapse key={id}>
                        <div>
                            {
                                PeopleListItem(item)
                            }
                        </div>

                    </Fade>;
                })
            }
            {
                isFinished ? 'That`s all people!' : status === Status.LOADING && <Loader/>
            }
        </div>
    );
}

export default Home;