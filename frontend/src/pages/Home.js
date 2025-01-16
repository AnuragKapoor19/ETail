import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import FirstComponent from '../components/HomePageComponents/FirstComponent';
import WeeklyDeals from '../components/HomePageComponents/WeeklyDeals';
import Decor from '../components/HomePageComponents/Decor';
import Apple from '../components/HomePageComponents/Apple';
import Categories from '../components/HomePageComponents/Categories';
import Offer from '../components/HomePageComponents/Offer';
import Fashion from '../components/HomePageComponents/Fashion';

export default function Home() {
    return (
        <>
            <Header />
            <FirstComponent />
            <WeeklyDeals />
            <Decor />
            <Apple />
            <Categories />
            <Offer />
            <Fashion />
            <Footer />
        </>
    )
}
