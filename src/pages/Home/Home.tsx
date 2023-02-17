import React, {FC, useEffect, useRef, useState} from 'react';
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
import { useInView } from 'react-intersection-observer';

const Home: FC = () => {
    const {status, people, isFinished, page, limit} = useSelector((state: RootState) => state.people);
    const dispatch = useDispatch<AppDispatch>();

    const {ref, inView} = useInView({
        threshold: 0.7,
    });

    useEffect(() => {
        if (inView) {
            dispatch(increasePage());
            dispatch(setStatus(Status.LOADING));
        }
    }, [inView]);


    useEffect(() => {
        if (status === Status.LOADING && !isFinished) {
            dispatch(fetchPeopleData({
                page,
                limit
            }));
        }
    }, [page]);



    return (
        <div className={styles.wrapper}>
            {
                people.map((item, id) => {
                    if (id === people.length - 1 && status != Status.LOADING && !isFinished) {

                        return  <div key={id} ref={ref}>
                            <Fade bottom>
                                <div>
                                    {
                                        PeopleListItem(item)
                                    }
                                </div>
                            </Fade>
                        </div>
                    } else {
                        return <Fade bottom key={id}>
                            <div>
                                {
                                    PeopleListItem(item)
                                }
                            </div>

                        </Fade>;
                    }
                })
            }
            <Footer/>
        </div>
    );
}

export default Home;
