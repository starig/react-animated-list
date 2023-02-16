import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {fetchPeopleData} from "../../redux/actions";
import PeopleListItem from "../../components/PeopleItem/PeopleListItem";
import styles from './Home.module.css';
import {increasePage, setStatus} from "../../redux/slices/people/peopleSlice";
import {Status} from "../../redux/slices/people/types";
// @ts-ignore
import Fade from 'react-reveal/Fade';
import Footer from "../../components/Footer/Footer";

const Home: FC = () => {
    const {status, people, isFinished, page, limit} = useSelector((state: RootState) => state.people);
    const dispatch = useDispatch<AppDispatch>();

    const scrollHandler = (e: Event) => {
        const target = e.target;
        if (!(target instanceof Document)) return;
        const scrollHeight = target.documentElement.scrollHeight;
        const scrollTop = target.documentElement.scrollTop;
        const innerHeight = window.innerHeight;
        if (scrollHeight - (scrollTop + innerHeight) < 100) {
            dispatch(setStatus(Status.LOADING));
        }
    };

    useEffect(() => {
        if (status === Status.LOADING && !isFinished) {
            dispatch(increasePage());
            dispatch(fetchPeopleData({
                    page,
                    limit
                }));
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
                    return <Fade bottom key={id}>
                        <div>
                            {
                                PeopleListItem(item)
                            }
                        </div>

                    </Fade>;
                })
            }
            <Footer />
        </div>
    );
}

export default Home;
