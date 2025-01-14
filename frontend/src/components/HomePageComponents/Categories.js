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
            image: 'https://piccopilot.oss-accelerate.aliyuncs.com/product/adminFile/4122026238ba4f69b1a69d619a57ee4d1.png'
        },
        {
            category: 'Sports & outdoors',
            image: 'https://piccopilot.oss-accelerate.aliyuncs.com/product/adminFile/4122026238ba4f69b1a69d619a57ee4d1.png'
        },
        {
            category: 'Toys',
            image: 'https://piccopilot.oss-accelerate.aliyuncs.com/product/adminFile/4122026238ba4f69b1a69d619a57ee4d1.png'
        },
        {
            category: 'Fashion',
            image: 'https://piccopilot.oss-accelerate.aliyuncs.com/product/adminFile/4122026238ba4f69b1a69d619a57ee4d1.png'
        },
        {
            category: 'Grocery',
            image: 'https://piccopilot.oss-accelerate.aliyuncs.com/product/adminFile/4122026238ba4f69b1a69d619a57ee4d1.png'
        },
        {
            category: 'Auto & Tires',
            image: 'https://piccopilot.oss-accelerate.aliyuncs.com/product/adminFile/4122026238ba4f69b1a69d619a57ee4d1.png'
        },
        {
            category: 'Glasses',
            image: 'https://piccopilot.oss-accelerate.aliyuncs.com/product/adminFile/4122026238ba4f69b1a69d619a57ee4d1.png'
        },
        {
            category: 'Handbags',
            image: 'https://piccopilot.oss-accelerate.aliyuncs.com/product/adminFile/4122026238ba4f69b1a69d619a57ee4d1.png'
        },
        {
            category: 'Accessories',
            image: 'https://piccopilot.oss-accelerate.aliyuncs.com/product/adminFile/4122026238ba4f69b1a69d619a57ee4d1.png'
        },
        {
            category: 'Accessories',
            image: 'https://piccopilot.oss-accelerate.aliyuncs.com/product/adminFile/4122026238ba4f69b1a69d619a57ee4d1.png'
        },
        {
            category: 'Accessories',
            image: 'https://piccopilot.oss-accelerate.aliyuncs.com/product/adminFile/4122026238ba4f69b1a69d619a57ee4d1.png'
        },
        {
            category: 'Accessories',
            image: 'https://piccopilot.oss-accelerate.aliyuncs.com/product/adminFile/4122026238ba4f69b1a69d619a57ee4d1.png'
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
            <div className='category-container my-4 px-4'>
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
