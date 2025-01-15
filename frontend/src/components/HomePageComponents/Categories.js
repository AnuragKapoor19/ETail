import React, { useRef } from 'react'
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import './HomeStyle.css'

export default function Categories() {

    const categories = [
        {
            category: 'Electronics',
            image: 'https://piccopilot.oss-accelerate.aliyuncs.com/product/adminFile/4122026238ba4f69b1a69d619a57ee4d1.png'
        },
        {
            category: 'Home',
            image: 'https://png.pngtree.com/thumb_back/fh260/background/20240812/pngtree-torn-paper-beside-model-house-sale-purchase-rent-real-estate-concept-image_16129885.jpg'
        },
        {
            category: 'Sports & Outdoors',
            image: 'https://thumbs.dreamstime.com/b/sports-equipment-assorted-including-basketball-soccer-ball-tennis-ball-baseball-tennis-racket-football-birdie-badminton-racket-43938756.jpg'
        },
        {
            category: 'Toys',
            image: 'https://thumbs.dreamstime.com/b/teddy-bear-isolate-background-bow-cute-art-nice-love-floor-b-baby-play-child-one-joy-doll-studio-toy-object-animal-concept-78876761.jpg'
        },
        {
            category: 'Fashion',
            image: 'https://img.freepik.com/premium-photo/two-t-shirts-hanging-hanger-with-one-being-black-one_889227-739.jpg'
        },
        {
            category: 'Grocery',
            image: 'https://media.istockphoto.com/id/1277510870/photo/reusable-shopping-bag-surrounded-by-vegan-ingredients-recyclable-jars-and-paper-bags.jpg?s=612x612&w=0&k=20&c=W6vd83wjO0Rk0KeLpaWy9jP3oI6dKVDgzsckaoAEGkk='
        },
        {
            category: 'Auto & Tires',
            image: 'https://thumbs.dreamstime.com/b/single-black-tire-yellow-rim-background-car-automotive-wheel-330653492.jpg'
        },
        {
            category: 'Glasses',
            image: 'https://img.freepik.com/premium-photo/single-pair-sunglasses-isolated-white-background_941600-28709.jpg'
        },
        {
            category: 'Handbags',
            image: 'https://media.istockphoto.com/id/1034356920/photo/sky-blue-handbag-purse-and-beautiful-woman-hand-with-red-manicure-isolated-on-pink-background.jpg?s=612x612&w=0&k=20&c=Mwji6mHj7IrjFkbVrX3wbJQP_pYf4dPM8STIwfqOgp4='
        },
        {
            category: 'Accessories',
            image: 'https://static.vecteezy.com/system/resources/thumbnails/023/308/746/small_2x/different-stylish-female-accessories-on-color-background-closeup-generative-ai-photo.jpg'
        }
    ]

    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({
            left: -200, // Adjust the value to determine the scroll distance
            behavior: "smooth", // Smooth scrolling effect
        });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({
            left: 200,
            behavior: "smooth",
        });
    };

    return (
        <>
            <div className='category-container my-4'>
                <h3 className='fw-bolder mb-3'>Get it all right here</h3>
                <div className='category-btns' style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                    <div className='btn btn-left' onClick={scrollLeft}><BsArrowLeftCircle size='3rem' /></div>
                    <div className='btn btn-right' onClick={scrollRight} style={{ marginLeft: "10px" }}><BsArrowRightCircle size='3rem' /></div>
                </div>
                <div ref={scrollContainerRef} className='scroller d-flex justify-content-between py-3'>
                    {categories.map((cat) => (
                        <div className='category-div text-center mx-2' key={cat}>
                            <img className='category-logo' src={cat.image} alt={cat} />
                            <span className='fw-bold'>{cat.category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
