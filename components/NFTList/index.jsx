import axios from 'axios';

import React, { useEffect, useState, useContext, useRef, useCallback, RefAttributes } from 'react'
// import { useAccount } from 'wagmi';
import { MoralisNFT } from '../../contracts/nft';
import { fixTokenURI } from '../../utils';
import NFTCard from '../NFTCard';
import { TransactionContext } from '../../contexts/transactionContext';

import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { NftContext } from '../../contexts/NftContext';

const NFTList = () => {
    const { currentAccount } = useContext(TransactionContext);
    const { nftList, nftFloorPriceMapping } = useContext(NftContext);
console.log("NFTS FROM PAGE",nftList)

    const sliderRef = useRef();

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    return (
        <div className='h-[30rem]' >
            <div className='py-4 flex relative'>

                <div onClick={handlePrev} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute -left-12 top-60'><ChevronLeftIcon className='text-white h-7 w-7' /></div>
                <Swiper
                    ref={sliderRef}
                    // grabCursor={true}
                    slidesPerView={3}
                    scrollbar={true}
                    // spaceBetween={80}
                    modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                    className="mySwiper"
                >
                    {
                        nftList.map((nft) => (
                            <SwiperSlide>
                                <NFTCard nft={nft} floor_price={nftFloorPriceMapping?.[`${nft.token_address}_${nft.token_id}`]} key={nft.token_uri} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <div onClick={handleNext} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute -right-12  top-60 z-10'><ChevronRightIcon className='text-white h-7 w-7' /></div>

            </div >
        </div>
    )
}

export default NFTList;